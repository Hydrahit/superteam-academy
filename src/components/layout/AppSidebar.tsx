"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard } from "lucide-react";

export function AppSidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-64 h-screen border-r border-white/10 bg-[#0C0C10] p-4 text-white">
      <h1 className="text-[#00E5FF] font-bold text-xl mb-8">Superteam</h1>
      <Link
        href="/dashboard"
        className="flex items-center gap-2 text-white/50 hover:text-white"
      >
        <LayoutDashboard className="w-5 h-5" /> Dashboard
      </Link>
    </aside>
  );
}
