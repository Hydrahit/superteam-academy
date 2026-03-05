'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ArrowRight, Shield, Trophy, Flame, Wallet, Code, CheckCircle2, ChevronRight, Github, Twitter } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function LandingPage() {
  let t;
  try {
    t = useTranslations('Landing');
  } catch (e) {
    t = (key: string) => key;
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="min-h-screen bg-canvas text-primary font-['Bricolage_Grotesque'] overflow-hidden selection:bg-accent selection:text-white">
      
      {/* Dynamic Background Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#00E5FF]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-[#00FF94]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* 1. HERO SECTION */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center px-4 pt-32 pb-20 min-h-[85vh]">
        <motion.div initial="hidden" animate="show" variants={staggerContainer} className="max-w-5xl mx-auto flex flex-col items-center">
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-border mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#00FF94] animate-pulse" />
            <span className="text-xs font-['JetBrains_Mono'] tracking-widest uppercase text-secondary">Superteam Academy v2.0</span>
          </motion.div>
          
          <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl lg:text-8xl font-['Syne'] font-extrabold tracking-tight leading-[1.05] mb-6">
            {t('heroTitle')} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#00FF94]">
              {t('heroHighlight')}
            </span>
          </motion.h1>
          
          <motion.p variants={fadeInUp} className="text-lg md:text-xl text-secondary max-w-2xl mb-10 font-light leading-relaxed">
            {t('heroSub')}
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="/dashboard">
              <Button className="w-full sm:w-auto h-14 px-8 text-lg rounded-full gap-2 shadow-lg shadow-accent/20">
                {t('ctaPrimary')} <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/courses">
              <Button variant="secondary" className="w-full sm:w-auto h-14 px-8 text-lg rounded-full gap-2 bg-surface/50 backdrop-blur-md">
                {t('ctaSecondary')}
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* 2. SOCIAL PROOF */}
      <section className="relative z-10 py-10 border-y border-border/50 bg-surface/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm font-['JetBrains_Mono'] uppercase tracking-widest text-secondary mb-6">{t('socialProof')}</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 grayscale">
            <div className="font-['Syne'] font-bold text-xl flex items-center gap-2"><Code className="w-6 h-6"/> Solana</div>
            <div className="font-['Syne'] font-bold text-xl flex items-center gap-2"><Shield className="w-6 h-6"/> Supabase</div>
            <div className="font-['Syne'] font-bold text-xl flex items-center gap-2"><Zap className="w-6 h-6"/> Vercel</div>
            <div className="font-['Syne'] font-bold text-xl flex items-center gap-2"><LayoutTemplate className="w-6 h-6"/> Next.js</div>
          </div>
        </div>
      </section>

      {/* 3. BENTO BOX FEATURE GRID */}
      <section className="relative z-10 py-32 px-4 max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
          
          {/* Block 1: Hybrid Auth (Wide) */}
          <motion.div variants={fadeInUp} className="md:col-span-2">
            <Card className="h-full flex flex-col justify-end relative overflow-hidden group bg-gradient-to-br from-surface to-canvas">
              <div className="absolute top-6 right-6 flex items-center gap-4 opacity-50 group-hover:opacity-100 transition-opacity">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center"><UserIcon className="w-6 h-6" /></div>
                <div className="w-12 h-4 border-t-2 border-dashed border-border" />
                <div className="w-12 h-12 rounded-full bg-[#AB9FF2]/20 text-[#AB9FF2] flex items-center justify-center"><Wallet className="w-6 h-6" /></div>
              </div>
              <div>
                <h3 className="text-2xl font-['Syne'] font-bold mb-2">{t('bento1Title')}</h3>
                <p className="text-secondary">{t('bento1Desc')}</p>
              </div>
            </Card>
          </motion.div>

          {/* Block 2: Cryptographic Verification */}
          <motion.div variants={fadeInUp}>
            <Card className="h-full flex flex-col justify-between group">
              <Shield className="w-10 h-10 text-accent group-hover:scale-110 transition-transform" />
              <div>
                <h3 className="text-xl font-['Syne'] font-bold mb-2">{t('bento2Title')}</h3>
                <p className="text-secondary text-sm">{t('bento2Desc')}</p>
              </div>
            </Card>
          </motion.div>

          {/* Block 3: Leaderboard */}
          <motion.div variants={fadeInUp}>
            <Card className="h-full flex flex-col justify-between group border-accent/20">
              <Trophy className="w-10 h-10 text-[#FFD700] group-hover:scale-110 transition-transform" />
              <div>
                <h3 className="text-xl font-['Syne'] font-bold mb-2">{t('bento3Title')}</h3>
                <p className="text-secondary text-sm">{t('bento3Desc')}</p>
              </div>
            </Card>
          </motion.div>

          {/* Block 4: Gamification (Wide) */}
          <motion.div variants={fadeInUp} className="md:col-span-2">
            <Card className="h-full flex flex-col justify-between relative overflow-hidden bg-surface">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 opacity-10">
                <Flame className="w-64 h-64 text-[#FF9500]" />
              </div>
              <div className="relative z-10 mt-auto">
                <div className="w-full bg-canvas rounded-full h-3 mb-6 border border-border overflow-hidden">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: '70%' }} viewport={{ once: true }} transition={{ duration: 1.5, delay: 0.5 }} className="bg-gradient-to-r from-accent to-[#00E5FF] h-full rounded-full" />
                </div>
                <h3 className="text-2xl font-['Syne'] font-bold mb-2">{t('bento4Title')}</h3>
                <p className="text-secondary">{t('bento4Desc')}</p>
              </div>
            </Card>
          </motion.div>

        </motion.div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="relative z-10 py-24 bg-surface/30 border-y border-border/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-['Syne'] font-bold">{t('howItWorks')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: t('step1Title'), desc: t('step1Desc'), icon: UserIcon },
              { step: "02", title: t('step2Title'), desc: t('step2Desc'), icon: Wallet },
              { step: "03", title: t('step3Title'), desc: t('step3Desc'), icon: Trophy }
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center text-center p-6 relative group">
                {i !== 2 && <ChevronRight className="hidden md:block absolute -right-6 top-1/3 text-border w-8 h-8" />}
                <div className="w-16 h-16 rounded-2xl bg-canvas border border-border flex items-center justify-center mb-6 group-hover:border-accent transition-colors shadow-sm">
                  <s.icon className="w-8 h-8 text-primary" />
                </div>
                <Badge variant="outline" className="mb-4">STEP {s.step}</Badge>
                <h3 className="text-xl font-bold font-['Syne'] mb-2">{s.title}</h3>
                <p className="text-secondary">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. LIVE STATS */}
      <section className="relative z-10 py-32 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-['Syne'] font-bold mb-16">{t('statsTitle')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <span className="text-5xl md:text-6xl font-['JetBrains_Mono'] font-bold text-accent mb-2">1.2M+</span>
              <span className="text-secondary font-medium tracking-wide">{t('stat1')}</span>
            </div>
            <div className="flex flex-col items-center border-y md:border-y-0 md:border-x border-border/50 py-8 md:py-0">
              <span className="text-5xl md:text-6xl font-['JetBrains_Mono'] font-bold text-[#00E5FF] mb-2">15k+</span>
              <span className="text-secondary font-medium tracking-wide">{t('stat2')}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-5xl md:text-6xl font-['JetBrains_Mono'] font-bold text-[#AB9FF2] mb-2">84k+</span>
              <span className="text-secondary font-medium tracking-wide">{t('stat3')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FINAL CTA */}
      <section className="relative z-10 py-32 text-center px-4 bg-gradient-to-b from-transparent to-accent/5">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeInUp} className="max-w-3xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-['Syne'] font-extrabold mb-8 leading-tight">
            {t('finalHeadline')}
          </h2>
          <Link href="/dashboard">
            <Button className="h-16 px-10 text-xl rounded-full gap-3 shadow-2xl shadow-accent/20 hover:scale-105">
              {t('finalCta')} <ArrowRight className="w-6 h-6" />
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* 7. MINIMALIST FOOTER */}
      <footer className="relative z-10 border-t border-border/50 py-12 px-8 bg-surface/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-['Syne'] font-bold tracking-tighter text-xl text-primary">SUPERTEAM</div>
          
          <div className="flex gap-8 text-sm font-medium text-secondary">
            <Link href="#" className="hover:text-primary transition-colors">Terms</Link>
            <Link href="#" className="hover:text-primary transition-colors">Privacy</Link>
          </div>

          <div className="flex items-center gap-6">
            <p className="text-sm text-secondary hidden md:block">{t('footerText')}</p>
            <a href="#" className="text-secondary hover:text-primary transition-colors"><Github className="w-5 h-5" /></a>
            <a href="#" className="text-secondary hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></a>
          </div>
        </div>
        <p className="text-sm text-secondary text-center mt-8 block md:hidden">{t('footerText')}</p>
      </footer>

    </div>
  );
}

// Minimal Icons for UI
function UserIcon(props: any) { return <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>; }
function Zap(props: any) { return <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>; }
function LayoutTemplate(props: any) { return <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><rect x="3" y="8" width="18" height="1" /><rect x="8" y="8" width="1" height="13" /></svg>; }
