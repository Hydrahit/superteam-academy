'use client';
import { useState } from 'react';
import Editor from '@monaco-editor/react';
import ReactMarkdown from 'react-markdown';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';
import { Play } from 'lucide-react';

const MD_CONTENT = `# Building on Solana\nWrite a basic Rust program to handle a transaction instruction. Ensure your imports use \`anchor_lang::prelude::*\`.`;

export default function LessonIDE({ params }: { params: { lessonId: string } }) {
  const [code, setCode] = useState('use anchor_lang::prelude::*;\n\ndeclare_id!("11111111111111111111111111111111");\n');
  const [loading, setLoading] = useState(false);
  const supabase = createClientComponentClient();

  const handleComplete = async () => {
    setLoading(true);
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) { toast.error("Log in to save progress."); setLoading(false); return; }

    const { data, error } = await supabase.rpc('complete_lesson', {
      p_user_id: session.user.id,
      p_lesson_id: params.lessonId,
      p_xp_reward: 100
    });

    if (data?.success) {
      toast.success(`+100 XP Earned! Level ${data.level}`);
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#14F195', '#9945FF'] });
    } else {
      toast(data?.message || 'Already completed!', { icon: 'ℹ️' });
    }
    setLoading(false);
  };

  return (
    <div className="flex h-screen bg-[#060608] pt-20">
      <div className="w-[40%] p-8 overflow-y-auto border-r border-white/10 prose prose-invert">
        <ReactMarkdown>{MD_CONTENT}</ReactMarkdown>
        <button onClick={handleComplete} disabled={loading} className="mt-8 px-6 py-3 bg-[#14F195] text-black font-bold rounded flex items-center gap-2 hover:scale-105 transition-all">
          <Play size={16} /> {loading ? 'VERIFYING...' : 'COMPLETE & CLAIM XP'}
        </button>
      </div>
      <div className="w-[60%]">
        <Editor height="100%" theme="vs-dark" language="rust" value={code} onChange={(v) => setCode(v||'')} options={{ minimap: { enabled: false }, fontSize: 16 }} />
      </div>
    </div>
  );
}
