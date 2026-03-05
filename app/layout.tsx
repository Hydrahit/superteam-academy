import type { Metadata } from 'next';
import { Inter, Syne, JetBrains_Mono } from 'next/font/google';
import { Providers } from '@/src/components/shared/Providers';
import { ThemeProvider } from '@/src/components/shared/ThemeProvider';
import { ThemeToggle } from '@/src/components/shared/ThemeToggle';
import { LanguageSwitcher } from '@/src/components/shared/LanguageSwitcher';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const syne = Syne({ subsets: ['latin'], variable: '--font-syne' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'Superteam Academy | Learn. Build. Earn.',
  description: 'The premier Solana LMS with soulbound rewards and global access.',
  metadataBase: new URL("https://superteam-academy.vercel.app"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${syne.variable} ${mono.variable}`}>
      <body className="bg-white dark:bg-[#060608] text-black dark:text-white antialiased transition-colors duration-300">
        <ThemeProvider 
          attribute="class" 
          defaultTheme="dark" 
          enableSystem 
          disableTransitionOnChange
        >
          <Providers>
            <main className="relative min-h-screen">
              {children}
              {/* Global Utility Components */}
              <ThemeToggle />
              <LanguageSwitcher />
            </main>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}