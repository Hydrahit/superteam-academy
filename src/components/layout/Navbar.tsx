'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Wallet, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/src/lib/utils';

export const Navbar = () => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <motion.nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-colors duration-300 px-12 py-4 flex items-center justify-between",
        isScrolled ? "bg-[#060608]/90 backdrop-blur-md border-b border-white/10" : "bg-transparent"
      )}
    >
      <div className="flex items-center gap-8">
        <Link href="/" className="text-2xl font-syne font-black italic tracking-tighter text-white">
          SUPERTEAM_<span className="text-[#14F195]">ACADEMY</span>
        </Link>
        <div className="hidden md:flex items-center gap-2 text-xs font-mono text-neutral-400">
          <Link href="/" className="hover:text-white transition-colors">Academy</Link>
          <ChevronRight size={14} />
          <span className="text-white">Home</span>
        </div>
      </div>

      <button className="relative group px-6 py-2.5 bg-white/5 border border-[#14F195]/30 rounded-full flex items-center gap-2 overflow-hidden hover:border-[#14F195] transition-all">
        <div className="absolute inset-0 bg-[#14F195]/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
        <Wallet size={16} className="text-[#14F195] relative z-10" />
        <span className="text-xs font-bold text-white relative z-10 uppercase tracking-widest">Connect_Wallet</span>
        {/* Pulsing Dot */}
        <span className="absolute top-0 right-0 w-2 h-2 bg-[#14F195] rounded-full animate-ping" />
      </button>
    </motion.nav>
  );
};
