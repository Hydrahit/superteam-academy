'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { CourseRow } from '@/components/ui/CourseRow';
import { motion } from 'framer-motion';

export default function HomePage() {
  // Debug log to verify client-side execution
  console.log("💎 Superteam Academy: Home Page Loaded");

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      <Navbar />

      {/* --- ELITE DEBUG BUTTON --- */}
      <button 
        onClick={() => alert("SYSTEM IS LIVE! INTERACTIVITY 100%")}
        className="fixed bottom-10 right-10 z-[9999] px-6 py-3 bg-[#14F195] text-black font-black rounded-full shadow-[0_0_30px_rgba(20,241,149,0.6)] hover:scale-110 active:scale-95 transition-all"
      >
        VERIFY CLICK ⚡
      </button>

      {/* Hero Content */}
      <section className="relative h-[90vh] flex flex-col justify-center px-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl"
        >
          <h1 className="text-7xl md:text-9xl font-syne font-black italic tracking-tighter leading-none mb-8">
            BUILD THE <br/>
            <span className="text-[#14F195]">FUTURE.</span>
          </h1>
          <p className="text-xl font-mono text-white/50 max-w-lg">
            Elite Solana education engine for the next generation of builders.
          </p>
        </motion.div>
      </section>

      {/* Courses Grid */}
      <section className="pb-20">
        <CourseRow 
          title="Featured Courses" 
          courses={[
            { id: '1', slug: 'solana-101', title: 'Solana Dev 101', xp: 500 },
            { id: '2', slug: 'rust-mastery', title: 'Rust Masterclass', xp: 1200 }
          ]} 
        />
      </section>
    </div>
  );
}
