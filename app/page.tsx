'use client';

/**
 * app/page.tsx  —  Superteam Academy Landing Page
 * Premium Web3/deep-space aesthetic with Framer Motion + Glassmorphism
 */

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useWallet } from '@solana/wallet-adapter-react';
import { motion, useInView, useMotionValue, useSpring, Variants } from 'framer-motion';
import { Syne, DM_Sans } from 'next/font/google';
import {
  ArrowRight, Code2, Trophy, Award, Sparkles, Zap,
  BookOpen, Shield, Globe2, ChevronRight, Play,
  Star, Users, GraduationCap,
} from 'lucide-react';
import { getCourseService, getAnalyticsService } from '@/lib/services';
import { Course } from '@/lib/types/domain';
import { getDifficultyVariant, formatDuration } from '@/lib/utils';

// ─── Fonts ───────────────────────────────────────────────────────────────────

const syne = Syne({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-syne',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm',
});

// ─── Animation variants ───────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: { duration: 0.5, delay: i * 0.08 },
  }),
};

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

// ─── Animated counter ────────────────────────────────────────────────────────

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 60, damping: 18 });
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (inView) motionVal.set(target);
  }, [inView, motionVal, target]);

  useEffect(() => {
    return spring.on('change', (v) => setDisplay(Math.round(v).toLocaleString()));
  }, [spring]);

  return <span ref={ref}>{display}{suffix}</span>;
}

// ─── Glowing orb background ───────────────────────────────────────────────────

function AmbientOrbs() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
      {/* Solana purple — top left */}
      <div
        className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full opacity-[0.18]"
        style={{
          background: 'radial-gradient(circle, #9945FF 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      {/* Solana green — bottom right */}
      <div
        className="absolute -bottom-60 -right-60 h-[700px] w-[700px] rounded-full opacity-[0.14]"
        style={{
          background: 'radial-gradient(circle, #14F195 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />
      {/* Cyan mid accent */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[900px] rounded-full opacity-[0.06]"
        style={{
          background: 'radial-gradient(ellipse, #00C2FF 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
}

// ─── Glass card ───────────────────────────────────────────────────────────────

function GlassCard({
  children,
  className = '',
  glow,
}: {
  children: React.ReactNode;
  className?: string;
  glow?: 'purple' | 'green' | 'cyan';
}) {
  const glowColors = {
    purple: 'hover:shadow-[0_0_40px_-8px_rgba(153,69,255,0.35)]',
    green: 'hover:shadow-[0_0_40px_-8px_rgba(20,241,149,0.3)]',
    cyan: 'hover:shadow-[0_0_40px_-8px_rgba(0,194,255,0.3)]',
  };

  return (
    <div
      className={`
        rounded-2xl border border-white/[0.08]
        bg-white/[0.04] backdrop-blur-xl
        transition-all duration-500
        ${glow ? glowColors[glow] : 'hover:shadow-[0_0_40px_-8px_rgba(153,69,255,0.2)]'}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

// ─── Feature card ─────────────────────────────────────────────────────────────

const features = [
  {
    icon: Code2,
    title: 'Hands-On Challenges',
    desc: 'Write real Solana programs in-browser with live test feedback. No setup, no friction — just code.',
    glow: 'purple' as const,
    accent: '#9945FF',
  },
  {
    icon: Trophy,
    title: 'XP & Level System',
    desc: 'Every lesson completed, every challenge solved earns XP. Climb levels and unlock achievements.',
    glow: 'green' as const,
    accent: '#14F195',
  },
  {
    icon: Shield,
    title: 'On-Chain Credentials',
    desc: 'Earn verifiable NFT certificates stored on Solana. Your skills, provably yours, forever.',
    glow: 'cyan' as const,
    accent: '#00C2FF',
  },
];

// ─── Difficulty pill ──────────────────────────────────────────────────────────

function DifficultyPill({ level }: { level: string }) {
  const map: Record<string, string> = {
    beginner: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
    intermediate: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
    advanced: 'text-rose-400 bg-rose-400/10 border-rose-400/20',
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider ${
        map[level.toLowerCase()] ?? 'text-slate-400 bg-slate-400/10 border-slate-400/20'
      }`}
    >
      {level}
    </span>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const { connected } = useWallet();
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const analytics = getAnalyticsService();
    analytics.pageView('/', 'Home');

    async function loadCourses() {
      const courseService = getCourseService();
      const all = await courseService.getAllCourses();
      setCourses(all.slice(0, 3));
    }
    loadCourses();
  }, []);

  return (
    <div
      className={`${syne.variable} ${dmSans.variable} relative min-h-screen overflow-x-hidden bg-[#06060c] text-white`}
      style={{ fontFamily: 'var(--font-dm), sans-serif' }}
    >
      <AmbientOrbs />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-4 pt-24 pb-16">

        {/* Eyebrow */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="mb-6 flex items-center gap-2 rounded-full border border-[#9945FF]/30 bg-[#9945FF]/10 px-4 py-1.5 text-sm text-[#9945FF]"
          style={{ fontFamily: 'var(--font-dm)' }}
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>Now live on Solana Devnet</span>
          <span className="ml-1 flex h-1.5 w-1.5 rounded-full bg-[#14F195]">
            <span className="animate-ping h-1.5 w-1.5 rounded-full bg-[#14F195] opacity-75" />
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="mx-auto max-w-5xl text-center text-5xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
          style={{ fontFamily: 'var(--font-syne)' }}
        >
          Learn Solana.{' '}
          <br className="hidden sm:block" />
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(135deg, #9945FF 0%, #00C2FF 50%, #14F195 100%)',
            }}
          >
            Earn On-Chain.
          </span>
          <br className="hidden sm:block" />
          Get Hired.
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="mx-auto mt-7 max-w-2xl text-center text-lg leading-relaxed text-slate-400 md:text-xl"
          style={{ fontFamily: 'var(--font-dm)', fontWeight: 300 }}
        >
          The interactive developer academy for{' '}
          <span className="text-slate-200">Latin America&apos;s Solana ecosystem</span>.
          Write code, earn XP, and collect verifiable credentials — directly on-chain.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link href={connected ? '/dashboard' : '/courses'}>
            <button
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl px-7 py-3.5 text-sm font-medium text-black transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #9945FF, #14F195)',
                boxShadow: '0 0 0 0 rgba(153,69,255,0)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  '0 0 30px 4px rgba(153,69,255,0.45)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  '0 0 0 0 rgba(153,69,255,0)';
              }}
            >
              <span style={{ fontFamily: 'var(--font-dm)', fontWeight: 500 }}>
                {connected ? 'Go to Dashboard' : 'Start Learning Free'}
              </span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </Link>

          <Link href="/courses">
            <button className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-7 py-3.5 text-sm font-medium text-slate-200 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/10">
              <Play className="h-3.5 w-3.5" />
              <span style={{ fontFamily: 'var(--font-dm)' }}>Browse Courses</span>
            </button>
          </Link>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={5}
          className="mt-14 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500"
          style={{ fontFamily: 'var(--font-dm)' }}
        >
          {['No credit card', 'Free to start', 'On-chain credentials', 'LatAm community'].map(
            (badge) => (
              <span key={badge} className="flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-[#14F195]" />
                {badge}
              </span>
            )
          )}
        </motion.div>
      </section>

      {/* ── STATS BAR ────────────────────────────────────────────────────── */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="relative border-y border-white/[0.06] bg-white/[0.02] px-4 py-12 backdrop-blur-md"
      >
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 md:grid-cols-4">
          {[
            { label: 'Developers Enrolled', value: 12000, suffix: '+', icon: Users },
            { label: 'Lessons Available', value: 48, suffix: '', icon: BookOpen },
            { label: 'XP Awarded', value: 2400000, suffix: '+', icon: Zap },
            { label: 'Countries', value: 18, suffix: '', icon: Globe2 },
          ].map(({ label, value, suffix, icon: Icon }) => (
            <motion.div
              key={label}
              variants={fadeUp}
              className="flex flex-col items-center text-center"
            >
              <Icon className="mb-2 h-4 w-4 text-[#9945FF]" />
              <span
                className="text-3xl font-bold tracking-tight text-white md:text-4xl"
                style={{ fontFamily: 'var(--font-syne)' }}
              >
                <AnimatedCounter target={value} suffix={suffix} />
              </span>
              <span className="mt-1 text-xs text-slate-500" style={{ fontFamily: 'var(--font-dm)' }}>
                {label}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── FEATURES ─────────────────────────────────────────────────────── */}
      <section className="relative px-4 py-28">
        <div className="mx-auto max-w-6xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <p className="mb-3 text-sm uppercase tracking-[0.2em] text-[#9945FF]"
               style={{ fontFamily: 'var(--font-dm)' }}>
              Why Superteam Academy
            </p>
            <h2
              className="mx-auto max-w-2xl text-4xl font-extrabold tracking-tight md:text-5xl"
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              Built different.{' '}
              <span className="bg-clip-text text-transparent"
                    style={{ backgroundImage: 'linear-gradient(90deg, #9945FF, #14F195)' }}>
                Built for builders.
              </span>
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid gap-5 md:grid-cols-3"
          >
            {features.map(({ icon: Icon, title, desc, glow, accent }) => (
              <motion.div key={title} variants={fadeUp}>
                <GlassCard className="h-full p-8" glow={glow}>
                  {/* Icon */}
                  <div
                    className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border"
                    style={{
                      borderColor: `${accent}30`,
                      background: `${accent}15`,
                    }}
                  >
                    <Icon className="h-5 w-5" style={{ color: accent }} />
                  </div>
                  <h3
                    className="mb-3 text-lg font-bold text-white"
                    style={{ fontFamily: 'var(--font-syne)' }}
                  >
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-400" style={{ fontFamily: 'var(--font-dm)', fontWeight: 300 }}>
                    {desc}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section className="relative px-4 py-20">
        {/* Horizontal glow line */}
        <div
          className="absolute left-1/2 top-1/2 h-px w-full max-w-3xl -translate-x-1/2 -translate-y-1/2"
          style={{
            background: 'linear-gradient(90deg, transparent, #9945FF40, #14F19540, transparent)',
          }}
        />
        <div className="mx-auto max-w-5xl">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-16 text-center text-sm uppercase tracking-[0.2em] text-slate-500"
            style={{ fontFamily: 'var(--font-dm)' }}
          >
            How it works
          </motion.p>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-8 md:grid-cols-3"
          >
            {[
              {
                step: '01',
                title: 'Connect your wallet',
                desc: 'Link Phantom, Solflare, or Backpack. Your progress lives on-chain.',
                color: '#9945FF',
              },
              {
                step: '02',
                title: 'Complete lessons & challenges',
                desc: 'Interactive content, live coding, and instant XP rewards.',
                color: '#00C2FF',
              },
              {
                step: '03',
                title: 'Claim your credentials',
                desc: "Mint verifiable certificates. Show the world what you've built.",
                color: '#14F195',
              },
            ].map(({ step, title, desc, color }) => (
              <motion.div key={step} variants={fadeUp} className="relative text-center">
                <span
                  className="mb-4 block text-6xl font-extrabold opacity-10"
                  style={{ fontFamily: 'var(--font-syne)', color }}
                >
                  {step}
                </span>
                <h3
                  className="-mt-2 mb-2 text-lg font-bold text-white"
                  style={{ fontFamily: 'var(--font-syne)' }}
                >
                  {title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-500" style={{ fontFamily: 'var(--font-dm)', fontWeight: 300 }}>
                  {desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FEATURED COURSES ─────────────────────────────────────────────── */}
      {courses.length > 0 && (
        <section className="relative px-4 py-24">
          <div className="mx-auto max-w-6xl">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-12 flex items-end justify-between"
            >
              <div>
                <p className="mb-2 text-sm uppercase tracking-[0.2em] text-[#14F195]"
                   style={{ fontFamily: 'var(--font-dm)' }}>
                  Start here
                </p>
                <h2
                  className="text-3xl font-extrabold tracking-tight md:text-4xl"
                  style={{ fontFamily: 'var(--font-syne)' }}
                >
                  Featured Courses
                </h2>
              </div>
              <Link
                href="/courses"
                className="hidden items-center gap-1 text-sm text-slate-400 transition-colors hover:text-white md:flex"
                style={{ fontFamily: 'var(--font-dm)' }}
              >
                All courses <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="grid gap-5 md:grid-cols-3"
            >
              {courses.map((course) => (
                <motion.div key={course.id} variants={fadeUp}>
                  <Link href={`/courses/${course.slug}`}>
                    <GlassCard className="group h-full cursor-pointer p-6 transition-all duration-500 hover:-translate-y-1">
                      {/* Course header */}
                      <div className="mb-4 flex items-start justify-between">
                        <div
                          className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#9945FF]/20 bg-[#9945FF]/10"
                        >
                          <GraduationCap className="h-[18px] w-[18px] text-[#9945FF]" />
                        </div>
                        <DifficultyPill level={course.difficulty} />
                      </div>

                      <h3
                        className="mb-2 text-base font-bold leading-snug text-white group-hover:text-[#9945FF] transition-colors"
                        style={{ fontFamily: 'var(--font-syne)' }}
                      >
                        {course.title}
                      </h3>

                      <p className="mb-5 line-clamp-2 text-xs leading-relaxed text-slate-500"
                         style={{ fontFamily: 'var(--font-dm)', fontWeight: 300 }}>
                        {course.description}
                      </p>

                      {/* Footer meta */}
                      <div className="flex items-center justify-between border-t border-white/[0.06] pt-4">
                        <div className="flex items-center gap-3 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <BookOpen className="h-3 w-3" />
                            {course.totalLessons} lessons
                          </span>
                          <span className="flex items-center gap-1">
                            <Zap className="h-3 w-3 text-[#9945FF]" />
                            {course.totalXp} XP
                          </span>
                        </div>
                        <span className="text-xs text-slate-500">
                          {formatDuration(course.estimatedHours * 60)}
                        </span>
                      </div>
                    </GlassCard>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* ── COMMUNITY PROOF ──────────────────────────────────────────────── */}
      <section className="relative px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <GlassCard className="relative overflow-hidden p-10 text-center">
            {/* Inner glow */}
            <div
              className="pointer-events-none absolute inset-0 rounded-2xl opacity-[0.08]"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 0%, #9945FF 0%, transparent 60%)',
              }}
            />
            <div className="relative">
              {/* Stars */}
              <div className="mb-4 flex justify-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[#14F195] text-[#14F195]" />
                ))}
              </div>
              <blockquote
                className="mx-auto mb-6 max-w-2xl text-xl font-light leading-relaxed text-slate-200 md:text-2xl"
                style={{ fontFamily: 'var(--font-dm)', fontWeight: 300 }}
              >
                &quot;The only place where I could learn Solana development in Spanish,
                earn real credentials, and get noticed by teams in the ecosystem.&quot;
              </blockquote>
              <div className="flex items-center justify-center gap-3">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#9945FF] to-[#14F195]" />
                <div className="text-left">
                  <p className="text-sm font-medium text-white" style={{ fontFamily: 'var(--font-syne)' }}>
                    Alejandro M.
                  </p>
                  <p className="text-xs text-slate-500" style={{ fontFamily: 'var(--font-dm)' }}>
                    Solana Developer · Buenos Aires
                  </p>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="relative px-4 pb-32 pt-16">
        <div className="mx-auto max-w-3xl text-center">
          {/* Big ambient glow behind CTA */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.12]"
            style={{
              background: 'radial-gradient(circle, #9945FF 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative"
          >
            <motion.h2
              variants={fadeUp}
              className="mb-5 text-4xl font-extrabold tracking-tight md:text-6xl"
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              Ready to{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(135deg, #9945FF, #14F195)' }}
              >
                build the future?
              </span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              custom={1}
              className="mb-10 text-lg text-slate-400"
              style={{ fontFamily: 'var(--font-dm)', fontWeight: 300 }}
            >
              Join 12,000+ developers learning Solana across Latin America.
              Free to start. No excuses.
            </motion.p>

            <motion.div variants={fadeUp} custom={2} className="flex flex-wrap justify-center gap-4">
              <Link href="/courses">
                <button
                  className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-xl px-8 py-4 text-base font-semibold text-black transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, #9945FF 0%, #00C2FF 50%, #14F195 100%)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.boxShadow =
                      '0 0 40px 6px rgba(153,69,255,0.5)';
                    (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.03)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none';
                    (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-syne)', fontWeight: 700 }}>
                    Start For Free
                  </span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}