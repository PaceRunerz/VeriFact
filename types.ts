
export interface User {
  id: string;
  name: string;
  email: string;
  photoURL: string;
  iqScore: number;
}

export enum DetectionType {
  TEXT = 'TEXT',
  URL = 'URL',
  IMAGE = 'IMAGE'
}

export interface AnalysisResult {
  id: string;
  timestamp: number;
  type: DetectionType;
  input: string;
  truthScore: number;
  summary: string;
  verdict: 'Verified' | 'Suspicious' | 'Misinformation';
  breakdown: {
    sourceCredibility: number;
    sentimentAnalysis: string;
    crossReferenceCount: number;
    redFlags: string[];
  };
  sources: Array<{ title: string; uri: string }>;
}

export interface TrendingFact {
  id: string;
  title: string;
  claim: string;
  verdict: 'Fake' | 'Misleading' | 'True' | 'Debunked';
  sourceName?: string;
  sourceUrl?: string;
  publishedAt?: string;
}
