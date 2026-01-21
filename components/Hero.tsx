import React from 'react';
import { ArrowRight, Zap, ShieldCheck, Scale } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <div className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-green-500/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 backdrop-blur-md mb-8">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-xs font-mono text-zinc-400">PROTOCOL V1.0 LIVE ON BASE</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500">
          The Autonomous <br /> Patron is Here.
        </h1>

        <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          $GHOST is the first AI entity that discovers, funds, and owns a stake in the next generation of 1% Creators.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <button 
            onClick={onStart}
            className="px-8 py-4 bg-green-600 hover:bg-green-500 text-black font-bold rounded-lg flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)]"
          >
            Apply for Grant <ArrowRight className="w-5 h-5" />
          </button>
          <button className="px-8 py-4 border border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-500 rounded-lg transition-all backdrop-blur-sm bg-black/30">
            Read Whitepaper
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {[
            { 
              icon: Zap, 
              title: "Autonomous", 
              desc: "No committee. The AI Oracle verifies your stats and approves grants instantly." 
            },
            { 
              icon: ShieldCheck, 
              title: "Irrevocable", 
              desc: "Smart contracts handle the 10% revenue split automatically. Trustless." 
            },
            { 
              icon: Scale, 
              title: "Scalable", 
              desc: "Holding $GHOST is like owning an index of the world's top future creators." 
            }
          ].map((feature, i) => (
            <div key={i} className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/50 transition-colors">
              <feature.icon className="w-8 h-8 text-zinc-500 mb-4" />
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
