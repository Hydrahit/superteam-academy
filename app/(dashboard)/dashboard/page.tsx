'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Trophy, Flame } from 'lucide-react';

export default function WorldClassDashboard() {
  return (
    <div className="min-h-screen pt-24 px-8 max-w-7xl mx-auto">
      <header className="mb-12">
        <div className="text-[#FFE500] font-mono text-[10px] tracking-[0.2em] uppercase mb-2">// Status_Report</div>
        <h1 className="font-syne font-extrabold text-5xl tracking-tighter text-white">Console</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Exact Card Style from your file */}
        <div className="bg-[#0C0C10]/80 backdrop-blur-3xl border border-white/5 p-8 rounded-[20px] group hover:border-cyan-500/30 transition-all">
          <Zap className="text-[#00E5FF] mb-4 w-8 h-8" />
          <div className="text-4xl font-mono font-bold text-[#00E5FF] mb-1">2,450</div>
          <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Soulbound XP</div>
        </div>
        
        <div className="bg-[#0C0C10]/80 backdrop-blur-3xl border border-white/5 p-8 rounded-[20px] group hover:border-[#A78BFA]/30 transition-all">
          <Trophy className="text-[#A78BFA] mb-4 w-8 h-8" />
          <div className="text-4xl font-mono font-bold text-[#A78BFA] mb-1">Lv. 4</div>
          <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Architect Level</div>
        </div>

        <div className="bg-[#0C0C10]/80 backdrop-blur-3xl border border-white/5 p-8 rounded-[20px] group hover:border-[#FFE500]/30 transition-all">
          <Flame className="text-[#FFE500] mb-4 w-8 h-8" />
          <div className="text-4xl font-mono font-bold text-[#FFE500] mb-1">7 Days</div>
          <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Active Streak</div>
        </div>
      </div>
    </div>
  );
}