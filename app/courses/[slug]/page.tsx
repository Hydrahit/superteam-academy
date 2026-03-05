'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, PlayCircle, Lock, Trophy, CheckCircle2, AlertCircle } from 'lucide-react';

export default function CoursePlayer({ params }: { params: { slug: string } }) {
  // Mocking auth & completion state for the UI
  const [isLinked, setIsLinked] = useState(true); // Set to false to see the "Link Wallet" state
  const [isCompleting, setIsCompleting] = useState(false);
  const [completed, setCompleted] = useState(false);

  // Format slug to title (e.g., solana-foundations -> Solana Foundations)
  const title = params.slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  const handleComplete = () => {
    setIsCompleting(true);
    // Simulate RPC call delay
    setTimeout(() => {
      setIsCompleting(false);
      setCompleted(true);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-white font-sans flex flex-col lg:flex-row">
      
      {/* LEFT: Video Player & Content */}
      <div className="flex-1 p-6 md:p-10 lg:p-16 overflow-y-auto pb-32 lg:pb-16 border-r border-white/5">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
          
          <Link href="/courses" className="inline-flex items-center gap-2 text-neutral-500 hover:text-[#14F195] transition-colors mb-8 font-mono text-sm">
            <ArrowLeft className="w-4 h-4" /> back_to_curriculum
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold font-syne mb-2">{title}: Introduction</h1>
            <p className="text-neutral-400 font-mono text-sm">Module 1 • Lesson 1</p>
          </div>

          {/* Video Placeholder */}
          <div className="aspect-video w-full bg-neutral-900 rounded-2xl border border-white/10 flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer mb-10 shadow-2xl">
            <div className="absolute inset-0 bg-[#14F195]/5 group-hover:bg-[#14F195]/10 transition-colors" />
            <PlayCircle className="w-20 h-20 text-[#14F195] opacity-80 group-hover:scale-110 transition-transform" />
            <span className="mt-4 font-mono text-sm tracking-widest text-neutral-400 uppercase">Play Lesson</span>
          </div>

          {/* Lesson Content */}
          <div className="prose prose-invert prose-lg max-w-none text-neutral-300 font-light mb-12">
            <h3 className="text-xl font-bold text-white mb-4">Understanding the Basics</h3>
            <p className="mb-4">In this lesson, we cover the fundamental architecture of the Solana blockchain. Unlike traditional EVM chains, Solana separates state (Accounts) from logic (Programs).</p>
            <p className="mb-4">By the end of this module, you will understand how to structure your data and why Program Derived Addresses (PDAs) are crucial for secure state management.</p>
          </div>

          {/* Action Bar */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <h4 className="font-bold text-lg mb-1">Claim your XP</h4>
              <p className="text-sm text-neutral-400">Finish the video to verify your completion on-chain.</p>
            </div>
            
            <AnimatePresence mode="wait">
              {completed ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-3 text-[#14F195] font-bold px-6 py-3 bg-[#14F195]/10 rounded-xl border border-[#14F195]/20">
                  <CheckCircle2 className="w-5 h-5" /> +100 XP Claimed!
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <button 
                    onClick={handleComplete}
                    disabled={!isLinked || isCompleting}
                    className={`flex items-center gap-2 px-8 py-4 rounded-xl font-bold transition-all shadow-lg ${
                      !isLinked 
                        ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed' 
                        : 'bg-[#14F195] text-black hover:bg-[#10c97b] hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(20,241,149,0.3)]'
                    }`}
                  >
                    {!isLinked ? <Lock className="w-5 h-5" /> : <Trophy className="w-5 h-5" />}
                    {isCompleting ? 'Verifying...' : !isLinked ? 'Link Wallet to Claim' : 'Complete & Claim XP'}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </motion.div>
      </div>

      {/* RIGHT: Sidebar Modules list */}
      <div className="w-full lg:w-96 bg-neutral-900/50 p-8 overflow-y-auto">
        <h3 className="font-syne font-bold text-xl mb-8">Curriculum</h3>
        
        <div className="space-y-8">
          {[1, 2, 3].map((mod) => (
            <div key={mod}>
              <h4 className="text-xs font-bold text-neutral-500 mb-4 uppercase tracking-widest">Module {mod}</h4>
              <div className="space-y-2">
                {[1, 2, 3].map((lesson) => {
                  const isActive = mod === 1 && lesson === 1;
                  return (
                    <div 
                      key={lesson} 
                      className={`flex items-center justify-between p-4 rounded-xl border ${
                        isActive 
                          ? 'bg-[#14F195]/10 border-[#14F195]/30 text-white' 
                          : 'bg-transparent border-transparent text-neutral-400 hover:bg-white/5'
                      } cursor-pointer transition-colors`}
                    >
                      <div className="flex items-center gap-3">
                        {isActive ? <PlayCircle className="w-4 h-4 text-[#14F195]" /> : <Lock className="w-4 h-4 opacity-50" />}
                        <span className="text-sm font-medium">Lesson {lesson}</span>
                      </div>
                      <span className="text-[10px] font-mono opacity-50">12m</span>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

    </main>
  );
}
