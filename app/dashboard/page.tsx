'use client';
import { PlatformLayout } from '@/layouts/PlatformLayout';
import { useAuth } from '@/contexts/AuthContext';

export default function Dashboard() {
  const { authStage } = useAuth();
  
  return (
    <PlatformLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="mt-4 text-[#00FF94]">Auth Status: {authStage}</p>
      </div>
    </PlatformLayout>
  );
}
