'use client';
import { Trophy, Medal, Flame } from 'lucide-react';

const mockLeaderboard = [
  { rank: 1, name: "Anatoly Y.", xp: 14500, level: 12, streak: 112 },
  { rank: 2, name: "Armani F.", xp: 9200, level: 9, streak: 45 },
  { rank: 3, name: "Om Dubey", xp: 8400, level: 9, streak: 21 },
  { rank: 4, name: "0xMert", xp: 7100, level: 8, streak: 14 },
];

export default function Leaderboard() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6 md:p-12 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <Trophy className="w-10 h-10 text-[#FFE500]" />
          <h1 className="text-4xl font-bold font-syne">Global Leaderboard</h1>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
          {mockLeaderboard.map((user, i) => (
            <div key={i} className={`flex items-center justify-between p-6 border-b border-white/5 ${user.name === 'Om Dubey' ? 'bg-[#14F195]/10 border-l-4 border-l-[#14F195]' : 'hover:bg-white/5'} transition-colors`}>
              <div className="flex items-center gap-6">
                <span className={`text-2xl font-bold font-mono ${i < 3 ? 'text-[#FFE500]' : 'text-neutral-500'}`}>#{user.rank}</span>
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#9945FF] to-[#14F195] flex items-center justify-center font-bold text-lg">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{user.name}</h3>
                  <p className="text-xs text-neutral-400 font-mono">Level {user.level}</p>
                </div>
              </div>
              <div className="flex items-center gap-8 text-right">
                <div className="hidden md:block">
                  <p className="text-xs text-neutral-500 font-mono uppercase">Streak</p>
                  <p className="font-bold flex items-center gap-1 justify-end"><Flame className="w-4 h-4 text-[#FFE500]"/> {user.streak}</p>
                </div>
                <div>
                  <p className="text-xs text-neutral-500 font-mono uppercase">Total XP</p>
                  <p className="font-bold text-[#14F195] font-mono">{user.xp.toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
