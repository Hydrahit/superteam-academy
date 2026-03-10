'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { truncateWallet } from '@/lib/utils';

interface LeaderboardEntry {
  rank: number;
  walletAddress: string;
  coursesEnrolled: number;
  coursesCompleted: number;
  lessonsCompleted: number;
  certificatesMinted: number;
  xp: number;
}

interface LeaderboardData {
  leaderboard: LeaderboardEntry[];
  pagination: {
    page: number;
    limit: number;
    totalEntries: number;
    totalPages: number;
  };
  currentUser: LeaderboardEntry | null;
}

export default function LeaderboardPage() {
  const [data, setData] = useState<LeaderboardData | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, [page]);

  async function fetchLeaderboard() {
    setLoading(true);
    try {
      const res = await fetch(`/api/leaderboard?page=${page}&limit=25`);
      const json = await res.json();
      setData(json);
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error);
    } finally {
      setLoading(false);
    }
  }

  function getRankStyle(rank: number) {
    if (rank === 1) return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
    if (rank === 2) return 'text-gray-300 bg-gray-300/10 border-gray-300/30';
    if (rank === 3) return 'text-amber-600 bg-amber-600/10 border-amber-600/30';
    return 'text-white/60 bg-white/5 border-white/10';
  }

  function getRankIcon(rank: number) {
    if (rank === 1) return '1st';
    if (rank === 2) return '2nd';
    if (rank === 3) return '3rd';
    return `#${rank}`;
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white">
      <Navbar />

      <main className="pt-28 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Leaderboard
            </h1>
            <p className="text-white/60 text-lg max-w-xl mx-auto">
              Top learners ranked by XP. Complete courses and quizzes to climb the ranks.
            </p>
          </motion.div>

          {/* Current User Highlight */}
          {data?.currentUser && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8 p-5 rounded-2xl bg-gradient-to-r from-[#00C896]/10 to-[#9945FF]/10 border border-[#00C896]/30"
            >
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#00C896]/20 flex items-center justify-center font-display font-bold text-[#00C896]">
                    #{data.currentUser.rank}
                  </div>
                  <div>
                    <p className="text-sm text-white/40">Your Position</p>
                    <p className="font-mono text-[#00C896]">
                      {truncateWallet(data.currentUser.walletAddress)}
                    </p>
                  </div>
                </div>
                <div className="flex gap-6 text-sm">
                  <div className="text-center">
                    <p className="text-white/40">XP</p>
                    <p className="font-display font-bold text-lg">{data.currentUser.xp.toLocaleString()}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-white/40">Courses</p>
                    <p className="font-display font-bold text-lg">{data.currentUser.coursesCompleted}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-white/40">Certs</p>
                    <p className="font-display font-bold text-lg">{data.currentUser.certificatesMinted}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Leaderboard Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
          >
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/10 text-white/40 text-sm font-medium">
              <div className="col-span-1">Rank</div>
              <div className="col-span-4">Wallet</div>
              <div className="col-span-2 text-center">XP</div>
              <div className="col-span-2 text-center hidden md:block">Courses</div>
              <div className="col-span-1 text-center hidden md:block">Lessons</div>
              <div className="col-span-2 text-center hidden md:block">Certs</div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="p-12 text-center">
                <div className="w-8 h-8 border-2 border-[#00C896] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-white/40">Loading rankings...</p>
              </div>
            )}

            {/* Empty State */}
            {!loading && data?.leaderboard.length === 0 && (
              <div className="p-12 text-center">
                <p className="text-white/40 text-lg mb-2">No rankings yet</p>
                <p className="text-white/30 text-sm">Be the first to earn XP by completing courses!</p>
              </div>
            )}

            {/* Rows */}
            {!loading &&
              data?.leaderboard.map((entry, index) => (
                <motion.div
                  key={entry.walletAddress}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className={`grid grid-cols-12 gap-4 px-6 py-4 items-center border-b border-white/5 hover:bg-white/5 transition-colors ${
                    data.currentUser?.walletAddress === entry.walletAddress
                      ? 'bg-[#00C896]/5'
                      : ''
                  }`}
                >
                  <div className="col-span-1">
                    <span
                      className={`inline-flex items-center justify-center w-8 h-8 rounded-lg text-xs font-bold border ${getRankStyle(
                        entry.rank
                      )}`}
                    >
                      {getRankIcon(entry.rank)}
                    </span>
                  </div>
                  <div className="col-span-4">
                    <span className="font-mono text-sm">
                      {truncateWallet(entry.walletAddress)}
                    </span>
                  </div>
                  <div className="col-span-2 text-center">
                    <span className="font-display font-bold text-[#00C896]">
                      {entry.xp.toLocaleString()}
                    </span>
                  </div>
                  <div className="col-span-2 text-center hidden md:block">
                    <span className="text-white/70">
                      {entry.coursesCompleted}/{entry.coursesEnrolled}
                    </span>
                  </div>
                  <div className="col-span-1 text-center hidden md:block">
                    <span className="text-white/70">{entry.lessonsCompleted}</span>
                  </div>
                  <div className="col-span-2 text-center hidden md:block">
                    <span className="text-white/70">{entry.certificatesMinted}</span>
                  </div>
                </motion.div>
              ))}
          </motion.div>

          {/* Pagination */}
          {data && data.pagination.totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-8">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm font-medium hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="text-white/40 text-sm">
                Page {data.pagination.page} of {data.pagination.totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(data.pagination.totalPages, p + 1))}
                disabled={page === data.pagination.totalPages}
                className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm font-medium hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}

          {/* XP Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/10"
          >
            <h2 className="font-display font-bold text-lg mb-4">How XP Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#00C896]/10 flex items-center justify-center text-[#00C896] font-bold text-sm">
                  +10
                </div>
                <div>
                  <p className="text-sm font-medium">Lesson Completed</p>
                  <p className="text-xs text-white/40">Per lesson finished</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#9945FF]/10 flex items-center justify-center text-[#9945FF] font-bold text-sm">
                  +50
                </div>
                <div>
                  <p className="text-sm font-medium">Course Completed</p>
                  <p className="text-xs text-white/40">All lessons + quizzes done</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-yellow-400/10 flex items-center justify-center text-yellow-400 font-bold text-sm">
                  70%
                </div>
                <div>
                  <p className="text-sm font-medium">Quiz Passing Score</p>
                  <p className="text-xs text-white/40">Minimum to earn credit</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
