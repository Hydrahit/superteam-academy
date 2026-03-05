'use client';

import { motion } from 'framer-motion';
import { ArrowRight, BookOpen } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
      <div className="flex-1 text-center lg:text-left">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-[#14F195] mb-6 tracking-wide">
            SUPERTEAM ACADEMY V2.0
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-syne leading-tight mb-6">
            Master Web3. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#14F195] to-[#9945FF]">
              Earn Your Place on the Leaderboard.
            </span>
          </h1>
          <p className="text-lg text-neutral-400 mb-10 max-w-2xl mx-auto lg:mx-0">
            The ultimate gamified academy for the Solana ecosystem. Learn seamlessly with Web2 ease, verify cryptographically with Web3 security.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <button className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#14F195] text-neutral-950 font-bold flex items-center justify-center gap-2 hover:bg-[#10c97b] transition-all shadow-[0_0_20px_rgba(20,241,149,0.3)] hover:shadow-[0_0_30px_rgba(20,241,149,0.5)] hover:-translate-y-1">
              Start Learning <ArrowRight className="w-5 h-5" />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-medium flex items-center justify-center gap-2 hover:bg-white/10 transition-all hover:-translate-y-1">
              Explore Curriculum <BookOpen className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="flex-1 w-full max-w-md lg:max-w-full relative"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <div className="aspect-square rounded-3xl bg-gradient-to-tr from-white/5 to-white/10 border border-white/10 backdrop-blur-xl flex items-center justify-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:32px_32px]" />
          <div className="w-48 h-48 rounded-full bg-gradient-to-r from-[#14F195] to-[#9945FF] blur-3xl opacity-50 animate-pulse" />
          <div className="absolute w-32 h-32 border-4 border-white/20 rounded-xl rotate-12 backdrop-blur-sm" />
          <div className="absolute w-40 h-40 border border-[#14F195]/50 rounded-full -rotate-12 backdrop-blur-md" />
        </div>
      </motion.div>
    </section>
  );
}
