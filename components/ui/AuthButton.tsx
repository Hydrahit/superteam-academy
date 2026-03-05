'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { LogIn } from 'lucide-react';
import { getSupabaseBrowserClient } from '@/lib/supabaseClient';

export const AuthButton = () => {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      toast.error("Auth System not ready.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;
    } catch (error: any) {
      console.error("Login Error:", error.message);
      toast.error("Google Sign-in failed.");
      setLoading(false);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleGoogleLogin}
      disabled={loading}
      className="flex items-center gap-3 px-6 py-2.5 bg-white text-black rounded-full font-bold text-xs uppercase tracking-widest hover:bg-neutral-200 transition-all shadow-xl"
    >
      <LogIn size={16} />
      {loading ? 'Redirecting...' : 'Sign in with Google'}
    </motion.button>
  );
};
