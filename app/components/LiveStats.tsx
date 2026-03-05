'use client';

import { motion } from 'framer-motion';

const stats = [
  { value: '1.2M+', label: 'Total XP Earned', color: 'text-[#14F195]' },
  { value: '15k+', label: 'Active Wallets', color: 'text-white' },
  { value: '84k+', label: 'Modules Completed', color: 'text-[#9945FF]' },
];

export default function LiveStats() {
  return (
    <section className="py-32 px-6 max-w-5xl mx-auto text-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 divide-y md:divide-y-0 md:divide-x divide-white/10">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex flex-col items-center pt-8 md:pt-0"
          >
            <span className={`text-5xl md:text-6xl font-bold font-syne mb-2 ${stat.color}`}>
              {stat.value}
            </span>
            <span className="text-neutral-400 font-medium tracking-wide uppercase text-sm">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
