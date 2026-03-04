'use client';

import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Play, CheckCircle2, AlertCircle } from 'lucide-react';

interface ChallengeEditorProps {
  initialCode: string;
  onSuccess: () => void;
}

export function ChallengeEditor({ initialCode, onSuccess }: ChallengeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [status, setStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);

  const handleRunTests = async () => {
    setStatus('running');
    setTerminalOutput(['$ cargo build-bpf...', '🔧 Compiling program...', '🚀 Running on-chain simulation...']);

    // Simulated test logic
    setTimeout(() => {
      if (code.includes('CpiContext') && code.includes('transfer')) {
        setTerminalOutput(prev => [...prev, '✅ Test Transfer: Passed', '🎉 Challenge Complete! +100 XP']);
        setStatus('success');
        onSuccess();
      } else {
        setTerminalOutput(prev => [...prev, '❌ Test Transfer: Failed', '💡 Hint: Did you remember to use CpiContext::new()?']);
        setStatus('error');
      }
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full bg-[#050505] border-l border-white/10">
      {/* Editor Header */}
      <div className="h-12 border-b border-white/10 bg-[#0C0C10] flex items-center justify-between px-4">
        <span className="font-['JetBrains_Mono'] text-[11px] text-white/40 uppercase tracking-widest">lib.rs</span>
        <button 
          onClick={handleRunTests}
          disabled={status === 'running'}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-md font-['Syne'] text-xs font-bold transition-all ${
            status === 'running' ? 'bg-white/10 text-white/40' : 'bg-[#00FF94] text-black hover:shadow-[0_0_20px_rgba(0,255,148,0.4)]'
          }`}
        >
          {status === 'running' ? 'Compiling...' : <><Play className="w-3 h-3" /> Run Tests</>}
        </button>
      </div>

      {/* Actual Monaco Editor */}
      <div className="flex-1">
        <Editor
          height="100%"
          defaultLanguage="rust"
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value || '')}
          options={{
            fontSize: 14,
            fontFamily: 'JetBrains Mono',
            minimap: { enabled: false },
            padding: { top: 20 },
            backgroundColor: '#050505'
          }}
        />
      </div>

      {/* Terminal Output */}
      <div className="h-48 bg-black border-t border-white/10 p-4 font-['JetBrains_Mono'] text-xs overflow-y-auto">
        <div className="text-white/30 mb-2 uppercase tracking-tighter flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-white/20" /> Terminal Output
        </div>
        {terminalOutput.map((line, i) => (
          <div key={i} className={`mb-1 ${line.includes('✅') ? 'text-[#00FF94]' : line.includes('❌') ? 'text-[#FF6B6B]' : 'text-white/60'}`}>
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}
