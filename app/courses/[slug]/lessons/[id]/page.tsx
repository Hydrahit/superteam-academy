'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Play, CheckCircle2, ChevronLeft, Terminal } from 'lucide-react';

export default function LessonEditorPage({ params }: { params: { slug: string, id: string } }) {
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState([]);
  const [passed, setPassed] = useState(false);

  const runCode = () => {
    setIsRunning(true);
    setOutput(["$ cargo build-bpf...", "✅ Compilation successful"]);
    setTimeout(() => {
      setOutput(prev => [...prev, "$ cargo test", "test initialize ... ok"]);
      setIsRunning(false);
      setPassed(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#060608] text-white flex flex-col font-['Bricolage_Grotesque']">
      <nav className="h-14 border-b border-white/10 bg-[#0C0C10] flex items-center justify-between px-4">
        <Link href={`/courses/${params.slug}`} className="flex items-center gap-2 text-white/40 hover:text-white transition-colors">
          <ChevronLeft className="w-4 h-4" /> <span className="text-xs font-['JetBrains_Mono']">Back to Course</span>
        </Link>
        {passed && (
          <button className="bg-[#00FF94] text-black font-bold text-xs px-4 py-1.5 rounded-lg animate-bounce">
            Complete +50 XP
          </button>
        )}
      </nav>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/3 border-r border-white/10 p-8 overflow-y-auto">
          <h1 className="font-['Syne'] text-2xl font-bold mb-4">CPI Transfer Challenge</h1>
          <p className="text-white/50 text-sm leading-relaxed">Implement the token transfer using Anchor's CpiContext.</p>
        </div>

        <div className="w-2/3 flex flex-col bg-[#0A0A0E]">
          <div className="flex-1 p-6 font-['JetBrains_Mono'] text-sm text-white/30 bg-[#050505]">
            <pre>{`#[program]\npub mod cpi_example {\n    pub fn transfer_tokens(ctx: Context<TransferTokens>) -> Result<()> {\n        // TODO: Logic here\n        Ok(())\n    }\n}`}</pre>
          </div>
          <div className="h-48 border-t border-white/10 bg-black p-4">
            <button onClick={runCode} className="bg-[#00E5FF] text-black px-4 py-2 rounded font-bold text-xs mb-4">
              {isRunning ? 'Running...' : 'Run Tests'}
            </button>
            <div className="font-['JetBrains_Mono'] text-[10px] text-white/40">
              {output.map((line, i) => <div key={i}>{line}</div>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
