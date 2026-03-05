'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation'; 
import { useLocale } from 'next-intl';
import { PlayCircle, Zap } from 'lucide-react';

interface Course {
  id: string;
  slug: string;
  title: string;
  xp: number;
  desc?: string;
}

export const CourseRow = ({ title, courses }: { title: string, courses: Course[] }) => {
  const router = useRouter();
  const locale = useLocale();

  const handleNavigate = (slug: string) => {
    console.log(`🎯 Navigating to: /${locale}/courses/${slug}`);
    router.push(`/${locale}/courses/${slug}`);
  };

  return (
    <div className="pl-12 py-8 group">
      <h2 className="text-2xl font-syne font-bold text-white mb-6 uppercase tracking-tight">{title}</h2>
      <div className="flex gap-6 overflow-x-auto pb-8 no-scrollbar">
        {courses.map((course) => (
          <motion.div 
            key={course.id} 
            whileHover={{ scale: 1.05, y: -5 }} 
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNavigate(course.slug)}
            className="relative flex-none w-[350px] h-[200px] bg-[#121214] border border-white/5 rounded-3xl overflow-hidden cursor-pointer shadow-2xl hover:border-[#14F195]/40 transition-all duration-500"
          >
            {/* Background Aesthetic */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#14F195]/5 to-transparent opacity-50" />
            
            <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
              <div className="flex items-center gap-2 mb-2 text-[#14F195]">
                <Zap size={14} className="fill-current" />
                <span className="text-[10px] font-black tracking-[0.2em] uppercase">{course.xp} XP REWARD</span>
              </div>
              <h3 className="text-white font-bold text-xl font-syne leading-tight group-hover:text-[#14F195] transition-colors">
                {course.title}
              </h3>
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm p-8 opacity-0 hover:opacity-100 transition-opacity duration-300 z-20 flex flex-col justify-center items-center gap-4">
               <p className="text-center text-sm text-white/70 italic">Click to enter the arena.</p>
               <div className="p-3 bg-white text-black rounded-full">
                 <PlayCircle size={32} />
               </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
