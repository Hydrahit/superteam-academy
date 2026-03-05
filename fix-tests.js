const fs = require('fs');
const path = require('path');

console.log('🔒 INITIATING SECURITY CORE: Generating Ed25519 Verification and RPC Progression Engines...');

const rootDir = process.cwd();

const ensureDir = (dirPath) => {
  const fullPath = path.join(rootDir, dirPath);
  if (!fs.existsSync(fullPath)) fs.mkdirSync(fullPath, { recursive: true });
};

// 1. CREATE DIRECTORIES
ensureDir('src/domain/auth');
ensureDir('src/application/services');
ensureDir('src/infrastructure/supabase');

// 2. DOMAIN: Ed25519 Cryptographic Verifier (Strictly isolated for testing)
const ed25519Code = `import nacl from 'tweetnacl';
import { PublicKey } from '@solana/web3.js';
import bs58 from 'bs58';

export class Ed25519Verifier {
  /**
   * Cryptographically verifies a wallet signature against a backend-generated nonce.
   */
  static verifySignature(nonce: string, signature: Uint8Array, publicKeyString: string): boolean {
    try {
      const publicKey = new PublicKey(publicKeyString);
      const messageBytes = new TextEncoder().encode(nonce);
      return nacl.sign.detached.verify(messageBytes, signature, publicKey.toBytes());
    } catch (error) {
      console.error('Signature verification failed:', error);
      return false;
    }
  }

  /**
   * Formats the signature for Supabase RPC transmission
   */
  static encodeSignature(signature: Uint8Array): string {
    return bs58.encode(signature);
  }
}
`;
fs.writeFileSync(path.join(rootDir, 'src/domain/auth/Ed25519Verifier.ts'), ed25519Code);

// 3. APPLICATION: Supabase Progression Service (No Client-Side Math)
const progressServiceCode = `import { supabase } from '@/infrastructure/supabase/client';

export interface ProgressionResult {
  success: boolean;
  newXp: number;
  newLevel: number;
  error?: string;
}

export class SupabaseProgressService {
  /**
   * Submits proof of lesson completion to the backend. 
   * NEVER sends raw XP amounts from the client.
   */
  static async completeLesson(walletAddress: string, lessonId: string, proofTxId?: string): Promise<ProgressionResult> {
    try {
      // Calling the secure PostgreSQL RPC
      const { data, error } = await supabase.rpc('verify_and_reward_lesson', {
        p_wallet: walletAddress,
        p_lesson_id: lessonId,
        p_proof_tx: proofTxId || null
      });

      if (error) throw new Error(error.message);

      return {
        success: true,
        newXp: data.total_xp,
        newLevel: data.current_level
      };
    } catch (error: any) {
      return { success: false, newXp: 0, newLevel: 0, error: error.message };
    }
  }

  /**
   * Fetches the current synchronized state directly from the DB
   */
  static async getUserState(walletAddress: string) {
    const { data, error } = await supabase.rpc('get_user_stats', { p_wallet: walletAddress });
    if (error) throw error;
    return data;
  }
}
`;
fs.writeFileSync(path.join(rootDir, 'src/application/services/SupabaseProgressService.ts'), progressServiceCode);

// 4. INFRASTRUCTURE: The Secure Wallet Linker Hook
const walletLinkerCode = `'use client';
import { useWallet } from '@solana/wallet-adapter-react';
import { supabase } from '@/infrastructure/supabase/client';
import bs58 from 'bs58';

export function useSecureWalletLinker() {
  const { publicKey, signMessage } = useWallet();

  const linkSecurely = async (userId: string) => {
    if (!publicKey || !signMessage) throw new Error('Wallet not fully connected.');

    // Step 1: Request a secure nonce from the backend
    const { data: nonceData, error: nonceError } = await supabase.rpc('generate_auth_nonce', { p_user_id: userId });
    if (nonceError) throw new Error('Failed to generate secure nonce.');
    const nonce = nonceData.nonce;

    // Step 2: Prompt user to sign the exact nonce
    const messageBytes = new TextEncoder().encode(\`Sign this message to verify wallet ownership for Superteam Academy:\\n\${nonce}\`);
    const signature = await signMessage(messageBytes);

    // Step 3: Send signature back to RPC for cryptographic verification and DB mutation
    const { data: linkData, error: linkError } = await supabase.rpc('verify_and_link_wallet', {
      p_user_id: userId,
      p_wallet_address: publicKey.toBase58(),
      p_signature: bs58.encode(signature),
      p_nonce: nonce
    });

    if (linkError) throw new Error(linkError.message);
    return linkData;
  };

  return { linkSecurely };
}
`;
fs.writeFileSync(path.join(rootDir, 'src/infrastructure/supabase/useSecureWalletLinker.ts'), walletLinkerCode);

console.log('✅ SECURITY CORE INJECTED.');
console.log('Modules created: Ed25519Verifier, SupabaseProgressService, and useSecureWalletLinker.');