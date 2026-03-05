#!/bin/bash

echo "🏗️  STARTING TOTAL SYSTEM RESTORE..."

# 1. Fix the Root Layout (The Foundation)
echo "✍️ Rewriting app/[locale]/layout.tsx..."
cat << 'EOF' > app/\[locale\]/layout.tsx
import type { Metadata } from "next";
import { Syne, JetBrains_Mono } from "next/font/google";
import "@/app/globals.css";
import { RootProvider } from "@/components/providers/root-provider";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Toaster } from 'react-hot-toast';

const syne = Syne({ subsets: ["latin"], variable: "--font-syne" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Superteam Academy | Level Up on Solana",
  description: "Elite Web3 Gamified Learning Experience",
};

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale} className="dark">
      <body className={`${syne.variable} ${mono.variable} antialiased bg-[#0a0a0a] text-white`}>
        {/* NextIntl MUST be the outermost for translations to work */}
        <NextIntlClientProvider messages={messages} locale={locale}>
          {/* RootProvider handles mounting and Web3/Solana logic */}
          <RootProvider>
            {children}
            <Toaster position="bottom-right" />
          </RootProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
EOF

# 2. Fix the Root Provider (The Interactivity Switch)
echo "✍️ Rewriting components/providers/root-provider.tsx..."
cat << 'EOF' > components/providers/root-provider.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { Web3Provider } from './web3-provider';
import { motion, AnimatePresence } from 'framer-motion';

export const RootProvider = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    console.log("🚀 [SYSTEM]: Interactivity Unlocked. RootProvider Mounted.");
  }, []);

  // Avoid Hydration Mismatch: Don't render interactive shells until mounted
  if (!mounted) {
    return <div className="opacity-0">{children}</div>;
  }

  return (
    <Web3Provider>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </Web3Provider>
  );
};
EOF

# 3. Clean and Standardize the Navbar (The Navigation Nerve)
echo "✍️ Updating components/layout/Navbar.tsx..."
cat << 'EOF' > components/layout/Navbar.tsx
'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wallet, ChevronLeft } from 'lucide-react';
import { useRouter } from '@/lib/navigation';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { cn } from '@/lib/utils';

export const Navbar = () => {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 w-full z-[100] px-8 py-4 flex justify-between items-center transition-all duration-300",
      scrolled ? "bg-black/80 backdrop-blur-xl border-b border-white/10" : "bg-transparent"
    )}>
      <div className="flex items-center gap-6">
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={() => router.push('/')} 
          className="text-white/50 hover:text-white"
        >
          <ChevronLeft size={24} />
        </motion.button>
        <span 
          onClick={() => router.push('/')}
          className="text-xl font-syne font-black text-white italic tracking-tighter cursor-pointer"
        >
          SUPERTEAM<span className="text-[#14F195]">ACADEMY</span>
        </span>
      </div>
      
      <div className="flex items-center gap-4">
        <LanguageSwitcher />
        <motion.button 
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 rounded-full font-bold text-[10px] tracking-widest uppercase bg-white/5 border border-white/20 text-white hover:border-[#14F195] transition-all"
        >
          <Wallet size={14} className="inline mr-2" /> Connect_Wallet
        </motion.button>
      </div>
    </nav>
  );
};
EOF

# 4. Nuclear Cache Clean
echo "🗑️ Nuking all build artifacts..."
rm -rf .next
rm -rf node_modules/.cache

echo "------------------------------------------------"
echo "✅ TOTAL SYSTEM RESTORE COMPLETE."
echo "🚀 ACTION: Run 'npm run dev' and watch the console for 'Interactivity Unlocked'."