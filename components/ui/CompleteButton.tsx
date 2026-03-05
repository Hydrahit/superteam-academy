'use client';
import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';
import { CheckCircle2 } from 'lucide-react';

export const CompleteButton = ({ lessonId, xp }: { lessonId: string, xp: number }) => {
  const [isCompleting, setIsCompleting] = useState(false);
  const supabase = createClientComponentClient();

  const completeLesson = async () => {
    setIsCompleting(true);
    const toastId = toast.loading('Verifying completion...');

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Please log in to claim XP.");

      const { data, error } = await supabase.rpc('complete_lesson', {
        p_user_id: session.user.id, p_lesson_id: lessonId, p_xp_reward: xp
      });

      if (error) throw error;
      
      if (data?.success) {
        toast.success(`+${xp} XP Earned! Level ${data.level}`, { id: toastId, icon: '⚡' });
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#14F195', '#9945FF'] });
      } else {
        toast('Already completed!', { id: toastId, icon: 'ℹ️' });
      }
    } catch (error: any) {
      toast.error(error.message, { id: toastId });
    } finally {
      setIsCompleting(false);
    }
  };

  return (
    <motion.button 
      whileTap={{ scale: 0.95 }} 
      onClick={completeLesson} 
      disabled={isCompleting} 
      className="flex items-center gap-2 px-8 py-4 bg-[#14F195] text-black font-black text-sm uppercase tracking-widest rounded-xl hover:shadow-[0_0_20px_rgba(20,241,149,0.3)] disabled:opacity-50 transition-all"
    >
      <CheckCircle2 size={20} /> {isCompleting ? 'VERIFYING...' : 'COMPLETE & CLAIM XP'}
    </motion.button>
  );
};
