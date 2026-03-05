'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/src/store/AuthContext';
import { LearningProgressService } from '@/src/services/LearningProgressService';
import { Trophy, Flame, PlayCircle, Wallet } from 'lucide-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function Dashboard() {
  const { user, wallet, isLinked, login } = useAuth();
  const [stats, setStats] = useState({ xp: 0, level: 1, streak: 0 });

  useEffect(() => {
    if (wallet) LearningProgressService.getProgress(wallet.toBase58()).then(setStats);
  }, [wallet]);

  return (
    <div className="min-h-screen p-6 md:p-12 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-syne font-bold">Dashboard</h1>
        <WalletMultiButton className="!bg-solana-green !text-black !rounded-xl !font-bold" />
      </div>

      {!isLinked ? (
        <div className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center">
          <Wallet className="w-12 h-12 mx-auto mb-4 text-solana-purple" />
          <h2 className="text-2xl font-bold mb-2">Connect to Begin</h2>
          <p className="text-neutral-400 mb-6">You need to link your Google account and Solana Wallet to earn Soulbound XP.</p>
          <button onClick={login} className="px-6 py-3 bg-white text-black font-bold rounded-lg">Sign in with Google</button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10"><p className="text-neutral-400 text-sm">Total XP</p><p className="text-3xl font-mono text-solana-green">{stats.xp}</p></div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10"><p className="text-neutral-400 text-sm">Level</p><p className="text-3xl font-mono text-aura-cyan">Lv. {stats.level}</p></div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10"><p className="text-neutral-400 text-sm">Streak</p><p className="text-3xl font-mono text-aura-yellow">{stats.streak} Days</p></div>
          </div>
          <div className="p-8 rounded-2xl bg-gradient-to-r from-white/5 to-solana-green/5 border border-white/10 flex justify-between items-center">
            <div>
              <p className="text-solana-green font-mono text-xs uppercase mb-2">Module 1</p>
              <h3 className="text-2xl font-bold">Solana Foundations</h3>
            </div>
            <Link href="/courses/solana-foundations" className="px-6 py-3 bg-solana-green text-black font-bold rounded-xl flex items-center gap-2">Resume <PlayCircle className="w-5 h-5"/></Link>
          </div>
        </>
      )}
    </div>
  );
}
