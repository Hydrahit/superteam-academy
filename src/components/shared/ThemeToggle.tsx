'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="fixed bottom-8 right-8 z-[100] p-4 rounded-full bg-white/5 dark:bg-black/20 border border-black/10 dark:border-white/10 backdrop-blur-xl shadow-2xl transition-all hover:scale-110"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 0 : 180 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        {theme === 'dark' ? (
          <Moon className="w-5 h-5 text-[#A78BFA]" />
        ) : (
          <Sun className="w-5 h-5 text-[#FFE500]" />
        )}
      </motion.div>
    </button>
  );
};