'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useWallet } from '@solana/wallet-adapter-react';
import toast from 'react-hot-toast';

export const useAuth = () => {
  const supabase = createClient();
  const { publicKey, connected, disconnect } = useWallet();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []); // supabase is stable now, no need to add to dependencies

  const bindWalletToProfile = async () => {
    if (!user || !publicKey) {
      toast.error("Login with Google & Connect Wallet first!");
      return;
    }

    const toastId = toast.loading("Linking Wallet to Profile...");

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ solana_wallet: publicKey.toBase58() })
        .eq('id', user.id);

      if (error) throw error;
      toast.success("Identity Linked Successfully!", { id: toastId });
    } catch (err: any) {
      toast.error(err.message, { id: toastId });
    }
  };

  return {
    user,
    publicKey,
    isLoggedIn: !!user,
    isWalletConnected: connected,
    loading,
    bindWalletToProfile,
    signOut: () => supabase.auth.signOut()
  };
};
