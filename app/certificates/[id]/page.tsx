'use client';

import { Award, CheckCircle2, Share2, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function CertificatePage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-[#060608] text-white pt-24 pb-20 px-4 flex items-center justify-center font-['Bricolage_Grotesque'] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#00E5FF]/10 via-[#060608] to-[#060608]">
      <div className="max-w-3xl w-full">
        
        {/* Certificate Card */}
        <div className="bg-[#0C0C10] border border-white/10 rounded-[40px] p-2 md:p-4 shadow-[0_0_100px_rgba(0,229,255,0.1)] relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/10 via-transparent to-[#FFE500]/10 opacity-50" />
          
          <div className="border border-white/10 rounded-[32px] p-10 md:p-16 text-center relative z-10 bg-[#0C0C10]/80 backdrop-blur-sm">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-[#00E5FF] to-[#00FF94] flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(0,229,255,0.4)]">
              <Award className="w-10 h-10 text-black" />
            </div>
            
            <p className="font-['JetBrains_Mono'] text-[#00E5FF] text-[10px] uppercase tracking-[0.2em] mb-4">Metaplex Core Soulbound Credential</p>
            <h1 className="font-['Syne'] text-3xl md:text-5xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
              Solana Fundamentals
            </h1>
            
            <p className="text-white/50 text-lg mb-2">This is to certify that</p>
            <p className="font-['Syne'] text-2xl font-bold text-[#FFE500] mb-8">SolanaBuilder_99</p>
            
            <p className="text-white/40 max-w-lg mx-auto text-sm leading-relaxed mb-10">
              Has successfully completed all requirements, coding challenges, and assessments for the Solana Fundamentals track on Superteam Academy.
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6 font-['JetBrains_Mono'] text-xs text-white/50 border-t border-white/10 pt-8">
              <div className="flex flex-col gap-1">
                <span className="uppercase tracking-widest text-white/30 text-[9px]">Date Issued</span>
                <span>March 5, 2026</span>
              </div>
              <div className="hidden md:block w-px h-8 bg-white/10" />
              <div className="flex flex-col gap-1">
                <span className="uppercase tracking-widest text-white/30 text-[9px]">Token ID</span>
                <span className="text-[#00FF94] flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Verified</span>
              </div>
              <div className="hidden md:block w-px h-8 bg-white/10" />
              <div className="flex flex-col gap-1">
                <span className="uppercase tracking-widest text-white/30 text-[9px]">Issued By</span>
                <span>Superteam Academy</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-center gap-4">
          <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-['JetBrains_Mono'] text-xs uppercase tracking-widest px-6 py-3 rounded-xl flex items-center gap-2 transition-colors">
            <Share2 className="w-4 h-4" /> Share on X
          </button>
          <Link href="https://explorer.solana.com" target="_blank" className="bg-[#00E5FF]/10 hover:bg-[#00E5FF]/20 border border-[#00E5FF]/30 text-[#00E5FF] font-['JetBrains_Mono'] text-xs uppercase tracking-widest px-6 py-3 rounded-xl flex items-center gap-2 transition-colors">
            <ExternalLink className="w-4 h-4" /> View on Explorer
          </Link>
        </div>

      </div>
    </div>
  );
}
