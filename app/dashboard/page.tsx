'use client';
import { PlatformLayout } from '@/presentation/layouts/PlatformLayout';
import { useAuth } from '@/contexts/AuthContext';

export default function Dashboard() {
  const { user, authStage } = useAuth();
  
  return (
    <PlatformLayout>
      <div className="p-8">
        <h1 className="text-4xl font-bold font-['Syne'] text-white">Dashboard</h1>
        <p className="text-white/50 mt-2">Welcome back, {user?.email || 'Scholar'}</p>
        <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-3xl">
          <p className="text-sm font-['JetBrains_Mono'] text-[#00FF94]">Status: {authStage}</p>
        </div>
      </div>
    </PlatformLayout>
  );
}
