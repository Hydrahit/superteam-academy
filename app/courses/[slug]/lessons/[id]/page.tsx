'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Play, CheckCircle2, ChevronLeft, Terminal, LayoutPanelLeft } from 'lucide-react';

export default function LessonEditorPage({ params }: { params: { slug: string, id: string } }) {
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<string[]>([]);
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
      
      {/* Mini Navbar */}
      <nav className="h-14 border-b border-white/[0.07] bg-[#0C0C10] flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-4">
          <Link href={`/courses/${params.slug}`} className="text-white/40 hover:text-white transition-colors">
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
            <button className="bg-[#00FF94] text-black font-['Syne'] font-bold text-xs px-4 py-1.5 rounded flex items-center gap-2 hover:shadow-[0_0_15px_rgba(0,255,148,0.4)]">
              <CheckCircle2 className="w-4 h-4" /> Complete Lesson
            </button>
          )}
        </div>
      </nav>

      {/* Split Layout */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Left: Content Pane */}
        <div className="w-1/3 border-r border-white/[0.07] bg-[#060608] overflow-y-auto p-8 custom-scrollbar">
          <span className="font-['JetBrains_Mono'] text-[10px] text-[#00E5FF] uppercase tracking-widest mb-4 block">Challenge</span>
          <h1 className="font-['Syne'] text-3xl font-bold mb-6">Transfer Tokens via CPI</h1>
          
          <div className="prose prose-invert prose-p:text-white/60 prose-h3:text-white/90 prose-h3:font-['Syne'] max-w-none">
            <p>A Cross-Program Invocation (CPI) is when one program calls another program. In Solana, this is how you interact with the System Program or Token Program.</p>
            <h3>Objective</h3>
            <p>Complete the <code>transfer_tokens</code> instruction. You need to construct a <code>CpiContext</code> and call the token program's transfer function.</p>
            <div className="bg-[#0C0C10] border border-white/10 p-4 rounded-xl mt-6">
              <h4 className="font-['JetBrains_Mono'] text-xs text-white/40 uppercase mb-2">Hints</h4>
              <ul className="text-sm text-white/60 list-disc pl-4 space-y-2">
                <li>Remember to include <code>token_program.to_account_info()</code></li>
                <li>The accounts needed for transfer are <code>from</code>, <code>to</code>, and <code>authority</code>.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right: IDE & Terminal */}
        <div className="w-2/3 flex flex-col bg-[#0A0A0E]">
          
          {/* Editor Header */}
          <div className="h-10 border-b border-white/[0.07] bg-[#0C0C10] flex items-center px-4 gap-2">
            <LayoutPanelLeft className="w-4 h-4 text-white/20" />
            <div className="bg-[#0A0A0E] border border-b-0 border-white/[0.07] rounded-t-lg px-4 py-1.5 font-['JetBrains_Mono'] text-[11px] text-[#A78BFA] flex items-center gap-2 mt-2">
              <span className="text-[#A78BFA]">🦀</span> lib.rs
            </div>
          </div>

          {/* Fake Monaco Editor Area */}
          <div className="flex-1 overflow-y-auto p-4 font-['JetBrains_Mono'] text-sm leading-relaxed text-white/70 custom-scrollbar flex">
            <div className="w-8 text-right pr-4 text-white/20 select-none flex flex-col">
              {Array.from({length: 15}).map((_, i) => <span key={i}>{i + 1}</span>)}
            </div>
            <div className="flex-1">
              <pre className="m-0"><code className="language-rust">
<span className="text-white/30">// program/src/lib.rs</span><br/>
<span className="text-[#FF6B6B]">use</span> anchor_lang::prelude::*;<br/>
<span className="text-[#FF6B6B]">use</span> anchor_spl::token::&#123;self, Transfer&#125;;<br/>
<br/>
<span className="text-[#00E5FF]">#[program]</span><br/>
<span className="text-[#FF6B6B]">pub mod</span> <span className="text-[#00FF94]">cpi_example</span> &#123;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#FF6B6B]">use super</span>::*;<br/>
<br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#FF6B6B]">pub fn</span> <span className="text-[#FFE500]">transfer_tokens</span>(ctx: Context&lt;TransferTokens&gt;, amount: <span className="text-[#00E5FF]">u64</span>) -&gt; <span className="text-[#00E5FF]">Result</span>&lt;()&gt; &#123;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white/40">// TODO: Implement CPI transfer here</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white/40">// let cpi_accounts = Transfer { ... };</span><br/>
<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#A78BFA]">Ok</span>(())<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&#125;<br/>
&#125;
              </code></pre>
            </div>
          </div>

          {/* Terminal / Output */}
          <div className="h-64 border-t border-white/[0.07] bg-[#050505] flex flex-col">
            <div className="h-10 border-b border-white/[0.05] flex items-center justify-between px-4">
              <div className="flex items-center gap-2 font-['JetBrains_Mono'] text-[10px] text-white/40 uppercase tracking-widest">
                <Terminal className="w-3 h-3" /> Console
              </div>
              <button 
                onClick={runCode}
                disabled={isRunning}
                className="bg-white/10 hover:bg-white/20 text-white text-xs font-['JetBrains_Mono'] px-4 py-1.5 rounded flex items-center gap-2 transition-colors disabled:opacity-50"
              >
                {isRunning ? <span className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <Play className="w-3 h-3 text-[#00FF94]" />}
                {isRunning ? 'Running...' : 'Run Tests'}
              </button>
            </div>
            <div className="flex-1 p-4 font-['JetBrains_Mono'] text-xs text-white/50 overflow-y-auto space-y-1">
              {output.map((line, i) => (
                <div key={i} className={line.includes('ok') ? 'text-[#00FF94]' : ''}>{line}</div>
              ))}
              {!isRunning && output.length === 0 && <div>&gt; Ready to run tests.</div>}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
