#!/bin/bash

echo "🚀 Starting Phase 1: Database & Auth Setup..."

# 1. Directory Management
echo "📁 Creating Folder Structure..."
mkdir -p src/lib/supabase
mkdir -p src/services
mkdir -p src/types
mkdir -p app/api/auth/link-wallet

# 2. Package Installation
echo "📦 Checking and Installing Dependencies..."
npm install @supabase/supabase-js tweetnacl bs58 lucide-react framer-motion

# 3. Create Supabase Client
echo "✍️ Writing src/lib/supabase/client.ts..."
cat <<'EOF' > src/lib/supabase/client.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
EOF

# 4. Create Types
echo "✍️ Writing src/types/index.ts..."
cat <<'EOF' > src/types/index.ts
export interface UserProfile {
  id: string;
  username?: string;
  wallet_address?: string;
  total_xp: number;
  level: number;
  current_streak: number;
}

export interface WalletLinkPayload {
  userId: string;
  wallet: string;
  signature: string;
  nonce: string;
}
EOF

# 5. Create Auth Orchestrator Service
echo "✍️ Writing src/services/AuthService.ts..."
cat <<'EOF' > src/services/AuthService.ts
import nacl from 'tweetnacl';
import bs58 from 'bs58';

export class AuthService {
  /**
   * Verifies the Ed25519 signature from the Solana Wallet
   */
  static verifySignature(wallet: string, signature: string, nonce: string, userId: string): boolean {
    try {
      const message = `Link Wallet to Superteam Academy\nUID: ${userId}\nNonce: ${nonce}`;
      const encodedMessage = new TextEncoder().encode(message);
      
      const signatureUint8 = bs58.decode(signature);
      const publicKeyUint8 = bs58.decode(wallet);

      return nacl.sign.detached.verify(
        encodedMessage,
        signatureUint8,
        publicKeyUint8
      );
    } catch (error) {
      console.error("Signature Verification Error:", error);
      return false;
    }
  }
}
EOF

# 6. Create API Route for Wallet Linking
echo "✍️ Writing app/api/auth/link-wallet/route.ts..."
cat <<'EOF' > app/api/auth/link-wallet/route.ts
import { NextResponse } from 'next/server';
import { AuthService } from '@/src/services/AuthService';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  try {
    const { userId, wallet, signature, nonce } = await req.json();

    // 1. Verify Cryptographic Signature
    const isValid = AuthService.verifySignature(wallet, signature, nonce, userId);

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid Signature' }, { status: 401 });
    }

    // 2. Update Database (Atomic Link)
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY! // Note: Use Service Role for backend updates
    );

    const { error } = await supabase
      .from('profiles')
      .update({ wallet_address: wallet })
      .eq('id', userId);

    if (error) throw error;

    return NextResponse.json({ success: true, message: 'Wallet Linked Successfully' });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
EOF

echo "✅ Phase 1 Setup Complete! Files are in place."
echo "👉 Next Action: Paste the SQL schema in Supabase and add your Environment Variables."