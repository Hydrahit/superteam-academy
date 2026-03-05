'use client';

import React, { useMemo, useEffect, useState } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import toast from 'react-hot-toast';

require('@solana/wallet-adapter-react-ui/styles.css');

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false);
  const endpoint = process.env.NEXT_PUBLIC_SOLANA_RPC_URL;
  
  useEffect(() => {
    setIsMounted(true);
    if (!endpoint) {
      console.error("🚨 [SOLANA FATAL ERROR]: NEXT_PUBLIC_SOLANA_RPC_URL is missing in .env.local!");
      toast.error("Warning: Missing Solana RPC URL. Falling back to default Devnet.", { duration: 5000 });
    }
  }, [endpoint]);

  const activeEndpoint = endpoint || clusterApiUrl('devnet');
  const wallets = useMemo(() => [new PhantomWalletAdapter(), new SolflareWalletAdapter()], []);

  if (!isMounted) return null; 

  return (
    <ConnectionProvider endpoint={activeEndpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
