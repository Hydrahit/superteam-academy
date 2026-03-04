'use client';

import { Trophy, Github, Twitter, Globe, Award, Hexagon, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const SKILLS = [
  { name: 'Rust', level: 80 },
  { name: 'Anchor', level: 65 },
  { name: 'React/Next.js', level: 90 },
  { name: 'Web3.js', level: 75 },
  { name: 'Security', level: 40 },
];

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#060608] text-white pt-24 pb-20 px-4 md:px-8 font-['Bricolage_Grotesque']">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Profile Header */}
        <div className="bg-[#0C0C10]/80 border border-white/[0.07] rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00E5FF]/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start relative z-10">
            <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-[#00E5FF]/20 to-[#A78BFA]/20 border border-white/10 flex items-center justify-center shrink-0">
              <Hexagon className="w-16 h-16 text-[#00E5FF]" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <h1 className="font-['Syne'] text-4xl font-bold">SolanaBuilder_99</h1>
                <ShieldCheck className="w-6 h-6 text-[#00FF94]" />
              </div>
              <p className="font-['JetBrains_Mono'] text-sm text-[#00E5FF] mb-4">4xH3...9aP2</p>
              <p className="text-white/60 max-w-lg mx-auto md:mx-0 mb-6">
                Building the future of finance on Solana. Currently exploring Token-2022 extensions and deep DeFi architecture.
              </p>
              <div className="flex items-center justify-center md:justify-start gap-4">
                <button className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"><Github className="w-5 h-5 text-white/60" /></button>
                <button className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"><Twitter className="w-5 h-5 text-[#00E5FF]/60" /></button>
                <button className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"><Globe className="w-5 h-5 text-white/60" /></button>
              </div>
            </div>
            <div className="bg-black/40 border border-white/10 rounded-2xl p-6 text-center backdrop-blur-md min-w-[200px]">
              <Trophy className="w-8 h-8 text-[#FFE500] mx-auto mb-2" />
              <div className="font-['Syne'] text-3xl font-bold mb-1">Lv.38</div>
              <p className="font-['JetBrains_Mono'] text-[10px] text-white/40 uppercase tracking-widest">145,000 XP</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Skill Radar / Bars */}
          <div className="bg-[#0C0C10]/80 border border-white/[0.07] rounded-3xl p-8 backdrop-blur-xl">
            <h2 className="font-['Syne'] text-2xl font-bold mb-6 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#A78BFA]" /> Skill Tree
            </h2>
            <div className="space-y-5">
              {SKILLS.map(skill => (
                <div key={skill.name}>
                  <div className="flex justify-between font-['JetBrains_Mono'] text-xs text-white/60 mb-2">
                    <span>{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }} animate={{ width: `${skill.level}%` }} transition={{ duration: 1, delay: 0.2 }}
                      className="h-full bg-gradient-to-r from-[#00E5FF] to-[#A78BFA] rounded-full" 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Credentials */}
          <div className="bg-[#0C0C10]/80 border border-white/[0.07] rounded-3xl p-8 backdrop-blur-xl">
            <h2 className="font-['Syne'] text-2xl font-bold mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-[#FFE500]" /> On-Chain Credentials
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center hover:border-[#FFE500]/40 transition-colors cursor-pointer group">
                  <Award className="w-10 h-10 mx-auto mb-3 text-white/20 group-hover:text-[#FFE500] transition-colors" />
                  <h4 className="font-['Syne'] text-sm font-bold text-white mb-1">Solana Basics</h4>
                  <p className="font-['JetBrains_Mono'] text-[9px] text-white/30 uppercase">Verified NFT</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
