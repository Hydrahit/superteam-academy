'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { publicKey, connected } = useWallet();
  const [userState, setUserState] = useState({ isLinked: false, xp: 0, level: 1 });

  useEffect(() => {
    if (connected && publicKey) {
      // Mocking a sync from Supabase
      setUserState({ isLinked: true, xp: 2450, level: 4 });
    }
  }, [connected, publicKey]);

  return (
    <AuthContext.Provider value={{ ...userState, wallet: publicKey, connected }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);