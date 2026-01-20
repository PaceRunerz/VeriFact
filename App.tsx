
import React, { useState, useEffect, useCallback } from 'react';
import { AnalysisResult, User, TrendingFact } from './types';
import { DetectionEngine } from './components/DetectionEngine';
import { AnalysisResultCard } from './components/AnalysisResult';
import { TrendingSidebar } from './components/TrendingSidebar';
import { HistoryDashboard } from './components/History';
import { Button } from './components/CommonUI';
import { Footer } from './components/Footer';
import { ArchiveView } from './components/ArchiveView';
import { fetchTrendingFacts } from './geminiService';
import { MOCK_TRENDING } from './constants';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [currentResult, setCurrentResult] = useState<AnalysisResult | null>(null);
  const [history, setHistory] = useState<AnalysisResult[]>([]);
  const [view, setView] = useState<'home' | 'history' | 'archive'>('home');
  const [trendingFacts, setTrendingFacts] = useState<TrendingFact[]>(MOCK_TRENDING);
  const [loadingFacts, setLoadingFacts] = useState(false);

  const loadTrending = useCallback(async () => {
    setLoadingFacts(true);
    try {
      const facts = await fetchTrendingFacts();
      if (facts && facts.length > 0) setTrendingFacts(facts);
    } catch (e) {
      console.warn("Trending stream offline.");
    } finally {
      setLoadingFacts(false);
    }
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('verifact_ledger');
    if (saved) {
      try { setHistory(JSON.parse(saved)); } catch (e) { }
    }
    const savedUser = localStorage.getItem('verifact_user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  useEffect(() => {
    if (user) loadTrending();
  }, [user, loadTrending]);

  useEffect(() => {
    localStorage.setItem('verifact_ledger', JSON.stringify(history));
  }, [history]);

  const handleLogin = () => {
    const mockUser: User = {
      id: 'SENTINEL-' + Math.floor(Math.random() * 1000),
      name: 'Agent Alpha',
      email: 'authorized@verifact.int',
      photoURL: `https://api.dicebear.com/7.x/identicon/svg?seed=VeriFact-${Date.now()}`,
      iqScore: 115
    };
    setUser(mockUser);
    localStorage.setItem('verifact_user', JSON.stringify(mockUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('verifact_user');
  };

  const handleResult = (res: AnalysisResult) => {
    setCurrentResult(res);
    setHistory(prev => [res, ...prev]);
    if (user) {
      const updatedUser = { ...user, iqScore: user.iqScore + 4 };
      setUser(updatedUser);
      localStorage.setItem('verifact_user', JSON.stringify(updatedUser));
    }
    setTimeout(() => {
      document.getElementById('report-anchor')?.scrollIntoView({ behavior: 'smooth' });
    }, 400);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0A192F] flex items-center justify-center p-6 selection:bg-[#64FFDA]">
        <div className="glass-dark p-12 rounded-[3rem] max-w-md w-full text-center space-y-10 animate-in fade-in zoom-in-95 duration-700">
           <div className="w-24 h-24 bg-[#64FFDA] rounded-[2rem] mx-auto flex items-center justify-center shadow-2xl shadow-[#64FFDA]/30">
              <span className="text-[#0A192F] font-bold text-5xl">V</span>
           </div>
           <div className="space-y-3">
             <h1 className="text-3xl font-bold text-white tracking-tight">Access Node</h1>
             <p className="text-gray-400 text-sm leading-relaxed px-4">Standard of Truth Intelligence Grid. Authenticate to proceed.</p>
           </div>
           <Button variant="secondary" className="w-full py-5 rounded-[1.5rem] flex gap-4 text-xs font-black uppercase tracking-[0.2em]" onClick={handleLogin}>
              Secure Auth
           </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-[#64FFDA]">
      <nav className="sticky top-0 z-50 glass border-b border-gray-100 px-8 py-5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setView('home'); setCurrentResult(null); }}>
            <div className="w-10 h-10 bg-[#0A192F] rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-[#64FFDA] font-bold text-xl">V</span>
            </div>
            <span className="font-bold text-[#0A192F] text-2xl tracking-tighter">VeriFact</span>
          </div>
          
          <div className="flex items-center gap-10">
            <button onClick={() => setView('home')} className={`text-[10px] font-black uppercase tracking-widest ${view === 'home' ? 'text-[#0A192F]' : 'text-gray-400'}`}>Scanner</button>
            <button onClick={() => setView('history')} className={`text-[10px] font-black uppercase tracking-widest ${view === 'history' ? 'text-[#0A192F]' : 'text-gray-400'}`}>Ledger</button>
            <div className="flex items-center gap-5 pl-8 border-l border-gray-100">
               <img src={user.photoURL} alt="User" className="w-9 h-9 rounded-full border border-gray-100" />
               <button onClick={handleLogout} className="text-[10px] text-gray-400 hover:text-red-500 font-black uppercase">Exit</button>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 bg-[#f8fafc] py-16 px-8">
        <div className="max-w-7xl mx-auto">
          {view === 'archive' ? (
            <ArchiveView facts={trendingFacts} loading={loadingFacts} onBack={() => setView('home')} />
          ) : view === 'history' ? (
            <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
              <HistoryDashboard history={history} />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              <div className="lg:col-span-8 space-y-16">
                <header className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-1000">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#64FFDA]/10 border border-[#64FFDA]/20 text-[#0A192F] text-[9px] font-black uppercase tracking-[0.25em]">
                    Active Investigation Protocol
                  </div>
                  <h1 className="text-6xl md:text-7xl font-extrabold text-[#0A192F] tracking-tighter leading-[0.9]">
                    Verify <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0A192F] to-[#64FFDA]">Reality</span>
                  </h1>
                </header>

                <div className="relative">
                  {analyzing && (
                    <div className="absolute inset-0 z-20 glass rounded-[2.5rem] flex flex-col items-center justify-center animate-in fade-in duration-300">
                      <div className="relative w-40 h-40 mb-10">
                         <div className="absolute inset-0 border-2 border-[#64FFDA]/10 rounded-full animate-spin" />
                         <div className="scanning-line" />
                         <div className="absolute inset-0 flex items-center justify-center">
                            <svg className="h-14 w-14 text-[#0A192F] animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9" />
                            </svg>
                         </div>
                      </div>
                      <h3 className="text-[#0A192F] font-black text-2xl uppercase tracking-widest font-journal">Scanning Global Nodes...</h3>
                      <p className="text-[10px] text-gray-500 font-bold uppercase mt-2 tracking-widest animate-pulse">Establishing Connection with Grounding Bureau</p>
                    </div>
                  )}
                  <DetectionEngine onAnalyzing={setAnalyzing} onResults={handleResult} />
                </div>

                {currentResult && (
                  <div id="report-anchor" className="pt-6 animate-in fade-in slide-in-from-bottom-10 duration-700">
                    <AnalysisResultCard result={currentResult} />
                  </div>
                )}
              </div>

              <div className="lg:col-span-4">
                <TrendingSidebar data={trendingFacts} loading={loadingFacts} onViewArchive={() => setView('archive')} />
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;
