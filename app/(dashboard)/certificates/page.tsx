'use client';
export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/src/store/AuthContext';
import { CERTIFICATES } from '@/src/services/CertificateService';
import { motion } from 'framer-motion';
import { Award, ExternalLink, Lock, CheckCircle2 } from 'lucide-react';

export default function CertificatesPage() {
  const auth = useAuth();
  const { user, isLinked } = auth || { user: null, isLinked: false };
  const [userLevel, setUserLevel] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // In real app, fetch level from Supabase
    setUserLevel(5); 
  }, []);

  if (!mounted) return <div className="min-h-screen bg-[#060608]" />;

  return (
    <div className="min-h-screen pt-24 pb-20 px-8 bg-[#060608] selection:bg-purple-500/30">
      <div className="max-w-6xl mx-auto">
        <header className="mb-16 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="inline-block p-4 bg-purple-500/10 rounded-full mb-6 border border-purple-500/20">
            <Award className="w-10 h-10 text-purple-400" />
          </motion.div>
          <h1 className="text-6xl font-syne font-extrabold text-white tracking-tighter uppercase italic">Hall_of_<span className="text-purple-400">Fame</span></h1>
          <p className="text-neutral-500 font-mono text-sm mt-4">Verified Soulbound Credentials on Solana Mainnet-Beta</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CERTIFICATES.map((cert, i) => {
            const isUnlocked = userLevel >= cert.minLevel;
            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`relative group p-1 rounded-[32px] overflow-hidden ${isUnlocked ? 'bg-gradient-to-br from-purple-500/20 to-cyan-500/20' : 'bg-white/5 opacity-50'}`}
              >
                <div className="bg-[#0C0C10] rounded-[31px] p-8 h-full flex flex-col border border-white/5 group-hover:border-white/10 transition-all">
                  <div className="text-6xl mb-6">{isUnlocked ? cert.image : '🔒'}</div>
                  <h3 className="text-xl font-syne font-bold text-white mb-2">{cert.name}</h3>
                  <p className="text-xs text-neutral-500 font-mono leading-relaxed mb-8">{cert.description}</p>
                  
                  <div className="mt-auto">
                    {isUnlocked ? (
                      <button className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-mono text-white hover:bg-white/10 flex items-center justify-center gap-2 uppercase tracking-widest transition-all">
                        <ExternalLink className="w-3 h-3" /> View_On_Explorer
                      </button>
                    ) : (
                      <div className="flex items-center gap-2 text-[10px] font-mono text-white/20 uppercase">
                        <Lock className="w-3 h-3" /> Requires_Level_{cert.minLevel}
                      </div>
                    )}
                  </div>
                  {isUnlocked && <CheckCircle2 className="absolute top-6 right-6 text-[#14F195] w-5 h-5" />}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}