'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Search, BookOpen, Zap } from 'lucide-react';

const COURSES = [
  { id: '1', slug: 'solana-fundamentals', title: 'Solana Fundamentals', track: 'Foundation', diff: 'Beginner', xp: 600, lessons: 12, desc: 'Master accounts, PDAs, and the Solana programming model.', accent: '#00E5FF' },
  { id: '2', slug: 'anchor-dev', title: 'Anchor Development', track: 'Programs', diff: 'Intermediate', xp: 900, lessons: 18, desc: 'Write secure, fast smart contracts using the Anchor framework.', accent: '#FFE500' },
  { id: '3', slug: 'token-2022', title: 'Token-2022 Extensions', track: 'Tokens', diff: 'Advanced', xp: 700, lessons: 14, desc: 'Deep dive into transfer hooks, soulbound tokens, and metadata.', accent: '#A78BFA' }
];

export default function CoursesPage() {
  const [search, setSearch] = useState('');
  const filtered = COURSES.filter(c => c.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#060608] text-white pt-24 pb-20 px-4 md:px-8 font-['Bricolage_Grotesque']">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <p className="font-['JetBrains_Mono'] text-[#FFE500] text-[10px] uppercase tracking-widest mb-2">// The_Curriculum</p>
          <h1 className="font-['Syne'] text-4xl md:text-6xl font-bold tracking-tight mb-6">Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#A78BFA]">Knowledge.</span></h1>
          
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input 
              type="text" placeholder="Search courses..." 
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#00E5FF]/50 transition-colors"
              value={search} onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(course => (
            <Link key={course.id} href={`/courses/${course.slug}`}>
              <div className="bg-[#0C0C10]/80 border border-white/[0.07] rounded-3xl p-6 md:p-8 backdrop-blur-xl transition-all duration-300 hover:border-[#00E5FF]/40 cursor-pointer h-full flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="font-['JetBrains_Mono'] text-[9px] uppercase tracking-[0.12em] px-3 py-1 rounded border border-white/10 bg-white/5">{course.track}</span>
                    <span className="font-['JetBrains_Mono'] text-[10px] text-white/30">{course.diff}</span>
                  </div>
                  <h3 className="font-['Syne'] text-2xl font-bold mb-3">{course.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed font-light mb-6">{course.desc}</p>
                </div>
                <div className="flex items-center justify-between border-t border-white/[0.05] pt-4 mt-auto">
                  <div className="flex gap-4">
                    <span className="font-['JetBrains_Mono'] text-[11px] text-white/40 flex items-center gap-1.5"><BookOpen className="w-3 h-3"/> {course.lessons}</span>
                    <span className="font-['JetBrains_Mono'] text-[11px] text-[#FFE500] flex items-center gap-1.5"><Zap className="w-3 h-3"/> {course.xp} XP</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
