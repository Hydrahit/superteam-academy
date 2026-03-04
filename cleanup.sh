#!/bin/bash

echo "🏗️  Executing FINAL MEGA BATCH: Integrating Auth, i18n, and On-Chain Logic..."

# 1. Create Directories
mkdir -p contexts
mkdir -p components/auth
mkdir -p lib/i18n

# 2. i18n Dictionary & Logic (Spec: PT, ES, EN Support)
cat << 'EOF' > lib/i18n/dict.ts
export const translations = {
  en: { welcome: "Welcome", start: "Start Learning", dashboard: "Dashboard" },
  pt: { welcome: "Bem-vindo", start: "Começar a Aprender", dashboard: "Painel" },
  es: { welcome: "Bienvenido", start: "Empezar a Aprender", dashboard: "Panel" }
};
EOF

# 3. Auth Context (Handling Wallet + Google Linking)
cat << 'EOF' > contexts/AuthContext.tsx
'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

interface AuthContextType {
  authStage: 'unauthenticated' | 'wallet_only' | 'google_only' | 'fully_linked';
  profile: any;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { connected, publicKey } = useWallet();
  const [authStage, setAuthStage] = useState<'unauthenticated' | 'wallet_only' | 'google_only' | 'fully_linked'>('unauthenticated');

  useEffect(() => {
    if (connected) setAuthStage('wallet_only');
    else setAuthStage('unauthenticated');
  }, [connected]);

  const signOut = () => { console.log("Signing out..."); };

  return (
    <AuthContext.Provider value={{ authStage, profile: null, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
EOF

# 4. Advanced PDA Derivation (For Course Enrollment)
cat << 'EOF' > lib/blockchain/pda-utils.ts
import { PublicKey } from '@solana/web3.js';
import { PROGRAM_ID } from './anchor-client';

export const getEnrollmentPda = (user: PublicKey, courseId: string) => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("enrollment"), user.toBuffer(), Buffer.from(courseId)],
    PROGRAM_ID
  )[0];
};

export const getAchievementPda = (user: PublicKey, achievementId: string) => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("achievement"), user.toBuffer(), Buffer.from(achievementId)],
    PROGRAM_ID
  )[0];
};
EOF

# 5. Global Layout Update (Merging Sidebar + Content)
cat << 'EOF' > app/layout-wrapper.tsx
'use client';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { AuthProvider } from '@/contexts/AuthContext';
import { usePathname } from 'next/navigation';

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPlatformPage = pathname.includes('/dashboard') || pathname.includes('/courses') || pathname.includes('/leaderboard') || pathname.includes('/profile');

  return (
    <AuthProvider>
      <div className="flex">
        {isPlatformPage && <AppSidebar />}
        <main className={`flex-1 ${isPlatformPage ? 'md:ml-64 ml-20' : ''}`}>
          {children}
        </main>
      </div>
    </AuthProvider>
  );
}
EOF

echo "✅ FINAL BATCH COMPLETE. Wrapping up Root Layout..."