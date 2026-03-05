'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Trophy, PlayCircle } from 'lucide-react';

const allCourses = [
  { slug: "solana-foundations", track: "Foundation", title: "Solana Foundations", desc: "Master the core concepts of accounts, PDAs, and the Solana programming model.", lessons: 12, xp: 600, level: "Beginner", accent: "from-[#00E5FF]/20 to-transparent", border: "hover:border-[#00E5FF]/50", color: "text-[#00E5FF]" },
  { slug: "anchor-development", track: "Programs", title: "Anchor Development", desc: "Write secure and optimized smart contracts using the Anchor framework.", lessons: 18, xp: 900, level: "Intermediate", accent: "from-[#FFE500]/20 to-transparent", border: "hover:border-[#FFE500]/50", color: "text-[#FFE500]" },
  { slug: "token-2022", track: "Tokens", title: "Token-2022 Extensions", desc: "Learn how to mint and manage next-gen tokens with custom transfer hooks.", lessons: 14, xp: 700, level: "Advanced", accent: "from-[#A78BFA]/20 to-transparent", border: "hover:border-[#A78BFA]/50", color: "text-[#A78BFA]" },
  { slug: "defi-solana", track: "DeFi", title: "DeFi on Solana", desc: "Build AMMs, order books, and lending protocols from scratch.", lessons: 20, xp: 1000, level: "Expert", accent: "from-[#14F195]/20 to-transparent", border: "hover:border-[#14F195]/50", color: "text-[#14F195]" },
];

export default function CourseCatalog() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white font-sans pt-24 px-6 pb-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
          <Link href="/" className="inline-flex items-center gap-2 text-neutral-400 hover:text-[#14F195] transition-colors mb-8 font-mono text-sm">
            <ArrowLeft className="w-4 h-4" /> back_to_home
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold font-syne mb-4">Curriculum</h1>
          <p className="text-lg text-neutral-400 max-w-2xl">Select a track to begin your journey. Every lesson completed earns you soulbound XP on the Solana network.</p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {allCourses.map((c, i) => (
            <motion.div
              key={c.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={`/courses/${c.slug}`}>
                <div className={`group relative h-full p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden transition-all duration-300 ${c.border} hover:-translate-y-1`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${c.accent} opacity-0 group-hover:opacity-100 transition-opacity`} />
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-center mb-6">
                      <span className={`text-xs font-mono font-bold tracking-widest uppercase px-3 py-1 rounded-md bg-white/5 border border-white/10 ${c.color}`}>
                        {c.track}
                      </span>
                      <span className="text-sm font-mono text-neutral-500 flex items-center gap-2">
                        <BookOpen className="w-4 h-4" /> {c.level}
                      </span>
                    </div>
                    
                    <h3 className="text-3xl font-bold font-syne mb-4">{c.title}</h3>
                    <p className="text-neutral-400 mb-8 flex-1">{c.desc}</p>
                    
                    <div className="flex justify-between items-center pt-6 border-t border-white/10 mt-auto">
                      <div className="flex gap-4 text-sm font-mono text-neutral-400">
                        <span>{c.lessons} lessons</span>
                        <span className="text-[#FFE500] flex items-center gap-1"><Trophy className="w-4 h-4"/> {c.xp} XP</span>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#14F195] group-hover:text-black transition-colors">
                        <PlayCircle className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
