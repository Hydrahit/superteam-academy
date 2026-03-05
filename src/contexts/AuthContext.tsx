"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { supabase } from "@/infrastructure/supabase/client"; // Assuming supabase client is correct

type AuthStage = "loading" | "unauthenticated" | "google_only" | "fully_linked";

const AuthContext = createContext<any>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { publicKey, connected } = useWallet();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [authStage, setAuthStage] = useState<AuthStage>("loading");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(false);
    setAuthStage("unauthenticated");
  }, []);

  const signInWithGoogle = async () => {};
  const signOut = async () => {};
  const linkWallet = async () => {};
  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        authStage,
        isLoading,
        isLinked: !!profile?.wallet_address,
        error,
        wallet: publicKey,
        signInWithGoogle,
        signOut,
        linkWallet,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
