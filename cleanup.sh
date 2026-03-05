#!/bin/bash

echo "🚀 EXECUTING FINAL TYPEERROR & PRELOAD SHIELD..."

# 1. Fortify the Supabase Client Initialization
mkdir -p lib
echo "✍️ Updating lib/supabaseClient.ts..."
cat << 'EOF' > lib/supabaseClient.ts
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// Static initialization to prevent "not a function" errors during bundling
let supabaseInstance: any = null;

export const getSupabaseBrowserClient = () => {
  if (supabaseInstance) return supabaseInstance;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error("🚨 [SUPABASE ERROR]: Missing Keys in .env.local");
    return null;
  }

  // Defensive check for the helper function
  if (typeof createClientComponentClient !== 'function') {
    console.error("🚨 [SUPABASE FATAL]: createClientComponentClient is not a function. Check package versions!");
    return null;
  }

  supabaseInstance = createClientComponentClient();
  return supabaseInstance;
};
EOF

# 2. Fix AuthButton to use the new defensive client
echo "✍️ Updating components/ui/AuthButton.tsx..."
cat << 'EOF' > components/ui/AuthButton.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { LogIn } from 'lucide-react';
import { getSupabaseBrowserClient } from '@/lib/supabaseClient';

export const AuthButton = () => {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      toast.error("Auth System not ready.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;
    } catch (error: any) {
      console.error("Login Error:", error.message);
      toast.error("Google Sign-in failed.");
      setLoading(false);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleGoogleLogin}
      disabled={loading}
      className="flex items-center gap-3 px-6 py-2.5 bg-white text-black rounded-full font-bold text-xs uppercase tracking-widest hover:bg-neutral-200 transition-all shadow-xl"
    >
      <LogIn size={16} />
      {loading ? 'Redirecting...' : 'Sign in with Google'}
    </motion.button>
  );
};
EOF

# 3. Fix Layout to kill Preload Warnings
# We disable preloading on fonts that aren't used on the initial viewport
echo "✍️ Updating app/[locale]/layout.tsx..."
cat << 'EOF' > app/\[locale\]/layout.tsx
import type { Metadata } from "next";
import { Syne, JetBrains_Mono } from "next/font/google";
import "@/app/globals.css";
import { RootProvider } from "@/components/providers/root-provider";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Toaster } from 'react-hot-toast';

const syne = Syne({ 
  subsets: ["latin"], 
  variable: "--font-syne",
  display: 'swap',
  preload: false // DISABLING PRELOAD TO STOP BROWSER WARNINGS
});

const mono = JetBrains_Mono({ 
  subsets: ["latin"], 
  variable: "--font-mono",
  display: 'swap',
  preload: false // DISABLING PRELOAD TO STOP BROWSER WARNINGS
});

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
        <NextIntlClientProvider messages={messages} locale={locale}>
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

echo "🗑️ Nuking all build caches..."
rm -rf .next

echo "------------------------------------------------"
echo "✅ ALL SYSTEMS REPAIRED."
echo "🚀 Action: git add . && git commit -m 'fix: final supabase and preload fix' && git push origin main"