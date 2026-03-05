import type { Metadata } from "next";
import { Syne, JetBrains_Mono } from "next/font/google";
import "@/app/globals.css"; // Ensure this path points to your actual globals.css
import { RootProvider } from "@/components/providers/root-provider";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

const syne = Syne({ subsets: ["latin"], variable: "--font-syne" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Superteam Academy | Level Up on Solana",
  description: "Elite Web3 Gamified Learning Experience",
};

export default async function RootLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  // Fetch translation messages for the current locale
  const messages = await getMessages();

  return (
    <html lang={locale} className="dark">
      <body className={`${syne.variable} ${mono.variable} antialiased bg-[#0a0a0a] text-white`}>
        {/* Next-intl provider wraps the entire application logic */}
        <NextIntlClientProvider messages={messages}>
          <RootProvider>
            {children}
          </RootProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
