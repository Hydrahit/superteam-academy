import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

// 1. Define your routing rules
export const routing = defineRouting({
  locales: ['en', 'es', 'pt'],
  defaultLocale: 'en'
});

// 2. Export the smart versions of Link, redirect, etc.
// This replaces the deprecated createSharedPathnamesNavigation
export const { Link, redirect, usePathname, useRouter, getPathname } = 
  createNavigation(routing);
