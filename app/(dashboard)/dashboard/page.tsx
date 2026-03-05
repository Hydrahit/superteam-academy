'use client';
import { useAuth } from '@/src/store/AuthContext';
import { Zap, Trophy, Flame } from 'lucide-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function Dashboard() {
  const { isLinked } = useAuth();
  return (
    <div className="min-h-screen p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-bold font-syne text-white">Dashboard</h1>
        <WalletMultiButton />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <Zap className="text-solana-green mb-2" />
          <p className="text-neutral-400 text-sm">XP Progress</p>
          <p className="text-2xl font-bold font-mono">2,450</p>
        </div>
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <Trophy className="text-aura-cyan mb-2" />
          <p className="text-neutral-400 text-sm">Level</p>
          <p className="text-2xl font-bold font-mono">Lv. 4</p>
        </div>
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <Flame className="text-aura-yellow mb-2" />
          <p className="text-neutral-400 text-sm">Streak</p>
          <p className="text-2xl font-bold font-mono">7 Days</p>
        </div>
      </div>
    </div>
  );
}
