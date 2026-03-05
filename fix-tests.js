const fs = require('fs');
const path = require('path');

console.log('🎬 MERGING WORLD CLASS DNA INTO PROJECT...');

const rootDir = process.cwd();

const createFile = (p, content) => {
  const dir = path.dirname(path.join(rootDir, p));
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(rootDir, p), content.trim());
};

// 1. GLOBAL WORLD CLASS STYLES (Enforcing Syne & JetBrains Mono)
createFile('app/globals.css', `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Bricolage+Grotesque:wght@300;400;600&family=JetBrains+Mono:wght@300;400;600&display=swap');

:root {
  --cyan: #00E5FF;
  --yellow: #FFE500;
  --purple: #A78BFA;
  --bg: #060608;
}

@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background: var(--bg);
  color: rgba(240,240,240,0.9);
  font-family: 'Bricolage Grotesque', sans-serif;
  overflow-x: hidden;
}

.glitch:hover::before { animation: glitch-1 0.35s steps(1) infinite; opacity: 0.75; }
@keyframes glitch-1 {
  0%,100% { clip-path: inset(0 0 96% 0); transform: translate(-4px,0); color: var(--cyan); }
  50% { clip-path: inset(60% 0 22% 0); transform: translate(-3px,0); color: var(--yellow); }
}

.ticker-animation { animation: ticker 22s linear infinite; }
@keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
`);

// 2. WORLD CLASS DASHBOARD (Rewriting with exact UI from file)
createFile('app/(dashboard)/dashboard/page.tsx', `
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
`);

console.log('✅ WORLD CLASS INTEGRATION COMPLETE.');