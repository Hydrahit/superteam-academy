'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import StatsOverview from '@/components/dashboard/StatsOverview';
import ProgressCard from '@/components/dashboard/ProgressCard';
import CertificateCard from '@/components/dashboard/CertificateCard';
import { useWallet } from '@solana/wallet-adapter-react';

interface EnrolledCourse {
  courseTitle: string;
  courseSlug: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  progress: number;
  completedLessons: number;
  totalLessons: number;
  nextLessonId?: string;
}

interface Certificate {
  courseTitle: string;
  completedAt: string;
  mintAddress?: string;
  courseId: string;
}

interface DashboardData {
  stats: {
    coursesEnrolled: number;
    coursesCompleted: number;
    totalXp: number;
    rank: number | null;
  };
  enrolledCourses: EnrolledCourse[];
  certificates: Certificate[];
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const wallet = useWallet();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
      return;
    }
    if (status === 'authenticated') {
      fetch('/api/dashboard')
        .then((res) => res.json())
        .then((d) => {
          setData(d);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [status, router]);

  const handleMintCertificate = async (courseId: string): Promise<string | null> => {
    if (!wallet.publicKey || !wallet.signTransaction) return null;
    try {
      const res = await fetch('/api/certificates/mint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId }),
      });
      const result = await res.json();
      return result.mintAddress || null;
    } catch {
      return null;
    }
  };

  if (loading || status === 'loading') {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-24 pb-16 px-8">
          <div className="max-w-6xl mx-auto animate-pulse space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 rounded-2xl bg-white/[0.03] border border-white/10" />
              ))}
            </div>
            <div className="h-8 bg-white/10 rounded-lg w-48" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-48 rounded-2xl bg-white/[0.03] border border-white/10" />
              ))}
            </div>
          </div>
        </main>
      </>
    );
  }

  if (!data) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-24 pb-16 px-8 flex items-center justify-center">
          <p className="text-white/40 text-lg">Unable to load dashboard.</p>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <h1 className="text-4xl font-display font-bold text-white mb-2">Dashboard</h1>
            <p className="text-white/50">Track your learning progress and achievements.</p>
          </motion.div>

          <div className="mb-12">
            <StatsOverview {...data.stats} />
          </div>

          {/* Enrolled Courses */}
          {data.enrolledCourses.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-display font-bold text-white mb-6">My Courses</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.enrolledCourses.map((course) => (
                  <ProgressCard key={course.courseSlug} {...course} />
                ))}
              </div>
            </section>
          )}

          {/* Certificates */}
          {data.certificates.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-display font-bold text-white mb-6">Certificates</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.certificates.map((cert) => (
                  <CertificateCard
                    key={cert.courseId}
                    courseTitle={cert.courseTitle}
                    completedAt={cert.completedAt}
                    mintAddress={cert.mintAddress}
                    onMint={() => handleMintCertificate(cert.courseId)}
                  />
                ))}
              </div>
            </section>
          )}

          {data.enrolledCourses.length === 0 && data.certificates.length === 0 && (
            <div className="text-center py-20">
              <p className="text-5xl mb-4">{'\u{1F680}'}</p>
              <h3 className="text-xl font-display font-bold text-white mb-2">No courses yet</h3>
              <p className="text-white/50 mb-6">Start learning Web3 and Solana today.</p>
              <a
                href="/courses"
                className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-[#00C896] to-[#9945FF] text-white font-bold hover:opacity-90 transition-opacity"
              >
                Browse Courses
              </a>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
