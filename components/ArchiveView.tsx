
import React from 'react';
import { TrendingFact } from '../types';
import { Button } from './CommonUI';

interface Props {
  facts: TrendingFact[];
  onBack: () => void;
  loading: boolean;
}

export const ArchiveView: React.FC<Props> = ({ facts, onBack, loading }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-6 duration-500 space-y-12 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-[#0A192F] transition-colors mb-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Scanner
          </button>
          <h1 className="text-5xl font-extrabold text-[#0A192F] tracking-tighter">Fact-Check <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0A192F] to-[#64FFDA]">Archive</span></h1>
          <p className="text-gray-500 mt-2 font-medium">Real-time global intelligence gathered from accredited verification institutions.</p>
        </div>
        <div className="px-6 py-3 bg-[#0A192F] text-[#64FFDA] rounded-2xl font-bold text-xs uppercase tracking-widest flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-[#64FFDA] animate-pulse"></div>
          Monitoring {facts.length} Global Claims
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-64 bg-white rounded-3xl animate-pulse border border-gray-100"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facts.map((fact) => (
            <div key={fact.id} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group flex flex-col">
              <div className="flex justify-between items-start mb-6">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                   fact.verdict === 'Fake' || fact.verdict === 'Debunked' ? 'bg-red-50 text-red-600' : 'bg-orange-50 text-orange-600'
                }`}>
                  {fact.verdict}
                </span>
                <span className="text-[10px] text-gray-400 font-bold">{fact.publishedAt}</span>
              </div>
              <h3 className="text-xl font-bold text-[#0A192F] mb-4 group-hover:text-[#64FFDA] transition-colors font-journal">{fact.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-8">"{fact.claim}"</p>
              
              <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-[10px] font-bold text-gray-400">
                    {fact.sourceName?.[0]}
                  </div>
                  <span className="text-xs font-bold text-gray-400">{fact.sourceName}</span>
                </div>
                {fact.sourceUrl && (
                  <a 
                    href={fact.sourceUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs font-black text-[#0A192F] hover:text-[#64FFDA] transition-colors underline decoration-2 underline-offset-4"
                  >
                    View Report
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {!loading && facts.length === 0 && (
        <div className="text-center py-40">
           <p className="text-gray-400 font-medium italic">Archive search failed. Our servers might be experiencing heavy load.</p>
           <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>Retry Handshake</Button>
        </div>
      )}
    </div>
  );
};
