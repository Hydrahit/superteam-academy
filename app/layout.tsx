import type { Metadata } from 'next';
import { Providers } from '../src/components/shared/Providers';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL("https://superteam-academy.vercel.app"),
  title: 'Superteam Academy | The Premier Solana LMS',
  description: 'Master Solana development with soulbound XP and on-chain credentials.',
  openGraph: {
    title: 'Superteam Academy',
    description: 'Learn. Build. Earn on-chain.',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@SuperteamAcademy',
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#060608] text-white antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}