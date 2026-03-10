'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { BookOpen, Clock, BarChart3, Users, PlayCircle, Lock, CheckCircle } from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  order: number;
  duration: number;
  completed?: boolean;
}

interface CourseDetail {
  id: string;
  title: string;
  slug: string;
  description: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  lessons: Lesson[];
  _count: { enrollments: number };
  duration: number;
  enrolled?: boolean;
  progress?: number;
}

const diffBadge: Record<string, string> = {
  BEGINNER: 'bg-green-500/20 text-green-400 border-green-500/30',
  INTERMEDIATE: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  ADVANCED: 'bg-red-500/20 text-red-400 border-red-500/30',
};

export default function CourseDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: session } = useSession();
  const router = useRouter();
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    fetch(`/api/courses/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setCourse(data.course || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  const handleEnroll = async () => {
    if (!session) return;
    setEnrolling(true);
    try {
      const res = await fetch(`/api/courses/${slug}/enroll`, { method: 'POST' });
      if (res.ok) {
        setCourse((prev) => prev ? { ...prev, enrolled: true, progress: 0 } : prev);
      }
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-24 pb-16 px-8">
          <div className="max-w-5xl mx-auto animate-pulse space-y-6">
            <div className="h-10 bg-white/10 rounded-lg w-1/2" />
            <div className="h-6 bg-white/10 rounded-lg w-3/4" />
            <div className="h-64 bg-white/10 rounded-2xl" />
          </div>
        </main>
      </>
    );
  }

  if (!course) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-24 pb-16 px-8 flex items-center justify-center">
          <p className="text-white/40 text-lg">Course not found.</p>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Header */}
            <div className="mb-10">
              <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full border mb-4 ${diffBadge[course.difficulty]}`}>
                {course.difficulty}
              </span>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">{course.title}</h1>
              <p className="text-lg text-white/50 max-w-3xl leading-relaxed">{course.description}</p>

              <div className="flex flex-wrap gap-6 mt-6 text-sm text-white/40">
                <span className="flex items-center gap-2"><BookOpen className="w-4 h-4" />{course.lessons.length} lessons</span>
                <span className="flex items-center gap-2"><Clock className="w-4 h-4" />{course.duration} min</span>
                <span className="flex items-center gap-2"><Users className="w-4 h-4" />{course._count.enrollments} enrolled</span>
                <span className="flex items-center gap-2"><BarChart3 className="w-4 h-4" />{course.difficulty.toLowerCase()}</span>
              </div>
            </div>

            {/* Enroll / Progress */}
            <div className="mb-10">
              {course.enrolled ? (
                <div className="p-6 rounded-2xl border border-[#00C896]/20 bg-[#00C896]/5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[#00C896] font-bold">Enrolled</span>
                    <span className="text-[#00C896] font-mono font-bold">{course.progress || 0}% complete</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden mb-4">
                    <div className="h-full rounded-full bg-gradient-to-r from-[#00C896] to-[#9945FF]" style={{ width: `${course.progress || 0}%` }} />
                  </div>
                  <button
                    onClick={() => {
                      const nextLesson = course.lessons.find((l) => !l.completed) || course.lessons[0];
                      router.push(`/courses/${slug}/lessons/${nextLesson.id}`);
                    }}
                    className="px-6 py-3 rounded-xl bg-[#00C896] text-black font-bold hover:opacity-90 transition-opacity"
                  >
                    Continue Learning
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleEnroll}
                  disabled={enrolling || !session}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#00C896] to-[#9945FF] text-white font-bold text-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {!session ? 'Connect Wallet to Enroll' : enrolling ? 'Enrolling...' : 'Enroll for Free'}
                </button>
              )}
            </div>

            {/* Lesson list */}
            <div>
              <h2 className="text-2xl font-display font-bold text-white mb-6">Lessons</h2>
              <div className="space-y-3">
                {course.lessons.map((lesson, idx) => {
                  const isLocked = !course.enrolled && idx > 0;
                  return (
                    <motion.div
                      key={lesson.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                        isLocked
                          ? 'border-white/5 bg-white/[0.01] opacity-50'
                          : 'border-white/10 bg-white/[0.03] hover:border-[#00C896]/30 cursor-pointer'
                      }`}
                      onClick={() => {
                        if (!isLocked) router.push(`/courses/${slug}/lessons/${lesson.id}`);
                      }}
                    >
                      <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-white/[0.05]">
                        {lesson.completed ? (
                          <CheckCircle className="w-5 h-5 text-[#00C896]" />
                        ) : isLocked ? (
                          <Lock className="w-4 h-4 text-white/20" />
                        ) : (
                          <PlayCircle className="w-5 h-5 text-white/40" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium truncate">{lesson.order}. {lesson.title}</p>
                        <p className="text-xs text-white/30">{lesson.duration} min</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
