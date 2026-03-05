#!/bin/bash

echo "🔗 CONNECTING FRONTEND TO GITHUB VERIFICATION API..."

# 1. Update the Lesson Page
echo "✍️ Updating app/courses/[slug]/[lessonId]/page.tsx..."
cat <<'EOF' > app/courses/\[slug\]/\[lessonId\]/page.tsx
'use client';
import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import confetti from 'canvas-confetti';
import { Play, ChevronLeft, Github, CheckCircle2, XCircle } from 'lucide-react';
import { Terminal } from '@/src/components/lessons/Terminal';
import Link from 'next/link';

export default function LessonPage() {
  const [code, setCode] = useState('// Your Solana Program Here\n\n#[program]\npub mod academy_challenge {\n    use super::*;\n    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {\n        Ok(())\n    }\n}');
  
  // Terminal & Execution State
  const [status, setStatus] = useState<'IDLE' | 'RUNNING' | 'SUCCESS' | 'ERROR'>('IDLE');
  const [logs, setLogs] = useState<string[]>(['$ System initialized. Waiting for PR submission...']);
  
  // PR Submission State
  const [prUrl, setPrUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitPR = async () => {
    if (!prUrl.includes('github.com')) {
      setLogs(prev => [...prev, '❌ Error: Invalid GitHub URL format.']);
      setStatus('ERROR');
      return;
    }

    setIsSubmitting(true);
    setStatus('RUNNING');
    setLogs(['$ Initializing GitHub Octokit verification...', `$ Fetching PR data for: ${prUrl}`]);

    try {
      // Calling our Secure Verification API
      const response = await fetch('/api/verify-pr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: '00000000-0000-0000-0000-000000000000', // Mock UUID for demo. In prod, use `useAuth().user.id`
          lessonId: 'final_challenge_01',
          courseId: '00000000-0000-0000-0000-000000000000',
          prUrl: prUrl,
          expectedXp: 500
        })
      });

      const data = await response.json();

      if (data.success) {
        setStatus('SUCCESS');
        setLogs(prev => [
          ...prev, 
          `>>> Success: PR #${data.details?.title || 'Verified'} is valid!`, 
          '>>> Atomic Transaction: Updating Supabase records...',
          '>>> XP Awarded: +500 XP Dispatched to Wallet Profile.'
        ]);
        
        confetti({
          particleCount: 200,
          spread: 120,
          origin: { y: 0.6 },
          colors: ['#14F195', '#9945FF', '#ffffff']
        });
      } else {
        setStatus('ERROR');
        setLogs(prev => [...prev, `❌ Verification Failed: ${data.error}`]);
      }
    } catch (error) {
      setStatus('ERROR');
      setLogs(prev => [...prev, '❌ Network Error: Could not reach verification server.']);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#0a0a0a] text-white overflow-hidden">
      {/* Header */}
      <nav className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-[#0a0a0a]/80 backdrop-blur-md">
        <Link href="/courses/solana-101" className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors">
          <ChevronLeft size={20} /> <span className="text-xs font-mono uppercase font-bold">Back_To_Syllabus</span>
        </Link>
        <div className="flex items-center gap-4">
           <span className="text-xs font-mono text-white/40 border border-white/10 px-3 py-1 rounded-full">Final_Challenge</span>
        </div>
      </nav>

      {/* Main Split Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Content & PR Submission */}
        <div className="w-[40%] border-r border-white/10 flex flex-col bg-neutral-900/20 relative">
          <div className="flex-1 overflow-y-auto p-10">
            <article className="prose prose-invert max-w-none">
              <span className="text-[#9945FF] font-mono text-[10px] font-bold uppercase tracking-widest">Masterclass_Final</span>
              <h1 className="text-4xl font-syne font-black mt-4 mb-8">Deploy your first Ping Program</h1>
              <p className="text-neutral-400 leading-relaxed">
                To complete this course and earn your Soulbound NFT, you must submit a Pull Request to the Superteam Academy repository containing your Rust program.
              </p>
              <div className="mt-8 p-6 bg-[#14F195]/5 border border-[#14F195]/20 rounded-2xl">
                <h4 className="text-[#14F195] font-bold text-sm mb-2">Proof of Build Required:</h4>
                <ul className="text-xs space-y-2 text-neutral-300 font-mono">
                  <li>• Fork the repository</li>
                  <li>• Write your Rust program in the editor</li>
                  <li>• Submit the PR URL below for instant verification</li>
                </ul>
              </div>
            </article>
          </div>

          {/* PR Submission Dock (Sticky Bottom) */}
          <div className="p-6 border-t border-white/10 bg-[#060608] flex flex-col gap-3">
             <label className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest flex items-center gap-2">
                <Github size={12}/> Submit_GitHub_PR_URL
             </label>
             <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="https://github.com/owner/repo/pull/1" 
                  value={prUrl}
                  onChange={(e) => setPrUrl(e.target.value)}
                  disabled={isSubmitting || status === 'SUCCESS'}
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm font-mono focus:outline-none focus:border-[#14F195] transition-colors disabled:opacity-50"
                />
                <button 
                  onClick={handleSubmitPR}
                  disabled={isSubmitting || prUrl.length < 10 || status === 'SUCCESS'}
                  className="px-6 py-3 bg-[#14F195] text-black font-black text-xs uppercase tracking-widest rounded-lg disabled:opacity-50 disabled:bg-neutral-700 disabled:text-neutral-500 hover:scale-105 transition-all flex items-center justify-center min-w-[140px]"
                >
                  {isSubmitting ? 'VERIFYING...' : status === 'SUCCESS' ? 'VERIFIED' : 'SUBMIT_PR'}
                </button>
             </div>
          </div>
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
              options={{ fontSize: 16, fontFamily: 'JetBrains Mono', minimap: { enabled: false }, padding: { top: 20 }, smoothScrolling: true }}
            />
          </div>
          <div className="h-[35%]">
            <Terminal logs={logs} status={status} />
          </div>
        </div>
      </div>
    </div>
  );
}
EOF

echo "✅ FRONTEND-BACKEND BRIDGE DEPLOYED!"
echo "🚀 Run 'npm run dev' and visit /courses/solana-101/lesson-1 to test the PR Submission."