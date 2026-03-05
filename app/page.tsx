'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Counter from '@/src/components/world-class/Counter';
// Exact World Class UI logic from your file
export default function WorldClassLanding() {
  return (
    <div className="relative min-h-screen bg-[#060608] text-white overflow-hidden">
      {/* Cinematic Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[60vw] h-[60vw] bg-[#00E5FF]/5 rounded-full blur-[120px] animate-pulse" />
      </div>
      
      <nav className="fixed top-0 w-full z-50 flex justify-between p-8 backdrop-blur-md">
        <div className="font-syne font-bold text-xl uppercase tracking-tighter text-[#00E5FF]">Superteam</div>
        <Link href="/dashboard" className="px-6 py-2 border border-cyan-500/30 rounded text-xs font-mono text-cyan-500 hover:bg-cyan-500/10">GO_TO_CONSOLE</Link>
      </nav>

      <section className="pt-48 px-8 max-w-7xl mx-auto">
        <h1 className="font-syne font-extrabold text-[8rem] leading-[0.85] tracking-tighter mb-8">
          Learn. <span className="text-white/20">Build.</span><br/><span className="text-[#FFE500]">Earn.</span>
        </h1>
        <div className="flex gap-6">
          <Link href="/dashboard" className="px-10 py-5 bg-[#00E5FF] text-black font-syne font-bold rounded-xl shadow-2xl hover:scale-105 transition-transform">START_BUILDING →</Link>
          <Link href="/leaderboard" className="px-10 py-5 bg-white/5 border border-white/10 rounded-xl font-syne font-bold hover:bg-white/10 transition-all">LEADERBOARD</Link>
        </div>
      </section>
    </div>
  );
}