'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, LogOut, ChevronLeft, Link as LinkIcon } from 'lucide-react';
import { useRouter } from '@/lib/navigation';
import { useAuth } from '@/hooks/useAuth';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';

export const Navbar = () => {
  const router = useRouter();
  const { user, isLoggedIn, signOut, isWalletConnected, publicKey, bindWalletToProfile } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 w-full z-[100] px-6 py-4 flex justify-between items-center transition-all duration-500",
      scrolled ? "bg-black/80 backdrop-blur-2xl border-b border-white/10 py-3" : "bg-transparent"
    )}>
      {/* Left: Brand & Navigation */}
      <div className="flex items-center gap-6">
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={() => router.push('/')} 
          className="text-white/40 hover:text-[#14F195] transition-colors"
        >
          <ChevronLeft size={28} />
        </motion.button>
        
        {/* FIX: Removed the rogue 'Wall' typo from here */}
        <div 
          onClick={() => router.push('/')}
          className="flex flex-col cursor-pointer group"
        >
          <span className="text-xl font-syne font-black text-white italic tracking-tighter leading-none">
            SUPERTEAM<span className="text-[#14F195]">ACADEMY</span>
          </span>
          <span className="text-[8px] font-mono text-white/30 tracking-[0.3em] uppercase group-hover:text-[#14F195] transition-colors">
            Elite_Onboarding_V3
          </span>
        </div>
      </div>
      
      {/* Right: Controls & Identity */}
      <div className="flex items-center gap-4">
        <LanguageSwitcher />

        <AnimatePresence mode="wait">
          {isLoggedIn ? (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 bg-white/5 border border-white/10 p-1 pr-4 rounded-full"
            >
              <img 
                src={user?.user_metadata?.avatar_url} 
                className="w-8 h-8 rounded-full border border-[#14F195]/50" 
                alt="profile" 
              />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-white leading-none">
                  {user?.user_metadata?.full_name?.split(' ')[0]}
                </span>
                {isWalletConnected ? (
                  <span className="text-[8px] font-mono text-[#14F195] truncate w-16">
                    {publicKey?.toBase58().slice(0, 4)}...{publicKey?.toBase58().slice(-4)}
                  </span>
                ) : (
                  <button 
                    onClick={() => toast.error("Connect Wallet to Link Profile")}
                    className="text-[8px] font-mono text-white/40 hover:text-white transition-colors"
                  >
                    NO_WALLET
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 ml-2 border-l border-white/10 pl-2">
                {isWalletConnected && (
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={bindWalletToProfile}
                    className="text-white/40 hover:text-[#14F195] transition-colors"
                    title="Link Wallet to Progress"
                  >
                    <LinkIcon size={14} />
                  </motion.button>
                )}
                <button onClick={() => signOut()} className="text-white/40 hover:text-red-500 transition-colors">
                  <LogOut size={14} />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/')}
              className="px-6 py-2 bg-white text-black font-black text-[10px] tracking-widest uppercase rounded-full"
            >
              Get_Started
            </motion.button>
          )}
        </AnimatePresence>

        <motion.button 
          whileTap={{ scale: 0.95 }}
          className={cn(
            "px-6 py-2 rounded-full font-bold text-[10px] tracking-widest uppercase flex items-center gap-2 border transition-all",
            isWalletConnected 
              ? "bg-[#14F195]/10 border-[#14F195]/50 text-[#14F195] shadow-[0_0_15px_rgba(20,241,149,0.2)]" 
              : "bg-white/5 border-white/20 text-white hover:border-[#14F195]"
          )}
        >
          <Wallet size={14} /> 
          {isWalletConnected ? 'Wallet_Active' : 'Connect_Wallet'}
        </motion.button>
      </div>
    </nav>
  );
};
