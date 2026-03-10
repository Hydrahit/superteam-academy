'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface CourseCardProps {
  title: string;
  slug: string;
  description: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  lessonCount: number;
  duration: string;
  thumbnail?: string;
  progress?: number;
}

const difficultyConfig = {
  BEGINNER: { label: 'Beginner', color: 'bg-green-500/20 text-green-400 border-green-500/30' },
  INTERMEDIATE: { label: 'Intermediate', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
  ADVANCED: { label: 'Advanced', color: 'bg-red-500/20 text-red-400 border-red-500/30' },
};

export default function CourseCard({
  title, slug, description, difficulty, lessonCount, duration, thumbnail, progress,
}: CourseCardProps) {
  const diff = difficultyConfig[difficulty];

  return (
    <motion.div whileHover={{ y: -6, scale: 1.02 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
      <Link href={`/courses/${slug}`}>
        <div className="group relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm overflow-hidden hover:border-[#00C896]/40 transition-all duration-300">
          <div className="relative h-44 bg-gradient-to-br from-[#9945FF]/20 to-[#00C896]/20 flex items-center justify-center overflow-hidden">
            {thumbnail ? (
              <img src={thumbnail} alt={title} className="object-cover w-full h-full" />
            ) : (
              <div className="text-5xl opacity-60">
                {difficulty === 'BEGINNER' ? '\u{1F331}' : difficulty === 'INTERMEDIATE' ? '\u{1F525}' : '\u{1F48E}'}
              </div>
            )}
            <span className={`absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full border ${diff.color}`}>
              {diff.label}
            </span>
          </div>
          <div className="p-6 space-y-3">
            <h3 className="text-lg font-display font-bold text-white group-hover:text-[#00C896] transition-colors line-clamp-1">
              {title}
            </h3>
            <p className="text-sm text-white/50 line-clamp-2 leading-relaxed">{description}</p>
            <div className="flex items-center gap-4 text-xs text-white/40 pt-1">
              <span>{lessonCount} lessons</span>
              <span>{duration}</span>
            </div>
            {progress !== undefined && (
              <div className="pt-2">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-white/40">Progress</span>
                  <span className="text-[#00C896] font-mono font-bold">{progress}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#00C896] to-[#9945FF] transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
