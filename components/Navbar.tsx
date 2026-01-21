import React from 'react';
import { Ghost, LayoutDashboard, PlusCircle } from 'lucide-react';
import { AppView } from '../types';

interface NavbarProps {
  currentView: AppView;
  setView: (view: AppView) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView }) => {
  return (
    <nav className="border-b border-zinc-800 bg-black/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div 
          onClick={() => setView(AppView.LANDING)}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 group-hover:border-green-500/50 transition-colors">
            <Ghost className="w-5 h-5 text-green-500" />
          </div>
          <span className="font-bold text-lg tracking-tight">$GHOST</span>
        </div>

        <div className="flex items-center gap-6">
          <button 
            onClick={() => setView(AppView.DASHBOARD)}
            className={`flex items-center gap-2 text-sm font-medium transition-colors ${currentView === AppView.DASHBOARD ? 'text-green-400' : 'text-zinc-400 hover:text-white'}`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span className="hidden sm:inline">Index</span>
          </button>
          
          <button 
            onClick={() => setView(AppView.APPLY)}
            className={`flex items-center gap-2 text-sm font-medium transition-colors ${currentView === AppView.APPLY ? 'text-green-400' : 'text-zinc-400 hover:text-white'}`}
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Apply</span>
          </button>

          <button className="bg-zinc-100 hover:bg-zinc-200 text-black px-4 py-1.5 rounded-full text-sm font-bold transition-colors">
            Connect Wallet
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
