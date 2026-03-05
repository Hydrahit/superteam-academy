'use client';

import { motion } from 'framer-motion';

const courses = [
  { track: "Foundation", title: "Solana Foundations", lessons: 12, xp: 600, level: "Beginner", pct: 73, accent: "from-[#00E5FF]/20 to-transparent", border: "hover:border-[#00E5FF]/50", shadow: "hover:shadow-[0_0_30px_rgba(0,229,255,0.15)]", color: "text-[#00E5FF]", langs: ["EN", "PT", "ES"] },
  { track: "Programs", title: "Anchor Development", lessons: 18, xp: 900, level: "Intermediate", pct: 41, accent: "from-[#FFE500]/20 to-transparent", border: "hover:border-[#FFE500]/50", shadow: "hover:shadow-[0_0_30px_rgba(255,229,0,0.15)]", color: "text-[#FFE500]", langs: ["EN", "PT"] },
  { track: "Tokens", title: "Token-2022 Extensions", lessons: 14, xp: 700, level: "Advanced", pct: 28, accent: "from-[#A78BFA]/20 to-transparent", border: "hover:border-[#A78BFA]/50", shadow: "hover:shadow-[0_0_30px_rgba(167,139,250,0.15)]", color: "text-[#A78BFA]", langs: ["EN"] },
  { track: "DeFi", title: "DeFi on Solana", lessons: 20, xp: 1000, level: "Expert", pct: 15, accent: "from-[#00FF94]/20 to-transparent", border: "hover:border-[#00FF94]/50", shadow: "hover:shadow-[0_0_30px_rgba(0,255,148,0.15)]", color: "text-[#00FF94]", langs: ["EN", "ES"] },
];

export default function CoursesGrid() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <p className="text-[#FFE500] font-mono text-xs uppercase tracking-widest mb-3 opacity-80">// Curriculum</p>
          <h2 className="text-4xl md:text-5xl font-bold font-syne text-white">Pick your track</h2>
        </div>
        <button className="text-neutral-400 font-mono text-sm hover:text-[#00E5FF] transition-colors">view_all →</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {courses.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`relative p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden transition-all duration-300 ${c.border} ${c.shadow} hover:-translate-y-1 group`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${c.accent} opacity-0 group-hover:opacity-100 transition-opacity`} />
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-center mb-6">
                <span className={`text-[10px] font-mono font-bold tracking-widest uppercase px-2 py-1 rounded bg-white/5 border border-white/10 ${c.color}`}>
                  {c.track}
                </span>
                <span className="text-xs font-mono text-neutral-500">{c.level}</span>
              </div>
              
              <h3 className="text-xl font-bold font-syne text-white mb-6 leading-snug">{c.title}</h3>
              
              <div className="mt-auto mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Completion</span>
                  <span className={`text-xs font-mono ${c.color}`}>{c.pct}%</span>
                </div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${c.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className={`h-full bg-current ${c.color}`}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-white/10">
                <div className="flex gap-3 text-xs font-mono text-neutral-400">
                  <span>{c.lessons} lessons</span>
                  <span className="text-[#FFE500]">⬡ {c.xp} XP</span>
                </div>
                <div className="flex gap-1">
                  {c.langs.map(l => (
                    <span key={l} className="text-[9px] font-mono text-neutral-500 border border-white/10 px-1.5 py-0.5 rounded">{l}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
