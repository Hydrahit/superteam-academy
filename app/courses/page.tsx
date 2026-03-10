'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CourseCard from '@/components/courses/CourseCard';
import { Search } from 'lucide-react';

type Difficulty = 'ALL' | 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  _count: { lessons: number };
  duration: number;
  thumbnail?: string;
}

const tabs: { label: string; value: Difficulty }[] = [
  { label: 'All Courses', value: 'ALL' },
  { label: 'Beginner', value: 'BEGINNER' },
  { label: 'Intermediate', value: 'INTERMEDIATE' },
  { label: 'Advanced', value: 'ADVANCED' },
];

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<Difficulty>('ALL');

  useEffect(() => {
    fetch('/api/courses')
      .then((res) => res.json())
      .then((data) => {
        setCourses(data.courses || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = courses.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    const matchesDifficulty = filter === 'ALL' || c.difficulty === filter;
    return matchesSearch && matchesDifficulty;
  });

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Explore Courses
            </h1>
            <p className="text-lg text-white/50 max-w-2xl">
              From Web3 basics to advanced Solana development. Learn, earn XP, and mint your certificate NFTs.
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-4 mb-10">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="text"
                placeholder="Search courses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-white/10 bg-white/[0.03] text-white placeholder:text-white/30 focus:outline-none focus:border-[#00C896]/50 transition-colors"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {tabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setFilter(tab.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    filter === tab.value
                      ? 'bg-[#00C896] text-black'
                      : 'border border-white/10 text-white/50 hover:text-white hover:border-white/30'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.03] h-80 animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-white/40 text-lg">No courses found matching your criteria.</p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((course) => (
                <CourseCard
                  key={course.id}
                  title={course.title}
                  slug={course.slug}
                  description={course.description}
                  difficulty={course.difficulty}
                  lessonCount={course._count.lessons}
                  duration={`${course.duration} min`}
                  thumbnail={course.thumbnail}
                />
              ))}
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
