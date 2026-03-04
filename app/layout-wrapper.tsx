'use client';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { AuthProvider } from '@/contexts/AuthContext';
import { usePathname } from 'next/navigation';

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPlatformPage = pathname.includes('/dashboard') || pathname.includes('/courses') || pathname.includes('/leaderboard') || pathname.includes('/profile');

  return (
    <AuthProvider>
      <div className="flex">
        {isPlatformPage && <AppSidebar />}
        <main className={`flex-1 ${isPlatformPage ? 'md:ml-64 ml-20' : ''}`}>
          {children}
        </main>
      </div>
    </AuthProvider>
  );
}
