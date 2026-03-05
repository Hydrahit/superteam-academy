'use client';

import { motion } from 'framer-motion';

const levels = [
  { lv: 0, xp: "0", label: "Genesis", color: "text-neutral-500", border: "border-neutral-500", bg: "bg-neutral-500" },
  { lv: 1, xp: "100", label: "Initiate", color: "text-[#00E5FF]", border: "border-[#00E5FF]", bg: "bg-[#00E5FF]" },
  { lv: 3, xp: "900", label: "Builder", color: "text-[#A78BFA]", border: "border-[#A78BFA]", bg: "bg-[#A78BFA]" },
  { lv: 5, xp: "2,500", label: "Deployer", color: "text-[#FFE500]", border: "border-[#FFE500]", bg: "bg-[#FFE500]" },
  { lv: 10, xp: "10,000", label: "Architect", color: "text-[#14F195]", border: "border-[#14F195]", bg: "bg-[#14F195]" },
];

export default function LevelProgression() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto text-center relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00E5FF]/[0.02] to-transparent pointer-events-none" />
      
      <div className="relative z-10 mb-16">
        <p className="text-[#FFE500] font-mono text-xs uppercase tracking-widest mb-3 opacity-80">// Progression</p>
        <h2 className="text-4xl md:text-5xl font-bold font-syne text-white mb-6">Your level lives on-chain</h2>
        <div className="inline-block bg-[#00E5FF]/5 border border-[#00E5FF]/20 px-6 py-3 rounded-lg">
          <code className="text-[#00E5FF] font-mono text-sm tracking-wide">Level = ⌊ √(XP ÷ 100) ⌋</code>
        </div>
      </div>

      <div className="flex flex-wrap items-end justify-center gap-6 relative z-10 min-h-[250px]">
        {levels.map((l, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex flex-col items-center gap-4"
          >
            <div 
              className={`w-16 flex items-center justify-center relative overflow-hidden rounded-t-lg border-t border-x ${l.border}/30 bg-gradient-to-b from-${l.bg}/20 to-transparent`}
              style={{ height: `${60 + (i * 40)}px` }}
            >
              <span className={`font-mono font-bold text-sm z-10 ${l.color}`}>Lv.{l.lv}</span>
              <motion.div 
                initial={{ height: 0 }}
                whileInView={{ height: '40%' }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 + (i * 0.1) }}
                className={`absolute bottom-0 left-0 w-full bg-gradient-to-t from-${l.bg}/50 to-transparent`}
              />
            </div>
            <div>
              <div className={`font-syne font-bold text-sm mb-1 ${l.color}`}>{l.label}</div>
              <div className="font-mono text-[10px] text-neutral-500">{l.xp} XP</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
