'use client';
import { motion } from 'framer-motion';
import { Zap, Flame, Trophy, LayoutGrid, Terminal } from 'lucide-react';
import { StatCard } from '@/src/components/dashboard/StatCard';
import { SkillRadar } from '@/src/components/dashboard/SkillRadar';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-12 px-12">
      <header className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-5xl font-syne font-black text-white uppercase tracking-tighter italic">
            Command_<span className="text-[#14F195]">Center</span>
          </h1>
          <p className="text-neutral-500 font-mono text-xs uppercase mt-2 tracking-widest">Welcome back, Architect_01</p>
        </div>
        <div className="flex gap-4">
           <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl flex items-center gap-3">
              <Zap size={18} className="text-[#14F195] fill-current" />
              <span className="text-xl font-black text-white">2,450 <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono">XP</span></span>
           </div>
        </div>
      </header>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-auto md:h-[600px]">
        {/* Main Skill Radar - 2 cols, 2 rows */}
        <div className="md:col-span-2 md:row-span-2 bg-white/5 border border-white/10 rounded-[40px] overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-[#14F195]/5 to-transparent" />
          <SkillRadar />
        </div>

        {/* Streak Card */}
        <StatCard 
          title="Daily_Streak" 
          value="12 Days" 
          icon={Flame} 
          description="You're on fire! 2 more days to reach 1.5x multiplier."
          accentColor="#FFE500"
        />

        {/* Rank Card */}
        <StatCard 
          title="Global_Rank" 
          value="#42" 
          icon={Trophy} 
          description="Top 5% of all Solana builders worldwide."
          accentColor="#9945FF"
        />

        {/* Build Stats */}
        <div className="md:col-span-2 bg-white/5 border border-white/10 rounded-[32px] p-8 flex items-center justify-between group">
           <div>
              <p className="text-[10px] font-mono font-bold text-white/30 uppercase mb-2">Verified_Builds</p>
              <div className="flex gap-2">
                 {[1,2,3,4,5].map(i => (
                    <div key={i} className="w-8 h-8 rounded-lg bg-[#14F195]/20 border border-[#14F195]/30 flex items-center justify-center">
                       <Terminal size={14} className="text-[#14F195]" />
                    </div>
                 ))}
              </div>
           </div>
           <button className="px-6 py-3 bg-white text-black font-bold rounded-xl text-xs uppercase hover:bg-[#14F195] transition-all">
              Submit_New_PR
           </button>
        </div>
      </div>
    </div>
  );
}
