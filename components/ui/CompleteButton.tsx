'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';
import { CheckCircle2 } from 'lucide-react';
import { getSupabaseBrowserClient } from '@/lib/supabaseClient';

interface CompleteButtonProps {
  lessonId: string;
  xp: number;
}

export const CompleteButton = ({ lessonId, xp }: CompleteButtonProps) => {
  const [isCompleting, setIsCompleting] = useState(false);

  const completeLesson = async () => {
    console.log(`[CompleteButton] Attempting to complete lesson: ${lessonId}`);
    setIsCompleting(true);
    const toastId = toast.loading('Verifying completion...');

    try {
      // 1. Guard Check: Throws immediately if .env.local keys are missing
      const supabase = getSupabaseBrowserClient();

      // 2. Auth Check
      const { data: { session }, error: authError } = await supabase.auth.getSession();
      if (authError) throw authError;
      if (!session) throw new Error("Please log in to claim XP.");

      // 3. Database RPC Call
      console.log(`[CompleteButton] Sending RPC request for user: ${session.user.id}`);
      const { data, error } = await supabase.rpc('complete_lesson', {
        p_user_id: session.user.id, 
        p_lesson_id: lessonId, 
        p_xp_reward: xp
      });

      if (error) throw error;
      
      // 4. Success UI Feedback
      if (data?.success) {
        console.log("[CompleteButton] RPC Success:", data);
        toast.success(`+${xp} XP Earned! Level ${data.level}`, { id: toastId, icon: '⚡' });
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#14F195', '#9945FF', '#ffffff'] });
      } else {
        console.log("[CompleteButton] RPC Info:", data?.message);
        toast('Already completed!', { id: toastId, icon: 'ℹ️' });
      }
      
    } catch (error: any) {
      console.error("[CompleteButton] Error caught:", error.message);
      
      // Smart Error Handling for the UI
      toast.error(
        error.message.includes('Missing Supabase Keys')
          ? 'Cannot verify: Environment keys missing!'
          : error.message,
        { id: toastId }
      );
    } finally {
      setIsCompleting(false);
    }
  };

  return (
    <motion.button 
      whileTap={{ scale: 0.95 }} 
      onClick={completeLesson} 
      disabled={isCompleting} 
      className="flex items-center justify-center gap-2 px-8 py-4 w-full md:w-auto bg-[#14F195] text-black font-black text-sm uppercase tracking-widest rounded-xl hover:shadow-[0_0_20px_rgba(20,241,149,0.3)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
    >
      <CheckCircle2 size={20} /> {isCompleting ? 'VERIFYING...' : 'COMPLETE & CLAIM XP'}
    </motion.button>
  );
};
