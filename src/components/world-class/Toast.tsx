'use client';
import { motion, AnimatePresence } from 'framer-motion';

export const AchievementToast = ({ message, visible }: { message: string, visible: boolean }) => (
  <AnimatePresence>
    {visible && (
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="fixed bottom-10 right-10 bg-[#00FF94] text-black px-6 py-4 rounded-xl font-syne font-bold flex items-center gap-3 shadow-[0_0_40px_rgba(0,255,148,0.4)]"
      >
        <span className="text-xl">🏆</span> {message}
      </motion.div>
    )}
  </AnimatePresence>
);