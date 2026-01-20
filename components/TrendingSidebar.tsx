
import React from 'react';
import { TrendingFact } from '../types';

interface Props {
  data: TrendingFact[];
  onViewArchive: () => void;
  loading?: boolean;
}

export const TrendingSidebar: React.FC<Props> = ({ data, onViewArchive, loading }) => {
  const isFallback = data.some(item => item.id.startsWith('m'));

  return (
    <div className="glass p-6 rounded-2xl sticky top-24 shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-[#0A192F] font-bold text-lg flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isFallback ? 'bg-orange-400' : 'bg-[#64FFDA]'}`}></span>
            <span className={`relative inline-flex rounded-full h-2 w-2 ${isFallback ? 'bg-orange-400' : 'bg-[#64FFDA]'}`}></span>
          </span>
          {isFallback ? 'Archive Feed' : 'Live News Feed'}
        </h3>
        {loading && <div className="h-4 w-4 border-2 border-[#64FFDA] border-t-transparent rounded-full animate-spin"></div>}
      </div>

      <div className="space-y-4">
        {data.length === 0 && !loading && (
          <div className="py-8 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200 text-gray-400 text-xs">
            Establishing News Node...
          </div>
        )}

        {data.slice(0, 4).map((item) => (
          <div key={item.id} className="p-3 bg-white/50 rounded-xl border border-transparent hover:border-gray-200 transition-all group cursor-pointer">
            <div className="flex justify-between items-start mb-1">
              <span className={`text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter ${
                item.verdict === 'Fake' || item.verdict === 'Debunked' ? 'bg-red-50 text-red-600' : 'bg-orange-50 text-orange-600'
              }`}>
                {item.verdict}
              </span>
              <span className="text-[9px] text-gray-400 font-bold">{item.sourceName || 'VeriFact'}</span>
            </div>
            <h4 className="text-sm font-bold text-[#0A192F] mb-1 line-clamp-1 group-hover:text-[#64FFDA] transition-colors">{item.title}</h4>
            <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed italic">"{item.claim}"</p>
          </div>
        ))}
        
        {isFallback && !loading && (
          <p className="text-[8px] text-orange-400 uppercase font-black text-center tracking-widest pt-2">
            Server cooling down • Displaying Institutional Archive
          </p>
        )}
      </div>

      <button 
        onClick={onViewArchive}
        className="w-full mt-6 py-3 rounded-xl border-2 border-[#0A192F]/5 text-[10px] text-[#0A192F] font-black hover:bg-[#0A192F] hover:text-white transition-all uppercase tracking-widest"
      >
        Explore Database
      </button>
    </div>
  );
};
