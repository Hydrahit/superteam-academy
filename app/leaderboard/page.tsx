'use client';

import { useEffect, useState } from 'react';
import { Trophy, Flame, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LeaderboardPage() {
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/leaderboard')
      .then(res => res.json())
      .then(data => {
        setRankings(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-[#060608] flex items-center justify-center">
      <Loader2 className="w-8 h-8 text-[#00FF94] animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#060608] text-white pt-24 pb-20 px-4 md:px-8 font-['Bricolage_Grotesque']">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-['JetBrains_Mono'] text-[#00FF94] text-[10px] uppercase tracking-widest mb-2">// Helius_DAS_Indexed</p>
          <h1 className="font-['Syne'] text-4xl md:text-6xl font-extrabold tracking-tight">
            Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF94] to-[#00E5FF]">Rankings</span>
          </h1>
        </div>

        <div className="space-y-3">
          {rankings.map((user, i) => (
            <div key={user.owner} className="bg-[#0C0C10]/50 border border-white/[0.05] rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="w-8 text-center font-['JetBrains_Mono'] text-white/40 font-bold">#{i + 1}</div>
                <div>
                  <h4 className="font-['Syne'] font-bold text-white">{user.owner}</h4>
                  <p className="font-['JetBrains_Mono'] text-[10px] text-white/30">Level {user.level}</p>
                </div>
              </div>
              <div className="font-['JetBrains_Mono'] text-sm font-bold text-[#00E5FF]">
                {user.balance.toLocaleString()} XP
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
