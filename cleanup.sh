#!/bin/bash

echo "⚡ OPTIMIZING ASSET PRELOADING..."

# Update the layout with optimized font loading
cat << 'EOF' > app/\[locale\]/layout.tsx
import type { Metadata } from "next";
import { Syne, JetBrains_Mono } from "next/font/google";
import "@/app/globals.css";
import { RootProvider } from "@/components/providers/root-provider";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Toaster } from 'react-hot-toast';

// Optimize: Set preload to true but ensure display is 'swap'
const syne = Syne({ 
  subsets: ["latin"], 
  variable: "--font-syne",
  display: 'swap',
  preload: true 
});

const mono = JetBrains_Mono({ 
  subsets: ["latin"], 
  variable: "--font-mono",
  display: 'swap',
  preload: true 
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

echo "🗑️ Nuking build cache for fresh asset manifest..."
rm -rf .next

echo "------------------------------------------------"
echo "✅ ASSET LOADING OPTIMIZED."
echo "🚀 Next.js will now handle font display more efficiently."