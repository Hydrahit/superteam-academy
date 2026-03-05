'use client';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';
import { Wallet, ChevronLeft } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
// FIX: Using our smart centralized router instead of next/navigation
import { useRouter } from '@/lib/navigation';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';

export const Navbar = () => {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const { user, bindWallet, isWalletConnected } = useAuth();
  const router = useRouter();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 50));

  return (
    <motion.nav className={cn(
      "fixed top-0 w-full z-50 px-8 py-4 flex justify-between items-center transition-all duration-300", 
      scrolled ? "bg-[#060608]/90 backdrop-blur-md border-b border-white/10" : "bg-transparent"
    )}>
      <div className="flex items-center gap-6">
        {/* Smart router automatically knows to go to /en or /es */}
        <button onClick={() => router.push('/')} className="text-white/50 hover:text-white transition-colors">
          <ChevronLeft size={24} />
        </button>
        <button onClick={() => router.push('/')} className="text-xl font-syne font-black text-white italic tracking-tighter hover:scale-105 transition-transform">
          SUPERTEAM<span className="text-[#14F195]">ACADEMY</span>
        </button>
      </div>
      
      <div className="flex items-center gap-4">
        <LanguageSwitcher />
        <button 
          onClick={bindWallet} 
          className={cn(
            "px-6 py-2 rounded-full font-bold text-[10px] tracking-widest uppercase flex items-center gap-2 border transition-all", 
            isWalletConnected 
              ? "bg-[#14F195]/10 border-[#14F195]/50 text-[#14F195]" 
              : "bg-white/5 border-white/20 text-white hover:border-[#14F195] hover:shadow-[0_0_15px_rgba(20,241,149,0.3)]"
          )}
        >
          <Wallet size={14} /> {isWalletConnected ? 'Wallet_Linked' : 'Bind_Wallet'}
        </button>
      </div>
    </motion.nav>
  );
};
