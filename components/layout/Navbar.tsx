// components/layout/Navbar.tsx

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useWallet } from '@solana/wallet-adapter-react';
import { Trophy, Menu, X } from 'lucide-react';
import { WalletConnectButton } from "@/components/wallet/WalletConnectButton";;
import { LanguageSwitcher } from './LanguageSwitcher';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useUserStore } from '@/lib/store/user';
import { formatXP } from '@/lib/utils';
import { useState } from 'react';

export function Navbar() {
  const pathname = usePathname();
  const { connected } = useWallet();
  const { user } = useUserStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/courses', label: 'Courses' },
    { href: '/leaderboard', label: 'Leaderboard' },
    ...(connected ? [{ href: '/dashboard', label: 'Dashboard' }] : []),
  ];

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
            <span className="text-primary-foreground font-bold text-sm">ST</span>
          </div>
          <span className="font-bold text-lg hidden sm:inline">
            Superteam Academy
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive(link.href)
                  ? 'text-foreground'
                  : 'text-muted-foreground'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* XP Badge (only when connected and user loaded) */}
          {connected && user && (
            <Badge variant="secondary" className="gap-2 hidden sm:flex">
              <Trophy className="h-3 w-3 text-yellow-500" />
              <span className="font-semibold">{formatXP(user.totalXp)} XP</span>
              <span className="text-muted-foreground">• Lvl {user.level}</span>
            </Badge>
          )}

          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* Wallet Button */}
          <WalletButton />

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container py-4 space-y-3">
            {/* XP Badge for mobile */}
            {connected && user && (
              <Badge variant="secondary" className="gap-2 w-full justify-center">
                <Trophy className="h-3 w-3 text-yellow-500" />
                <span className="font-semibold">{formatXP(user.totalXp)} XP</span>
                <span className="text-muted-foreground">• Lvl {user.level}</span>
              </Badge>
            )}

            {/* Mobile Nav Links */}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'bg-accent text-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
