'use client';

import { useTranslations } from 'next-intl';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Link from 'next/link';

export default function Header() {
  const t = useTranslations('Header');

  return (
    <nav className="fixed top-0 w-full z-50 bg-neutral-950/80 backdrop-blur-md border-b border-white/5 px-6 py-4 flex justify-between items-center">
      <Link href="/" className="font-syne font-bold text-xl text-solana-green">SUPERTEAM</Link>
      
      <div className="flex items-center gap-6">
        <div className="flex gap-4 text-xs font-mono text-neutral-400">
           <button className="hover:text-white">EN</button>
           <button className="hover:text-white">PT</button>
           <button className="hover:text-white">ES</button>
        </div>
        <WalletMultiButton className="!bg-white !text-black !rounded-xl !text-sm !font-bold" />
      </div>
    </nav>
  );
}
