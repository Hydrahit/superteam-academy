/**
 * app/layout.tsx
 *
 * Root layout.
 *
 * ── Why both providers are here, and why order matters ───────────────────────
 *
 *  WalletProvider  (outermost)
 *    Sets up three Solana contexts:
 *      ConnectionProvider   → useConnection()
 *      SolanaWalletProvider → useWallet()
 *      WalletModalProvider  → useWalletModal()  ← AuthButton needs this
 *
 *  AuthProvider  (inside WalletProvider)
 *    Calls useWallet() on mount to read publicKey / connected state.
 *    MUST be inside WalletProvider or useWallet() returns undefined context
 *    and the app throws on every render.
 *
 *  Previous bug: AuthProvider was missing from this file entirely.
 *  AuthButton called useAuth() → threw "useAuth() must be used inside
 *  <AuthProvider>" → the button crashed silently in the browser.
 */

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// Required: styles for the Solana wallet modal (Connect Wallet dialog)
import '@solana/wallet-adapter-react-ui/styles.css';

import { WalletProvider } from '@/components/providers/WalletProvider';
import { AuthProvider }   from '@/contexts/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Superteam Academy',
  description:
    'Interactive Solana learning platform with gamification, multi-language support, and on-chain credentials.',
  openGraph: {
    title:       'Superteam Academy',
    description: 'Master Solana development with interactive courses, gamification, and on-chain credentials.',
    url:         'https://superteam-academy.vercel.app',
    siteName:    'Superteam Academy',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/*
          ORDER IS MANDATORY:
            1. WalletProvider — must be outermost so AuthProvider can call useWallet()
            2. AuthProvider   — reads wallet state; provides useAuth() to all children

          If WalletProvider is missing:   wallet connect button does nothing
          If AuthProvider is missing:     useAuth() throws, AuthButton crashes silently
          If order is reversed:           AuthProvider calls useWallet() outside its
                                          provider context → runtime crash
        */}
        <WalletProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </WalletProvider>
      </body>
    </html>
  );
}
