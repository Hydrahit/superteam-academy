'use client';

import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';

export default function CallToAction() {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#9945FF]/5" />
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center relative z-10"
      >
        <h2 className="text-4xl md:text-6xl font-bold font-syne mb-8 leading-tight">
          Ready to join the next generation of builders?
        </h2>
        
        <button className="group px-10 py-5 rounded-2xl bg-white text-neutral-950 font-bold text-lg flex items-center justify-center gap-3 mx-auto hover:bg-neutral-200 transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(255,255,255,0.2)] hover:-translate-y-1">
          Launch App 
          <Rocket className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </button>
      </motion.div>
    </section>
  );
}
