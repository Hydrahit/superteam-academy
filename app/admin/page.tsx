'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

interface AdminStats {
  totalUsers: number;
  totalCourses: number;
  totalEnrollments: number;
  totalCompletions: number;
  totalCertificates: number;
  recentEnrollments: {
    walletAddress: string;
    courseTitle: string;
    enrolledAt: string;
  }[];
  courseStats: {
    id: string;
    title: string;
    slug: string;
    difficulty: string;
    lessonCount: number;
    enrollmentCount: number;
    completionCount: number;
    completionRate: number;
  }[];
}

export default function AdminPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'activity'>('overview');

  useEffect(() => {
    fetchAdminStats();
  }, []);

  async function fetchAdminStats() {
    setLoading(true);
    try {
      // In production, this would call /api/admin/stats with admin auth check
      // For now, we fetch from existing endpoints and aggregate
      const [coursesRes, leaderboardRes] = await Promise.all([
        fetch('/api/courses'),
        fetch('/api/leaderboard?limit=100'),
      ]);

      const courses = await coursesRes.json();
      const leaderboard = await leaderboardRes.json();

      // Build admin stats from available data
      const courseStats = courses.map((c: any) => ({
        id: c.id,
        title: c.title,
        slug: c.slug,
        difficulty: c.difficulty,
        lessonCount: c.lessonCount,
        enrollmentCount: c.enrollmentCount || 0,
        completionCount: 0, // Would come from admin API
        completionRate: 0, // Would come from admin API
      }));

      setStats({
        totalUsers: leaderboard.pagination?.totalEntries || 0,
        totalCourses: courses.length,
        totalEnrollments: courseStats.reduce((sum: number, c: any) => sum + c.enrollmentCount, 0),
        totalCompletions: leaderboard.leaderboard?.filter((e: any) => e.coursesCompleted > 0).length || 0,
        totalCertificates: leaderboard.leaderboard?.reduce((sum: number, e: any) => sum + (e.certificatesMinted || 0), 0) || 0,
        recentEnrollments: [],
        courseStats,
      });
    } catch (error) {
      console.error('Failed to fetch admin stats:', error);
    } finally {
      setLoading(false);
    }
  }

  function getDifficultyColor(difficulty: string) {
    switch (difficulty) {
      case 'BEGINNER':
        return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'INTERMEDIATE':
        return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'ADVANCED':
        return 'text-red-400 bg-red-400/10 border-red-400/30';
      default:
        return 'text-white/60 bg-white/5 border-white/10';
    }
  }

  const tabs = [
    { key: 'overview' as const, label: 'Overview' },
    { key: 'courses' as const, label: 'Courses' },
    { key: 'activity' as const, label: 'Activity' },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white">
      <Navbar />

      <main className="pt-28 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <h1 className="text-4xl font-display font-bold mb-2">Admin Dashboard</h1>
            <p className="text-white/60">
              Platform overview and course management.
            </p>
          </motion.div>

          {/* Stats Cards */}
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-28 rounded-2xl bg-white/5 border border-white/10 animate-pulse"
                />
              ))}
            </div>
          ) : stats ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10"
            >
              {[
                { label: 'Total Users', value: stats.totalUsers, color: 'text-[#00C896]' },
                { label: 'Courses', value: stats.totalCourses, color: 'text-[#9945FF]' },
                { label: 'Enrollments', value: stats.totalEnrollments, color: 'text-blue-400' },
                { label: 'Completions', value: stats.totalCompletions, color: 'text-yellow-400' },
                { label: 'Certificates', value: stats.totalCertificates, color: 'text-pink-400' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="p-5 rounded-2xl bg-white/5 border border-white/10"
                >
                  <p className="text-white/40 text-sm mb-1">{stat.label}</p>
                  <p className={`text-3xl font-display font-bold ${stat.color}`}>
                    {stat.value.toLocaleString()}
                  </p>
                </div>
              ))}
            </motion.div>
          ) : null}

          {/* Tabs */}
          <div className="flex gap-1 mb-8 p-1 bg-white/5 rounded-xl w-fit border border-white/10">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.key
                    ? 'bg-[#00C896] text-black'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && stats && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Platform Health */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <h2 className="font-display font-bold text-lg mb-4">Platform Health</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-white/40 text-sm mb-1">Avg Completion Rate</p>
                    <div className="flex items-end gap-2">
                      <span className="text-2xl font-display font-bold text-[#00C896]">
                        {stats.totalEnrollments > 0
                          ? Math.round((stats.totalCompletions / stats.totalEnrollments) * 100)
                          : 0}%
                      </span>
                      <span className="text-white/30 text-sm mb-1">of enrolled users</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-white/40 text-sm mb-1">Avg Courses per User</p>
                    <div className="flex items-end gap-2">
                      <span className="text-2xl font-display font-bold text-[#9945FF]">
                        {stats.totalUsers > 0
                          ? (stats.totalEnrollments / stats.totalUsers).toFixed(1)
                          : '0'}
                      </span>
                      <span className="text-white/30 text-sm mb-1">courses enrolled</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-white/40 text-sm mb-1">Certificate Mint Rate</p>
                    <div className="flex items-end gap-2">
                      <span className="text-2xl font-display font-bold text-yellow-400">
                        {stats.totalCompletions > 0
                          ? Math.round((stats.totalCertificates / stats.totalCompletions) * 100)
                          : 0}%
                      </span>
                      <span className="text-white/30 text-sm mb-1">of completions</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <h2 className="font-display font-bold text-lg mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button className="p-4 rounded-xl bg-[#00C896]/10 border border-[#00C896]/30 text-left hover:bg-[#00C896]/20 transition-colors">
                    <p className="font-medium text-[#00C896] mb-1">Add New Course</p>
                    <p className="text-xs text-white/40">Create course with lessons and quizzes</p>
                  </button>
                  <button className="p-4 rounded-xl bg-[#9945FF]/10 border border-[#9945FF]/30 text-left hover:bg-[#9945FF]/20 transition-colors">
                    <p className="font-medium text-[#9945FF] mb-1">Manage Users</p>
                    <p className="text-xs text-white/40">View and manage learner accounts</p>
                  </button>
                  <Link
                    href="/leaderboard"
                    className="p-4 rounded-xl bg-yellow-400/10 border border-yellow-400/30 text-left hover:bg-yellow-400/20 transition-colors block"
                  >
                    <p className="font-medium text-yellow-400 mb-1">View Leaderboard</p>
                    <p className="text-xs text-white/40">See top learners and XP rankings</p>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'courses' && stats && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {stats.courseStats.map((course) => (
                <div
                  key={course.id}
                  className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.07] transition-colors"
                >
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00C896]/20 to-[#9945FF]/20 flex items-center justify-center">
                        <span className="font-display font-bold text-sm">
                          {course.title.split(' ').map((w: string) => w[0]).join('').slice(0, 2)}
                        </span>
                      </div>
                      <div>
                        <Link
                          href={`/courses/${course.slug}`}
                          className="font-display font-bold hover:text-[#00C896] transition-colors"
                        >
                          {course.title}
                        </Link>
                        <div className="flex items-center gap-2 mt-1">
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full border ${getDifficultyColor(
                              course.difficulty
                            )}`}
                          >
                            {course.difficulty}
                          </span>
                          <span className="text-xs text-white/40">
                            {course.lessonCount} lessons
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-8 text-sm">
                      <div className="text-center">
                        <p className="text-white/40 text-xs">Enrolled</p>
                        <p className="font-display font-bold">{course.enrollmentCount}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-white/40 text-xs">Completed</p>
                        <p className="font-display font-bold">{course.completionCount}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-white/40 text-xs">Rate</p>
                        <p className="font-display font-bold">
                          {course.enrollmentCount > 0
                            ? `${Math.round((course.completionCount / course.enrollmentCount) * 100)}%`
                            : '--'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {stats.courseStats.length === 0 && (
                <div className="p-12 text-center rounded-2xl bg-white/5 border border-white/10">
                  <p className="text-white/40 text-lg mb-2">No courses yet</p>
                  <p className="text-white/30 text-sm">Create your first course to get started.</p>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'activity' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10"
            >
              <h2 className="font-display font-bold text-lg mb-4">Recent Activity</h2>
              {stats?.recentEnrollments && stats.recentEnrollments.length > 0 ? (
                <div className="space-y-3">
                  {stats.recentEnrollments.map((enrollment, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-xl bg-white/5"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#00C896]/10 flex items-center justify-center">
                          <span className="text-[#00C896] text-xs font-bold">E</span>
                        </div>
                        <div>
                          <p className="text-sm">
                            <span className="font-mono text-xs">{enrollment.walletAddress.slice(0, 8)}...</span>
                            {' '}enrolled in{' '}
                            <span className="font-medium text-[#00C896]">{enrollment.courseTitle}</span>
                          </p>
                          <p className="text-xs text-white/30">
                            {new Date(enrollment.enrolledAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-white/40">No recent activity to display.</p>
                  <p className="text-white/30 text-sm mt-1">
                    Activity will appear here as users enroll in courses.
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
