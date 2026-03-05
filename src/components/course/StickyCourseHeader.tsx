'use client';

import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Play, Zap } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/src/lib/utils';

export const StickyCourseHeader = ({ title, xp, slug }: { title: string; xp: number; slug: string }) => {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsVisible(latest > 400); // Trigger when hero section is passed
  });

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-40 bg-[#060608]/90 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex items-center justify-between"
    >
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-syne font-bold text-white truncate max-w-md">{title}</h2>
        <span className="hidden md:flex items-center gap-1 text-[10px] font-mono font-bold text-[#14F195] bg-[#14F195]/10 px-2 py-1 rounded-full border border-[#14F195]/20">
          <Zap size={12} className="fill-current" /> +{xp} XP REWARD
        </span>
      </div>
      
      <Link href={`/courses/${slug}/lesson-1`} className="flex items-center gap-2 px-6 py-2.5 bg-[#14F195] text-black font-bold text-xs uppercase tracking-widest rounded-lg hover:scale-105 transition-transform shadow-[0_0_20px_rgba(20,241,149,0.2)]">
        <Play size={14} className="fill-current" /> Enroll_Now
      </Link>
    </motion.div>
  );
};
