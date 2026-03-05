import { NextResponse } from 'next/server';
import nacl from 'tweetnacl';
import bs58 from 'bs58';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { userId, wallet, signature, timestamp } = body;

        // 1. Reconstruct the exact message signed by the frontend
        const message = `Bind Wallet to Superteam Academy\nUID: ${userId}\nTimestamp: ${timestamp}`;
        const encodedMessage = new TextEncoder().encode(message);
        
        const signatureUint8 = bs58.decode(signature);
        const publicKeyUint8 = bs58.decode(wallet);

        // 2. Cryptographic Verification using tweetnacl
        const isValid = nacl.sign.detached.verify(
            encodedMessage,
            signatureUint8,
            publicKeyUint8
        );

        if (!isValid) {
            return NextResponse.json({ success: false, error: 'INVALID_SIGNATURE' }, { status: 401 });
        }

        // TODO: Add your Supabase update logic here to link the wallet to the profile
        
        return NextResponse.json({ 
            success: true, 
            message: 'WALLET_LINKED_SUCCESSFULLY' 
        });

    } catch (e) {
        console.error("API Error:", e);
        return NextResponse.json({ success: false, error: 'SERVER_VERIFICATION_ERROR' }, { status: 500 });
    }
}