
import React, { useState, useRef } from 'react';
import { DetectionType, AnalysisResult } from '../types';
import { Button } from './CommonUI';
import { analyzeContent } from '../geminiService';

interface Props {
  onResults: (res: AnalysisResult) => void;
  onAnalyzing: (analyzing: boolean) => void;
}

export const DetectionEngine: React.FC<Props> = ({ onResults, onAnalyzing }) => {
  const [activeTab, setActiveTab] = useState<DetectionType>(DetectionType.TEXT);
  const [inputText, setInputText] = useState('');
  const [inputUrl, setInputUrl] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [retryStatus, setRetryStatus] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTabChange = (type: DetectionType) => {
    setActiveTab(type);
    setErrorMessage(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setErrorMessage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    setErrorMessage(null);
    setRetryStatus(null);
    
    let input = '';
    let imgData = undefined;

    try {
      if (activeTab === DetectionType.TEXT) {
        if (!inputText.trim()) throw new Error("Please enter text for investigation.");
        input = inputText;
      } else if (activeTab === DetectionType.URL) {
        if (!inputUrl.trim() || !inputUrl.includes('http')) throw new Error("Please enter a valid investigation URL.");
        input = inputUrl;
      } else {
        if (!imagePreview) throw new Error("Please upload a file for forensic scanning.");
        input = "Forensic Media Scan";
        imgData = imagePreview;
      }

      onAnalyzing(true);
      const result = await analyzeContent(activeTab, input, imgData);
      onResults(result);
    } catch (error: any) {
      setErrorMessage(error.message || "An unexpected engine error occurred.");
    } finally {
      onAnalyzing(false);
    }
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100 flex flex-col min-h-[450px]">
      <div className="flex border-b border-gray-50 shrink-0">
        {[
          { id: DetectionType.TEXT, label: 'Text Scan', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5' },
          { id: DetectionType.URL, label: 'URL Trace', icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656' },
          { id: DetectionType.IMAGE, label: 'Forensics', icon: 'M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id as DetectionType)}
            className={`flex-1 py-5 flex items-center justify-center gap-2 transition-all font-black text-[10px] uppercase tracking-widest ${
              activeTab === tab.id ? 'bg-[#0A192F] text-[#64FFDA]' : 'text-gray-400 hover:bg-gray-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-10 flex-1 flex flex-col">
        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-xs font-bold flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errorMessage}
          </div>
        )}

        <div className="flex-1">
          {activeTab === DetectionType.TEXT && (
            <textarea
              className="w-full h-48 p-6 bg-gray-50 rounded-2xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#64FFDA]/30 transition-all resize-none text-gray-800 font-journal text-lg placeholder:text-gray-300"
              placeholder="Paste headlines or articles for deep verification..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          )}

          {activeTab === DetectionType.URL && (
            <div className="animate-in fade-in slide-in-from-left-4 duration-300">
              <input
                type="text"
                className="w-full p-6 bg-gray-50 rounded-2xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#64FFDA]/30 transition-all text-gray-800 font-bold"
                placeholder="Investigation URL (https://...)"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
              />
              <p className="mt-3 text-[10px] text-gray-400 uppercase tracking-widest font-bold">Scanning project domains and social media threads</p>
            </div>
          )}

          {activeTab === DetectionType.IMAGE && (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-48 border-2 border-dashed border-gray-100 rounded-3xl flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-all cursor-pointer relative overflow-hidden animate-in fade-in slide-in-from-right-4 duration-300"
            >
              {imagePreview ? (
                <>
                  <img src={imagePreview} className="absolute inset-0 w-full h-full object-cover opacity-20 blur-sm" alt="Preview" />
                  <div className="z-10 flex flex-col items-center">
                    <div className="w-12 h-12 bg-[#0A192F] rounded-2xl flex items-center justify-center mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#64FFDA]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="font-black text-[#0A192F] text-xs uppercase tracking-widest">Media Node Staged</p>
                  </div>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-200 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Upload Investigative Media</p>
                </>
              )}
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
            </div>
          )}
        </div>

        <div className="mt-auto pt-10">
          <Button variant="secondary" className="w-full py-5 rounded-2xl group shadow-2xl" onClick={handleAnalyze}>
            <span className="text-xs font-black uppercase tracking-[0.2em]">Initiate Truth Scan</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
