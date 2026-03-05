'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wallet, ChevronLeft } from 'lucide-react';
import { useRouter } from '@/lib/navigation';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { cn } from '@/lib/utils';

export const Navbar = () => {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 w-full z-[100] px-8 py-4 flex justify-between items-center transition-all duration-300",
      scrolled ? "bg-black/80 backdrop-blur-xl border-b border-white/10" : "bg-transparent"
    )}>
      <div className="flex items-center gap-6">
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={() => router.push('/')} 
          className="text-white/50 hover:text-white"
        >
          <ChevronLeft size={24} />
        </motion.button>
        <span 
          onClick={() => router.push('/')}
          className="text-xl font-syne font-black text-white italic tracking-tighter cursor-pointer"
        >
          SUPERTEAM<span className="text-[#14F195]">ACADEMY</span>
        </span>
      </div>
      
      <div className="flex items-center gap-4">
        <LanguageSwitcher />
        <motion.button 
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 rounded-full font-bold text-[10px] tracking-widest uppercase bg-white/5 border border-white/20 text-white hover:border-[#14F195] transition-all"
        >
          <Wallet size={14} className="inline mr-2" /> Connect_Wallet
        </motion.button>
      </div>
    </nav>
  );
};
