import React, { useState } from 'react';
import { ArrowRight, Loader2, CheckCircle2, XCircle, FileText, Smartphone } from 'lucide-react';
import { evaluateCreator, generateContractTerms } from '../services/ghostService';
import { GhostEvaluation } from '../types';

const Apply: React.FC = () => {
  const [step, setStep] = useState<'FORM' | 'ANALYZING' | 'RESULT' | 'CONTRACT'>('FORM');
  const [formData, setFormData] = useState({
    handle: '',
    platform: 'X (Twitter)',
    pitch: ''
  });
  const [evaluation, setEvaluation] = useState<GhostEvaluation | null>(null);
  const [contractText, setContractText] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep('ANALYZING');
    
    // Simulate Oracle delay + API call
    setTimeout(async () => {
      const result = await evaluateCreator(formData.handle, formData.pitch, formData.platform);
      setEvaluation(result);
      if (result.decision === 'APPROVE') {
        const terms = await generateContractTerms(formData.handle, result.grantAmount || 10000);
        setContractText(terms);
      }
      setStep('RESULT');
    }, 2000);
  };

  const renderResult = () => {
    if (!evaluation) return null;

    const isApproved = evaluation.decision === 'APPROVE';

    return (
      <div className="max-w-xl mx-auto space-y-6 animate-in zoom-in-95 duration-500">
        <div className={`p-1 rounded-2xl bg-gradient-to-b ${isApproved ? 'from-green-500 to-green-900' : 'from-red-500 to-red-900'}`}>
          <div className="bg-zinc-950 rounded-xl p-8 text-center space-y-6">
            <div className="flex justify-center">
              {isApproved ? (
                <CheckCircle2 className="w-16 h-16 text-green-500" />
              ) : (
                <XCircle className="w-16 h-16 text-red-500" />
              )}
            </div>
            
            <div>
              <h2 className="text-3xl font-bold font-mono uppercase tracking-tighter">
                {isApproved ? 'Grant Approved' : 'Application Denied'}
              </h2>
              <div className="mt-2 inline-block px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-400">
                Oracle Score: <span className={isApproved ? 'text-green-400' : 'text-red-400'}>{evaluation.score}/100</span>
              </div>
            </div>

            <p className="text-zinc-400 leading-relaxed italic">
              "{evaluation.reasoning}"
            </p>

            {isApproved && (
              <div className="bg-zinc-900/50 p-6 rounded-lg border border-zinc-800">
                <div className="text-sm text-zinc-500 mb-1 font-mono uppercase">Grant Offer</div>
                <div className="text-4xl font-bold text-white tracking-tight">
                  ${evaluation.grantAmount?.toLocaleString()}
                </div>
              </div>
            )}

            <div className="pt-4">
              {isApproved ? (
                <button 
                  onClick={() => setStep('CONTRACT')}
                  className="w-full bg-green-600 hover:bg-green-500 text-black font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all"
                >
                  Review Contract <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button 
                  onClick={() => setStep('FORM')}
                  className="w-full border border-zinc-700 text-zinc-400 hover:bg-zinc-900 py-4 rounded-lg transition-all"
                >
                  Return to Base
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
        <FileText className="w-4 h-4" /> LEGAL WRAPPER GENERATED
      </div>
      
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-50"></div>
        
        <div className="p-8 font-mono text-sm text-zinc-400 space-y-6 leading-relaxed">
           <div className="flex justify-between border-b border-zinc-800 pb-4 mb-4">
              <span>PARTY A: $GHOST_DAO</span>
              <span>PARTY B: {formData.handle.toUpperCase()}</span>
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
             By signing, you irrevocably commit 10% of future on-chain revenue to the $GHOST Treasury.
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
        <div className="max-w-xl mx-auto bg-zinc-900/30 border border-zinc-800 p-8 rounded-2xl backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Apply for Grant</h2>
            <p className="text-zinc-400">Pitch your value to the Autonomous Patron. The Oracle will verify your potential.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-mono text-zinc-500 mb-2">IDENTIFIER (HANDLE)</label>
              <input
                type="text"
                required
                value={formData.handle}
                onChange={(e) => setFormData({...formData, handle: e.target.value})}
                className="w-full bg-black border border-zinc-800 rounded-lg p-4 text-white focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all"
                placeholder="@username"
              />
            </div>

            <div>
              <label className="block text-sm font-mono text-zinc-500 mb-2">PRIMARY PLATFORM</label>
              <select
                value={formData.platform}
                onChange={(e) => setFormData({...formData, platform: e.target.value})}
                className="w-full bg-black border border-zinc-800 rounded-lg p-4 text-white focus:border-green-500 outline-none appearance-none"
              >
                <option>X (Twitter)</option>
                <option>YouTube</option>
                <option>Farcaster</option>
                <option>GitHub</option>
                <option>Substack</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-mono text-zinc-500 mb-2">THE PITCH (Why you?)</label>
              <textarea
                required
                value={formData.pitch}
                onChange={(e) => setFormData({...formData, pitch: e.target.value})}
                className="w-full bg-black border border-zinc-800 rounded-lg p-4 text-white h-32 focus:border-green-500 outline-none resize-none"
                placeholder="I build high-frequency trading bots..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-white hover:bg-zinc-200 text-black font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all"
            >
              Submit to Oracle <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {step === 'ANALYZING' && (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-4 animate-pulse">
           <Loader2 className="w-12 h-12 text-green-500 animate-spin" />
           <div className="font-mono text-green-500">ORACLE IS VERIFYING SOCIAL GRAPH...</div>
           <div className="text-xs text-zinc-600">Checking Apify Integrity • Verifying Engagement • Analyzing Growth Vector</div>
        </div>
      )}

      {step === 'RESULT' && renderResult()}
      {step === 'CONTRACT' && renderContract()}
    </div>
  );
};

export default Apply;
