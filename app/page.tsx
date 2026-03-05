'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './world-class.css';
import Counter from '@/components/world-class/Counter';

export default function WorldClassLanding() {
  return (
    <div className="relative min-h-screen bg-[#060608] text-white overflow-hidden selection:bg-cyan-500/20 selection:text-[#00E5FF]">
      {/* Background Orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[60vw] h-[60vw] bg-[#00E5FF]/5 rounded-full blur-[120px] animate-[orb-float_12s_ease-in-out_infinite]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[50vw] h-[50vw] bg-[#00FF94]/5 rounded-full blur-[120px] animate-[orb-float_18s_ease-in-out_infinite_reverse]" />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-[200] h-16 flex items-center justify-between px-8 backdrop-blur-3xl border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center font-syne font-extrabold text-[#00E5FF] text-xs">ST</div>
          <span className="font-syne font-bold text-lg tracking-tighter">Superteam <span className="font-normal text-[#00E5FF]">Academy</span></span>
        </div>
        <button className="bg-transparent border border-cyan-500/30 text-[#00E5FF] px-5 py-2 rounded-md font-mono text-[11px] hover:bg-cyan-500/10 transition-colors uppercase tracking-widest">
           $ connect_wallet
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-40 px-8 max-w-7xl mx-auto min-h-screen">
        <div className="inline-flex items-center gap-2 bg-cyan-500/5 border border-cyan-500/20 px-4 py-1.5 rounded-md mb-8">
           <div className="w-1.5 h-1.5 rounded-full bg-[#00FF94] shadow-[0_0_8px_#00FF94] animate-pulse" />
           <span className="font-mono text-[10px] text-[#00E5FF] tracking-widest uppercase">Devnet Live · Token-2022 · 283 tests ✓</span>
        </div>

        <h1 className="font-syne font-extrabold text-[clamp(3.5rem,10vw,8.5rem)] leading-[0.9] tracking-tighter mb-12">
          Learn. <span className="text-transparent bg-clip-text border-2 border-cyan-500/40 px-4">Build.</span><br />
          <span className="text-[#FFE500]">Earn on-chain.</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-end">
          <div>
            <p className="font-light text-white/50 text-xl max-w-lg leading-relaxed mb-10">
              The only Web3 academy where your progress is <span className="text-white/80 font-medium">soulbound on Solana.</span> XP tokens you actually own.
            </p>
            <div className="flex gap-4 mb-10">
              <button className="bg-[#00E5FF] text-black font-syne font-bold px-8 py-4 rounded-xl shadow-[0_0_30px_rgba(0,229,255,0.3)] hover:scale-105 transition-transform">Start Learning →</button>
              <button className="bg-white/5 border border-white/10 px-8 py-4 rounded-xl font-syne font-bold hover:bg-white/10 transition-colors">Curriculum</button>
            </div>
            <div className="inline-flex items-center gap-3 bg-black/40 border border-cyan-500/10 px-4 py-2 rounded-lg font-mono text-sm text-cyan-500/70">
              <span className="opacity-40">$</span> Level = ⌊ √(XP ÷ 100) ⌋ <span className="animate-pulse">▋</span>
            </div>
          </div>

          {/* Stats Card */}
          <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/5 p-8 rounded-[32px] shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full" />
             <div className="space-y-6">
                <div>
                  <div className="text-4xl font-mono font-bold text-[#00E5FF]"><Counter to={3241} suffix="+" /></div>
                  <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Active Learners</div>
                </div>
                <div className="w-full h-px bg-white/5" />
                <div>
                  <div className="text-4xl font-mono font-bold text-[#FFE500]"><Counter to={847000} /></div>
                  <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest">XP Distributed</div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Marquee Ticker */}
      <div className="absolute bottom-10 w-full overflow-hidden whitespace-nowrap opacity-20 border-y border-white/5 py-4">
        <div className="ticker-animation inline-block font-mono text-[10px] tracking-[0.2em] space-x-12 uppercase">
          {Array(10).fill("◆ SOLANA ◆ TOKEN-2022 ◆ METAPLEX CORE ◆ ANCHOR ◆ DEVNET").join(" ")}
        </div>
      </div>
    </div>
  );
}
