const fs = require('fs');
const path = require('path');

console.log('🌌 FORGING SUPERTEAM ACADEMY CORE PAGES...');

const rootDir = process.cwd();
const appDir = path.join(rootDir, 'app');

const ensureDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
};

// Ensure Dashboard Routes Exist
ensureDir(path.join(appDir, '(dashboard)', 'dashboard'));
ensureDir(path.join(appDir, '(dashboard)', 'leaderboard'));
ensureDir(path.join(appDir, '(dashboard)', 'profile', '[username]'));
ensureDir(path.join(appDir, '(dashboard)', 'courses', '[slug]', 'lessons', '[id]'));

// ==========================================
// 1. DASHBOARD PAGE
// ==========================================
const dashboardPath = path.join(appDir, '(dashboard)', 'dashboard', 'page.tsx');
const dashboardContent = `'use client';
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
`;
fs.writeFileSync(dashboardPath, dashboardContent);

// ==========================================
// 2. LEADERBOARD PAGE
// ==========================================
const leaderboardPath = path.join(appDir, '(dashboard)', 'leaderboard', 'page.tsx');
const leaderboardContent = `'use client';
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
            <div key={i} className={\`flex items-center justify-between p-6 border-b border-white/5 \${user.name === 'Om Dubey' ? 'bg-[#14F195]/10 border-l-4 border-l-[#14F195]' : 'hover:bg-white/5'} transition-colors\`}>
              <div className="flex items-center gap-6">
                <span className={\`text-2xl font-bold font-mono \${i < 3 ? 'text-[#FFE500]' : 'text-neutral-500'}\`}>#{user.rank}</span>
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
`;
fs.writeFileSync(leaderboardPath, leaderboardContent);

// ==========================================
// 3. CODE CHALLENGE / LESSON EDITOR PAGE
// ==========================================
const lessonPath = path.join(appDir, '(dashboard)', 'courses', '[slug]', 'lessons', '[id]', 'page.tsx');
const lessonContent = `'use client';
import { useState } from 'react';
import { Play, CheckCircle2, Terminal } from 'lucide-react';

export default function CodeChallenge() {
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<string | null>(null);

  const runCode = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setOutput("Success! Test passed: Account initialized correctly.\\n\\n+100 XP Awarded!");
    }, 1500);
  };

  return (
    <div className="h-screen bg-neutral-950 text-white flex flex-col md:flex-row overflow-hidden font-sans pt-16">
      
      {/* LEFT: Markdown Content */}
      <div className="w-full md:w-1/3 border-r border-white/10 p-8 overflow-y-auto bg-neutral-900/30">
        <span className="text-xs font-mono text-[#9945FF] uppercase tracking-widest mb-2 block">Challenge 1</span>
        <h1 className="text-3xl font-bold font-syne mb-6">Initialize a PDA</h1>
        <div className="prose prose-invert prose-sm">
          <p>Your task is to derive a Program Derived Address (PDA) using the seeds <code>[b"user", user.key().as_ref()]</code>.</p>
          <p>Fill in the missing Rust code in the editor on the right to correctly calculate the PDA and bump seed.</p>
        </div>
      </div>

      {/* RIGHT: Code Editor & Terminal */}
      <div className="w-full md:w-2/3 flex flex-col h-full relative">
        {/* Fake Editor Header */}
        <div className="h-12 border-b border-white/10 bg-neutral-900 flex items-center px-4 justify-between">
          <div className="flex gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-xs font-mono text-neutral-400">lib.rs</span>
          <button 
            onClick={runCode}
            disabled={isRunning}
            className="px-4 py-1.5 rounded bg-[#14F195] text-black text-xs font-bold flex items-center gap-2 hover:bg-[#10c97b]"
          >
            {isRunning ? 'Compiling...' : 'Run Tests'} <Play className="w-3 h-3" />
          </button>
        </div>

        {/* Fake Monaco Editor Area */}
        <div className="flex-1 bg-[#0d0d0d] p-6 font-mono text-sm text-neutral-300 overflow-y-auto">
          <pre><code>
<span className="text-[#9945FF]">pub fn</span> <span className="text-[#14F195]">initialize_user</span>(ctx: Context&lt;InitializeUser&gt;) -&gt; Result&lt;()&gt; {'{'}
    <span className="text-neutral-500">// TODO: Derive the PDA here</span>
    <span className="text-[#9945FF]">let</span> (user_pda, bump) = Pubkey::<span className="text-[#14F195]">find_program_address</span>(
        &[
            <span className="text-yellow-300">b"user"</span>,
            ctx.accounts.user.key().<span className="text-[#14F195]">as_ref</span>()
        ],
        ctx.program_id
    );

    msg!(<span className="text-yellow-300">"PDA initialized at: {}"</span>, user_pda);
    <span className="text-[#9945FF]">Ok</span>(())
{'}'}
          </code></pre>
        </div>

        {/* Terminal Output */}
        <div className="h-48 border-t border-white/10 bg-neutral-900 p-4 font-mono text-xs overflow-y-auto">
          <div className="flex items-center gap-2 text-neutral-500 mb-2">
            <Terminal className="w-4 h-4" /> Terminal
          </div>
          {output && (
            <div className="text-[#14F195] whitespace-pre-wrap flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              {output}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
`;
fs.writeFileSync(lessonPath, lessonContent);

console.log('✅ ACADEMY CORE PAGES GENERATED.');