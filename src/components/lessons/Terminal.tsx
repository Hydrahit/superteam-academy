'use client';
import { Terminal as TermIcon, CheckCircle2, XCircle } from 'lucide-react';

interface TerminalProps {
  logs: string[];
  status: 'IDLE' | 'RUNNING' | 'SUCCESS' | 'ERROR';
}

export const Terminal = ({ logs, status }: TerminalProps) => {
  return (
    <div className="h-full bg-[#0a0a0a] border-t border-white/10 flex flex-col font-mono text-sm">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-white/5">
        <div className="flex items-center gap-2 text-white/40">
          <TermIcon size={14} />
          <span className="text-[10px] uppercase tracking-widest font-bold">Build_Output</span>
        </div>
        {status === 'SUCCESS' && <span className="text-[#14F195] text-[10px] flex items-center gap-1 animate-pulse"><CheckCircle2 size={12}/> TESTS_PASSED</span>}
        {status === 'ERROR' && <span className="text-red-500 text-[10px] flex items-center gap-1"><XCircle size={12}/> BUILD_FAILED</span>}
      </div>
      <div className="flex-1 p-4 overflow-y-auto space-y-2">
        {logs.map((log, i) => (
          <p key={i} className={log.includes('>>>') ? "text-[#14F195]" : "text-white/60"}>
            {log}
          </p>
        ))}
        {status === 'RUNNING' && <p className="text-cyan-400 animate-pulse">Compiling Rust to BPF...</p>}
      </div>
    </div>
  );
};
