const fs = require('fs');
const path = require('path');

console.log('🧹 Harmonizing Routes and Deleting Duplicate Pages...');

const rootDir = process.cwd();
const appDir = path.join(rootDir, 'app');

// Helper to delete directory or file
const deletePath = (p) => {
  const fullPath = path.join(appDir, p);
  if (fs.existsSync(fullPath)) {
    fs.rmSync(fullPath, { recursive: true, force: true });
    console.log(`🗑️ Deleted: ${p}`);
  }
};

// 1. DELETE DUPLICATE PATHS (Cleaning the mess)
deletePath('dashboard'); // Deletes app/dashboard/
deletePath('leaderboard'); // Deletes app/leaderboard/
deletePath('settings'); // Deletes app/settings/
deletePath('(platform)'); // Deletes app/(platform)/ (Conflicting with (dashboard))

// 2. CONSOLIDATE INTO (dashboard) GROUP
const dashboardGroup = path.join(appDir, '(dashboard)');
if (!fs.existsSync(dashboardGroup)) fs.mkdirSync(dashboardGroup);

console.log('✅ Route conflicts resolved.');

// 3. RE-INJECTING CLEAN DASHBOARD PAGE
const finalDashboardPath = path.join(dashboardGroup, 'dashboard', 'page.tsx');
if (!fs.existsSync(path.dirname(finalDashboardPath))) fs.mkdirSync(path.dirname(finalDashboardPath), { recursive: true });

const dashboardContent = `'use client';
import { useAuth } from '@/src/store/AuthContext';
import { Zap, Trophy, Flame } from 'lucide-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function Dashboard() {
  const { isLinked } = useAuth();
  return (
    <div className="min-h-screen p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-bold font-syne text-white">Dashboard</h1>
        <WalletMultiButton />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <Zap className="text-solana-green mb-2" />
          <p className="text-neutral-400 text-sm">XP Progress</p>
          <p className="text-2xl font-bold font-mono">2,450</p>
        </div>
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <Trophy className="text-aura-cyan mb-2" />
          <p className="text-neutral-400 text-sm">Level</p>
          <p className="text-2xl font-bold font-mono">Lv. 4</p>
        </div>
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <Flame className="text-aura-yellow mb-2" />
          <p className="text-neutral-400 text-sm">Streak</p>
          <p className="text-2xl font-bold font-mono">7 Days</p>
        </div>
      </div>
    </div>
  );
}
`;
fs.writeFileSync(finalDashboardPath, dashboardContent);

console.log('🚀 CLEANUP COMPLETE. Run "npm run build" to verify.');