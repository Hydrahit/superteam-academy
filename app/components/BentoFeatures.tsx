'use client';

import { motion } from 'framer-motion';
import { Fingerprint, ShieldCheck, Trophy, Flame } from 'lucide-react';

const features = [
  {
    title: 'Hybrid Authentication',
    description: 'Seamlessly link your Google account (Web2) with your Phantom Wallet (Web3). Zero friction onboarding.',
    icon: Fingerprint,
    colSpan: 'md:col-span-2 lg:col-span-2',
    accent: 'group-hover:border-[#14F195]/50',
  },
  {
    title: 'Proof of Knowledge',
    description: 'Every milestone verified on-chain via Ed25519 Cryptographic Signatures.',
    icon: ShieldCheck,
    colSpan: 'md:col-span-1 lg:col-span-1',
    accent: 'group-hover:border-[#9945FF]/50',
  },
  {
    title: 'Real-Time Leaderboards',
    description: 'Climb the ranks globally. Your XP is synchronized instantly via secure RPCs.',
    icon: Trophy,
    colSpan: 'md:col-span-1 lg:col-span-1',
    accent: 'group-hover:border-[#14F195]/50',
  },
  {
    title: 'Daily Streaks & Gamification',
    description: 'Maintain your learning streak, level up your developer profile, and dominate the Solana ecosystem.',
    icon: Flame,
    colSpan: 'md:col-span-2 lg:col-span-2',
    accent: 'group-hover:border-[#9945FF]/50',
  },
];

export default function BentoFeatures() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold font-syne mb-4">Built for the Modern Builder</h2>
        <p className="text-neutral-400 max-w-2xl mx-auto">Experience a learning platform where premium design meets cryptographic integrity.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[250px]">
        {features.map((feat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`group relative p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden transition-all duration-300 hover:bg-white/10 hover:-translate-y-1 ${feat.colSpan} ${feat.accent}`}
          >
            <div className="absolute -inset-px bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl pointer-events-none" />
            
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
                <feat.icon className="w-6 h-6 text-white group-hover:text-[#14F195] transition-colors" />
              </div>
              <div>
                <h3 className="text-2xl font-bold font-syne mb-2">{feat.title}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">{feat.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
