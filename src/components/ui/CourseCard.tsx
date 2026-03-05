'use client';
import { motion } from 'framer-motion';
import { Star, Clock, Zap } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface CourseCardProps {
  title: string;
  difficulty: string;
  xp: number;
  tags: string[];
}

export const CourseCard = ({ title, difficulty, xp, tags }: CourseCardProps) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.05, y: -5 }}
      className="relative group min-w-[300px] h-[400px] bg-white/5 border border-white/10 rounded-[32px] p-8 backdrop-blur-md overflow-hidden cursor-pointer"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#9945FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative z-10 h-full flex flex-col">
        <div className="flex justify-between items-start mb-6">
          <span className={cn(
            "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border",
            difficulty === 'Pro' ? "border-red-500/30 text-red-400 bg-red-500/10" : "border-[#14F195]/30 text-[#14F195] bg-[#14F195]/10"
          )}>
            {difficulty}
          </span>
          <div className="flex items-center gap-1 text-[#FFE500]">
            <Zap size={14} className="fill-current" />
            <span className="text-sm font-black italic">{xp} XP</span>
          </div>
        </div>

        <h3 className="text-2xl font-syne font-black text-white leading-tight mb-4 group-hover:text-[#14F195] transition-colors">
          {title}
        </h3>

        <div className="mt-auto flex flex-wrap gap-2">
          {tags.map(tag => (
            <span key={tag} className="text-[9px] font-mono text-white/40 uppercase border border-white/5 px-2 py-1 rounded">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
