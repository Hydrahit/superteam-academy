'use client';
export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/src/store/AuthContext';
import { useWalletBinding } from '@/src/hooks/useWalletBinding';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Wallet, User, Zap, ExternalLink, Loader2 } from 'lucide-react';

export default function SettingsPage() {
  const auth = useAuth();
  const { user, isLinked } = auth || { user: null, isLinked: false };
  const { bindWallet, loading, error, connected } = useWalletBinding();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return <div className="min-h-screen bg-[#060608]" />;

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 bg-[#060608] font-sans selection:bg-[#00E5FF]/30">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <h1 className="text-5xl font-syne font-extrabold text-white tracking-tighter uppercase italic mb-2">
            Identity_<span className="text-[#00E5FF]">Vault</span>
          </h1>
          <p className="text-neutral-500 font-mono text-xs uppercase tracking-[0.3em]">Secure your on-chain reputation</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* User Profile Card */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-[#0C0C10] border border-white/5 p-6 rounded-[32px] text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-[#00E5FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-24 h-24 bg-neutral-900 rounded-full mx-auto mb-4 border border-white/10 flex items-center justify-center overflow-hidden">
                {user?.user_metadata?.avatar_url ? (
                  <img src={user.user_metadata.avatar_url} alt="avatar" />
                ) : (
                  <User className="w-10 h-10 text-white/20" />
                )}
              </div>
              <h2 className="font-syne font-bold text-xl text-white">{user?.user_metadata?.full_name || 'Anonymous Architect'}</h2>
              <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest mt-1">{user?.email}</p>
            </div>
          </div>

          {/* Connection Center */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-[#0C0C10] border border-white/5 p-8 rounded-[32px] relative">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-lg font-syne font-bold text-white uppercase tracking-tight flex items-center gap-2">
                    <Wallet className="w-5 h-5 text-[#9945FF]" /> Wallet_Binding
                  </h3>
                  <p className="text-xs text-neutral-500 mt-1">Link your Solana wallet for soulbound rewards.</p>
                </div>
                {isLinked && (
                  <span className="px-3 py-1 bg-[#14F195]/10 text-[#14F195] text-[10px] font-bold rounded-full border border-[#14F195]/20 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> VERIFIED
                  </span>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#9945FF]/10 flex items-center justify-center">
                        <Wallet className="text-[#9945FF] w-5 h-5" />
                      </div>
                      <span className="text-sm font-bold text-white/80">Solana Network</span>
                   </div>
                   <WalletMultiButton />
                </div>

                <AnimatePresence>
                  {connected && !isLinked && (
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={() => bindWallet(user?.id)}
                      disabled={loading}
                      className="w-full py-4 bg-[#00E5FF] text-black font-syne font-extrabold rounded-2xl shadow-[0_0_30px_rgba(0,229,255,0.3)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 uppercase italic tracking-tighter"
                    >
                      {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5 fill-current" />}
                      {loading ? 'CRYPTO_SYNCING...' : 'AUTHORIZE_BINDING'}
                    </motion.button>
                  )}
                </AnimatePresence>

                {error && (
                  <p className="text-[10px] font-mono text-red-500 uppercase text-center">{error}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}