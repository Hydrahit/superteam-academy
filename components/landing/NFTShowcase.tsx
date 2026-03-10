'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NFTShowcase() {
  return (
    <section className="py-24 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left — Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[#00C896] text-sm font-bold uppercase tracking-[0.2em] mb-4">
              🏆 NFT CERTIFICATES
            </p>

            <h2 className="font-display text-5xl text-white font-black leading-tight">
              Your Achievement,
              <br />
              Forever On-Chain
            </h2>

            <p className="text-lg text-[#888888] mt-5 leading-relaxed max-w-lg">
              Every certificate is a compressed NFT minted to your Solana wallet.
              Transfer it, display it, share it — permanently and provably yours.
            </p>

            <div className="mt-8 space-y-4">
              {[
                'Compressed NFT via Metaplex Bubblegum — fractions of a cent to mint',
                'Instantly verifiable on Solana Explorer with your wallet address',
                'One-click share to Twitter/X with a pre-filled achievement tweet',
                'Yours forever — stored in your wallet, not on our servers',
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-[#00C896] text-lg flex-shrink-0">✅</span>
                  <span className="text-[#d1d5db] text-sm leading-relaxed">
                    {text}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Link href="/courses">
                <button className="glow-green bg-[#00C896] text-black font-bold font-display rounded-xl px-8 py-4 hover:bg-[#00b085] transition-all">
                  Explore Courses →
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Right — Certificate card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="max-w-sm w-full">
              {/* Gradient border wrapper */}
              <div className="p-[1px] bg-gradient-to-br from-[#00C896] to-[#9945FF] rounded-2xl">
                <div className="relative rounded-2xl p-8 bg-[#0F0F0F] overflow-hidden">
                  {/* Shimmer */}
                  <div className="absolute inset-0 shimmer pointer-events-none" />

                  {/* Watermark */}
                  <span className="absolute bottom-4 right-4 opacity-5 text-8xl select-none">
                    ◎
                  </span>

                  {/* Header */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[#00C896] text-xs font-bold tracking-widest">
                      🎓 SUPERTEAM
                    </span>
                    <span className="text-[#888888] text-xs">ACADEMY</span>
                  </div>

                  <div className="border-t border-[#00C896]/20 my-4" />

                  <p className="font-display text-2xl text-white font-bold text-center">
                    Certificate of Completion
                  </p>
                  <p className="text-[#888888] text-xs text-center mt-3">
                    This certifies that
                  </p>
                  <p className="font-mono text-[#00C896] text-xl text-center font-bold mt-1">
                    7xKp...4fRm
                  </p>
                  <p className="text-[#888888] text-xs text-center mt-1">
                    has successfully completed
                  </p>
                  <p className="font-display text-xl text-white font-bold text-center mt-2">
                    Solana Fundamentals
                  </p>

                  <p className="text-[#00C896] text-sm text-center mt-2">
                    Final Score: 94%
                  </p>

                  <div className="border-t border-[#00C896]/20 my-4" />

                  <div className="flex justify-between text-xs text-[#888888] mt-4">
                    <span>March 2026</span>
                    <span>NFT #0482</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
