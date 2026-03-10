'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' },
  }),
};

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-screen">
      {/* Background blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-[#00C896] opacity-[0.07] blur-[120px] absolute -top-32 -left-32 animate-[float_20s_ease-in-out_infinite]" />
        <div className="w-[500px] h-[500px] rounded-full bg-[#9945FF] opacity-[0.06] blur-[100px] absolute -bottom-32 -right-32 animate-[float_25s_ease-in-out_infinite_reverse]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'radial-gradient(circle, #888888 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 flex items-center min-h-screen pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
          {/* Left column */}
          <div>
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 border border-[#00C896]/30 bg-[#00C896]/10 text-[#00C896] rounded-full px-4 py-1.5 text-sm">
                🟢 Built on Solana &middot; Superteam Brazil
              </span>
            </motion.div>

            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="font-display font-black leading-[1.05] text-4xl md:text-7xl"
            >
              <span className="text-white">Learn Web3.</span>
              <br />
              <span className="text-white">Earn On-Chain</span>
              <br />
              <span className="gradient-text">Credentials.</span>
            </motion.h1>

            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-6 text-lg text-[#888888] max-w-lg leading-relaxed"
            >
              Master Solana development through structured courses, pass quizzes,
              and collect NFT certificates stored forever on the blockchain.
            </motion.p>

            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-10 flex gap-4 flex-wrap"
            >
              <Link href="/courses">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="glow-green bg-[#00C896] text-black font-bold font-display rounded-xl px-8 py-4 hover:bg-[#00b085] transition-all"
                >
                  Start Learning →
                </motion.button>
              </Link>
              <Link href="/leaderboard">
                <button className="border border-white/20 text-white font-display rounded-xl px-8 py-4 hover:bg-white/10 transition-all">
                  View Leaderboard
                </button>
              </Link>
            </motion.div>

            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-8 text-sm text-[#888888] flex items-center gap-3 flex-wrap"
            >
              <span>✦ 3,200+ Learners</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00C896]" />
              <span>500+ Certificates Minted</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00C896]" />
              <span>100% On-Chain</span>
            </motion.div>
          </div>

          {/* Right column — floating certificate */}
          <div className="hidden lg:flex justify-center items-center">
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-80"
            >
              <div className="rounded-2xl p-6 bg-[#0F0F0F] border border-[#00C896]/30 glow-green overflow-hidden relative">
                {/* Shimmer */}
                <div className="absolute inset-0 shimmer pointer-events-none" />

                {/* NFT badge */}
                <div className="absolute top-3 right-3 bg-[#9945FF] text-white text-xs rounded-full px-2 py-0.5 font-mono">
                  NFT #0482
                </div>

                {/* Header */}
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-3xl">🏆</span>
                  <span className="text-[#00C896] text-xs font-bold tracking-widest">
                    SUPERTEAM ACADEMY
                  </span>
                </div>

                <hr className="border-[#1A1A1A] my-3" />

                <p className="font-display text-xl text-white font-bold text-center mt-2">
                  Certificate of Completion
                </p>
                <p className="text-[#888888] text-xs text-center mt-1">
                  Issued to
                </p>
                <p className="font-mono text-[#00C896] text-center text-lg mt-1">
                  7xKp...4fRm
                </p>

                <hr className="border-[#1A1A1A] my-3" />

                <p className="text-white font-semibold text-center">
                  Solana Fundamentals
                </p>
                <p className="text-[#00C896] text-sm text-center mt-1">
                  Score: 94%
                </p>
                <p className="text-[#888888] text-xs text-center mt-1">
                  March 2026
                </p>

                <button className="border border-[#00C896]/40 text-[#00C896] text-xs rounded-full px-3 py-1 mt-4 w-full text-center hover:bg-[#00C896]/10 transition">
                  ◎ View on Solana Explorer
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
