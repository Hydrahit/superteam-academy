'use client';
import { useEffect, useState } from 'react';
import { HeliusIndexerService } from '@/src/services/HeliusIndexerService';
import { Trophy, Share2, Twitter } from 'lucide-react';

export default function ProLeaderboard() {
  const [entries, setEntries] = useState<any[]>([]);

  const shareOnTwitter = (rank: number, xp: number) => {
    const text = `I just reached Rank #${rank} with ${xp} XP on @SuperteamAcademy! 🚀 Building on Solana is elite. Check my progress: `;
    const url = window.location.href;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  useEffect(() => {
    HeliusIndexerService.getLeaderboard("YOUR_MINT").then(res => {
      setEntries(res.length > 0 ? res : [
        { rank: 1, address: "7aV...Anatoly", xp: 14500, level: 12 },
        { rank: 2, address: "3mK...Armani", xp: 9200, level: 9 },
        { rank: 3, address: "OmDubey", xp: 8400, level: 9 }
      ]);
    });
  }, []);

  return (
    <div className="min-h-screen pt-24 px-8 max-w-5xl mx-auto font-sans">
      <header className="mb-12 flex justify-between items-end">
        <div>
          <Trophy className="w-12 h-12 text-[#FFE500] mb-4" />
          <h1 className="font-syne font-extrabold text-6xl tracking-tighter text-white uppercase italic">Elite_Rankings</h1>
        </div>
        <button 
          onClick={() => shareOnTwitter(3, 8400)}
          className="flex items-center gap-2 bg-white/5 border border-white/10 px-6 py-3 rounded-xl font-mono text-xs hover:bg-white/10 transition-all"
        >
          <Twitter className="w-4 h-4 text-[#1DA1F2]" /> SHARE_MY_RANK
        </button>
      </header>

      <div className="bg-[#0C0C10] border border-white/5 rounded-[32px] overflow-hidden shadow-2xl">
        {entries.map((user, i) => (
          <div key={i} className="flex items-center justify-between p-8 border-b border-white/5 hover:bg-[#14F195]/5 transition-all group">
             <div className="flex items-center gap-6">
                <span className="font-mono text-2xl font-bold text-white/10 group-hover:text-[#FFE500]">#0{user.rank}</span>
                <div className="w-12 h-12 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center font-bold">{user.address.charAt(0)}</div>
                <div>
                   <h3 className="font-syne font-bold text-white uppercase tracking-tight">{user.address.slice(0, 8)}...</h3>
                   <p className="text-[10px] text-white/30 font-mono">LEVEL_{user.level}_ARCHITECT</p>
                </div>
             </div>
             <div className="text-right">
                <div className="text-2xl font-mono font-bold text-[#14F195]">{user.xp} XP</div>
                <button onClick={() => shareOnTwitter(user.rank, user.xp)} className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-cyan-500 font-mono mt-1">SHARE_X_ENTRY</button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}