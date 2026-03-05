'use client';
import React, { createContext, useContext, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

const AuthContext = createContext<any>(undefined);
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { publicKey } = useWallet();
  const [user, setUser] = useState<{name: string} | null>(null);
  const isLinked = !!(user && publicKey);
  
  return (
    <AuthContext.Provider value={{ user, wallet: publicKey, isLinked, login: () => setUser({ name: 'Builder' }) }}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);
