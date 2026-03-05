'use client';

import { motion } from 'framer-motion';
import { Users, Zap } from 'lucide-react';

export const BentoStats = () => {
  return (
    <div className="px-12 py-16 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex items-center justify-between backdrop-blur-md">
        <div>
          <p className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-widest mb-2">Global_Network</p>
          <h3 className="text-5xl font-syne font-black text-white italic">12,450+</h3>
          <p className="text-sm text-neutral-400 mt-2">Active builders this week</p>
        </div>
        <div className="w-16 h-16 rounded-full bg-[#9945FF]/20 flex items-center justify-center">
          <Users size={32} className="text-[#9945FF]" />
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex items-center justify-between backdrop-blur-md">
        <div>
          <p className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-widest mb-2">Ecosystem_Rewards</p>
          <h3 className="text-5xl font-syne font-black text-[#14F195] italic">2.4M XP</h3>
          <p className="text-sm text-neutral-400 mt-2">Distributed to verified builders</p>
        </div>
        <div className="w-16 h-16 rounded-full bg-[#14F195]/20 flex items-center justify-center">
          <Zap size={32} className="text-[#14F195]" />
        </div>
      </div>
    </div>
  );
};
