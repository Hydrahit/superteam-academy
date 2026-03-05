'use client';
import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { LogIn } from 'lucide-react';

export const AuthButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClientComponentClient();

  const handleLogin = async () => {
    setIsLoading(true);
    const toastId = toast.loading('Connecting to Google...');
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: `${window.location.origin}/auth/callback` }
      });
      if (error) throw error;
    } catch (error: any) {
      toast.error(`Login failed: ${error.message}`, { id: toastId });
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
