'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function EliteLanding() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <span className="px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono tracking-widest uppercase">
          V2.0 is Live • Solana Global
        </span>
        <h1 className="text-7xl md:text-9xl font-syne font-black tracking-tighter leading-none">
          LEVEL <span className="text-cyan-500 italic">UP.</span>
        </h1>
        <p className="max-w-2xl mx-auto text-neutral-400 font-mono text-sm md:text-base">
          Master the blockchain with soulbound rewards, real-time analytics, and an elite developer community.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center pt-8">
          <Link href="/dashboard" className="px-12 py-4 bg-white text-black font-syne font-bold rounded-full hover:bg-cyan-400 transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,229,255,0.4)]">
            ENTER_CONSOLE
          </Link>
          <Link href="/leaderboard" className="px-12 py-4 glass text-white font-syne font-bold rounded-full hover:bg-white/5 transition-all">
            VIEW_RANKINGS
          </Link>
        </div>
      </motion.div>
    </div>
  );
}