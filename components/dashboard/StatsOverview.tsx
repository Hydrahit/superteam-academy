'use client';

import { motion } from 'framer-motion';

interface StatsOverviewProps {
  coursesEnrolled: number;
  coursesCompleted: number;
  totalXp: number;
  rank: number | null;
}

export default function StatsOverview({ coursesEnrolled, coursesCompleted, totalXp, rank }: StatsOverviewProps) {
  const stats = [
    { label: 'Enrolled', value: coursesEnrolled, icon: '\u{1F4DA}' },
    { label: 'Completed', value: coursesCompleted, icon: '\u{2705}' },
    { label: 'Total XP', value: totalXp.toLocaleString(), icon: '\u{26A1}' },
    { label: 'Rank', value: rank ? `#${rank}` : '--', icon: '\u{1F3C6}' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="p-6 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm text-center"
        >
          <div className="text-3xl mb-2">{stat.icon}</div>
          <p className="text-2xl font-display font-bold text-white">{stat.value}</p>
          <p className="text-sm text-white/40 mt-1">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
}
