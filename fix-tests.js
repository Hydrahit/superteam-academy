const fs = require('fs');
const path = require('path');

console.log('🧬 FORGING IDENTITY LAYER: User Profiles & Settings...');

const rootDir = process.cwd();
const appDir = path.join(rootDir, 'app');

const ensureDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
};

ensureDir(path.join(appDir, '(dashboard)', 'profile', '[username]'));
ensureDir(path.join(appDir, '(dashboard)', 'settings'));

// ==========================================
// 1. PUBLIC USER PROFILE PAGE
// ==========================================
const profilePath = path.join(appDir, '(dashboard)', 'profile', '[username]', 'page.tsx');
const profileContent = `'use client';
import { ShieldCheck, Trophy, Github, Twitter, MapPin, Calendar, Link as LinkIcon } from 'lucide-react';

export default function UserProfile({ params }: { params: { username: string } }) {
  // Mock Data
  const profile = {
    name: params.username === 'me' ? 'Superteam Builder' : params.username,
    bio: "Building the next generation of DeFi protocols on Solana. Rust enthusiast.",
    joined: "March 2026",
    location: "Global",
    level: 4,
    xp: 2450,
    skills: [
      { name: "Rust", value: 85 },
      { name: "Anchor", value: 70 },
      { name: "Frontend", value: 90 },
      { name: "Security", value: 40 },
    ],
    nfts: [
      { title: "Solana Foundations", date: "Mar 1, 2026", image: "https://api.dicebear.com/7.x/shapes/svg?seed=Solana" },
      { title: "Anchor Basics", date: "Mar 4, 2026", image: "https://api.dicebear.com/7.x/shapes/svg?seed=Anchor" }
    ]
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6 md:p-12 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Profile Header */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-[#9945FF]/20 to-[#14F195]/20" />
          
          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-end mt-12">
            <div className="w-32 h-32 rounded-2xl bg-neutral-900 border-4 border-neutral-950 flex items-center justify-center overflow-hidden shadow-xl">
               <img src={\`https://api.dicebear.com/7.x/avataaars/svg?seed=\${profile.name}\`} alt="Avatar" className="w-full h-full object-cover" />
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-3xl font-bold font-syne capitalize">{profile.name}</h1>
                  <p className="text-[#14F195] font-mono text-sm">@{\`\${profile.name.toLowerCase().replace(' ', '')}\`}</p>
                </div>
                <div className="flex gap-3">
                  <button className="px-6 py-2 rounded-xl bg-white/10 hover:bg-white/20 font-bold transition-colors">Share Profile</button>
                </div>
              </div>
              
              <p className="text-neutral-400 max-w-2xl mb-6">{profile.bio}</p>
              
              <div className="flex flex-wrap gap-6 text-sm text-neutral-500 font-mono">
                <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {profile.location}</span>
                <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> Joined {profile.joined}</span>
                <span className="flex items-center gap-2"><Github className="w-4 h-4 text-white" /> Github</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Stats & Radar */}
          <div className="space-y-8">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
              <h3 className="font-syne font-bold text-xl mb-6">Builder Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-neutral-400">Total XP</span>
                  <span className="font-mono font-bold text-[#14F195]">{profile.xp}</span>
                </div>
                <div className="flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-neutral-400">Level</span>
                  <span className="font-mono font-bold text-[#9945FF]">Lv. {profile.level}</span>
                </div>
              </div>
            </div>

            {/* Simple Skill Bars (Fallback for Radar Chart) */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
              <h3 className="font-syne font-bold text-xl mb-6">Skill Tree</h3>
              <div className="space-y-5">
                {profile.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-xs font-mono mb-2">
                      <span className="text-neutral-400">{skill.name}</span>
                      <span className="text-[#FFE500]">{skill.value}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-[#FFE500]" style={{ width: \`\${skill.value}%\` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Credentials */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 h-full">
              <div className="flex items-center gap-3 mb-8">
                <ShieldCheck className="w-6 h-6 text-[#14F195]" />
                <h3 className="font-syne font-bold text-2xl">Soulbound Credentials</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {profile.nfts.map((nft, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-neutral-900 border border-white/10 group hover:border-[#14F195]/50 transition-colors cursor-pointer">
                    <div className="aspect-square rounded-xl bg-neutral-950 mb-4 overflow-hidden relative">
                      <img src={nft.image} alt={nft.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all" />
                      <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[10px] font-mono text-[#14F195] flex items-center gap-1">
                        <Trophy className="w-3 h-3"/> Verified
                      </div>
                    </div>
                    <h4 className="font-bold mb-1">{nft.title}</h4>
                    <p className="text-xs text-neutral-500 font-mono">Issued: {nft.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
`;
fs.writeFileSync(profilePath, profileContent);

// ==========================================
// 2. SETTINGS PAGE
// ==========================================
const settingsPath = path.join(appDir, '(dashboard)', 'settings', 'page.tsx');
const settingsContent = `'use client';
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
`;
fs.writeFileSync(settingsPath, settingsContent);

console.log('✅ IDENTITY LAYER (PROFILE & SETTINGS) GENERATED.');