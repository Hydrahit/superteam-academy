const fs = require('fs');
const path = require('path');

console.log('🛡️  Initiating 404 Path Correction...');

const rootDir = process.cwd();

// 1. Ensure Standard App Structure (Removing confusing groups for now)
const essentialDirs = [
  'app/dashboard',
  'app/courses/[slug]/[id]',
  'app/leaderboard',
  'app/profile'
];

essentialDirs.forEach(dir => {
  const fullPath = path.join(rootDir, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`✅ Created path: ${dir}`);
  }
});

// 2. Fix Dashboard Page (The most common 404)
const dashboardPath = path.join(rootDir, 'app/dashboard/page.tsx');
const dashboardCode = `'use client';
import { PlatformLayout } from '@/presentation/layouts/PlatformLayout';
import { useAuth } from '@/contexts/AuthContext';

export default function Dashboard() {
  const { user, authStage } = useAuth();
  
  return (
    <PlatformLayout>
      <div className="p-8">
        <h1 className="text-4xl font-bold font-['Syne'] text-white">Dashboard</h1>
        <p className="text-white/50 mt-2">Welcome back, {user?.email || 'Scholar'}</p>
        <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-3xl">
          <p className="text-sm font-['JetBrains_Mono'] text-[#00FF94]">Status: {authStage}</p>
        </div>
      </div>
    </PlatformLayout>
  );
}
`;
fs.writeFileSync(dashboardPath, dashboardCode);

// 3. Clean Middleware (Stop aggressive redirects causing 404 loops)
const middlewarePath = path.join(rootDir, 'middleware.ts');
const middlewareCode = `
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
`;
fs.writeFileSync(middlewarePath, middlewareCode);

// 4. Update Sidebar Links (Absolute Paths)
const sidebarPath = path.join(rootDir, 'src/presentation/components/AppSidebar.tsx');
if (fs.existsSync(sidebarPath)) {
  let content = fs.readFileSync(sidebarPath, 'utf8');
  content = content.replace(/href="dashboard"/g, 'href="/dashboard"');
  content = content.replace(/href="courses"/g, 'href="/courses"');
  fs.writeFileSync(sidebarPath, content);
}

console.log('🎉 Paths Resynced! Standard routing restored.');