'use client';
import { useState } from 'react';
import { Play, CheckCircle2, Terminal } from 'lucide-react';

export default function CodeChallenge() {
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<string | null>(null);

  const runCode = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setOutput("Success! Test passed: Account initialized correctly.\n\n+100 XP Awarded!");
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
