'use client';
export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { useAuth } from '@/src/store/AuthContext';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Save, Wallet, Github, Mail } from 'lucide-react';

export default function SettingsPage() {
  const auth = useAuth();
  const { isLinked } = auth || { isLinked: false };
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return <div className="min-h-screen bg-black" />;

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6 md:p-12 font-sans pt-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold font-syne mb-8 uppercase italic tracking-tighter text-[#00E5FF]">Account_Settings</h1>
        <div className="bg-[#0C0C10] border border-white/5 rounded-3xl p-8 mb-8">
           <h2 className="text-xl font-bold mb-6 font-syne uppercase">Identity_Link</h2>
           <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                <div className="flex items-center gap-4"><Wallet className="text-[#9945FF]"/> <span>Solana Wallet</span></div>
                <WalletMultiButton />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}