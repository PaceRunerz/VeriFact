
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0A192F] text-white pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#64FFDA] rounded-xl flex items-center justify-center">
                <span className="text-[#0A192F] font-bold text-xl">V</span>
              </div>
              <span className="font-bold text-2xl tracking-tight">VeriFact</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              The global standard for information integrity. Powered by advanced neural grounding and forensic analysis to protect the public from disinformation.
            </p>
            <div className="flex gap-4">
              {['Twitter', 'LinkedIn', 'GitHub'].map(social => (
                <a key={social} href="#" className="text-gray-500 hover:text-[#64FFDA] transition-colors text-xs font-bold uppercase tracking-widest">{social}</a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[#64FFDA] font-bold text-sm uppercase tracking-widest mb-6">Intelligence Stack</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="hover:text-white cursor-pointer transition-colors">Gemini Flash-Lite 1.5</li>
              <li className="hover:text-white cursor-pointer transition-colors">Google Search Grounding</li>
              <li className="hover:text-white cursor-pointer transition-colors">Multi-Modal Forensic Engine</li>
              <li className="hover:text-white cursor-pointer transition-colors">VeriFact IQ Protocol</li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#64FFDA] font-bold text-sm uppercase tracking-widest mb-6">Resources</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="hover:text-white cursor-pointer transition-colors">API Documentation</li>
              <li className="hover:text-white cursor-pointer transition-colors">Media Kit</li>
              <li className="hover:text-white cursor-pointer transition-colors">Disinformation Database</li>
              <li className="hover:text-white cursor-pointer transition-colors">Fact-Checker Training</li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#64FFDA] font-bold text-sm uppercase tracking-widest mb-6">Institutional</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="hover:text-white cursor-pointer transition-colors">Privacy Policy</li>
              <li className="hover:text-white cursor-pointer transition-colors">Terms of Service</li>
              <li className="hover:text-white cursor-pointer transition-colors">AI Ethics Statement</li>
              <li className="hover:text-white cursor-pointer transition-colors">Contact Intelligence</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-500 uppercase tracking-[0.2em]">
          <p>© {new Date().getFullYear()} VeriFact Global Intelligence Network</p>
          <div className="flex gap-8">
            <span>Status: All Systems Operational</span>
            <span>Latency: 242ms</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
