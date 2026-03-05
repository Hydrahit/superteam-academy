const fs = require('fs');
const path = require('path');

console.log('🏆 FORGING THE HALL OF FAME LEADERBOARD...');

const rootDir = process.cwd();
const updateFile = (p, content) => {
  const fullPath = path.join(rootDir, p);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(fullPath, content.trim());
  console.log(`✨ Leaderboard Refined: ${p}`);
};

// 1. ELITE LEADERBOARD COMPONENT
updateFile('app/(dashboard)/leaderboard/page.tsx', `
'use client';
import { motion } from 'framer-motion';
import { Trophy, Crown, Flame, ArrowUp } from 'lucide-react';
import { useState } from 'react';

const MOCK_LEADERS = [
  { id: 1, name: 'Anatoly_0x', xp: 24500, level: 15, avatar: '🔥', rank: 1 },
  { id: 2, name: 'Toly_Fan', xp: 18200, level: 12, avatar: '⚡', rank: 2 },
  { id: 3, name: 'Solana_Dev', xp: 15100, level: 10, avatar: '🛡️', rank: 3 },
  { id: 4, name: 'Rust_King', xp: 12000, level: 9, avatar: '🦀', rank: 4 },
  { id: 5, name: 'Anchor_Pro', xp: 9500, level: 7, avatar: '⚓', rank: 5 },
  // ... more users
];

export default function HallOfFame() {
  const [currentUserRank] = useState({ rank: 42, xp: 1200, name: 'Om_Dubey' });

  return (
    <div className="min-h-screen pt-28 pb-32 px-6 bg-[#060608] selection:bg-cyan-500/30">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-20">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-7xl font-syne font-black italic tracking-tighter text-white uppercase"
          >
            Hall_of_<span className="text-cyan-500">Fame</span>
          </motion.h1>
          <p className="text-neutral-500 font-mono text-xs uppercase tracking-widest mt-4">Top Builders of the Solana Ecosystem</p>
        </header>

        {/* TOP 3 PODIUM */}
        <div className="flex flex-col md:flex-row justify-center items-end gap-6 mb-20 h-[400px]">
          {/* Silver - Rank 2 */}
          <PodiumItem user={MOCK_LEADERS[1]} height="h-[250px]" color="border-slate-400" glow="shadow-[0_0_40px_rgba(148,163,184,0.2)]" />
          
          {/* Gold - Rank 1 */}
          <PodiumItem user={MOCK_LEADERS[0]} height="h-[320px]" color="border-[#FFE500]" glow="shadow-[0_0_60px_rgba(255,229,0,0.3)]" isWinner />

          {/* Bronze - Rank 3 */}
          <PodiumItem user={MOCK_LEADERS[2]} height="h-[200px]" color="border-[#CD7F32]" glow="shadow-[0_0_40px_rgba(205,127,50,0.2)]" />
        </div>

        {/* RANK LIST */}
        <div className="space-y-3">
          {MOCK_LEADERS.slice(3).map((user, i) => (
            <motion.div 
              key={user.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center justify-between p-6 glass rounded-2xl border border-white/5 hover:border-white/10 transition-all group"
            >
              <div className="flex items-center gap-6">
                <span className="font-mono text-neutral-500 group-hover:text-white transition-colors">#0{user.rank}</span>
                <div className="w-12 h-12 rounded-full bg-neutral-900 flex items-center justify-center text-xl">{user.avatar}</div>
                <div>
                  <h3 className="font-bold text-white uppercase tracking-tight">{user.name}</h3>
                  <p className="text-[10px] font-mono text-neutral-500">LEVEL_{user.level}_ARCHITECT</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-black italic text-cyan-400">{user.xp} XP</div>
                <div className="flex items-center justify-end gap-1 text-[9px] text-[#14F195] font-bold">
                  <ArrowUp size={10} /> 12% GROWTH
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* STICKY ME COMPONENT */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent z-[100]"
      >
        <div className="max-w-5xl mx-auto bg-[#00E5FF] text-black p-4 rounded-2xl flex items-center justify-between shadow-[0_-20px_50px_rgba(0,229,255,0.2)]">
          <div className="flex items-center gap-4">
             <div className="bg-black text-[#00E5FF] w-10 h-10 rounded-full flex items-center justify-center font-black">#{currentUserRank.rank}</div>
             <span className="font-syne font-bold uppercase italic">Your_Progress: {currentUserRank.name}</span>
          </div>
          <div className="font-black text-xl italic">{currentUserRank.xp} XP</div>
        </div>
      </motion.div>
    </div>
  );
}

function PodiumItem({ user, height, color, glow, isWinner = false }: any) {
  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={\`relative flex flex-col items-center justify-end w-full md:w-64 \${height}\`}
    >
      {isWinner && <Crown className="text-[#FFE500] absolute -top-12 animate-bounce" size={40} />}
      <div className={\`w-24 h-24 rounded-full bg-neutral-900 border-4 \${color} \${glow} flex items-center justify-center text-4xl mb-4\`}>
        {user.avatar}
      </div>
      <div className={\`w-full bg-[#0C0C10] border-t-2 \${color} rounded-t-3xl p-6 text-center shadow-2xl\`}>
        <h3 className="font-bold text-white uppercase tracking-tighter truncate">{user.name}</h3>
        <p className="text-cyan-500 font-black italic text-2xl">{user.xp} XP</p>
      </div>
    </motion.div>
  );
}
`);

console.log('🚀 ELITE HALL OF FAME IS LIVE.');