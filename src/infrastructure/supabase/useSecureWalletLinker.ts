"use client";
import { useWallet } from "@solana/wallet-adapter-react";
import { supabase } from "@/infrastructure/supabase/client";
import bs58 from "bs58";

export function useSecureWalletLinker() {
  const { publicKey, signMessage } = useWallet();

  const linkSecurely = async (userId: string) => {
    if (!publicKey || !signMessage)
      throw new Error("Wallet not fully connected.");

    // Step 1: Request a secure nonce from the backend
    const { data: nonceData, error: nonceError } = await supabase.rpc(
      "generate_auth_nonce",
      { p_user_id: userId },
    );
    if (nonceError) throw new Error("Failed to generate secure nonce.");
    const nonce = nonceData.nonce;

    // Step 2: Prompt user to sign the exact nonce
    const messageBytes = new TextEncoder().encode(
      `Sign this message to verify wallet ownership for Superteam Academy:\n${nonce}`,
    );
    const signature = await signMessage(messageBytes);

    // Step 3: Send signature back to RPC for cryptographic verification and DB mutation
    const { data: linkData, error: linkError } = await supabase.rpc(
      "verify_and_link_wallet",
      {
        p_user_id: userId,
        p_wallet_address: publicKey.toBase58(),
        p_signature: bs58.encode(signature),
        p_nonce: nonce,
      },
    );

    if (linkError) throw new Error(linkError.message);
    return linkData;
  };

  return { linkSecurely };
}
