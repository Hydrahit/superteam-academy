'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/src/store/AuthContext';
import { progressService } from '@/src/services/LearningProgressService';
import { CheckCircle2, Trophy, Lock, PlayCircle } from 'lucide-react';
import Link from 'next/link';

export default function BountyIntegratedPlayer({ params }: { params: { slug: string } }) {
  const { wallet, isLinked } = useAuth();
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleComplete = async () => {
    if (!wallet || !isLinked) return;
    setLoading(true);
    
    // Bounty Requirement: Lesson progress tracked via bitmap & XP awarded via service
    try {
      const result = await progressService.completeLesson(wallet.toBase58(), params.slug, 0);
      if (result.success) {
        setCompleted(true);
        // Dispatch local event to update dashboard XP
        window.dispatchEvent(new Event('xp-updated'));
      }
    } catch (e) {
      console.error("Completion failed", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#060608] text-white flex flex-col md:flex-row font-sans">
      <div className="flex-1 p-8 lg:p-16 border-r border-white/5">
        <Link href="/dashboard" className="text-neutral-500 font-mono text-xs mb-8 inline-block hover:text-[#00E5FF]">← BACK_TO_CONSOLE</Link>
        <h1 className="text-4xl font-syne font-extrabold mb-8 capitalize">{params.slug.replace('-', ' ')}</h1>
        
        <div className="aspect-video bg-[#0C0C10] rounded-[24px] border border-white/5 flex items-center justify-center mb-10 shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-[#00E5FF]/5 group-hover:bg-[#00E5FF]/10 transition-colors" />
          <PlayCircle className="w-20 h-20 text-[#00E5FF] opacity-80 group-hover:scale-110 transition-transform" />
        </div>

        <div className="p-8 rounded-[24px] bg-white/5 border border-white/10 backdrop-blur-3xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="font-syne font-bold text-xl mb-1">Claim Soulbound XP</h4>
            <p className="text-sm text-neutral-400">Credentials will be issued as Metaplex Core NFTs upon course completion.</p>
          </div>
          
          {completed ? (
            <div className="px-8 py-4 bg-[#00FF94]/10 text-[#00FF94] font-bold rounded-xl border border-[#00FF94]/20 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" /> +100 XP VERIFIED
            </div>
          ) : (
            <button 
              onClick={handleComplete} 
              disabled={!isLinked || loading}
              className="px-10 py-4 bg-[#00E5FF] text-black font-syne font-extrabold rounded-xl disabled:bg-neutral-800 disabled:text-neutral-500 hover:scale-105 transition-all shadow-[0_0_30px_rgba(0,229,255,0.3)]"
            >
              {loading ? 'SYNCING_ON_CHAIN...' : isLinked ? 'COMPLETE & CLAIM XP' : 'LINK WALLET TO EARN'}
            </button>
          )}
        </div>
      </div>
      
      <div className="w-full md:w-80 bg-white/[0.02] p-8 border-l border-white/5">
        <h3 className="font-syne font-bold text-xl mb-6">Curriculum</h3>
        <div className="space-y-4">
           <div className="flex items-center gap-3 p-4 bg-[#00E5FF]/10 rounded-xl border border-[#00E5FF]/20 text-[#00E5FF]">
             <PlayCircle className="w-4 h-4" /> <span className="text-sm font-bold uppercase">01. Basics</span>
           </div>
           {[2,3,4].map(i => (
             <div key={i} className="flex items-center gap-3 p-4 text-neutral-600">
               <Lock className="w-4 h-4" /> <span className="text-sm font-bold uppercase">0{i}. Locked</span>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}