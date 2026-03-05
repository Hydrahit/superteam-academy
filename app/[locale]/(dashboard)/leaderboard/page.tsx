'use client';
import { motion } from 'framer-motion';
import { Trophy, Crown, ArrowUp, Zap } from 'lucide-react';

const TOP_PLAYERS = [
  { rank: 1, name: 'Toly_Fanboy', xp: 24500, avatar: '🔥', level: 15 },
  { rank: 2, name: 'Rust_Lord', xp: 18200, avatar: '⚡', level: 12 },
  { rank: 3, name: 'Anchor_God', xp: 15100, avatar: '🛡️', level: 10 },
];

const OTHER_PLAYERS = [
  { rank: 4, name: 'Helius_Dev', xp: 12000, level: 9 },
  { rank: 5, name: 'Solana_Dev_01', xp: 9500, level: 8 },
  { rank: 6, name: 'Bounty_Hunter', xp: 8200, level: 7 },
];

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-32 px-12">
      <header className="text-center mb-16">
        <h1 className="text-6xl font-syne font-black text-white uppercase italic tracking-tighter">
          Hall_of_<span className="text-[#9945FF]">Fame</span>
        </h1>
        <p className="text-neutral-500 font-mono text-xs uppercase mt-4 tracking-[0.4em]">The Elite 1% of Solana Builders</p>
      </header>

      {/* Podium Section */}
      <div className="flex flex-col md:flex-row justify-center items-end gap-6 mb-20">
        {TOP_PLAYERS.map((player) => (
          <motion.div 
            key={player.rank}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={`relative flex flex-col items-center w-full md:w-64 bg-white/5 border border-white/10 rounded-[40px] p-8 ${
              player.rank === 1 ? 'h-[400px] border-[#FFE500]/30 shadow-[0_0_50px_rgba(255,229,0,0.1)]' : 'h-[320px]'
            }`}
          >
            {player.rank === 1 && <Crown size={48} className="text-[#FFE500] absolute -top-12 animate-bounce" />}
            <div className="text-6xl mb-6">{player.avatar}</div>
            <h3 className="font-syne font-black text-white uppercase italic">{player.name}</h3>
            <p className="text-[#14F195] font-black text-3xl mt-2">{player.xp} XP</p>
            <span className="text-[10px] font-mono text-white/30 uppercase mt-auto tracking-widest">RANK_0{player.rank}</span>
          </motion.div>
        ))}
      </div>

      {/* List Section */}
      <div className="max-w-4xl mx-auto space-y-4">
        {OTHER_PLAYERS.map((player) => (
          <motion.div 
            key={player.rank}
            whileHover={{ x: 10 }}
            className="flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-6">
              <span className="font-mono text-white/20 font-bold w-8">#0{player.rank}</span>
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center font-bold text-white/40">{player.name[0]}</div>
              <span className="font-bold text-white uppercase tracking-tight">{player.name}</span>
            </div>
            <div className="flex items-center gap-8">
               <div className="text-right">
                  <p className="text-[#14F195] font-black italic">{player.xp} XP</p>
                  <p className="text-[9px] font-mono text-white/30 uppercase">LEVEL_{player.level}</p>
               </div>
               <ArrowUp size={16} className="text-[#14F195]" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Sticky User Profile */}
      <div className="fixed bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black to-transparent">
        <div className="max-w-4xl mx-auto bg-[#14F195] text-black p-4 rounded-2xl flex items-center justify-between shadow-[0_-10px_40px_rgba(20,241,149,0.2)]">
           <div className="flex items-center gap-4">
              <div className="bg-black text-white w-10 h-10 rounded-full flex items-center justify-center font-black italic">#42</div>
              <span className="font-syne font-black uppercase italic">Your_Position: Architect_01</span>
           </div>
           <div className="flex items-center gap-2">
              <Zap size={18} fill="black" />
              <span className="text-xl font-black">2,450 XP</span>
           </div>
        </div>
      </div>
    </div>
  );
}
