'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, BookOpen, Trophy, Award } from 'lucide-react';

export function TabBar() {
  const pathname = usePathname();
  
  const tabs = [
    { name: 'Home', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Learn', href: '/courses', icon: BookOpen },
    { name: 'Rank', href: '/leaderboard', icon: Trophy },
    { name: 'Profile', href: '/profile', icon: Award },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden pb-safe">
      {/* Apple-style backdrop blur material */}
      <div className="absolute inset-0 bg-canvas/80 backdrop-blur-xl border-t border-border/50" />
      
      <nav className="relative flex justify-around items-center h-[65px] px-2">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href || pathname.startsWith(tab.href + '/');
          return (
            <Link 
              key={tab.name} 
              href={tab.href}
              className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
                isActive ? 'text-accent' : 'text-secondary hover:text-primary'
              }`}
            >
              <tab.icon className={`w-6 h-6 ${isActive ? 'fill-accent/20' : ''}`} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium tracking-wide">{tab.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
