'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { LogIn } from 'lucide-react';

export const AuthButton = () => {
  const [loading, setLoading] = useState(false);
  const supabase = createClientComponentClient();

  const handleGoogleLogin = async () => {
    setLoading(true);
    console.log("🚀 Initializing Google OAuth Flow...");

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) throw error;
    } catch (error: any) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleGoogleLogin}
      disabled={loading}
      className="flex items-center gap-3 px-6 py-2.5 bg-white text-black rounded-full font-bold text-xs uppercase tracking-widest hover:bg-neutral-200 transition-all disabled:opacity-50"
    >
      <LogIn size={16} />
      {loading ? 'Redirecting...' : 'Sign in with Google'}
    </motion.button>
  );
};
