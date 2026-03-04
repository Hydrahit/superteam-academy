'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { PlayCircle, CheckCircle2, Lock, Clock, Zap, Shield, ArrowLeft } from 'lucide-react';

const MODULES = [
  {
    title: "1. The Solana Programming Model",
    lessons: [
      { id: '1', title: "Accounts & Programs", duration: "15 min", completed: true },
      { id: '2', title: "PDAs (Program Derived Addresses)", duration: "25 min", completed: true },
      { id: '3', title: "Cross-Program Invocations (CPI)", duration: "30 min", completed: false }
    ]
  },
  {
    title: "2. Setting up the Environment",
    lessons: [
      { id: '4', title: "Rust & Cargo Basics", duration: "20 min", completed: false, locked: true },
      { id: '5', title: "Local Validator & Testing", duration: "40 min", completed: false, locked: true }
    ]
  }
];

export default function CourseDetailPage({ params }: { params: { slug: string } }) {
  const isEnrolled = true; // Stub: Will come from LearningService later

  return (
    <div className="min-h-screen bg-[#060608] text-white pt-24 pb-20 px-4 md:px-8 font-['Bricolage_Grotesque']">
      <div className="max-w-5xl mx-auto">
        
        {/* Back Button */}
        <Link href="/courses" className="inline-flex items-center gap-2 text-white/40 hover:text-[#00E5FF] transition-colors mb-8 font-['JetBrains_Mono'] text-xs uppercase tracking-widest">
          <ArrowLeft className="w-4 h-4" /> Back to Catalog
        </Link>

        {/* Course Header */}
        <div className="bg-[#0C0C10]/80 border border-white/[0.07] rounded-3xl p-8 md:p-12 backdrop-blur-xl relative overflow-hidden mb-8">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFE500]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          
          <div className="flex flex-col md:flex-row gap-8 items-start justify-between relative z-10">
            <div className="max-w-2xl">
              <span className="font-['JetBrains_Mono'] text-[10px] text-[#FFE500] uppercase tracking-[0.15em] border border-[#FFE500]/20 bg-[#FFE500]/10 px-3 py-1 rounded mb-4 inline-block">Intermediate</span>
              <h1 className="font-['Syne'] text-4xl md:text-5xl font-bold mb-4">Anchor Development</h1>
              <p className="text-white/50 text-lg leading-relaxed mb-8">
                Master the Anchor framework. Learn how to write secure, fast, and modern smart contracts on Solana with minimal boilerplate.
              </p>
              
              <div className="flex flex-wrap gap-6 font-['JetBrains_Mono'] text-xs text-white/40">
                <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> 18 Hours</span>
                <span className="flex items-center gap-2 text-[#00E5FF]"><Zap className="w-4 h-4" /> 900 XP</span>
                <span className="flex items-center gap-2"><Shield className="w-4 h-4" /> On-Chain Credential</span>
              </div>
            </div>

            <div className="w-full md:w-auto bg-black/40 border border-white/10 rounded-2xl p-6 text-center backdrop-blur-md min-w-[250px]">
              <div className="text-4xl mb-2 font-['Syne'] font-bold">66%</div>
              <p className="font-['JetBrains_Mono'] text-[10px] text-white/40 uppercase tracking-widest mb-6">Course Progress</p>
              <div className="h-1.5 w-full bg-white/10 rounded-full mb-6 overflow-hidden">
                <div className="h-full bg-[#00E5FF] rounded-full" style={{ width: '66%' }} />
              </div>
              <Link href="/courses/anchor-dev/lessons/3">
                <button className="w-full bg-[#00E5FF] text-black font-['Syne'] font-bold py-3 rounded-xl hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] transition-all">
                  Resume Lesson
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Modules List */}
        <div className="space-y-6">
          <h2 className="font-['Syne'] text-2xl font-bold mb-6">Curriculum</h2>
          {MODULES.map((mod, i) => (
            <div key={i} className="bg-[#0C0C10]/50 border border-white/[0.05] rounded-2xl overflow-hidden">
              <div className="p-6 bg-white/[0.02] border-b border-white/[0.05]">
                <h3 className="font-['Syne'] text-lg font-bold">{mod.title}</h3>
              </div>
              <div className="divide-y divide-white/[0.02]">
                {mod.lessons.map((lesson) => (
                  <div key={lesson.id} className={`p-4 px-6 flex items-center justify-between transition-colors ${lesson.locked ? 'opacity-50 grayscale cursor-not-allowed' : 'hover:bg-white/[0.02] cursor-pointer'}`}>
                    <div className="flex items-center gap-4">
                      {lesson.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-[#00FF94]" />
                      ) : lesson.locked ? (
                        <Lock className="w-5 h-5 text-white/20" />
                      ) : (
                        <PlayCircle className="w-5 h-5 text-[#00E5FF]" />
                      )}
                      <span className={`font-['Bricolage_Grotesque'] text-sm ${lesson.completed ? 'text-white/60 line-through' : 'text-white'}`}>
                        {lesson.title}
                      </span>
                    </div>
                    <span className="font-['JetBrains_Mono'] text-[10px] text-white/30">{lesson.duration}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
