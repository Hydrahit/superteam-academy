'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Lock, Unlock, CheckCircle2, Zap, PlayCircle, Terminal } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import Link from 'next/link';

interface Lesson {
  id: string; title: string; type: 'video' | 'code'; xp: number; isLocked: boolean; isCompleted?: boolean;
}

interface Module {
  id: string; title: string; lessons: Lesson[];
}

export const CurriculumAccordion = ({ modules, courseSlug }: { modules: Module[], courseSlug: string }) => {
  const [openModule, setOpenModule] = useState<string | null>(modules[0].id);

  return (
    <div className="space-y-4">
      {modules.map((mod, idx) => (
        <div key={mod.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
          {/* Accordion Header */}
          <button
            onClick={() => setOpenModule(openModule === mod.id ? null : mod.id)}
            className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Module_0{idx + 1}</span>
              <h3 className="text-lg font-bold text-white font-syne">{mod.title}</h3>
            </div>
            <ChevronDown className={cn("text-neutral-500 transition-transform duration-300", openModule === mod.id && "rotate-180")} />
          </button>

          {/* Accordion Body */}
          <AnimatePresence>
            {openModule === mod.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="border-t border-white/5 bg-[#0a0a0c]"
              >
                <div className="p-2 space-y-1">
                  {mod.lessons.map((lesson, lIdx) => (
                    <div key={lesson.id} className={cn(
                      "flex items-center justify-between p-4 rounded-xl transition-all",
                      lesson.isLocked ? "opacity-50 grayscale cursor-not-allowed" : "hover:bg-white/5 cursor-pointer group"
                    )}>
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                          {lesson.isCompleted ? <CheckCircle2 size={14} className="text-[#14F195]" /> : 
                           lesson.isLocked ? <Lock size={14} className="text-neutral-500" /> : 
                           <Unlock size={14} className="text-white group-hover:text-[#14F195] transition-colors" />}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white group-hover:text-[#14F195] transition-colors flex items-center gap-2">
                            {lesson.title}
                            {lesson.type === 'code' ? <Terminal size={12} className="text-[#9945FF]" /> : <PlayCircle size={12} className="text-cyan-400" />}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1 text-[10px] font-mono font-bold text-[#FFE500]">
                          <Zap size={12} className="fill-current" /> {lesson.xp}
                        </span>
                        {!lesson.isLocked && (
                          <Link href={`/courses/${courseSlug}/${lesson.id}`} className="px-4 py-1.5 bg-white/10 text-white text-[10px] font-bold uppercase tracking-widest rounded hover:bg-white hover:text-black transition-colors opacity-0 group-hover:opacity-100">
                            Start
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};
