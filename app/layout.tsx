import type { Metadata } from 'next';
import { Space_Grotesk, DM_Sans, JetBrains_Mono } from 'next/font/google';
import { Providers } from '@/lib/providers';
import './globals.css';
import '@solana/wallet-adapter-react-ui/styles.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Superteam Academy',
  description: 'Learn Web3, earn on-chain certificates on Solana. A decentralized learning platform by Superteam Brazil.',
  keywords: ['Solana', 'Web3', 'NFT', 'certificates', 'blockchain', 'education', 'Superteam', 'Brazil'],
  openGraph: {
    title: 'Superteam Academy',
    description: 'Learn Web3, earn on-chain certificates on Solana.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Superteam Academy',
    description: 'Learn Web3, earn on-chain certificates on Solana.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${spaceGrotesk.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-[#060606] text-white font-sans antialiased min-h-screen">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
