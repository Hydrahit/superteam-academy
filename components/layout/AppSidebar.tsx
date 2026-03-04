'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, BookOpen, Trophy, User, Settings, Award } from 'lucide-react';

export function AppSidebar() {
  const pathname = usePathname();
  const menu = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'Curriculum', icon: BookOpen, href: '/courses' },
    { name: 'Rankings', icon: Trophy, href: '/leaderboard' },
    { name: 'Credentials', icon: Award, href: '/profile' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-20 md:w-64 border-r border-white/10 bg-[#0C0C10] flex flex-col z-50">
      <div className="p-6 font-['Syne'] font-bold text-xl text-[#00E5FF] border-b border-white/5">
        <span className="md:inline hidden">SUPERTEAM</span><span className="inline md:hidden">ST</span>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {menu.map((item) => (
          <Link key={item.name} href={item.href} className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
            pathname === item.href ? 'bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/20' : 'text-white/40 hover:text-white hover:bg-white/5'
          }`}>
            <item.icon className="w-5 h-5" />
            <span className="font-['Syne'] font-semibold md:inline hidden">{item.name}</span>
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-white/5 space-y-2">
        <Link href="/settings" className="flex items-center gap-4 px-4 py-3 text-white/40 hover:text-white transition-all">
          <Settings className="w-5 h-5" />
          <span className="font-['Syne'] font-semibold md:inline hidden">Settings</span>
        </Link>
      </div>
    </aside>
  );
}
