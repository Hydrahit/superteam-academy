'use client';
import React from 'react';
import { AppSidebar } from '@/components/layout/AppSidebar';

export const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex bg-[#060608] min-h-screen text-white">
      <AppSidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
};
