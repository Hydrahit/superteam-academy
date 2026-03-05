'use client';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { Flame, Trophy, Zap } from 'lucide-react';

const data = [
  { subject: 'Rust', A: 120, fullMark: 150 },
  { subject: 'Frontend', A: 98, fullMark: 150 },
  { subject: 'DeFi', A: 86, fullMark: 150 },
  { subject: 'Security', A: 99, fullMark: 150 },
  { subject: 'Anchor', A: 85, fullMark: 150 },
];

export default function BentoDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[600px] p-8">
      {/* XP Circle */}
      <div className="md:col-span-2 bg-white/5 border border-white/10 rounded-[40px] p-8 flex flex-col justify-center items-center relative overflow-hidden group">
        <div className="absolute inset-0 bg-cyan-500/5 group-hover:bg-cyan-500/10 transition-colors" />
        <div className="w-48 h-48 rounded-full border-[12px] border-cyan-500/20 flex flex-col items-center justify-center relative">
           <div className="absolute inset-0 rounded-full border-t-[12px] border-cyan-500 animate-[spin_3s_linear_infinite]" />
           <span className="text-5xl font-black italic">8.4k</span>
           <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-500">Total_XP</span>
        </div>
      </div>

      {/* Skill Radar */}
      <div className="bg-white/5 border border-white/10 rounded-[40px] p-4">
        <h3 className="text-[10px] font-mono text-center mb-2 uppercase tracking-tighter">Skill_Matrix</h3>
        <ResponsiveContainer width="100%" height="90%">
          <RadarChart data={data}>
            <PolarGrid stroke="#333" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#666', fontSize: 10 }} />
            <Radar dataKey="A" stroke="#00E5FF" fill="#00E5FF" fillOpacity={0.6} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Streak */}
      <div className="bg-[#FFE500]/10 border border-[#FFE500]/20 rounded-[40px] p-8 flex flex-col items-center justify-center">
        <Flame className="text-[#FFE500] w-12 h-12 mb-4" />
        <span className="text-4xl font-black">12</span>
        <span className="text-[10px] font-mono uppercase">Day_Streak</span>
      </div>

      {/* Badges Gallery */}
      <div className="md:col-span-2 bg-white/5 border border-white/10 rounded-[40px] p-8">
        <h3 className="text-sm font-syne font-bold uppercase mb-6 flex items-center gap-2">
          <Trophy size={16} className="text-[#FFE500]"/> Recent_Achievements
        </h3>
        <div className="flex gap-4">
          {[1,2,3,4].map(i => (
            <div key={i} className="w-16 h-16 rounded-2xl bg-neutral-900 border border-white/5 flex items-center justify-center grayscale hover:grayscale-0 transition-all cursor-pointer">
              {i === 1 ? '💎' : i === 2 ? '🦀' : i === 3 ? '🧪' : '🛡️'}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}