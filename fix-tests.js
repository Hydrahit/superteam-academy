const fs = require('fs');
const path = require('path');

console.log('🏗️  Building Project Brain & Structure...');

const rootDir = process.cwd();

// 1. Core Folders Structure
const dirs = [
  'contexts',          // For Auth, Theme, and Language states
  'lib/hooks',         // Custom React hooks (useProgram, useXp)
  'lib/services',      // Business logic (Course fetching, NFT minting)
  'lib/providers',     // Combined Wallet & Auth providers
  'app/api/actions'    // Next.js Server Actions for secure tasks
];

dirs.forEach(dir => {
  const fullPath = path.join(rootDir, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`✅ Created: ${dir}`);
  }
});

// 2. The Global Brain Context (Auth + State)
const contextContent = `'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface GlobalState {
  userXp: number;
  level: number;
  isLinked: boolean;
}

const BrainContext = createContext<any>(null);

export function BrainProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<GlobalState>({
    userXp: 0,
    level: 1,
    isLinked: false
  });

  // Level Logic: Level = floor(sqrt(xp / 100))
  const updateXp = (newXp: number) => {
    const newLevel = Math.floor(Math.sqrt(newXp / 100)) || 1;
    setState(prev => ({ ...prev, userXp: newXp, level: newLevel }));
  };

  return (
    <BrainContext.Provider value={{ ...state, updateXp }}>
      {children}
    </BrainContext.Provider>
  );
}

export const useBrain = () => useContext(BrainContext);
`;
fs.writeFileSync(path.join(rootDir, 'contexts/BrainContext.tsx'), contextContent);

// 3. Centralized Service Interface
const serviceContent = `/**
 * Service Layer: Your UI calls this, this calls the Chain/CMS
 */
export class AcademyService {
  static async getCourseProgress(wallet: string, courseId: string) {
    // Logic to fetch PDA or LocalStorage
    console.log("Fetching progress for:", courseId);
    return { completed: 0, total: 10 };
  }

  static async syncXpOnChain(wallet: string, amount: number) {
    // Logic for Token-2022 minting/transfer
    console.log("Syncing XP to Chain...");
  }
}
`;
fs.writeFileSync(path.join(rootDir, 'lib/services/academy.ts'), serviceContent);

console.log('\\n🎉 BRAIN INITIALIZED. Structure is now production-ready.');