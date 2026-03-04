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
