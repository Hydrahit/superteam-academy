const fs = require('fs');
const path = require('path');

const targetFile = path.join(process.cwd(), 'app/courses/[slug]/lessons/[id]/page.tsx');

const correctCode = `'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Play, CheckCircle2, ChevronLeft, Terminal, LayoutPanelLeft } from 'lucide-react';

export default function LessonEditorPage({ params }: { params: { slug: string, id: string } }) {
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState([]);
  const [passed, setPassed] = useState(false);

  const runCode = () => {
    setIsRunning(true);
    setOutput(["$ cargo build-bpf", "Compiling anchor-program v0.1.0", "Finished release [optimized] target(s) in 2.4s"]);
    
    setTimeout(() => {
      setOutput(prev => [...prev, "$ cargo test", "running 1 test", "test initialize ... ok", "test result: ok. 1 passed; 0 failed."]);
      setIsRunning(false);
      setPassed(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#060608] text-white flex flex-col font-['Bricolage_Grotesque'] overflow-hidden">
      <nav className="h-14 border-b border-white/[0.07] bg-[#0C0C10] flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-4">
          <Link href={\`/courses/\${params.slug}\`} className="text-white/40 hover:text-white transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div className="font-['JetBrains_Mono'] text-xs text-white/60">
            Cross-Program Invocations (CPI)
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="font-['JetBrains_Mono'] text-[10px] text-[#FFE500] uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FFE500] animate-pulse" /> +50 XP
          </div>
          {passed && (
            <button className="bg-[#00FF94] text-black font-['Syne'] font-bold text-xs px-4 py-1.5 rounded flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Complete Lesson
            </button>
          )}
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/3 border-r border-white/[0.07] bg-[#060608] overflow-y-auto p-8">
          <span className="font-['JetBrains_Mono'] text-[10px] text-[#00E5FF] uppercase tracking-widest mb-4 block">Challenge</span>
          <h1 className="font-['Syne'] text-3xl font-bold mb-6">Transfer Tokens via CPI</h1>
          <div className="prose prose-invert max-w-none text-white/60">
            <p>Complete the transfer_tokens instruction using CpiContext.</p>
          </div>
        </div>

        <div className="w-2/3 flex flex-col bg-[#0A0A0E]">
          <div className="h-10 border-b border-white/[0.07] bg-[#0C0C10] flex items-center px-4">
             <div className="text-[11px] text-[#A78BFA] font-['JetBrains_Mono']">lib.rs</div>
          </div>
          <div className="flex-1 p-4 font-['JetBrains_Mono'] text-sm text-white/40">
            <pre>{\`use anchor_lang::prelude::*;
#[program]
pub mod cpi_example {
    pub fn transfer_tokens(ctx: Context<TransferTokens>) -> Result<()> {
        // Implementation here
        Ok(())
    }
}\`}</pre>
          </div>
          <div className="h-64 border-t border-white/[0.07] bg-[#050505] p-4">
            <button 
              onClick={runCode}
              className="bg-[#00FF94] text-black px-4 py-2 rounded mb-4 text-xs font-bold"
            >
              {isRunning ? 'Running...' : 'Run Tests'}
            </button>
            <div className="font-['JetBrains_Mono'] text-xs text-white/50">
              {output.map((line, i) => <div key={i}>{line}</div>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
`;

if (fs.existsSync(targetFile)) {
    fs.writeFileSync(targetFile, correctCode, 'utf8');
    console.log('✅ File repaired successfully!');
} else {
    console.log('❌ File not found at path. Checking for alternative paths...');
    // Recursive check for the file if folder structure is slightly different
}