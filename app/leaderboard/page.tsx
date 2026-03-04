'use client';
import { Trophy, Flame } from 'lucide-react';

const LEADERBOARD_DATA = [
  { rank: 1, name: "Carlos Silva", handle: "@carlos_sol", xp: 145000, level: 38, streak: 45 },
  { rank: 2, name: "Isabela Rocha", handle: "@isarocha", xp: 132000, level: 36, streak: 21 },
  { rank: 3, name: "Diego Martins", handle: "@diegodev", xp: 128500, level: 35, streak: 12 },
  { rank: 4, name: "Ana Beatriz", handle: "@anab_web3", xp: 95000, level: 30, streak: 8 }
];

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-[#060608] text-white pt-24 pb-20 px-4 md:px-8 font-['Bricolage_Grotesque']">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-['JetBrains_Mono'] text-[#00FF94] text-[10px] uppercase tracking-widest mb-2">// Helius_DAS_Indexed</p>
          <h1 className="font-['Syne'] text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF94] to-[#00E5FF]">Rankings</span>
          </h1>
        </div>

        <div className="space-y-3">
          {LEADERBOARD_DATA.map((user) => (
            <div key={user.rank} className="bg-[#0C0C10]/50 border border-white/[0.05] hover:border-white/10 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="w-8 text-center font-['JetBrains_Mono'] text-white/40 font-bold">#{user.rank}</div>
                <div>
                  <h4 className="font-['Syne'] font-bold">{user.name}</h4>
                  <p className="font-['JetBrains_Mono'] text-[10px] text-white/30">{user.handle}</p>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="font-['JetBrains_Mono'] text-sm font-bold">{user.xp.toLocaleString()} <span className="text-[10px] text-white/30 uppercase">XP</span></div>
                <div className="w-16 text-right font-['JetBrains_Mono'] text-xs text-[#00E5FF]">Lv.{user.level}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
