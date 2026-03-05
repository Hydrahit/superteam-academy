"use client";

import React, { useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { AuthProvider } from "@/contexts/AuthContext";

// Import standard wallet adapter CSS
import "@solana/wallet-adapter-react-ui/styles.css";

export function AppProviders({ children }: { children: React.ReactNode }) {
  // Setup Solana Devnet Connection
  const endpoint = useMemo(
    () =>
      process.env.NEXT_PUBLIC_HELIUS_RPC_URL || "https://api.devnet.solana.com",
    [],
  );

  // You can add Phantom/Solflare adapters here if needed, but standard standard works for modern wallets
  const wallets = useMemo(() => [], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <AuthProvider>{children}</AuthProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
