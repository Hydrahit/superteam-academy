'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { LogIn } from 'lucide-react';
import { getSupabaseBrowserClient } from '@/lib/supabaseClient';

export const AuthButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    try {
      // Guard triggers here. If keys are missing, it throws immediately.
      const supabase = getSupabaseBrowserClient();
      
      setIsLoading(true);
      const toastId = toast.loading('Connecting to Google...');
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: `${window.location.origin}/auth/callback` }
      });
      
      if (error) throw error;
      
    } catch (error: any) {
      console.error("[AuthButton] Login aborted:", error.message);
      toast.error(
        error.message.includes('Missing Supabase Keys') 
          ? 'Cannot login: Environment keys missing!' 
          : `Login failed: ${error.message}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.button 
      whileTap={{ scale: 0.95 }} 
      onClick={handleLogin} 
      disabled={isLoading} 
      className="flex items-center gap-2 px-6 py-2 bg-white text-black font-bold text-xs uppercase tracking-widest rounded-full hover:bg-neutral-200 transition-colors disabled:opacity-50"
    >
      <LogIn size={16} /> {isLoading ? 'CONNECTING...' : 'LOGIN WITH GOOGLE'}
    </motion.button>
  );
};
