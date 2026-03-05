'use client';
import { motion } from 'framer-motion';
import { Zap, Play } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative h-[80vh] flex flex-col justify-center items-start px-12 overflow-hidden bg-[#0a0a0a]">
      {/* Parallax Background Effect */}
      <motion.div 
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop')] bg-cover bg-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent z-10" />

      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-20 max-w-3xl"
      >
        <span className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-mono font-bold text-[#14F195] bg-[#14F195]/10 border border-[#14F195]/20 rounded-full uppercase tracking-widest">
          <Zap size={14} className="fill-current" /> Ecosystem Leaderboard Live
        </span>
        <h1 className="text-7xl font-black font-syne tracking-tighter leading-[0.9] text-white mb-6">
          MASTER THE <br /> <span className="text-[#9945FF]">SOLANA</span> ENGINE.
        </h1>
        <p className="text-xl text-neutral-400 font-medium mb-10 max-w-xl">
          The elite developer academy. Learn Rust, build Anchor programs, and earn soulbound credentials that matter.
        </p>
        <div className="flex gap-4">
          <button className="px-8 py-4 bg-[#14F195] text-black font-bold rounded-xl shadow-[0_0_20px_rgba(20,241,149,0.4)] hover:scale-105 transition-transform flex items-center gap-2">
            <Play size={18} fill="black" /> START_BUILDING
          </button>
          <button className="px-8 py-4 bg-white/5 border border-white/10 backdrop-blur-md text-white font-bold rounded-xl hover:bg-white/10 transition-all">
            VIEW_TRAILER
          </button>
        </div>
      </motion.div>
    </section>
  );
};
