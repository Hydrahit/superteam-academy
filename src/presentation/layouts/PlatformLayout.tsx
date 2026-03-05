
'use client';
import React from 'react';
import { AppSidebar } from '@/presentation/components/AppSidebar';

export const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex bg-[#060608] min-h-screen">
      <AppSidebar />
      <div className="flex-1 md:ml-64 relative">
        {/* Glow Effects for World Class UI */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00FF94]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  );
};
