const fs = require('fs');
const path = require('path');

console.log('🔧 Aligning Project Paths & Aliases...');

const rootDir = process.cwd();

// 1. Force fix tsconfig.json to recognize @/ as src/
const tsConfigPath = path.join(rootDir, 'tsconfig.json');
if (fs.existsSync(tsConfigPath)) {
    let tsConfig = JSON.parse(fs.readFileSync(tsConfigPath, 'utf8'));
    tsConfig.compilerOptions.baseUrl = ".";
    tsConfig.compilerOptions.paths = {
        "@/*": ["./src/*"]
    };
    fs.writeFileSync(tsConfigPath, JSON.stringify(tsConfig, null, 2), 'utf8');
    console.log('✅ tsconfig.json: Path aliases updated.');
}

// 2. Ensure PlatformLayout exists in the EXACT expected location
const layoutDir = path.join(rootDir, 'src/presentation/layouts');
if (!fs.existsSync(layoutDir)) fs.mkdirSync(layoutDir, { recursive: true });

const layoutFile = path.join(layoutDir, 'PlatformLayout.tsx');
const layoutContent = `
'use client';
import React from 'react';
import { AppSidebar } from '@/presentation/components/AppSidebar';

export const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex bg-[#060608] min-h-screen">
      <AppSidebar />
      <div className="flex-1 md:ml-64 relative">
        {/* Glow Effects for World Class UI */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00FF94]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  );
};
`;
fs.writeFileSync(layoutFile, layoutContent);

// 3. Fix the Sidebar path as well
const sidebarDir = path.join(rootDir, 'src/presentation/components');
if (!fs.existsSync(sidebarDir)) fs.mkdirSync(sidebarDir, { recursive: true });

// Move AppSidebar if it's in the old location
const oldSidebar = path.join(rootDir, 'components/layout/AppSidebar.tsx');
const newSidebar = path.join(sidebarDir, 'AppSidebar.tsx');
if (fs.existsSync(oldSidebar) && !fs.existsSync(newSidebar)) {
    fs.renameSync(oldSidebar, newSidebar);
    console.log('🚚 Moved AppSidebar to src/presentation/components/');
}

console.log('🎉 Imports Aligned! Run "npm run build" now.');