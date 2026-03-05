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
