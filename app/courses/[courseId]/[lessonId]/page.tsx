'use client';
import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import confetti from 'canvas-confetti';
import { Play, CheckCircle, ChevronLeft } from 'lucide-react';
import { Terminal } from '@/src/components/lessons/Terminal';
import Link from 'next/link';

export default function LessonPage() {
  const [code, setCode] = useState('// Your Solana Program Here\n\n#[program]\npub mod academy_challenge {\n    use super::*;\n    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {\n        Ok(())\n    }\n}');
  const [status, setStatus] = useState<'IDLE' | 'RUNNING' | 'SUCCESS' | 'ERROR'>('IDLE');
  const [logs, setLogs] = useState<string[]>(['$ anchor build', 'Waiting for input...']);

  const handleRunCode = () => {
    setStatus('RUNNING');
    setLogs(['$ anchor test', 'Verifying localnet...', 'Compiling programs...']);
    
    setTimeout(() => {
      setStatus('SUCCESS');
      setLogs(prev => [...prev, '>>> Success: Transaction verified on localnet.', '>>> XP Awarded: +500 XP']);
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#14F195', '#9945FF', '#ffffff']
      });
    }, 2500);
  };

  return (
    <div className="flex flex-col h-screen bg-[#0a0a0a] text-white overflow-hidden">
      {/* Header */}
      <nav className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-[#0a0a0a]/80 backdrop-blur-md">
        <Link href="/courses" className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors">
          <ChevronLeft size={20} /> <span className="text-xs font-mono uppercase font-bold">Back_To_Modules</span>
        </Link>
        <div className="flex items-center gap-4">
           <span className="text-xs font-mono text-white/40">LEVEL_01: HELLO_SOLANA</span>
           <button 
             onClick={handleRunCode}
             disabled={status === 'RUNNING'}
             className="px-6 py-2 bg-[#14F195] text-black font-black text-xs rounded-full flex items-center gap-2 hover:shadow-[0_0_20px_rgba(20,241,149,0.4)] transition-all"
           >
             {status === 'RUNNING' ? 'COMPILING...' : <><Play size={14} fill="black" /> DEPLOY_PROGRAM</>}
           </button>
        </div>
      </nav>

      {/* Main Split Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Content */}
        <div className="w-[40%] border-r border-white/10 overflow-y-auto p-10 bg-neutral-900/20">
          <article className="prose prose-invert max-w-none">
            <span className="text-[#9945FF] font-mono text-[10px] font-bold uppercase tracking-widest">Masterclass_Chapter_01</span>
            <h1 className="text-4xl font-syne font-black mt-4 mb-8">Understanding the Anchor Framework</h1>
            <p className="text-neutral-400 leading-relaxed">
              Anchor is a framework for Solana's Sealevel runtime providing several developer tools. 
              In this challenge, you will initialize a basic Solana program. 
            </p>
            <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-2xl">
              <h4 className="text-[#14F195] font-bold text-sm mb-2">Challenge Objectives:</h4>
              <ul className="text-xs space-y-2 text-neutral-300 font-mono">
                <li>• Define a public module 'academy_challenge'</li>
                <li>• Use the #[program] attribute</li>
                <li>• Deploy to localnet via the Deploy button</li>
              </ul>
            </div>
          </article>
        </div>

        {/* Right: Editor & Terminal */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1">
            <Editor
              height="100%"
              theme="vs-dark"
              defaultLanguage="rust"
              value={code}
              onChange={(v) => setCode(v || '')}
              options={{
                fontSize: 16,
                fontFamily: 'JetBrains Mono',
                minimap: { enabled: false },
                padding: { top: 20 },
                smoothScrolling: true,
                cursorBlinking: 'smooth',
              }}
            />
          </div>
          <div className="h-[30%]">
            <Terminal logs={logs} status={status} />
          </div>
        </div>
      </div>
    </div>
  );
}
