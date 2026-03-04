#!/bin/bash

echo "🚀 Superteam Academy Platform Generator Started..."

# 1. Create all necessary directories
mkdir -p lib/types
mkdir -p lib/services
mkdir -p app/\(platform\)/dashboard
mkdir -p app/courses
mkdir -p app/leaderboard

echo "📁 Folders created successfully."

# 2. Generate Domain Types
cat << 'EOF' > lib/types/domain.ts
export type AuthStage = 'unauthenticated' | 'wallet_only' | 'google_only' | 'fully_linked';

export interface UserProfile {
  id: string;
  username: string;
  avatarUrl?: string;
  totalXp: number;
  level: number;
  streak: { current: number; highest: number; lastActive: string; };
  joinDate: string;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  track: 'Fundamentals' | 'DeFi' | 'Security' | 'Full Stack';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  estimatedHours: number;
  totalXp: number;
  totalLessons: number;
}

export interface Enrollment {
  courseId: string;
  progressBitmap: number;
  completedLessons: number;
  isCompleted: boolean;
  lastAccessed: string;
}

export interface Achievement {
  id: string;
  typeId: string;
  title: string;
  description: string;
  imageUrl: string;
  earnedAt: string;
}
EOF
echo "✅ lib/types/domain.ts generated."

# 3. Generate Learning Service
cat << 'EOF' > lib/services/learning.ts
import { UserProfile, Course, Enrollment, Achievement } from '../types/domain';

export class LearningProgressService {
  static calculateLevel(xp: number): number {
    return Math.floor(Math.sqrt(xp / 100));
  }

  async getXpBalance(walletPubkey: string): Promise<number> {
    return new Promise((resolve) => setTimeout(() => resolve(2450), 400));
  }

  async getUserProfile(walletPubkey: string): Promise<UserProfile> {
    const xp = await this.getXpBalance(walletPubkey);
    return {
      id: walletPubkey,
      username: 'SolanaBuilder_99',
      totalXp: xp,
      level: LearningProgressService.calculateLevel(xp),
      streak: { current: 12, highest: 21, lastActive: new Date().toISOString() },
      joinDate: '2025-10-01',
    };
  }

  async getActiveEnrollments(walletPubkey: string): Promise<{ course: Course; enrollment: Enrollment }[]> {
    return [{
      course: {
        id: 'course_1', slug: 'anchor-dev', title: 'Anchor Development',
        description: 'Master the Anchor framework for Solana programs.',
        track: 'Programs', difficulty: 'Intermediate', estimatedHours: 18, totalXp: 900, totalLessons: 18
      },
      enrollment: {
        courseId: 'course_1', progressBitmap: 255, completedLessons: 8, isCompleted: false, lastAccessed: new Date().toISOString()
      }
    }];
  }

  async getCredentials(walletPubkey: string): Promise<Achievement[]> {
    return [{
      id: 'nft_1', typeId: 'type_1', title: 'First Steps',
      description: 'Completed your first lesson.',
      imageUrl: '/badges/first-steps.png', earnedAt: '2025-10-02'
    }];
  }
}

export const learningService = new LearningProgressService();
EOF
echo "✅ lib/services/learning.ts generated."

# 4. Generate Dashboard
cat << 'EOF' > app/\(platform\)/dashboard/page.tsx
'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useWallet } from '@solana/wallet-adapter-react';
import { motion } from 'framer-motion';
import { Flame, Trophy, PlayCircle, Award, ArrowRight } from 'lucide-react';
import { learningService } from '@/lib/services/learning';
import { UserProfile, Course, Enrollment, Achievement } from '@/lib/types/domain';

export default function DashboardPage() {
  const { publicKey } = useWallet();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [activeCourse, setActiveCourse] = useState<{course: Course, enrollment: Enrollment} | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const pubkey = publicKey?.toBase58() || 'STUB_WALLET_123';
    Promise.all([
      learningService.getUserProfile(pubkey),
      learningService.getActiveEnrollments(pubkey)
    ]).then(([p, enrollments]) => {
      setProfile(p);
      setActiveCourse(enrollments[0] || null);
      setIsLoading(false);
    });
  }, [publicKey]);

  if (isLoading || !profile) return <div className="min-h-screen bg-[#060608] flex items-center justify-center text-[#00E5FF] font-['JetBrains_Mono'] animate-pulse">Loading_Dashboard...</div>;

  const currentLevelXp = Math.pow(profile.level, 2) * 100;
  const nextLevelXp = Math.pow(profile.level + 1, 2) * 100;
  const progressPct = ((profile.totalXp - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100;

  return (
    <div className="min-h-screen bg-[#060608] text-white pt-24 pb-20 px-4 md:px-8 font-['Bricolage_Grotesque']">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="font-['JetBrains_Mono'] text-[#00E5FF] text-[10px] uppercase tracking-widest mb-2">// Operator_Status</p>
            <h1 className="font-['Syne'] text-4xl md:text-5xl font-bold text-white">
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#00FF94]">{profile.username}</span>.
            </h1>
          </div>
          <Link href="/courses">
            <button className="font-['Syne'] bg-white/5 hover:bg-[#00E5FF]/10 border border-white/10 text-white px-6 py-3 rounded-xl transition-all flex items-center gap-2 text-sm font-semibold backdrop-blur-md">
              Explore Curriculum <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 bg-[#0C0C10]/80 border border-white/[0.07] rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden">
            <div className="flex justify-between items-start mb-8">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-['Syne'] text-5xl font-bold">Lv.{profile.level}</span>
                </div>
                <p className="font-['JetBrains_Mono'] text-sm text-[#FFE500] flex items-center gap-2"><Trophy className="w-4 h-4" /> {profile.totalXp.toLocaleString()} Soulbound XP</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between font-['JetBrains_Mono'] text-[10px] text-white/50 uppercase tracking-widest">
                <span>Current: {profile.totalXp} XP</span>
                <span>Next: {nextLevelXp} XP</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
                <div className="h-full bg-gradient-to-r from-[#00E5FF] to-[#00FF94] rounded-full" style={{ width: `${progressPct}%` }} />
              </div>
            </div>
          </div>
          <div className="bg-[#0C0C10]/80 border border-white/[0.07] rounded-3xl p-8 backdrop-blur-xl flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-2">
              <Flame className="w-6 h-6 text-[#FF6B6B]" />
              <span className="font-['JetBrains_Mono'] text-xs text-white/50 uppercase tracking-widest">Daily Streak</span>
            </div>
            <div className="font-['Syne'] text-5xl font-bold mb-2">{profile.streak.current} <span className="text-2xl text-white/30">Days</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
EOF
echo "✅ app/(platform)/dashboard/page.tsx generated."

# 5. Generate Courses
cat << 'EOF' > app/courses/page.tsx
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
EOF
echo "✅ app/courses/page.tsx generated."

# 6. Generate Leaderboard
cat << 'EOF' > app/leaderboard/page.tsx
'use client';
import { Trophy, Flame } from 'lucide-react';

const LEADERBOARD_DATA = [
  { rank: 1, name: "Carlos Silva", handle: "@carlos_sol", xp: 145000, level: 38, streak: 45 },
  { rank: 2, name: "Isabela Rocha", handle: "@isarocha", xp: 132000, level: 36, streak: 21 },
  { rank: 3, name: "Diego Martins", handle: "@diegodev", xp: 128500, level: 35, streak: 12 },
  { rank: 4, name: "Ana Beatriz", handle: "@anab_web3", xp: 95000, level: 30, streak: 8 }
];

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-[#060608] text-white pt-24 pb-20 px-4 md:px-8 font-['Bricolage_Grotesque']">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-['JetBrains_Mono'] text-[#00FF94] text-[10px] uppercase tracking-widest mb-2">// Helius_DAS_Indexed</p>
          <h1 className="font-['Syne'] text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF94] to-[#00E5FF]">Rankings</span>
          </h1>
        </div>

        <div className="space-y-3">
          {LEADERBOARD_DATA.map((user) => (
            <div key={user.rank} className="bg-[#0C0C10]/50 border border-white/[0.05] hover:border-white/10 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="w-8 text-center font-['JetBrains_Mono'] text-white/40 font-bold">#{user.rank}</div>
                <div>
                  <h4 className="font-['Syne'] font-bold">{user.name}</h4>
                  <p className="font-['JetBrains_Mono'] text-[10px] text-white/30">{user.handle}</p>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="font-['JetBrains_Mono'] text-sm font-bold">{user.xp.toLocaleString()} <span className="text-[10px] text-white/30 uppercase">XP</span></div>
                <div className="w-16 text-right font-['JetBrains_Mono'] text-xs text-[#00E5FF]">Lv.{user.level}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
EOF
echo "✅ app/leaderboard/page.tsx generated."

echo "🎉 BOOM! Platform architecture scaffolded successfully."