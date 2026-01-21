import React from 'react';
import { ArrowRight, Scan, Fingerprint, Radar } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <div className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-green-500/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 backdrop-blur-md mb-8">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-xs font-mono text-zinc-400">GHOST_SCANNER V2.1 ACTIVE</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500">
          We Hunt High-Alpha <br /> Humans.
        </h1>

        <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          The $GHOST AI scans the noise of the internet to find the 1% of creators before they go viral. We identify "High-Alpha" potential, fund it, and own the upside.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <button 
            onClick={onStart}
            className="px-8 py-4 bg-green-600 hover:bg-green-500 text-black font-bold rounded-lg flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)]"
          >
            <Scan className="w-5 h-5" /> Initiate Scan
          </button>
          <button className="px-8 py-4 border border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-500 rounded-lg transition-all backdrop-blur-sm bg-black/30">
            View Alpha Index
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {[
            { 
              icon: Radar, 
              title: "Deep Scanning", 
              desc: "Agents patrol YouTube, X, and Farcaster 24/7, analyzing millions of data points to find outlier signals." 
            },
            { 
              icon: Fingerprint, 
              title: "Virality Coefficient", 
              desc: "Our model detects high shareability, emotional resonance, and trend alchemy to predict 100x growth." 
            },
            { 
              icon: ArrowRight, 
              title: "Automatic Capital", 
              desc: "High-Alpha detection triggers an instant $50,000 grant. No pitch decks. Just raw potential." 
            }
          ].map((feature, i) => (
            <div key={i} className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/50 transition-colors group">
              <feature.icon className="w-8 h-8 text-zinc-500 mb-4 group-hover:text-green-500 transition-colors" />
              <h3 className="text-lg font-bold mb-2 text-zinc-200">{feature.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
