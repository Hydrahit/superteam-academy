'use client';

import { Save, Wallet, User, Bell, Shield } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-[#060608] text-white pt-24 pb-20 px-4 md:px-8 font-['Bricolage_Grotesque']">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-['Syne'] text-4xl font-bold mb-8">Settings</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 space-y-2 font-['JetBrains_Mono'] text-sm">
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-white/10 text-[#00E5FF] rounded-xl border border-white/10"><User className="w-4 h-4" /> Profile</button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-white/40 hover:text-white hover:bg-white/5 rounded-xl transition-colors"><Wallet className="w-4 h-4" /> Wallets & Auth</button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-white/40 hover:text-white hover:bg-white/5 rounded-xl transition-colors"><Bell className="w-4 h-4" /> Notifications</button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-white/40 hover:text-white hover:bg-white/5 rounded-xl transition-colors"><Shield className="w-4 h-4" /> Privacy</button>
          </div>

          {/* Form Area */}
          <div className="flex-1 bg-[#0C0C10]/80 border border-white/[0.07] rounded-3xl p-8 backdrop-blur-xl">
            <h2 className="font-['Syne'] text-2xl font-bold mb-6 border-b border-white/10 pb-4">Public Profile</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block font-['JetBrains_Mono'] text-xs text-white/50 uppercase tracking-widest mb-2">Username</label>
                <input type="text" defaultValue="SolanaBuilder_99" className="w-full bg-[#060608] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00E5FF]/50 transition-colors" />
              </div>
              
              <div>
                <label className="block font-['JetBrains_Mono'] text-xs text-white/50 uppercase tracking-widest mb-2">Bio</label>
                <textarea rows={4} defaultValue="Building the future of finance on Solana." className="w-full bg-[#060608] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00E5FF]/50 transition-colors resize-none" />
              </div>

              <div className="pt-4">
                <button className="bg-[#00E5FF] text-black font-['Syne'] font-bold px-6 py-3 rounded-xl flex items-center gap-2 hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all">
                  <Save className="w-4 h-4" /> Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
