'use client';

import { motion } from 'framer-motion';

const steps = [
  {
    num: '01',
    icon: '🔗',
    title: 'Connect Your Wallet',
    description:
      'Sign in using Phantom, Backpack, or Solflare. No email or password required.',
  },
  {
    num: '02',
    icon: '📚',
    title: 'Complete Courses',
    description:
      'Watch video lessons, complete modules, and score 80%+ on quizzes to progress.',
  },
  {
    num: '03',
    icon: '🏆',
    title: 'Mint Your Certificate',
    description:
      'Receive a compressed NFT certificate minted directly to your Solana wallet.',
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

export default function HowItWorks() {
  return (
    <section className="py-24 px-8 bg-[#080808]">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-display text-5xl text-white font-black text-center">
          How It Works
        </h2>
        <p className="text-lg text-[#888888] text-center mt-4 mb-16">
          From zero to on-chain certified in three steps.
        </p>

        <div className="flex flex-col lg:flex-row lg:items-stretch gap-6 lg:gap-0">
          {steps.map((step, i) => (
            <div key={step.num} className="flex items-stretch flex-1">
              <motion.div
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                className="glass rounded-2xl p-8 relative card-hover flex-1"
              >
                {/* Number watermark */}
                <span className="absolute top-5 right-5 font-display text-5xl text-[#00C896] opacity-20 font-black select-none">
                  {step.num}
                </span>

                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-[#00C896]/10 border border-[#00C896]/20 flex items-center justify-center text-2xl mb-5">
                  {step.icon}
                </div>

                <h3 className="font-display text-xl text-white font-bold">
                  {step.title}
                </h3>
                <p className="text-[#888888] text-sm mt-2 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>

              {/* Arrow connector */}
              {i < steps.length - 1 && (
                <div className="hidden lg:flex items-center px-4 text-[#00C896] text-3xl">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
