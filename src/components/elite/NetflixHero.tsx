'use client';
import { motion } from 'framer-motion';
import { Play, Info } from 'lucide-react';

export default function NetflixHero() {
  return (
    <section className="relative h-[85vh] w-full flex items-center justify-start overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video autoPlay muted loop className="w-full h-full object-cover scale-110 blur-[2px] opacity-40">
          <source src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-blockchain-technology-34533-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060608] via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-4xl px-12 space-y-6">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
          <span className="text-cyan-400 font-mono tracking-[0.5em] uppercase text-xs mb-4 block">Original Series</span>
          <h1 className="text-8xl font-syne font-black text-white leading-none tracking-tighter">
            MASTER THE <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">SOLANA</span> ECOSYSTEM
          </h1>
          <p className="text-xl text-neutral-300 max-w-xl font-medium mt-6">
            The ultimate developer journey. From Hello World to High-Frequency Trading protocols. 
          </p>
          <div className="flex gap-4 pt-8">
            <button className="flex items-center gap-2 px-10 py-4 bg-white text-black rounded-lg font-bold hover:bg-neutral-200 transition-all scale-100 hover:scale-105">
              <Play className="fill-current" /> Start Learning
            </button>
            <button className="flex items-center gap-2 px-10 py-4 bg-white/10 text-white rounded-lg font-bold backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all">
              <Info /> Watch Trailer
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}