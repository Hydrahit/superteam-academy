'use client';
import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useWallet } from '@solana/wallet-adapter-react';
import toast from 'react-hot-toast';
import bs58 from 'bs58';

export const useAuth = () => {
  const supabase = createClientComponentClient();
  const { publicKey, signMessage } = useWallet();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setUser(session?.user ?? null));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => setUser(session?.user ?? null));
    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const bindWallet = async () => {
    if (!user) return toast.error('Login with Google first.');
    if (!publicKey || !signMessage) return toast.error('Connect a Solana Wallet.');

    const nonce = `Bind Wallet to Superteam Academy\nUID: ${user.id}\nTime: ${Date.now()}`;
    try {
      const messageBytes = new TextEncoder().encode(nonce);
      const signatureBytes = await signMessage(messageBytes);
      const signature = bs58.encode(signatureBytes);

      const res = await fetch('/api/verify-wallet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, publicKey: publicKey.toBase58(), signature, message: nonce })
      });

      const data = await res.json();
      if (data.success) toast.success('Wallet cryptographically bound!');
      else toast.error(data.error);
    } catch (e) { toast.error('Signature rejected.'); }
  };

  return { user, bindWallet, isWalletConnected: !!publicKey };
};
