'use client';

import { motion } from 'framer-motion';

const testimonials = [
  {
    quote:
      'This is the best way to learn Solana. The quizzes are challenging and the NFT certificate is something I\'m actually proud to display in my wallet.',
    handle: '@solanabuilder_br',
    initials: 'SB',
    color: 'bg-[#00C896]',
    badge: 'Anchor Fundamentals',
  },
  {
    quote:
      'Finally a Web3 course platform that\'s actually Web3. My certificate lives in my wallet, not on some company\'s servers. This is the future.',
    handle: '@defi_dev_br',
    initials: 'DD',
    color: 'bg-[#9945FF]',
    badge: 'DeFi on Solana',
  },
  {
    quote:
      'Finished all 5 courses in a month. The leaderboard kept me motivated every single day. Superteam Academy is the real deal for Solana builders.',
    handle: '@web3_curious',
    initials: 'WC',
    color: 'bg-amber-500',
    badge: 'All 5 Courses 🔥',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: 'easeOut' },
  }),
};

export default function Testimonials() {
  return (
    <section className="py-24 px-8 bg-[#080808]">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-5xl text-white font-black text-center">
          What Builders Are Saying
        </h2>
        <p className="text-[#888888] text-center mt-4 mb-14">
          Real feedback from real learners in the Solana ecosystem.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.handle}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="glass rounded-2xl p-8 card-hover relative"
            >
              {/* Stars */}
              <div className="text-amber-400 text-sm mb-4">⭐⭐⭐⭐⭐</div>

              {/* Quote mark */}
              <span className="font-display text-6xl text-[#00C896] opacity-30 leading-none mb-2 block">
                &ldquo;
              </span>

              {/* Quote text */}
              <p className="text-sm text-white/85 leading-relaxed">
                {t.quote}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 mt-6">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${t.color}`}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">
                    {t.handle}
                  </p>
                  <span className="text-xs bg-[#9945FF]/20 text-[#9945FF] rounded-full px-2 py-0.5 mt-0.5 inline-block">
                    {t.badge}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
