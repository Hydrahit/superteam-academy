'use client';
import { useRef } from 'react';
import { motion } from 'framer-motion';

export const CourseRow = ({ title, courses }: { title: string, courses: any[] }) => {
  return (
    <div className="pl-12 py-8">
      <h2 className="text-2xl font-syne font-bold text-white mb-4">{title}</h2>
      <div className="flex gap-4 overflow-x-auto pb-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {courses.map(course => (
          <motion.div key={course.id} whileHover={{ scale: 1.05, zIndex: 10 }} className="relative flex-none w-[300px] h-[180px] bg-neutral-900 border border-white/10 rounded-xl overflow-hidden cursor-pointer group">
            <div className="absolute inset-0 p-4 flex flex-col justify-end bg-gradient-to-t from-black to-transparent z-10">
              <h3 className="text-white font-bold">{course.title}</h3>
            </div>
            {/* Quick Info Popup on Hover */}
            <div className="absolute inset-0 bg-[#0C0C10]/95 p-4 opacity-0 group-hover:opacity-100 transition-opacity z-20 flex flex-col justify-center">
               <p className="text-sm text-neutral-300">{course.desc}</p>
               <span className="text-[#14F195] font-bold mt-2">+{course.xp} XP</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
