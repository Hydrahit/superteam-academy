'use client';

import { motion } from 'framer-motion';

const steps = [
  { num: '01', title: 'Authenticate', desc: 'Sign in with Google to securely create your base profile.' },
  { num: '02', title: 'Bind Wallet', desc: 'Connect your Solana wallet to establish your on-chain identity.' },
  { num: '03', title: 'Learn & Climb', desc: 'Complete modules, earn verified XP, and dominate the leaderboard.' },
];

export default function HowItWorks() {
  return (
    <section className="py-24 px-6 bg-white/[0.02] border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold font-syne text-center mb-16">Your Path to Mastery</h2>
        
        <div className="flex flex-col md:flex-row justify-between gap-12 relative">
          <div className="hidden md:block absolute top-12 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="flex-1 relative z-10 flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 rounded-full bg-neutral-900 border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] flex items-center justify-center mb-6 group hover:border-[#9945FF]/50 transition-colors">
                <span className="text-3xl font-bold font-syne text-[#14F195] group-hover:text-[#9945FF] transition-colors">{step.num}</span>
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-neutral-400 text-sm max-w-[250px]">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
