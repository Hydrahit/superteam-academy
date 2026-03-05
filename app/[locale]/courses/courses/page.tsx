'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, BookOpen } from 'lucide-react';
import { CatalogCard } from '@/src/components/catalog/CatalogCard';

// Mock Database
const ALL_COURSES = [
  { id: 1, slug: 'solana-101', title: 'Solana 101: The Kernel', difficulty: 'Beginner', xp: 100, duration: '2 Hrs', tags: ['SVM', 'Core'] },
  { id: 2, slug: 'rust-basics', title: 'Rust for Rustaceans', difficulty: 'Intermediate', xp: 250, duration: '4 Hrs', tags: ['Rust', 'Memory'] },
  { id: 3, slug: 'anchor-mastery', title: 'Anchor Framework Mastery', difficulty: 'Pro', xp: 800, duration: '8 Hrs', tags: ['Anchor', 'Smart Contracts'] },
  { id: 4, slug: 'defi-dex', title: 'Building a DEX UI', difficulty: 'Intermediate', xp: 300, duration: '5 Hrs', tags: ['DeFi', 'Frontend'] },
  { id: 5, slug: 'nft-mint', title: 'NFT Minting Engine', difficulty: 'Beginner', xp: 150, duration: '3 Hrs', tags: ['NFT', 'Metaplex'] },
  { id: 6, slug: 'svm-internals', title: 'Advanced SVM Internals', difficulty: 'Pro', xp: 1200, duration: '12 Hrs', tags: ['SVM', 'Security'] },
];

const TOPICS = ['All', 'Rust', 'Anchor', 'DeFi', 'Frontend', 'SVM'];
const DIFFICULTIES = ['All', 'Beginner', 'Intermediate', 'Pro'];

export default function CoursesCatalog() {
  const [search, setSearch] = useState('');
  const [topic, setTopic] = useState('All');
  const [difficulty, setDifficulty] = useState('All');

  // Filtering Logic
  const filteredCourses = ALL_COURSES.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase());
    const matchesTopic = topic === 'All' || course.tags.some(t => t.toLowerCase() === topic.toLowerCase());
    const matchesDiff = difficulty === 'All' || course.difficulty === difficulty;
    return matchesSearch && matchesTopic && matchesDiff;
  });

  return (
    <div className="min-h-screen bg-[#060608] pt-28 pb-20 px-6 md:px-12 text-white">
      <header className="mb-12">
        <h1 className="text-5xl md:text-7xl font-syne font-black uppercase tracking-tighter italic">
          Course_<span className="text-[#14F195]">Catalog</span>
        </h1>
        <p className="text-neutral-500 font-mono text-sm mt-4 uppercase tracking-widest">Select your path to mastery</p>
      </header>

      <div className="flex flex-col md:flex-row gap-12 items-start">
        {/* Sticky Sidebar Filter */}
        <aside className="w-full md:w-64 flex-shrink-0 md:sticky md:top-32 space-y-8">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={16} />
            <input 
              type="text" 
              placeholder="Search courses..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm font-mono focus:outline-none focus:border-[#14F195] transition-colors"
            />
          </div>

          {/* Difficulty Filter */}
          <div>
            <h3 className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-500 mb-4 flex items-center gap-2">
              <Filter size={12} /> Difficulty
            </h3>
            <div className="flex flex-col gap-2">
              {DIFFICULTIES.map(diff => (
                <button 
                  key={diff}
                  onClick={() => setDifficulty(diff)}
                  className={`text-left text-sm font-bold uppercase tracking-widest py-2 px-4 rounded-lg transition-all ${
                    difficulty === diff ? 'bg-[#14F195] text-black' : 'hover:bg-white/5 text-neutral-400'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          {/* Topic Filter */}
          <div>
            <h3 className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-500 mb-4 flex items-center gap-2">
              <BookOpen size={12} /> Topics
            </h3>
            <div className="flex flex-wrap gap-2">
              {TOPICS.map(t => (
                <button 
                  key={t}
                  onClick={() => setTopic(t)}
                  className={`text-[10px] font-mono uppercase tracking-widest py-1.5 px-3 rounded-full border transition-all ${
                    topic === t ? 'border-[#9945FF] bg-[#9945FF]/20 text-[#9945FF]' : 'border-white/10 text-neutral-500 hover:border-white/30'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Course Grid */}
        <div className="flex-1 w-full">
          <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredCourses.length > 0 ? (
                filteredCourses.map(course => (
                  <CatalogCard key={course.id} {...course} />
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="col-span-full py-20 text-center border border-dashed border-white/10 rounded-3xl"
                >
                  <p className="text-neutral-500 font-mono uppercase tracking-widest">No courses found matching your criteria.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
