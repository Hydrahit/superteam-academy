'use client';
export const dynamic = 'force-dynamic';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/src/store/AuthContext';
import { progressService } from '@/src/services/LearningProgressService';
import Counter from '@/src/components/world-class/Counter';
import { Zap, Trophy, Flame } from 'lucide-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function DashboardPage() {
  const auth = useAuth();
  const { wallet, isLinked } = auth || { wallet: null, isLinked: false };
  const [stats, setStats] = useState({ xp: 0, level: 1, streak: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (mounted && wallet) {
      progressService.getXpBalance(wallet.toBase58()).then(xp => {
        setStats(prev => ({ ...prev, xp, level: Math.floor(Math.sqrt(xp / 100)) || 1 }));
      });
    }
  }, [mounted, wallet]);

  if (!mounted) return <div className="min-h-screen bg-black" />;

  return (
    <div className="min-h-screen pt-24 px-8 max-w-7xl mx-auto font-sans">
      <div className="flex justify-between items-center mb-12">
        <h1 className="font-syne font-extrabold text-5xl text-white tracking-tighter uppercase italic">Console</h1>
        <WalletMultiButton />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#0C0C10] border border-white/5 p-8 rounded-[20px]">
          <Zap className="text-[#00E5FF] mb-4 w-8 h-8" />
          <div className="text-4xl font-mono font-bold text-[#00E5FF]"><Counter to={stats.xp} /></div>
          <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest mt-2">Verified_XP</p>
        </div>
        <div className="bg-[#0C0C10] border border-white/5 p-8 rounded-[20px]">
          <Trophy className="text-[#A78BFA] mb-4 w-8 h-8" />
          <div className="text-4xl font-mono font-bold text-[#A78BFA]">Lv. {stats.level}</div>
          <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest mt-2">Architect_Level</p>
        </div>
        <div className="bg-[#0C0C10] border border-white/5 p-8 rounded-[20px]">
          <Flame className="text-[#FFE500] mb-4 w-8 h-8" />
          <div className="text-4xl font-mono font-bold text-[#FFE500]">7 Days</div>
          <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest mt-2">Streak_Status</p>
        </div>
      </div>
    </div>
  );
}