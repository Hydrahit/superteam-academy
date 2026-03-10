'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const courses = [
  {
    title: 'Web3 Basics',
    slug: 'web3-basics',
    description: 'Start your Web3 journey by understanding wallets, blockchains, and decentralized applications.',
    difficulty: 'BEGINNER',
    lessons: 5,
    duration: '45 min',
    rating: 4.9,
    gradient: 'from-[#00C896] to-[#065f46]',
    emoji: '🌐',
  },
  {
    title: 'Solana Fundamentals',
    slug: 'solana-fundamentals',
    description: 'Deep dive into Solana architecture, accounts, programs, and the SPL token standard.',
    difficulty: 'BEGINNER',
    lessons: 8,
    duration: '1h 30m',
    rating: 4.8,
    gradient: 'from-[#9945FF] to-[#4c1d95]',
    emoji: '◎',
  },
  {
    title: 'Building with Anchor',
    slug: 'building-with-anchor',
    description: 'Learn to build, test, and deploy Solana programs using the Anchor framework.',
    difficulty: 'INTERMEDIATE',
    lessons: 12,
    duration: '3h',
    rating: 4.9,
    gradient: 'from-[#3b82f6] to-[#1e3a8a]',
    emoji: '⚓',
  },
];

function getDifficultyBadge(difficulty: string) {
  switch (difficulty) {
    case 'BEGINNER':
      return 'bg-[#00C896]/20 text-[#00C896] border-[#00C896]/30';
    case 'INTERMEDIATE':
      return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
    case 'ADVANCED':
      return 'bg-red-500/20 text-red-400 border-red-500/30';
    default:
      return 'bg-[#00C896]/20 text-[#00C896] border-[#00C896]/30';
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: 'easeOut' },
  }),
};

export default function FeaturedCourses() {
  return (
    <section className="py-24 px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-display text-5xl font-black text-white text-center">
          Start With These Courses
        </h2>
        <p className="text-[#888888] text-center mt-4 mb-14">
          Handpicked for builders entering the Solana ecosystem
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map((course, i) => (
            <motion.div
              key={course.slug}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="rounded-2xl bg-[#0F0F0F] border border-[#1A1A1A] border-t-2 border-t-[#00C896] card-hover overflow-hidden flex flex-col"
            >
              {/* Thumbnail */}
              <div
                className={`h-48 relative flex items-center justify-center bg-gradient-to-br ${course.gradient}`}
              >
                <span className="text-6xl">{course.emoji}</span>
                <span
                  className={`absolute top-3 left-3 text-xs font-bold rounded-full px-2.5 py-1 font-display uppercase tracking-wide border ${getDifficultyBadge(
                    course.difficulty
                  )}`}
                >
                  {course.difficulty}
                </span>
              </div>

              {/* Body */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-display text-xl text-white font-semibold line-clamp-1">
                  {course.title}
                </h3>
                <p className="text-sm text-[#888888] mt-2 line-clamp-2 flex-1">
                  {course.description}
                </p>

                <div className="mt-4 flex items-center gap-4 text-xs text-[#888888]">
                  <span>📖 {course.lessons} lessons</span>
                  <span>⏱ {course.duration}</span>
                  <span>⭐ {course.rating}</span>
                </div>

                <Link href={`/courses/${course.slug}`} className="mt-5">
                  <button className="w-full border border-[#00C896]/50 text-[#00C896] rounded-xl py-2.5 text-sm font-bold font-display hover:bg-[#00C896] hover:text-black transition-all">
                    Enroll Now →
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/courses"
            className="text-[#00C896] hover:underline"
          >
            View All 5 Courses →
          </Link>
        </div>
      </div>
    </section>
  );
}
