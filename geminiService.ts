
import { GoogleGenAI, Type } from "@google/genai";
import { DetectionType, AnalysisResult, TrendingFact } from "./types";
import { MOCK_TRENDING } from "./constants";

const PRIMARY_MODEL = "gemini-3-flash-preview";

// Validation for API Key
const apiKey = process.env.API_KEY;
if (!apiKey || apiKey === "undefined") {
  console.error("CRITICAL: API_KEY is missing. Check your .env file or environment variables.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || "" });

/**
 * Utility to wait for a specific duration.
 */
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Robustly extracts JSON from AI responses.
 */
const extractJson = (text: string): any => {
  try {
    const cleaned = text.replace(/```json/gi, "").replace(/```/g, "").trim();
    return JSON.parse(cleaned);
  } catch (e) {
    try {
      const start = text.indexOf('{');
      const end = text.lastIndexOf('}');
      if (start !== -1 && end !== -1) {
        return JSON.parse(text.substring(start, end + 1));
      }
    } catch (innerE) {
      console.error("JSON Extraction Error", text);
    }
    throw new Error("Data Integrity Error: The engine returned an unreadable report.");
  }
};

/**
 * Executes an AI task with automatic retries and fallback logic for 429 errors.
 */
async function callAiWithRetry(payload: any, retries = 3, useSearch = true): Promise<any> {
  if (!apiKey) throw new Error("API Key missing. Please configure your environment.");

  try {
    const response = await ai.models.generateContent({
      model: PRIMARY_MODEL,
      contents: payload.contents,
      config: {
        systemInstruction: payload.systemInstruction,
        ...(useSearch ? { tools: [{ googleSearch: {} }] } : {}),
      },
    });
    return response;
  } catch (error: any) {
    const isRateLimit = error.message?.includes("429") || error.message?.includes("quota");
    
    if (isRateLimit && retries > 0) {
      console.warn(`Rate limit hit. Retrying... (${retries} attempts left)`);
      await sleep(2000 * (4 - retries)); 
      return callAiWithRetry(payload, retries - 1, useSearch);
    }
    
    if (useSearch && retries === 0) {
      console.warn("Search tool quota exhausted. Falling back to Internal Knowledge Engine.");
      return callAiWithRetry(payload, 1, false);
    }
    
    throw error;
  }
}

export const fetchTrendingFacts = async (): Promise<TrendingFact[]> => {
  const payload = {
    contents: [{ text: "List 6 viral news claims debunked in the last 48 hours. Return JSON: [{ id, title, claim, verdict, sourceName, sourceUrl }]." }],
    systemInstruction: "Output ONLY raw JSON. No conversational text."
  };

  try {
    const response = await callAiWithRetry(payload, 2, true);
    const data = extractJson(response.text || "[]");
    return Array.isArray(data) ? data.slice(0, 6) : MOCK_TRENDING;
  } catch (error) {
    return MOCK_TRENDING;
  }
};

export const analyzeContent = async (
  type: DetectionType,
  input: string,
  imageData?: string
): Promise<AnalysisResult> => {
  if (!apiKey) throw new Error("Security Key Missing. Please set your API_KEY.");

  const sysInstruction = `You are the VeriFact Truth Engine. 
Investigate for misinformation/manipulation.
OUTPUT ONLY JSON:
{
  "summary": "1-2 sentence forensic summary",
  "truthScore": 0-100,
  "verdict": "Verified" | "Suspicious" | "Misinformation",
  "breakdown": {
    "sourceCredibility": 0-100,
    "sentimentAnalysis": "Clinical note",
    "redFlags": ["specific flag 1", "specific flag 2"]
  }
}`;

  let contents: any;
  if (type === DetectionType.IMAGE && imageData) {
    contents = {
      parts: [
        { inlineData: { mimeType: 'image/jpeg', data: imageData.split(',')[1] } },
        { text: "Forensic Scan: Detect AI markers or context manipulation." }
      ]
    };
  } else {
    contents = { parts: [{ text: `VERIFY: ${input}` }] };
  }

  try {
    const response = await callAiWithRetry({ contents, systemInstruction: sysInstruction }, 3, true);
    const data = extractJson(response.text || "{}");
    
    const grounding = response.candidates?.[0]?.groundingMetadata;
    const webSources = (grounding?.groundingChunks || [])
      .filter((c: any) => c.web)
      .map((c: any) => ({
        title: c.web?.title || "Verification Node",
        uri: c.web?.uri || "#"
      }));

    return {
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      timestamp: Date.now(),
      type,
      input: type === DetectionType.IMAGE ? "Visual Media Forensic Scan" : (input.length > 60 ? input.substring(0, 60) + "..." : input),
      truthScore: data.truthScore ?? 50,
      summary: data.summary || "Analysis completed with baseline inconclusive markers.",
      verdict: data.verdict || "Suspicious",
      breakdown: {
        sourceCredibility: data.breakdown?.sourceCredibility ?? 70,
        sentimentAnalysis: data.breakdown?.sentimentAnalysis || "Neutral observation.",
        crossReferenceCount: webSources.length,
        redFlags: Array.isArray(data.breakdown?.redFlags) ? data.breakdown.redFlags : ["Limited digital evidence footprint."]
      },
      sources: webSources
    };
  } catch (error: any) {
    console.error("Engine Final Failure:", error);
    throw new Error("Truth Engine connection lost. The project may have reached its hourly limit. Please try again in a few minutes.");
  }
};
