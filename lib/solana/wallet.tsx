"use client";

import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import { useMemo, ReactNode } from "react";

// Import wallet adapter styles
require("@solana/wallet-adapter-react-ui/styles.css");

const RPC_ENDPOINT =
  process.env.NEXT_PUBLIC_SOLANA_RPC || clusterApiUrl("devnet");

export const CONNECTION = new Connection(RPC_ENDPOINT, "confirmed");

interface WalletContextProviderProps {
  children: ReactNode;
}

export function WalletContextProvider({
  children,
}: WalletContextProviderProps) {
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={RPC_ENDPOINT}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
