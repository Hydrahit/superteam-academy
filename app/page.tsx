'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Shield, Trophy } from 'lucide-react';

export default function LandingPage() {
  return (
    <main className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center p-6 text-center">
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-solana-purple/20 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-solana-green/10 blur-[150px]" />
      
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="z-10 max-w-4xl">
        <span className="px-4 py-2 rounded-full border border-white/10 text-solana-green font-mono text-xs mb-8 inline-block">SUPERTEAM ACADEMY V2.0</span>
        <h1 className="text-5xl md:text-7xl font-syne font-bold mb-6 leading-tight">
          Master Web3. <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-solana-green to-solana-purple">Earn Your Place on the Leaderboard.</span>
        </h1>
        <p className="text-neutral-400 text-lg mb-10">The ultimate gamified academy for the Solana ecosystem. Learn seamlessly, verify cryptographically.</p>
        <div className="flex justify-center gap-4">
          <Link href="/dashboard" className="px-8 py-4 rounded-xl bg-solana-green text-black font-bold flex items-center gap-2 hover:scale-105 transition-transform">
            Launch App <ArrowRight className="w-5 h-5"/>
          </Link>
          <Link href="/courses" className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 hover:bg-white/10 transition-colors">
            Curriculum
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
