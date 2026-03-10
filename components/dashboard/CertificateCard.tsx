'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, Loader2 } from 'lucide-react';

interface CertificateCardProps {
  courseTitle: string;
  completedAt: string;
  mintAddress?: string;
  onMint: () => Promise<string | null>;
}

export default function CertificateCard({ courseTitle, completedAt, mintAddress, onMint }: CertificateCardProps) {
  const [minting, setMinting] = useState(false);
  const [txHash, setTxHash] = useState(mintAddress || '');

  const handleMint = async () => {
    setMinting(true);
    try {
      const result = await onMint();
      if (result) setTxHash(result);
    } finally {
      setMinting(false);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="relative p-6 rounded-2xl border border-[#9945FF]/20 bg-gradient-to-br from-[#9945FF]/5 to-[#00C896]/5 overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#9945FF]/10 rounded-full blur-3xl" />
      <div className="relative">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-[#9945FF]/20 flex items-center justify-center">
            <Award className="w-6 h-6 text-[#9945FF]" />
          </div>
          <div>
            <h3 className="text-lg font-display font-bold text-white line-clamp-1">{courseTitle}</h3>
            <p className="text-xs text-white/40">
              Completed {new Date(completedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
        </div>

        {txHash ? (
          <a
            href={`https://explorer.solana.com/tx/${txHash}?cluster=devnet`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#9945FF]/10 border border-[#9945FF]/20 text-[#9945FF] text-sm font-bold hover:bg-[#9945FF]/20 transition-colors"
          >
            View on Explorer <ExternalLink className="w-3.5 h-3.5" />
          </a>
        ) : (
          <button
            onClick={handleMint}
            disabled={minting}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#9945FF] to-[#00C896] text-white text-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {minting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Minting...
              </>
            ) : (
              'Mint Certificate NFT'
            )}
          </button>
        )}
      </div>
    </motion.div>
  );
}
