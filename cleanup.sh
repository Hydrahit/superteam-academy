#!/bin/bash

echo "🏗️  Executing MEGA BATCH 1: Production Infrastructure..."

# 1. Create Directories
mkdir -p lib/metadata
mkdir -p components/layout
mkdir -p lib/services/achievements

# 2. Metaplex Core NFT Service (The Credential Engine)
cat << 'EOF' > lib/services/nft-service.ts
import { createV1, pluginAuthorityPair, ruleSet } from '@metaplex-foundation/mpl-core';
import { publicKey } from '@metaplex-foundation/umi';

export class NFTService {
  // Spec: One NFT per track that upgrades in place (PermanentFreezeDelegate)
  async mintCourseCredential(userWallet: string, trackName: string, level: number) {
    console.log(`🚀 Minting Soulbound Metaplex Core NFT for ${trackName} Level ${level} to ${userWallet}`);
    // Umi/Core logic will be injected here after Anchor build
    return { signature: "MINT_SIG_STUB", assetId: "ASSET_ID_STUB" };
  }
}
EOF

# 3. Achievement Tracking (Frontend-managed logic)
cat << 'EOF' > lib/services/achievements/achievements.ts
export const ACHIEVEMENT_TYPES = {
  STREAK_7: { id: 'streak_7', title: 'Week Warrior', xp: 100, icon: '🔥' },
  FIRST_COURSE: { id: 'first_course', title: 'First Steps', xp: 250, icon: '🎓' },
  RUST_ROOKIE: { id: 'rust_rookie', title: 'Rust Rookie', xp: 500, icon: '🦀' }
};

export function checkAchievements(userData: any) {
  const earned = [];
  if (userData.streak >= 7) earned.push(ACHIEVEMENT_TYPES.STREAK_7);
  if (userData.completedCourses >= 1) earned.push(ACHIEVEMENT_TYPES.FIRST_COURSE);
  return earned;
}
EOF

# 4. Helius DAS Indexer Bridge (For Leaderboard)
cat << 'EOF' > lib/blockchain/helius-indexer.ts
export async function fetchGlobalLeaderboard() {
  const HELIUS_RPC = process.env.NEXT_PUBLIC_HELIUS_RPC || "https://api.devnet.solana.com";
  
  // Method: searchAssets to find all holders of the XP Token-2022 Mint
  console.log("🔍 Fetching XP holders from Helius DAS API...");
  
  // Stub for DAS Response
  return [
    { owner: "Om_Dubey", balance: 145000 },
    { owner: "Aastha_Dev", balance: 132000 },
    { owner: "Vishal_ECE", balance: 95000 }
  ];
}
EOF

# 5. Global Sidebar Component (The Navigation Core)
cat << 'EOF' > components/layout/AppSidebar.tsx
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, BookOpen, Trophy, User, Settings, Award } from 'lucide-react';

export function AppSidebar() {
  const pathname = usePathname();
  const menu = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'Curriculum', icon: BookOpen, href: '/courses' },
    { name: 'Rankings', icon: Trophy, href: '/leaderboard' },
    { name: 'Credentials', icon: Award, href: '/profile' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-20 md:w-64 border-r border-white/10 bg-[#0C0C10] flex flex-col z-50">
      <div className="p-6 font-['Syne'] font-bold text-xl text-[#00E5FF] border-b border-white/5">
        <span className="md:inline hidden">SUPERTEAM</span><span className="inline md:hidden">ST</span>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {menu.map((item) => (
          <Link key={item.name} href={item.href} className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
            pathname === item.href ? 'bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/20' : 'text-white/40 hover:text-white hover:bg-white/5'
          }`}>
            <item.icon className="w-5 h-5" />
            <span className="font-['Syne'] font-semibold md:inline hidden">{item.name}</span>
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-white/5 space-y-2">
        <Link href="/settings" className="flex items-center gap-4 px-4 py-3 text-white/40 hover:text-white transition-all">
          <Settings className="w-5 h-5" />
          <span className="font-['Syne'] font-semibold md:inline hidden">Settings</span>
        </Link>
      </div>
    </aside>
  );
}
EOF

echo "✅ MEGA BATCH 1 COMPLETE. Push to Vercel to see the evolution."