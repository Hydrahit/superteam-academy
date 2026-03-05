import { useWallet } from '@solana/wallet-adapter-react';
import { useCallback, useState } from 'react';
import bs58 from 'bs58';

export const useWalletBinding = () => {
    const { publicKey, signMessage, connected } = useWallet();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const bindWallet = useCallback(async (supabaseUid: string) => {
        if (!connected || !publicKey || !signMessage) {
            setError('WALLET_NOT_CONNECTED');
            return null;
        }

        setLoading(true);
        setError(null);

        try {
            // 1. Prepare unique message with UID and Timestamp
            const timestamp = Date.now();
            const messageText = `Bind Wallet to Superteam Academy\nUID: ${supabaseUid}\nTimestamp: ${timestamp}`;
            const encodedMessage = new TextEncoder().encode(messageText);

            // 2. Request Signature
            const signature = await signMessage(encodedMessage);
            const signatureBase58 = bs58.encode(signature);

            // 3. Send to Backend API
            const response = await fetch('/api/auth/link-wallet', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: supabaseUid,
                    wallet: publicKey.toBase58(),
                    signature: signatureBase58,
                    timestamp: timestamp
                })
            });

            const result = await response.json();
            if (!result.success) throw new Error(result.error || 'VERIFICATION_FAILED');

            return result;

        } catch (err: any) {
            // Graceful 'User Rejected' Handling
            if (err.message.includes('User rejected the request')) {
                setError('SIGNATURE_REJECTED_BY_USER');
            } else {
                setError(err.message || 'UNKNOWN_BINDING_ERROR');
            }
            return null;
        } finally {
            setLoading(false);
        }
    }, [connected, publicKey, signMessage]);

    return { bindWallet, loading, error, connected };
};