import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import nacl from 'tweetnacl';
import bs58 from 'bs58';

export async function POST(req: Request) {
  try {
    const { userId, publicKey, signature, message } = await req.json();

    // 1. Cryptographic Verification
    const messageBytes = new TextEncoder().encode(message);
    const signatureBytes = bs58.decode(signature);
    const publicKeyBytes = bs58.decode(publicKey);

    const isValid = nacl.sign.detached.verify(messageBytes, signatureBytes, publicKeyBytes);
    
    if (!isValid) return NextResponse.json({ error: 'INVALID_SIGNATURE' }, { status: 401 });

    // 2. Atomic DB Update (Bypass RLS securely)
    const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const { error } = await supabaseAdmin.from('profiles').update({ wallet_address: publicKey }).eq('id', userId);

    if (error) throw error;
    return NextResponse.json({ success: true, message: 'WALLET_BOUND' });

  } catch (err: any) {
    return NextResponse.json({ error: 'SERVER_ERROR', details: err.message }, { status: 500 });
  }
}
