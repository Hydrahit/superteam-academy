import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export const locales = ['en', 'es', 'pt'] as const;

// This creates smart versions of Link and useRouter that ALWAYS remember the user's language
export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation({ locales });
