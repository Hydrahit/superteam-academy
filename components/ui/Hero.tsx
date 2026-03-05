'use client';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

export const Hero = ({ title, sub }: { title: string, sub: string }) => (
  <section className="relative h-[80vh] w-full flex flex-col justify-end pb-24 px-12 bg-[#060608]">
    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832')] bg-cover bg-center opacity-30" />
    <div className="absolute inset-0 bg-gradient-to-t from-[#060608] via-[#060608]/50 to-transparent" />
    <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="relative z-10 max-w-3xl space-y-6">
      <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-white border border-white/20">Featured Track</span>
      <h1 className="text-6xl md:text-8xl font-syne font-black text-white leading-[0.9] tracking-tighter">{title}</h1>
      <p className="text-lg text-neutral-400 font-medium">{sub}</p>
      <button className="flex items-center gap-2 px-8 py-4 bg-[#14F195] text-black rounded-lg font-bold hover:scale-105 transition-transform"><Play size={20} className="fill-current"/> START_COURSE</button>
    </motion.div>
  </section>
);
