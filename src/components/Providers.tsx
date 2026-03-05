'use client';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { AuthProvider } from '../store/AuthContext';
import '@solana/wallet-adapter-react-ui/styles.css';

export function Providers({ children }: { children: React.ReactNode }) {
  const endpoint = 'https://api.devnet.solana.com';
  const wallets = [new PhantomWalletAdapter(), new SolflareWalletAdapter()];
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider><AuthProvider>{children}</AuthProvider></WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
