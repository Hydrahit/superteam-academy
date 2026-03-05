'use client';
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/src/store/AuthContext';
import { progressService } from '@/src/infrastructure/services/LearningProgressService';
import Counter from '@/src/components/world-class/Counter';
import { Zap, Trophy, Flame } from 'lucide-react';

export default function IntegratedDashboard() {
  const { wallet, isLinked } = useAuth();
  const [stats, setStats] = useState({ xp: 0, level: 1, streak: 0 });

  useEffect(() => {
    if (wallet) {
      // Brain Integration: Fetching real Token-2022 balance and derived levels
      progressService.getXpBalance(wallet.toBase58()).then(xp => {
        const level = Math.floor(Math.sqrt(xp / 100)) || 1;
        setStats(prev => ({ ...prev, xp, level }));
      });
      progressService.getStreakData(wallet.toBase58()).then(data => {
        setStats(prev => ({ ...prev, streak: data.currentStreak }));
      });
    }
  }, [wallet]);

  return (
    <div className="min-h-screen pt-24 px-8 max-w-7xl mx-auto font-sans">
      <header className="mb-12">
        <div className="text-[#FFE500] font-mono text-[10px] tracking-[0.2em] uppercase mb-2">// Brain_Linked_Status: Online</div>
        <h1 className="font-syne font-extrabold text-5xl tracking-tighter text-white">Console</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#0C0C10]/80 backdrop-blur-3xl border border-white/5 p-8 rounded-[20px]">
          <Zap className="text-[#00E5FF] mb-4 w-8 h-8" />
          <div className="text-4xl font-mono font-bold text-[#00E5FF] mb-1">
            <Counter to={stats.xp} />
          </div>
          <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Soulbound XP (Token-2022)</div>
        </div>
        
        <div className="bg-[#0C0C10]/80 backdrop-blur-3xl border border-white/5 p-8 rounded-[20px]">
          <Trophy className="text-[#A78BFA] mb-4 w-8 h-8" />
          <div className="text-4xl font-mono font-bold text-[#A78BFA] mb-1">Lv. {stats.level}</div>
          <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Derived Level (On-Chain)</div>
        </div>

        <div className="bg-[#0C0C10]/80 backdrop-blur-3xl border border-white/5 p-8 rounded-[20px]">
          <Flame className="text-[#FFE500] mb-4 w-8 h-8" />
          <div className="text-4xl font-mono font-bold text-[#FFE500] mb-1">{stats.streak} Days</div>
          <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Frontend-Managed Streak</div>
        </div>
      </div>
    </div>
  );
}