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
  title: "Superteam Academy | Elite Solana Training",
  description: "Gamified Web3 onboarding for the best builders.",
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
