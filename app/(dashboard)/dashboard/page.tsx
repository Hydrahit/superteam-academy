'use client';
import { motion } from 'framer-motion';
import { Flame, Trophy, PlayCircle, Zap } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold font-syne mb-8">Welcome Back, Builder</h1>
        
        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#14F195]/10 flex items-center justify-center">
              <Zap className="w-6 h-6 text-[#14F195]" />
            </div>
            <div>
              <p className="text-sm text-neutral-400">Total XP</p>
              <p className="text-2xl font-bold font-mono">2,450</p>
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#9945FF]/10 flex items-center justify-center">
              <Trophy className="w-6 h-6 text-[#9945FF]" />
            </div>
            <div>
              <p className="text-sm text-neutral-400">Current Level</p>
              <p className="text-2xl font-bold font-mono">Lv. 4</p>
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#FFE500]/10 flex items-center justify-center">
              <Flame className="w-6 h-6 text-[#FFE500]" />
            </div>
            <div>
              <p className="text-sm text-neutral-400">Active Streak</p>
              <p className="text-2xl font-bold font-mono">7 Days</p>
            </div>
          </div>
        </div>

        {/* Continue Learning */}
        <h2 className="text-2xl font-bold font-syne mb-6">Continue Learning</h2>
        <div className="p-8 rounded-3xl bg-gradient-to-r from-white/5 to-[#14F195]/5 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-mono text-[#14F195] uppercase tracking-widest mb-2 block">Module 2</span>
            <h3 className="text-2xl font-bold mb-2">Cross-Program Invocations (CPI)</h3>
            <p className="text-neutral-400">Learn how to make Solana programs talk to each other securely.</p>
          </div>
          <button className="px-8 py-4 rounded-xl bg-[#14F195] text-black font-bold flex items-center gap-2 hover:bg-[#10c97b] transition-all whitespace-nowrap">
            Resume Lesson <PlayCircle className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
