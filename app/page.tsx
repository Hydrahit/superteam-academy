'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Shield, Trophy } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function LandingPage() {
  // Gracefully fallback to English if next-intl context isn't fully wrapped at the root yet
  let t;
  try {
    t = useTranslations('Landing');
  } catch (e) {
    t = (key: string) => {
      const fallback = {
        heroTitle: "Master Solana.",
        heroHighlight: "Build the Future.",
        heroSub: "The ultimate platform to level up your Web3 development skills. Earn XP, climb the global leaderboard, and prove your knowledge on-chain.",
        cta: "Start Learning",
        feat1Title: "Interactive Coding",
        feat1Desc: "Write, test, and deploy Solana programs directly in your browser.",
        feat2Title: "On-Chain Verification",
        feat2Desc: "Your progress is secured and verified using Ed25519 signatures.",
        feat3Title: "Global Leaderboard",
        feat3Desc: "Compete with developers worldwide and showcase your true rank."
      };
      return fallback[key as keyof typeof fallback];
    };
  }

  const features = [
    { icon: Code, title: t('feat1Title'), desc: t('feat1Desc') },
    { icon: Shield, title: t('feat2Title'), desc: t('feat2Desc') },
    { icon: Trophy, title: t('feat3Title'), desc: t('feat3Desc') }
  ];

  return (
    <div className="min-h-screen bg-[#060608] text-white font-['Bricolage_Grotesque'] overflow-hidden relative selection:bg-[#00FF94] selection:text-black">
      {/* Dynamic Background Glows */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#00E5FF]/20 rounded-full blur-[150px] pointer-events-none" 
      />
      <motion.div 
        animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#00FF94]/10 rounded-full blur-[150px] pointer-events-none" 
      />

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 border-b border-white/5 bg-[#060608]/50 backdrop-blur-md">
        <div className="font-['Syne'] font-bold text-2xl tracking-tighter text-[#00E5FF]">SUPERTEAM</div>
        <Link 
          href="/dashboard" 
          className="px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm font-semibold transition-all"
        >
          Enter App
        </Link>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center px-4 pt-32 pb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[#00FF94] animate-pulse" />
          <span className="text-xs font-['JetBrains_Mono'] tracking-widest uppercase text-white/60">Solana LMS 2.0 is Live</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-8xl font-['Syne'] font-extrabold tracking-tight max-w-5xl leading-[1.1] mb-8"
        >
          {t('heroTitle')} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#00FF94]">
            {t('heroHighlight')}
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-white/50 max-w-2xl mb-12 font-light"
        >
          {t('heroSub')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link 
            href="/dashboard" 
            className="group relative px-8 py-4 bg-[#00FF94] text-black font-bold rounded-2xl text-lg hover:scale-105 transition-all flex items-center gap-3 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              {t('cta')} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform" />
          </Link>
        </motion.div>

        {/* Feature Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mt-32 text-left"
        >
          {features.map((feature, i) => (
            <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
              <feature.icon className="w-10 h-10 text-[#00E5FF] mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold font-['Syne'] mb-3">{feature.title}</h3>
              <p className="text-white/40 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}
