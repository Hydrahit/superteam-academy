'use client';
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/src/store/AuthContext';
import { progressService } from '@/src/services/LearningProgressService';
import Counter from '@/src/components/world-class/Counter';
import { Zap, Trophy, Flame } from 'lucide-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function Dashboard() {
  const { wallet, isLinked, login } = useAuth();
  const [stats, setStats] = useState({ xp: 0, level: 1, streak: 0 });

  useEffect(() => {
    if (wallet) {
      progressService.getXpBalance(wallet.toBase58()).then(xp => {
        setStats(prev => ({ ...prev, xp, level: Math.floor(Math.sqrt(xp / 100)) || 1 }));
      });
      progressService.getStreakData(wallet.toBase58()).then(d => {
        setStats(prev => ({ ...prev, streak: d.currentStreak }));
      });
    }
  }, [wallet]);

  return (
    <div className="min-h-screen pt-24 px-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-12">
        <h1 className="font-syne font-extrabold text-5xl text-white">Console</h1>
        <div className="flex gap-4">
           {!isLinked && <button onClick={login} className="px-4 py-2 bg-white text-black font-bold rounded-lg text-xs">Link Google</button>}
           <WalletMultiButton />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#0C0C10] border border-white/5 p-8 rounded-2xl">
          <Zap className="text-[#00E5FF] mb-4" />
          <div className="text-4xl font-mono font-bold text-[#00E5FF]"><Counter to={stats.xp} /></div>
          <p className="text-[10px] font-mono text-white/30 uppercase mt-2">Verified XP</p>
        </div>
        <div className="bg-[#0C0C10] border border-white/5 p-8 rounded-2xl">
          <Trophy className="text-[#A78BFA] mb-4" />
          <div className="text-4xl font-mono font-bold text-[#A78BFA]">Lv. {stats.level}</div>
          <p className="text-[10px] font-mono text-white/30 uppercase mt-2">Architect Level</p>
        </div>
        <div className="bg-[#0C0C10] border border-white/5 p-8 rounded-2xl">
          <Flame className="text-[#FFE500] mb-4" />
          <div className="text-4xl font-mono font-bold text-[#FFE500]">{stats.streak} Days</div>
          <p className="text-[10px] font-mono text-white/30 uppercase mt-2">Current Streak</p>
        </div>
      </div>
    </div>
  );
}