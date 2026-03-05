'use client';

import { motion } from 'framer-motion';
import { Layers, Database, Zap, Triangle } from 'lucide-react';

export default function EcosystemStrip() {
  const partners = [
    { name: 'Solana', icon: Layers },
    { name: 'Supabase', icon: Database },
    { name: 'Vercel', icon: Triangle },
    { name: 'Next.js', icon: Zap },
  ];

  return (
    <section className="border-y border-white/5 bg-white/[0.02] backdrop-blur-sm py-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
        <p className="text-sm font-medium text-neutral-500 uppercase tracking-widest">
          Powered by the best in Web3
        </p>
        <div className="flex items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          {partners.map((partner, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-2"
            >
              <partner.icon className="w-6 h-6" />
              <span className="font-syne font-bold text-lg">{partner.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
