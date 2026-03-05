'use client';
import { motion } from 'framer-motion';
import { Clock, Zap, ShieldAlert, ArrowUpRight } from 'lucide-react';
// FIX: Using smart Link
import { Link } from '@/lib/navigation';

interface CatalogCardProps {
  slug: string; title: string; difficulty: string; xp: number; duration: string; tags: string[];
}

export const CatalogCard = ({ slug, title, difficulty, xp, duration, tags }: CatalogCardProps) => {
  return (
    <motion.div layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }} className="group flex flex-col justify-between h-[320px] bg-white/5 border border-white/10 rounded-[32px] p-6 hover:bg-white/10 transition-colors backdrop-blur-md relative overflow-hidden">
      <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0"><ArrowUpRight className="text-[#14F195]" size={24} /></div>
      <div>
        <div className="flex justify-between items-center mb-4">
          <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full border border-[#14F195]/30 text-[#14F195] bg-[#14F195]/10">{difficulty}</span>
          <span className="flex items-center gap-1 text-[10px] font-mono text-white/50"><Clock size={12} /> {duration}</span>
        </div>
        <h3 className="text-2xl font-syne font-bold text-white leading-tight mb-4">{title}</h3>
      </div>
      <div className="mt-auto pt-6 flex items-center justify-between border-t border-white/5">
        <div className="flex items-center gap-1 text-[#14F195]"><Zap size={16} className="fill-current" /><span className="font-black italic text-lg">{xp} XP</span></div>
        <Link href={`/courses/${slug}`} className="text-xs font-bold uppercase tracking-widest text-white hover:text-[#14F195] transition-colors">View_Syllabus</Link>
      </div>
    </motion.div>
  );
};
