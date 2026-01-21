import React, { useState } from 'react';
import { ArrowRight, Loader2, CheckCircle2, XCircle, FileText, Smartphone, ScanLine, Radio, Crosshair } from 'lucide-react';
import { evaluateCreator, generateContractTerms } from '../services/ghostService';
import { GhostEvaluation } from '../types';

const Apply: React.FC = () => {
  const [step, setStep] = useState<'FORM' | 'SCANNING' | 'RESULT' | 'CONTRACT'>('FORM');
  const [formData, setFormData] = useState({
    handle: '',
    platform: 'YouTube',
    pitch: ''
  });
  const [evaluation, setEvaluation] = useState<GhostEvaluation | null>(null);
  const [contractText, setContractText] = useState('');
  const [scanStatus, setScanStatus] = useState('Initializing...');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep('SCANNING');
    
    const statuses = [
      "Accessing Social Graph API...",
      "Analyzing Emotional Resonance (Joy/Awe)...",
      "Measuring Practical Value & Narrative...",
      "Calculating Novelty & Trend Vectors...",
      "Finalizing Virality Coefficient..."
    ];

    // Simulate scanning progress
    for (let i = 0; i < statuses.length; i++) {
      setScanStatus(statuses[i]);
      await new Promise(r => setTimeout(r, 800));
    }
    
    const result = await evaluateCreator(formData.handle, formData.pitch, formData.platform);
    setEvaluation(result);
    if (result.decision === 'APPROVE') {
      const terms = await generateContractTerms(formData.handle, result.grantAmount || 50000);
      setContractText(terms);
    }
    setStep('RESULT');
  };

  const renderResult = () => {
    if (!evaluation) return null;

    const isHighAlpha = evaluation.isHighAlpha;

    return (
      <div className="max-w-xl mx-auto space-y-6 animate-in zoom-in-95 duration-500">
        <div className={`p-1 rounded-2xl bg-gradient-to-b ${isHighAlpha ? 'from-green-500 to-green-900' : 'from-zinc-500 to-zinc-900'}`}>
          <div className="bg-zinc-950 rounded-xl p-8 text-center space-y-6 relative overflow-hidden">
            {/* Background scanner grid */}
            <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none"></div>

            <div className="relative flex justify-center">
              {isHighAlpha ? (
                <div className="relative">
                   <div className="absolute inset-0 bg-green-500 blur-xl opacity-20 animate-pulse"></div>
                   <CheckCircle2 className="w-20 h-20 text-green-500 relative z-10" />
                </div>
              ) : (
                <XCircle className="w-20 h-20 text-zinc-600" />
              )}
            </div>
            
            <div className="relative z-10">
              <h2 className="text-3xl font-bold font-mono uppercase tracking-tighter text-white">
                {isHighAlpha ? 'High-Alpha Detected' : 'Standard Pattern'}
              </h2>
              <div className="mt-4 flex justify-center items-center gap-4">
                 <div className="flex flex-col items-center">
                    <span className="text-xs font-mono text-zinc-500 uppercase">Virality Coeff</span>
                    <span className={`text-2xl font-bold font-mono ${isHighAlpha ? 'text-green-400' : 'text-zinc-500'}`}>
                      {evaluation.viralityCoefficient}
                    </span>
                 </div>
                 <div className="w-px h-8 bg-zinc-800"></div>
                 <div className="flex flex-col items-center">
                    <span className="text-xs font-mono text-zinc-500 uppercase">Action</span>
                    <span className="text-2xl font-bold font-mono text-white">
                      {isHighAlpha ? 'FUND' : 'ARCHIVE'}
                    </span>
                 </div>
              </div>
            </div>

            <p className="text-zinc-400 leading-relaxed font-mono text-sm border-t border-b border-zinc-900 py-4 relative z-10">
              <span className="text-green-500/50 mr-2">>></span>
              {evaluation.reasoning}
            </p>

            {isHighAlpha && (
              <div className="bg-zinc-900/50 p-6 rounded-lg border border-zinc-800 relative z-10">
                <div className="text-sm text-zinc-500 mb-1 font-mono uppercase">Grant Offer (Seed Capital)</div>
                <div className="text-4xl font-bold text-white tracking-tight">
                  ${evaluation.grantAmount?.toLocaleString()}
                </div>
              </div>
            )}

            <div className="pt-4 relative z-10">
              {isHighAlpha ? (
                <button 
                  onClick={() => setStep('CONTRACT')}
                  className="w-full bg-green-600 hover:bg-green-500 text-black font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all"
                >
                  Initiate Acquisition Protocol <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button 
                  onClick={() => setStep('FORM')}
                  className="w-full border border-zinc-700 text-zinc-400 hover:bg-zinc-900 py-4 rounded-lg transition-all font-mono"
                >
                  [RESET_SCANNER]
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderContract = () => (
    <div className="max-w-2xl mx-auto animate-in slide-in-from-bottom-10 duration-500">
       <div className="mb-6 flex items-center gap-2 text-green-500 font-mono text-sm">
        <FileText className="w-4 h-4" /> LEGAL WRAPPER: HIGH-ALPHA ASSET
      </div>
      
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-50"></div>
        
        <div className="p-8 font-mono text-sm text-zinc-400 space-y-6 leading-relaxed">
           <div className="flex justify-between border-b border-zinc-800 pb-4 mb-4">
              <span>PARTY A: $GHOST_DAO</span>
              <span>PARTY B: {formData.handle.toUpperCase()} (ASSET)</span>
           </div>
           
           <p className="whitespace-pre-wrap text-zinc-300">
             {contractText}
           </p>

           <div className="bg-black/40 p-4 rounded border border-zinc-800/50 mt-6">
             <h4 className="text-zinc-500 mb-2 text-xs uppercase">Technical Execution</h4>
             <div className="flex items-center gap-3 text-xs text-green-400/80">
               <Smartphone className="w-4 h-4" />
               <span>Revenue Splitter Contract: 0x71C...9A2 (Base Sepolia)</span>
             </div>
           </div>
        </div>

        <div className="bg-zinc-950 p-6 border-t border-zinc-800 flex flex-col md:flex-row gap-4 items-center justify-between">
           <div className="text-xs text-zinc-500">
             Subject commits 10% lifetime revenue to Protocol.
           </div>
           <button 
            onClick={() => alert("Welcome to the $GHOST Index. Grant disbursed.")}
            className="whitespace-nowrap bg-green-600 hover:bg-green-500 text-black font-bold px-8 py-3 rounded-lg shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all"
           >
             Sign & Execute
           </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full">
      {step === 'FORM' && (
        <div className="max-w-xl mx-auto bg-zinc-900/30 border border-zinc-800 p-8 rounded-2xl backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-20">
             <Crosshair className="w-24 h-24 text-green-500" />
          </div>
          
          <div className="mb-8 relative z-10">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <ScanLine className="w-6 h-6 text-green-500" />
              Identify Target
            </h2>
            <p className="text-zinc-400">Enter creator coordinates. Our agents will scan for High-Alpha potential.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div>
              <label className="block text-sm font-mono text-zinc-500 mb-2">TARGET HANDLE / URL</label>
              <input
                type="text"
                required
                value={formData.handle}
                onChange={(e) => setFormData({...formData, handle: e.target.value})}
                className="w-full bg-black border border-zinc-800 rounded-lg p-4 text-white focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all font-mono"
                placeholder="youtube.com/@user"
              />
            </div>

            <div>
              <label className="block text-sm font-mono text-zinc-500 mb-2">SECTOR</label>
              <div className="grid grid-cols-2 gap-2">
                {['YouTube', 'X (Twitter)', 'Farcaster', 'Substack'].map((p) => (
                   <button 
                     type="button"
                     key={p}
                     onClick={() => setFormData({...formData, platform: p})}
                     className={`p-3 rounded-lg border text-sm font-mono transition-all text-left ${formData.platform === p ? 'border-green-500 bg-green-500/10 text-white' : 'border-zinc-800 bg-black text-zinc-500 hover:border-zinc-600'}`}
                   >
                     {p}
                   </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-mono text-zinc-500 mb-2">SIGNAL INPUT (MANIFESTO / CONTEXT)</label>
              <textarea
                required
                value={formData.pitch}
                onChange={(e) => setFormData({...formData, pitch: e.target.value})}
                className="w-full bg-black border border-zinc-800 rounded-lg p-4 text-white h-32 focus:border-green-500 outline-none resize-none font-mono text-sm"
                placeholder="Paste latest transcript or manifesto..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-white hover:bg-zinc-200 text-black font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all group"
            >
              <Radio className="w-5 h-5 group-hover:animate-pulse" /> Initialize Scan
            </button>
          </form>
        </div>
      )}

      {step === 'SCANNING' && (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-6 animate-in fade-in duration-500">
           <div className="relative">
             <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full animate-pulse"></div>
             <Loader2 className="w-16 h-16 text-green-500 animate-spin relative z-10" />
           </div>
           
           <div className="space-y-2">
             <div className="font-mono text-xl text-white tracking-widest">{scanStatus}</div>
             <div className="h-1 w-64 bg-zinc-800 rounded-full mx-auto overflow-hidden">
                <div className="h-full bg-green-500 animate-[loading_2s_ease-in-out_infinite]"></div>
             </div>
           </div>
           
           <div className="grid grid-cols-2 gap-8 text-xs font-mono text-zinc-600 mt-8">
              <div>
                <div className="mb-1">TARGET</div>
                <div className="text-zinc-400">{formData.handle}</div>
              </div>
              <div>
                <div className="mb-1">PROTOCOL</div>
                <div className="text-zinc-400">ALPHA_SEEK_V2</div>
              </div>
           </div>
        </div>
      )}

      {step === 'RESULT' && renderResult()}
      {step === 'CONTRACT' && renderContract()}
    </div>
  );
};

export default Apply;
