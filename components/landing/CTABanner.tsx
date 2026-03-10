'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CTABanner() {
  return (
    <section className="py-28 px-8 relative overflow-hidden bg-gradient-to-br from-[#00C896] to-[#9945FF]">
      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px',
        }}
      />

      <div className="text-center relative z-10 max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-6xl font-black text-white leading-tight"
        >
          Ready to Start
          <br />
          Learning?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-xl text-white/80 mt-6 leading-relaxed"
        >
          Join 3,200+ builders mastering Web3 on the Solana blockchain.
          <br />
          Your first certificate is one course away.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10"
        >
          <Link href="/courses">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="bg-black text-white font-bold font-display rounded-xl px-10 py-5 text-lg hover:bg-white hover:text-black transition-all duration-200"
            >
              Connect Wallet &amp; Start Learning
            </motion.button>
          </Link>
        </motion.div>

        <p className="mt-5 text-sm text-white/60">
          Free to use &middot; No credit card &middot; Solana wallet required
        </p>
      </div>
    </section>
  );
}
