'use client';
import { useState } from 'react';
import { useAuth } from '@/src/store/AuthContext';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Save, Wallet, Github, Mail } from 'lucide-react';

export default function Settings() {
  const { isLinked } = useAuth();
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 1000);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6 md:p-12 font-sans">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold font-syne mb-8">Settings</h1>
        
        <div className="space-y-8">
          
          {/* Profile Settings */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <h2 className="text-2xl font-bold font-syne mb-6">Profile Information</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-mono text-neutral-400 mb-2">Display Name</label>
                <input type="text" defaultValue="Superteam Builder" className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#14F195] transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-mono text-neutral-400 mb-2">Bio</label>
                <textarea rows={3} defaultValue="Building the next generation of DeFi protocols on Solana." className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#14F195] transition-colors" />
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button onClick={handleSave} disabled={saving} className="px-6 py-3 bg-[#14F195] text-black font-bold rounded-xl flex items-center gap-2 hover:bg-[#10c97b]">
                {saving ? 'Saving...' : 'Save Changes'} <Save className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Account Linking */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <h2 className="text-2xl font-bold font-syne mb-6">Linked Accounts</h2>
            <p className="text-neutral-400 text-sm mb-8">Connect your accounts to secure your profile and enable credential minting.</p>
            
            <div className="space-y-4">
              {/* Google */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-900 border border-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                    <Mail className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h4 className="font-bold">Google</h4>
                    <p className="text-xs text-neutral-500 font-mono">builder@superteam.fun</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-md bg-[#14F195]/10 text-[#14F195] text-xs font-bold">Connected</span>
              </div>

              {/* Wallet */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-900 border border-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#9945FF] flex items-center justify-center">
                    <Wallet className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold">Solana Wallet</h4>
                    <p className="text-xs text-neutral-500 font-mono">{isLinked ? 'Ed25519 Verified' : 'Required for Credentials'}</p>
                  </div>
                </div>
                <WalletMultiButton className="!h-8 !px-4 !text-xs !bg-white/10 !text-white hover:!bg-white/20 !rounded-lg" />
              </div>

              {/* Github */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-900 border border-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center">
                    <Github className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold">GitHub</h4>
                    <p className="text-xs text-neutral-500 font-mono">Not connected</p>
                  </div>
                </div>
                <button className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm font-bold transition-colors">Connect</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
