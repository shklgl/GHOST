import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Apply from './components/Apply';
import Dashboard from './components/Dashboard';
import { AppView } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.LANDING);

  return (
    <div className="min-h-screen bg-black text-zinc-100 selection:bg-green-500/30 grid-bg">
      <Navbar currentView={currentView} setView={setCurrentView} />
      
      <main className="max-w-7xl mx-auto px-6 pb-20 pt-10">
        {currentView === AppView.LANDING && (
          <Hero onStart={() => setCurrentView(AppView.APPLY)} />
        )}
        
        {currentView === AppView.APPLY && (
          <div className="max-w-4xl mx-auto">
             <Apply />
          </div>
        )}
        
        {currentView === AppView.DASHBOARD && (
          <Dashboard />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-10 text-center">
        <div className="text-zinc-600 text-sm font-mono">
          $GHOST PROTOCOL © 2025 • AUTONOMOUS PATRON SYSTEM
        </div>
      </footer>
    </div>
  );
};

export default App;
