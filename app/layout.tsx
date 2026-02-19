/**
 * app/layout.tsx
 *
 * Root layout.
 *
 * Provider order matters:
 *   WalletProvider must wrap AuthProvider because AuthProvider reads
 *   wallet state via useWallet() from @solana/wallet-adapter-react.
 *
 *   WalletProvider
 *     └── AuthProvider       (uses useWallet() internally)
 *           └── {children}
 */

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import '@solana/wallet-adapter-react-ui/styles.css';

import { WalletProvider }    from '@/components/providers/WalletProvider';
import { AuthProvider }      from '@/contexts/AuthContext';

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* WalletProvider must be outermost — it sets up the Solana context
            that AuthProvider reads from via useWallet(). */}
        <WalletProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </WalletProvider>
      </body>
    </html>
  );
}
