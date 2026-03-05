'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, PlayCircle, Zap, ShieldAlert, Clock } from 'lucide-react';

interface Course {
  id: string; title: string; difficulty: string; xp: number; duration: string;
}

export const HorizontalRow = ({ title, courses }: { title: string, courses: Course[] }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      scrollRef.current.scrollTo({ left: direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full py-8 pl-12 group">
      <h2 className="text-xl font-syne font-bold text-white mb-4 flex items-center gap-2">
        {title} <ChevronRight size={20} className="text-neutral-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:text-white" />
      </h2>

      <button onClick={() => scroll('left')} className="absolute left-0 top-1/2 -translate-y-1/2 z-20 h-full px-2 bg-gradient-to-r from-[#060608] to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        <ChevronLeft size={40} className="text-white hover:scale-125 transition-transform" />
      </button>

      <div ref={scrollRef} className="flex gap-4 overflow-x-auto scroll-smooth pb-10 pt-4 pr-12 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {courses.map((course) => (
          <motion.div key={course.id} whileHover={{ scale: 1.1, zIndex: 30 }} className="relative flex-none w-[280px] h-[160px] rounded-lg bg-neutral-900 border border-white/10 cursor-pointer overflow-hidden group/card shadow-xl">
            <div className="absolute inset-0 p-4 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10">
              <h3 className="text-white font-bold font-syne leading-tight">{course.title}</h3>
            </div>
            <div className="absolute inset-0 bg-[#0C0C10] p-4 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 z-20 flex flex-col justify-between">
              <div>
                <h3 className="text-white font-bold text-sm mb-2 line-clamp-2">{course.title}</h3>
                <div className="flex flex-wrap gap-2 text-[10px] font-mono text-white/60">
                  <span className="flex items-center gap-1 text-[#14F195]"><Zap size={10}/> {course.xp} XP</span>
                  <span className="flex items-center gap-1"><ShieldAlert size={10}/> {course.difficulty}</span>
                  <span className="flex items-center gap-1"><Clock size={10}/> {course.duration}</span>
                </div>
              </div>
              <button className="w-full flex items-center justify-center gap-2 py-2 bg-white text-black text-xs font-bold rounded hover:bg-[#14F195] transition-colors mt-2">
                <PlayCircle size={14} /> QUICK_PLAY
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <button onClick={() => scroll('right')} className="absolute right-0 top-1/2 -translate-y-1/2 z-20 h-full px-2 bg-gradient-to-l from-[#060608] to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        <ChevronRight size={40} className="text-white hover:scale-125 transition-transform" />
      </button>
    </div>
  );
};
