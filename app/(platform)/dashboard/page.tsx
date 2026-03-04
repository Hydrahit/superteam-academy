'use client';

/**
 * app/page.tsx
 * Superteam Academy — WORLD CLASS EDITION (Dynamic + Merged)
 */

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useWallet } from '@solana/wallet-adapter-react';
import { motion, useInView, useMotionValue, useSpring, Variants } from 'framer-motion';
import {
  ArrowRight, Code2, Trophy, Shield, Globe2, Zap,
  BookOpen, Users, ChevronRight, Star, CheckCircle2,
  Cpu, Layers, Sparkles, GraduationCap,
} from 'lucide-react';
import { getCourseService, getAnalyticsService } from '@/lib/services';
import { Course } from '@/lib/types/domain';
import { formatDuration } from '@/lib/utils';

// ── Motion variants ───────────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: (i = 0) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};
const stagger: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

// ── Animated counter ──────────────────────────────────────────────────────────
function AnimatedNumber({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref    = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const mv     = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 50, damping: 20 });
  const [val, setVal] = useState('0');
  
  useEffect(() => { if (inView) mv.set(target); }, [inView, mv, target]);
  useEffect(() => spring.on('change', (v) => setVal(Math.round(v).toLocaleString())), [spring]);
  
  return <span ref={ref}>{val}{suffix}</span>;
}

// ── Cinematic Background ──────────────────────────────────────────────────────
function CinematicOrbs() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0" aria-hidden>
      {/* Deep Space Orbs */}
      <div className="absolute -top-[18%] -left-[8%] w-[62vw] h-[62vw] rounded-full mix-blend-screen opacity-50"
           style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.04) 0%, transparent 65%)', animation: 'orb-float 12s ease-in-out infinite' }} />
      <div className="absolute -top-[5%] -right-[12%] w-[48vw] h-[48vw] rounded-full mix-blend-screen opacity-40"
           style={{ background: 'radial-gradient(circle, rgba(255,229,0,0.02) 0%, transparent 65%)', animation: 'orb-float-r 16s ease-in-out infinite' }} />
      <div className="absolute -bottom-[10%] right-[18%] w-[40vw] h-[40vw] rounded-full mix-blend-screen opacity-50"
           style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.03) 0%, transparent 65%)', animation: 'orb-float 18s ease-in-out infinite reverse' }} />
      
      {/* Subtle Dot Grid Mask */}
      <div className="absolute inset-0 opacity-[0.85]"
           style={{
             backgroundImage: 'radial-gradient(circle, rgba(0,229,255,0.08) 1px, transparent 1px)',
             backgroundSize: '36px 36px',
             maskImage: 'radial-gradient(ellipse 75% 75% at 50% 50%, black 30%, transparent 100%)',
             WebkitMaskImage: 'radial-gradient(ellipse 75% 75% at 50% 50%, black 30%, transparent 100%)',
           }} />
    </div>
  );
}

// ── Data Mapped to New Colors ─────────────────────────────────────────────────
const FEATURES = [
  {
    icon: Code2, title: 'Live Code Challenges', tag: 'Interactive', accent: '#00E5FF',
    desc: 'Write real Solana programs in-browser. Tests run instantly. No local setup, ever.',
    wide: true,
  },
  { icon: Shield,  title: 'On-Chain Credentials', tag: 'Web3-native', accent: '#FFE500', desc: 'Metaplex Core NFTs crafted with absolute precision. Permanent & provably yours.', wide: false },
  { icon: Trophy,  title: 'Soulbound XP',      tag: 'Asset',      accent: '#FF6B6B', desc: 'Your progress is a Token-2022 asset. Your wallet balance is your XP.', wide: false },
  { icon: Globe2,  title: 'Built for LATAM',      tag: 'i18n',        accent: '#A78BFA', desc: 'English, Português, Español. Full i18n by native speakers.', wide: false },
  { icon: Cpu,     title: 'Helius Indexed',       tag: 'Infra',       accent: '#00FF94', desc: 'Lightning-fast leaderboards powered by Helius DAS API. Real-time.', wide: false },
  {
    icon: Layers, title: 'Structured Tracks', tag: 'Curated', accent: '#00E5FF',
    desc: 'Four elite tracks from Fundamentals → DeFi → Security → Full Stack.',
    wide: true,
  },
];

const STATS = [
  { label: 'Developers', value: 12000, suffix: '+', color: '#00E5FF' },
  { label: 'Lessons',    value: 48,    suffix: '',  color: '#FFE500' },
  { label: 'XP Earned',  value: 2400000, suffix: '+', color: '#FF6B6B' },
  { label: 'Countries',  value: 18,    suffix: '',  color: '#A78BFA' },
];

const TESTIMONIALS = [
  { name: 'Carlos Silva',  role: 'Solana Dev @ Phantom',   initials: 'CS', color: '#A78BFA', quote: 'Superteam Academy was the catalyst for my career in Web3. The on-chain credential opened doors immediately.' },
  { name: 'Isabela Rocha', role: 'Founder, SolanaPayBR',   initials: 'IR', color: '#00FF94', quote: 'Zero to shipping a production dApp in 3 months. The interactive code challenges are genuinely elite-tier.' },
  { name: 'Diego Martins', role: 'Security Researcher',    initials: 'DM', color: '#00E5FF', quote: 'The security auditing track is top-tier. I use techniques from it in professional audits daily.' },
];

// ── Page ──────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const { connected } = useWallet();
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    getAnalyticsService().pageView('/', 'Home');
    getCourseService().getAllCourses().then((all: any) => setCourses(all.slice(0, 3)));
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,500;12..96,600&family=JetBrains+Mono:wght@400;500;600&display=swap');
      `}</style>

      <div className="relative min-h-screen overflow-x-hidden bg-[#060608] text-[#f0f0f0] antialiased scanlines-overlay font-['Bricolage_Grotesque']">
        <CinematicOrbs />

        {/* ─── HERO ──────────────────────────────────────────────────────────── */}
        <section className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-4 pb-20 pt-32 text-center max-w-7xl mx-auto">
          
          {/* Hacker Eyebrow */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0} className="mb-8 inline-block">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-md border border-[#00E5FF]/20 bg-[#00E5FF]/5 font-['JetBrains_Mono'] text-[10.5px] font-medium tracking-[0.14em] text-[#00E5FF] uppercase">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00FF94] opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#00FF94] shadow-[0_0_8px_#00FF94]" />
              </span>
              Devnet Live · Token-2022 · 283 tests ✓
            </span>
          </motion.div>

          {/* World Class Headline */}
          <motion.h1
            variants={fadeUp} initial="hidden" animate="visible" custom={1}
            className="mx-auto max-w-[1000px] font-['Syne'] text-[clamp(3.2rem,9vw,8rem)] font-extrabold leading-[0.9] tracking-[-0.04em]"
          >
            Master Solana.{' '}
            <br className="hidden sm:block" />
            <span className="glitch text-transparent" data-text="Earn On-Chain." style={{ WebkitTextStroke: '2px rgba(0,229,255,0.65)' }}>
              Earn On-Chain.
            </span>
            <br className="hidden sm:block" />
            <span className="text-[#FFE500] drop-shadow-[0_0_40px_rgba(255,229,0,0.2)]">
              Get Hired.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp} initial="hidden" animate="visible" custom={2}
            className="mx-auto mt-8 max-w-[540px] text-[16px] md:text-[18px] font-light leading-relaxed text-white/50"
          >
            Interactive courses, live coding challenges, and verifiable NFT credentials — 
            <span className="text-white/90 font-medium"> built for Latin American developers.</span>
          </motion.p>

          {/* CTA row */}
          <motion.div
            variants={fadeUp} initial="hidden" animate="visible" custom={3}
            className="mt-12 flex flex-wrap items-center justify-center gap-4"
          >
            <Link href={connected ? '/dashboard' : '/courses'}>
              <button className="group relative inline-flex items-center gap-2 rounded-xl bg-[#00E5FF] px-8 py-4 font-['Syne'] text-[15px] font-bold text-black transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(0,229,255,0.4),0_10px_20px_rgba(0,0,0,0.5)]">
                {connected ? 'Go to Dashboard' : 'Start Learning — Free'}
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </Link>
            <Link href="/courses">
              <button className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-8 py-4 font-['Syne'] text-[15px] font-semibold text-white/60 backdrop-blur-md transition-all duration-300 hover:border-[#00E5FF]/30 hover:text-[#00E5FF] hover:bg-[#00E5FF]/5">
                Browse Curriculum <ChevronRight className="h-4 w-4" />
              </button>
            </Link>
          </motion.div>
        </section>

        {/* ─── STATS (World Class Minimalist) ────────────────────────────────── */}
        <section className="relative z-10 px-4 py-10 max-w-7xl mx-auto">
          <div className="world-class-card p-10 md:p-14">
            <div className="grid grid-cols-2 gap-10 md:grid-cols-4 text-center">
              {STATS.map(({ label, value, suffix, color }, i) => (
                <motion.div key={label} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.2}>
                  <div className="font-['Syne'] text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-[-0.04em]" style={{ color }}>
                    <AnimatedNumber target={value} suffix={suffix} />
                  </div>
                  <div className="mt-2 font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.1em] text-white/30">
                    {label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── BENTO FEATURES ────────────────────────────────────────────────── */}
        <section className="relative z-10 px-4 py-24 max-w-7xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-14">
            <p className="mb-3 font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.16em] text-[#00E5FF]/60">// Architecture</p>
            <h2 className="font-['Syne'] text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold leading-tight tracking-[-0.04em] text-white">
              Built different. <span className="text-white/20 italic font-light">By design.</span>
            </h2>
          </motion.div>

          <motion.div
            variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-1 gap-4 md:grid-cols-3 auto-rows-[minmax(200px,auto)]"
          >
            {FEATURES.map(({ icon: Icon, title, desc, wide, accent, tag }, i) => (
              <motion.div key={title} variants={fadeUp} custom={i} className={wide ? 'md:col-span-2' : ''}>
                <div 
                  className="world-class-card h-full p-8 group cursor-default"
                  style={{ '--hover-color': accent } as React.CSSProperties}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${accent}40`;
                    e.currentTarget.style.boxShadow = `0 20px 60px rgba(0,0,0,0.6), 0 0 40px ${accent}15`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div className="mb-6 flex items-center justify-between">
                    <span className="inline-block rounded-sm border px-3 py-1 font-['JetBrains_Mono'] text-[9px] font-medium uppercase tracking-[0.12em]"
                          style={{ borderColor: `${accent}30`, color: accent, background: `${accent}10` }}>
                      {tag}
                    </span>
                    <Icon className="h-6 w-6 opacity-50" style={{ color: accent }} />
                  </div>
                  <h3 className="mb-3 font-['Syne'] text-[22px] font-bold tracking-[-0.03em] text-white">{title}</h3>
                  <p className="font-['Bricolage_Grotesque'] text-[14px] font-light leading-relaxed text-white/40">{desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ─── LEARNING TRACKS ───────────────────────────────────────────────── */}
        <section className="relative z-10 px-4 py-16 max-w-7xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12">
            <p className="mb-3 font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.16em] text-[#FFE500]/60">// Curriculum</p>
            <h2 className="font-['Syne'] text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold tracking-[-0.04em] text-white">Choose your track</h2>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: 'Solana Fundamentals', courses: 2, hours: '14h', color: '#00E5FF', symbol: '◆' },
              { name: 'DeFi Developer',      courses: 3, hours: '30h', color: '#FFE500', symbol: '◈' },
              { name: 'Security Auditor',    courses: 3, hours: '27h', color: '#FF6B6B', symbol: '◉' },
              { name: 'Full Stack Solana',   courses: 3, hours: '33h', color: '#A78BFA', symbol: '◇' },
            ].map(({ name, courses, hours, color, symbol }, i) => (
              <motion.div key={name} variants={fadeUp} custom={i}>
                <Link href="/courses">
                  <div 
                    className="world-class-card group p-6 cursor-pointer"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = `${color}40`;
                      e.currentTarget.style.boxShadow = `0 10px 40px ${color}15`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <span className="mb-4 block text-3xl opacity-80" style={{ color }}>{symbol}</span>
                    <h3 className="mb-4 font-['Syne'] text-[16px] font-bold leading-snug text-white">{name}</h3>
                    <div className="flex items-center gap-3 font-['JetBrains_Mono'] text-[10px] uppercase tracking-widest text-white/30">
                      <span>{courses} crs</span>
                      <span>·</span>
                      <span>{hours}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ─── FEATURED COURSES (Dynamic API Data) ───────────────────────────── */}
        {courses.length > 0 && (
          <section className="relative z-10 px-4 py-20 max-w-7xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="mb-2 font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.16em] text-[#00FF94]/60">// Start Here</p>
                <h2 className="font-['Syne'] text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold tracking-[-0.04em] text-white">Featured Courses</h2>
              </div>
              <Link href="/courses" className="font-['JetBrains_Mono'] text-[12px] text-white/40 hover:text-[#00E5FF] transition-colors">
                view_all_courses →
              </Link>
            </motion.div>

            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid gap-4 md:grid-cols-3">
              {courses.map((course, i) => (
                <motion.div key={course.id} variants={fadeUp} custom={i}>
                  <Link href={`/courses/${course.slug}`}>
                    <div className="world-class-card group h-full p-6 cursor-pointer hover:border-[#00E5FF]/40">
                      <div className="mb-4 flex items-start justify-between">
                        <span className="inline-block rounded-sm border border-white/10 bg-white/5 px-3 py-1 font-['JetBrains_Mono'] text-[9px] font-medium uppercase tracking-[0.12em] text-white/50">
                          {course.difficulty}
                        </span>
                      </div>
                      <h3 className="mb-2 font-['Syne'] text-[18px] font-bold leading-snug text-white transition-colors group-hover:text-[#00E5FF]">
                        {course.title}
                      </h3>
                      <p className="mb-6 line-clamp-2 font-['Bricolage_Grotesque'] text-[13px] font-light leading-relaxed text-white/40">
                        {course.description}
                      </p>
                      <div className="flex items-center justify-between border-t border-white/[0.05] pt-4 font-['JetBrains_Mono'] text-[10px] text-white/30">
                        <span className="flex items-center gap-1.5"><BookOpen className="h-3 w-3" />{course.totalLessons} lessons</span>
                        <span className="flex items-center gap-1.5 text-[#FFE500]/70"><Zap className="h-3 w-3" />{(course as any).totalXp} XP</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </section>
        )}

        {/* ─── TESTIMONIALS ──────────────────────────────────────────────────── */}
        <section className="relative z-10 px-4 py-20 max-w-7xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12">
            <p className="mb-3 font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.16em] text-white/30">// Social Proof</p>
            <h2 className="font-['Syne'] text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold tracking-[-0.04em] text-white">Builders who shipped</h2>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid gap-4 md:grid-cols-3">
            {TESTIMONIALS.map(({ name, role, quote, initials, color }, i) => (
              <motion.div key={name} variants={fadeUp} custom={i}>
                <div className="world-class-card h-full p-8">
                  <div className="mb-5 flex gap-1">
                    {[...Array(5)].map((_, j) => <Star key={j} className="h-3.5 w-3.5 fill-current" style={{ color }} />)}
                  </div>
                  <p className="mb-6 font-['Bricolage_Grotesque'] text-[14px] font-light leading-relaxed text-white/60">&ldquo;{quote}&rdquo;</p>
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg font-['Syne'] text-[13px] font-bold text-black"
                         style={{ background: color }}>
                      {initials}
                    </div>
                    <div>
                      <p className="font-['Syne'] text-[15px] font-bold text-white">{name}</p>
                      <p className="font-['JetBrains_Mono'] text-[10px] text-white/30">{role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ─── FINAL CTA ─────────────────────────────────────────────────────── */}
        <section className="relative z-10 px-4 pb-32 pt-20 max-w-4xl mx-auto text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <p className="mb-4 font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.16em] text-[#00E5FF]">// Ready?</p>
            <h2 className="mb-6 font-['Syne'] text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-[0.9] tracking-[-0.04em] text-white">
              Start earning<br />
              <span className="text-[#FFE500] drop-shadow-[0_0_40px_rgba(255,229,0,0.15)]">your credentials.</span>
            </h2>
            <p className="mx-auto mb-10 max-w-[420px] font-['Bricolage_Grotesque'] text-[16px] font-light leading-relaxed text-white/40">
              Connect your wallet. Start learning. Your XP is soulbound — it stays with you forever.
            </p>
            
            <Link href={connected ? '/dashboard' : '/courses'}>
              <button className="group relative inline-flex items-center gap-2 rounded-xl bg-[#00E5FF] px-10 py-5 font-['Syne'] text-[16px] font-bold text-black transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(0,229,255,0.4)]">
                {connected ? 'Go to Dashboard' : 'Connect Wallet & Begin'}
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </Link>

            <div className="mt-10 flex flex-wrap justify-center gap-6 font-['JetBrains_Mono'] text-[10px] text-white/20">
              {['Devnet Ready', 'Open Source', '3 Languages', '283 Tests'].map((badge) => (
                <span key={badge}>✓ {badge}</span>
              ))}
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
}