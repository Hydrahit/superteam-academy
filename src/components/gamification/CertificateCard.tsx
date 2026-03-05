'use client';
import { motion } from 'framer-motion';
import { Award, ExternalLink, ShieldCheck } from 'lucide-react';

interface CertificateProps {
  title: string;
  issuedAt: string;
  txHash: string;
}

export const CertificateCard = ({ title, issuedAt, txHash }: CertificateProps) => {
  return (
    <motion.div 
      whileHover={{ y: -10, scale: 1.02 }}
      className="relative group w-full aspect-[4/5] bg-gradient-to-br from-white/10 to-transparent border border-white/10 rounded-[40px] p-8 overflow-hidden shadow-2xl backdrop-blur-xl"
    >
      {/* Holographic Overlay Effect */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay group-hover:opacity-30 transition-opacity" />
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#9945FF]/20 rounded-full blur-[80px]" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#14F195]/20 rounded-full blur-[80px]" />

      <div className="relative z-10 h-full flex flex-col items-center justify-between text-center">
        <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-full flex items-center justify-center">
           <Award size={40} className="text-[#14F195]" />
        </div>

        <div>
           <h3 className="text-2xl font-syne font-black text-white uppercase italic tracking-tighter mb-2">{title}</h3>
           <p className="text-[10px] font-mono text-white/40 uppercase tracking-[0.3em]">Soulbound_Credential_v1.0</p>
        </div>

        <div className="w-full space-y-4">
           <div className="flex justify-between items-center text-[10px] font-mono border-t border-white/10 pt-4">
              <span className="text-white/30 uppercase">Issued:</span>
              <span className="text-white/80">{issuedAt}</span>
           </div>
           <a 
             href={`https://solscan.io/tx/${txHash}`} 
             target="_blank" 
             className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center gap-2 text-[10px] font-bold text-white hover:bg-[#14F195] hover:text-black transition-all uppercase tracking-widest"
           >
              <ExternalLink size={14} /> Verify_On_Explorer
           </a>
        </div>
      </div>
    </motion.div>
  );
};
