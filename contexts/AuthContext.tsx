'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

interface AuthContextType {
  authStage: 'unauthenticated' | 'wallet_only' | 'google_only' | 'fully_linked';
  profile: any;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { connected, publicKey } = useWallet();
  const [authStage, setAuthStage] = useState<'unauthenticated' | 'wallet_only' | 'google_only' | 'fully_linked'>('unauthenticated');

  useEffect(() => {
    if (connected) setAuthStage('wallet_only');
    else setAuthStage('unauthenticated');
  }, [connected]);

  const signOut = () => { console.log("Signing out..."); };

  return (
    <AuthContext.Provider value={{ authStage, profile: null, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
