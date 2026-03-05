'use client';

import { motion } from 'framer-motion';
import { Play, Info, Sparkles } from 'lucide-react';

export const FeaturedHero = () => {
  return (
    <section className="relative w-full h-[85vh] flex flex-col justify-end pb-24 px-12 overflow-hidden bg-[#060608]">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060608] via-[#060608]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060608] via-[#060608]/40 to-transparent" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-4xl space-y-6"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
          <Sparkles size={14} className="text-[#14F195]" />
          <span className="text-[10px] font-mono font-bold text-white uppercase tracking-widest">Ecosystem_Featured</span>
        </div>

        <h1 className="text-7xl md:text-8xl font-syne font-black text-white leading-[0.9] tracking-tighter">
          THE <span className="text-[#9945FF]">RUST</span> <br /> MASTERCLASS.
        </h1>
        
        <p className="text-lg text-neutral-400 max-w-xl font-medium leading-relaxed">
          Dive deep into memory safety, ownership, and building blazing fast smart contracts on the Solana SVM. The definitive path from zero to elite builder.
        </p>

        <div className="flex items-center gap-4 pt-4">
          <button className="flex items-center gap-2 px-8 py-4 bg-[#14F195] text-black rounded-lg font-bold hover:scale-105 transition-transform shadow-[0_0_30px_rgba(20,241,149,0.3)]">
            <Play size={20} className="fill-current" /> START_COURSE
          </button>
          <button className="flex items-center gap-2 px-8 py-4 bg-white/10 text-white rounded-lg font-bold border border-white/20 backdrop-blur-md hover:bg-white/20 transition-all">
            <Info size={20} /> MORE_INFO
          </button>
        </div>
      </motion.div>
    </section>
  );
};
