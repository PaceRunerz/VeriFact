
import React from 'react';
import { AnalysisResult } from '../types';

export const HistoryDashboard: React.FC<{ history: AnalysisResult[] }> = ({ history }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#0A192F]">Personal Integrity Ledger</h2>
        <span className="text-sm text-gray-500">{history.length} scans total</span>
      </div>
      
      {history.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100">
           <p className="text-gray-400">No verification history yet.</p>
           <p className="text-xs text-gray-300">Your future scans will be encrypted and saved here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {history.map((item) => (
            <div key={item.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition-all">
              <div className="flex items-center gap-4">
                <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${
                  item.verdict === 'Verified' ? 'bg-green-50 text-green-600' :
                  item.verdict === 'Misinformation' ? 'bg-red-50 text-red-600' : 'bg-orange-50 text-orange-600'
                }`}>
                  <span className="font-bold">{item.truthScore}</span>
                </div>
                <div>
                  <h4 className="font-semibold text-[#0A192F] line-clamp-1">{item.input}</h4>
                  <p className="text-xs text-gray-400">{new Date(item.timestamp).toLocaleDateString()} • {item.type}</p>
                </div>
              </div>
              <button className="p-2 text-gray-300 group-hover:text-[#64FFDA] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
