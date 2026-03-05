'use client';
import Editor from '@monaco-editor/react';
import { useState } from 'react';
import confetti from 'canvas-confetti';
import { Play, CheckCircle } from 'lucide-react';

export default function ProCoderInterface() {
  const [code, setCode] = useState('// Write your Solana program here...\n\n#[program]\npub mod hello_solana {\n    use super::*;\n}');
  const [status, setStatus] = useState('READY');

  const runTest = () => {
    setStatus('RUNNING');
    setTimeout(() => {
      setStatus('SUCCESS');
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#00E5FF', '#9945FF'] });
    }, 2000);
  };

  return (
    <div className="flex h-screen bg-[#1e1e1e] border-t border-white/5">
      <div className="w-[40%] p-8 overflow-y-auto border-r border-white/5 prose prose-invert max-w-none">
        <h2 className="text-cyan-400 font-syne uppercase tracking-widest text-sm">Module 01</h2>
        <h1 className="text-3xl font-bold mb-6">Introduction to Anchor</h1>
        <p className="text-neutral-400">Anchor is a framework for Solana's Sealevel runtime providing several developer tools. In this lesson, you'll build your first program...</p>
        <div className="mt-8 p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
           <span className="text-[10px] font-mono text-cyan-500 font-bold uppercase">Reward: 500 XP</span>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col">
        <div className="flex-1">
          <Editor height="100%" theme="vs-dark" defaultLanguage="rust" value={code} onChange={(v) => setCode(v || '')} 
            options={{ fontSize: 16, minimap: { enabled: false }, padding: { top: 20 } }} 
          />
        </div>
        <div className="h-48 bg-[#0a0a0a] border-t border-white/10 p-4 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest">Console_Output</span>
            <button onClick={runTest} className="px-6 py-2 bg-cyan-500 text-black rounded font-bold text-xs flex items-center gap-2 hover:bg-cyan-400 transition-all">
              {status === 'RUNNING' ? 'COMPILING...' : <><Play size={14}/> RUN_CODE</>}
            </button>
          </div>
          <div className="font-mono text-sm">
            {status === 'SUCCESS' && <p className="text-[#14F195] animate-pulse">>>> All tests passed! XP Dispatched to wallet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}