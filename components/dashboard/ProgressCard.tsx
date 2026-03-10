'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface ProgressCardProps {
  courseTitle: string;
  courseSlug: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  progress: number;
  completedLessons: number;
  totalLessons: number;
  nextLessonId?: string;
}

const diffColors: Record<string, string> = {
  BEGINNER: 'text-green-400',
  INTERMEDIATE: 'text-yellow-400',
  ADVANCED: 'text-red-400',
};

export default function ProgressCard({
  courseTitle, courseSlug, difficulty, progress, completedLessons, totalLessons, nextLessonId,
}: ProgressCardProps) {
  return (
    <motion.div whileHover={{ y: -4 }} className="p-6 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-display font-bold text-white line-clamp-1">{courseTitle}</h3>
          <span className={`text-xs font-bold ${diffColors[difficulty]}`}>{difficulty}</span>
        </div>
        <span className="text-2xl font-mono font-bold text-[#00C896]">{progress}%</span>
      </div>

      <div className="h-2 rounded-full bg-white/10 overflow-hidden mb-3">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#00C896] to-[#9945FF] transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="text-xs text-white/40 mb-4">
        {completedLessons} of {totalLessons} lessons completed
      </p>

      {nextLessonId && progress < 100 ? (
        <Link
          href={`/courses/${courseSlug}/lessons/${nextLessonId}`}
          className="inline-block px-5 py-2.5 rounded-xl bg-[#00C896]/10 border border-[#00C896]/20 text-[#00C896] text-sm font-bold hover:bg-[#00C896]/20 transition-colors"
        >
          Continue Learning
        </Link>
      ) : progress === 100 ? (
        <span className="inline-block px-5 py-2.5 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-bold">
          Completed!
        </span>
      ) : null}
    </motion.div>
  );
}
