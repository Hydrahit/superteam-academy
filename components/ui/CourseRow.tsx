'use client';
import { motion } from 'framer-motion';
// FIX: Using our smart centralized router
import { useRouter } from '@/lib/navigation';
import { PlayCircle, Zap } from 'lucide-react';

export const CourseRow = ({ title, courses }: { title: string, courses: any[] }) => {
  const router = useRouter();

  return (
    <div className="pl-12 py-8 group">
      <h2 className="text-2xl font-syne font-bold text-white mb-6">{title}</h2>
      <div className="flex gap-4 overflow-x-auto pb-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {courses.map(course => (
          <motion.div 
            key={course.id} 
            whileHover={{ scale: 1.05, y: -5, zIndex: 10 }} 
            whileTap={{ scale: 0.98 }}
            // FIX: Clean path. The smart router auto-prepends the correct language!
            onClick={() => router.push(`/courses/${course.slug}`)}
            className="relative flex-none w-[320px] h-[180px] bg-neutral-900 border border-white/10 rounded-2xl overflow-hidden cursor-pointer shadow-xl hover:border-[#14F195]/50 transition-colors"
          >
            <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black to-transparent z-10">
              <h3 className="text-white font-bold text-lg font-syne leading-tight">{course.title}</h3>
            </div>
            
            <div className="absolute inset-0 bg-[#0C0C10]/95 p-6 opacity-0 hover:opacity-100 transition-opacity duration-300 z-20 flex flex-col justify-between backdrop-blur-sm">
               <div>
                 <p className="text-sm text-neutral-300 line-clamp-2">{course.desc || 'Master this course on Solana.'}</p>
                 <span className="flex items-center gap-1 text-[#14F195] font-bold mt-3 text-xs uppercase tracking-widest"><Zap size={14}/> +{course.xp || 500} XP</span>
               </div>
               <button className="w-full py-2 bg-white text-black text-xs font-black uppercase rounded hover:bg-[#14F195] transition-colors flex items-center justify-center gap-2">
                 <PlayCircle size={16} /> Enter Course
               </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
