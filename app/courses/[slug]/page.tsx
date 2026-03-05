'use client';
import { useState } from 'react';
import { useAuth } from '@/src/store/AuthContext';
import { LearningProgressService } from '@/src/services/LearningProgressService';
import { CheckCircle2, PlayCircle, Trophy } from 'lucide-react';
import Link from 'next/link';

export default function CoursePlayer({ params }: { params: { slug: string } }) {
  const { wallet, isLinked } = useAuth();
  const [completed, setCompleted] = useState(false);

  const handleComplete = async () => {
    if (!wallet) return;
    await LearningProgressService.completeLesson(wallet.toBase58());
    setCompleted(true);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="flex-1 p-8 lg:p-16 border-r border-white/10">
        <Link href="/dashboard" className="text-neutral-500 font-mono text-sm hover:text-solana-green mb-8 inline-block">← Back</Link>
        <h1 className="text-4xl font-syne font-bold mb-8 capitalize">{params.slug.replace('-', ' ')}</h1>
        
        <div className="aspect-video bg-black rounded-2xl border border-white/10 flex items-center justify-center mb-8 shadow-2xl group cursor-pointer">
           <PlayCircle className="w-20 h-20 text-solana-green opacity-80 group-hover:scale-110 transition-transform" />
        </div>

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
          <div><h4 className="font-bold text-lg">Claim your XP</h4><p className="text-sm text-neutral-400">Finish the video to verify completion on-chain.</p></div>
          {completed ? (
            <div className="px-6 py-3 bg-solana-green/10 text-solana-green font-bold rounded-xl flex items-center gap-2"><CheckCircle2/> +100 XP Claimed!</div>
          ) : (
            <button onClick={handleComplete} disabled={!isLinked} className="px-6 py-3 bg-solana-green text-black font-bold rounded-xl disabled:bg-neutral-800 disabled:text-neutral-500 flex items-center gap-2">
              <Trophy className="w-5 h-5"/> {isLinked ? 'Complete Lesson' : 'Link Wallet First'}
            </button>
          )}
        </div>
      </div>
      <div className="w-full md:w-80 bg-white/5 p-8"><h3 className="font-syne font-bold text-xl mb-6">Curriculum</h3><p className="text-neutral-500 font-mono text-sm">1. Introduction to Solana</p></div>
    </div>
  );
}
