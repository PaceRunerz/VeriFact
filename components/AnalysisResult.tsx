
import React from 'react';
import { AnalysisResult } from '../types';
import { ScoreGauge } from './CommonUI';

export const AnalysisResultCard: React.FC<{ result: AnalysisResult }> = ({ result }) => {
  if (!result) return null;

  const verdictStyles = {
    'Verified': 'bg-green-100 text-green-700 border-green-200',
    'Suspicious': 'bg-orange-100 text-orange-700 border-orange-200',
    'Misinformation': 'bg-red-100 text-red-700 border-red-200'
  };

  const flags = Array.isArray(result.breakdown?.redFlags) ? result.breakdown.redFlags : [];
  const sources = Array.isArray(result.sources) ? result.sources : [];

  return (
    <div className="glass-dark rounded-[2.5rem] overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-700 text-white">
      <div className="p-10 md:p-14">
        <div className="flex flex-col md:flex-row gap-12 items-center md:items-start">
          <ScoreGauge score={result.truthScore} />
          
          <div className="flex-1 space-y-6">
            <div className="flex justify-between items-center">
              <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border ${verdictStyles[result.verdict] || 'bg-gray-100 text-gray-700'}`}>
                {result.verdict}
              </span>
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                Forensic Log #{result.id}
              </span>
            </div>
            
            <h2 className="text-4xl font-bold font-journal leading-tight">Forensic Intelligence Report</h2>
            <p className="text-gray-300 text-xl leading-relaxed font-light italic opacity-90">"{result.summary}"</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8">
              <div className="p-6 bg-white/5 rounded-3xl border border-white/10 hover:border-[#64FFDA]/30 transition-colors">
                <span className="text-[9px] uppercase text-[#64FFDA] font-black tracking-widest block mb-4">Institutional Credibility</span>
                <div className="flex items-center gap-4">
                   <div className="h-2 flex-1 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#64FFDA] to-[#10B981] transition-all duration-1000" style={{ width: `${result.breakdown?.sourceCredibility || 50}%` }} />
                   </div>
                   <span className="text-xs font-bold">{result.breakdown?.sourceCredibility || 50}%</span>
                </div>
              </div>
              <div className="p-6 bg-white/5 rounded-3xl border border-white/10 hover:border-[#64FFDA]/30 transition-colors">
                <span className="text-[9px] uppercase text-[#64FFDA] font-black tracking-widest block mb-4">Sentiment Analysis</span>
                <span className="text-xs font-medium text-gray-300 line-clamp-2">{result.breakdown?.sentimentAnalysis || 'Neutral'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-14 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-14">
          <div>
            <h4 className="text-[#64FFDA] font-black text-[10px] uppercase tracking-[0.25em] mb-8 flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Critical Risk Vectors
            </h4>
            <ul className="space-y-4">
              {flags.length > 0 ? flags.map((flag, i) => (
                <li key={i} className="text-sm text-gray-400 flex items-start gap-4 bg-white/[0.03] p-4 rounded-2xl border border-white/5">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500 shrink-0 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
                  {flag}
                </li>
              )) : (
                <li className="text-xs text-gray-500 italic p-6 border border-dashed border-white/10 rounded-2xl text-center">No significant forensic anomalies detected.</li>
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-[#64FFDA] font-black text-[10px] uppercase tracking-[0.25em] mb-8 flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Grounded Reference Nodes
            </h4>
            <div className="space-y-3">
              {sources.length > 0 ? sources.map((source, i) => (
                <a 
                  key={i} href={source.uri} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-white/[0.03] rounded-2xl border border-white/5 text-sm text-gray-400 hover:text-[#64FFDA] hover:bg-white/[0.08] transition-all group"
                >
                  <span className="text-[9px] font-black text-gray-600 group-hover:text-[#64FFDA]">0{i + 1}</span>
                  <span className="truncate flex-1">{source.title}</span>
                </a>
              )) : (
                <div className="p-8 rounded-2xl border border-dashed border-white/10 text-center">
                  <p className="text-xs text-gray-500 italic">Manual Verification Required: No automatic digital grounding links available.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
