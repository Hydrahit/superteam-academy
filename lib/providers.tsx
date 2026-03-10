'use client';

import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WalletContextProvider } from './solana/wallet';
import { Toaster } from 'sonner';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <WalletContextProvider>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#0F0F0F',
                border: '1px solid #1A1A1A',
                color: '#FFFFFF',
                fontFamily: 'DM Sans, sans-serif',
              },
            }}
            theme="dark"
          />
        </WalletContextProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
