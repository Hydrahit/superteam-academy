'use client';

/**
 * components/layout/LanguageSwitcher.tsx
 *
 * Switches the app locale by navigating to the same page under the new
 * locale prefix.  next-intl middleware keeps the NEXT_LOCALE cookie in
 * sync so the choice persists across refreshes.
 *
 * URL structure (set by middleware with localePrefix: 'always'):
 *   /en/courses  →  /pt-br/courses  →  /es/courses
 */

import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLocale } from '@/lib/store/user';
import { Locale } from '@/lib/types/domain';
import { useRouter, usePathname } from 'next/navigation';

const languages: { code: Locale; name: string; flag: string }[] = [
  { code: 'en',    name: 'English',    flag: '🇺🇸' },
  { code: 'pt-br', name: 'Português',  flag: '🇧🇷' },
  { code: 'es',    name: 'Español',    flag: '🇪🇸' },
];

// All locale codes the middleware uses as URL prefixes.
const LOCALE_PREFIXES = languages.map((l) => l.code);

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();
  const router = useRouter();
  const pathname = usePathname(); // e.g. "/en/courses/solana-101"

  const currentLanguage =
    languages.find((lang) => lang.code === locale) ?? languages[0];

  const handleLanguageChange = (newLocale: Locale) => {
    if (newLocale === locale) return;

    // 1. Update Zustand store for immediate UI feedback (active check-mark, etc.)
    setLocale(newLocale);

    // 2. Build the new path by replacing the leading locale segment.
    //    pathname always starts with "/{locale}" because middleware uses
    //    localePrefix: 'always'.
    const segments = pathname.split('/');
    // segments = ['', 'en', 'courses', 'solana-101']
    //              ^0    ^1     ^2           ^3

    if (segments.length > 1 && LOCALE_PREFIXES.includes(segments[1])) {
      // Replace the existing locale segment
      segments[1] = newLocale;
    } else {
      // Fallback: prepend the new locale (shouldn't happen with 'always' prefix)
      segments.splice(1, 0, newLocale);
    }

    const newPath = segments.join('/') || `/${newLocale}`;

    // 3. Navigate — Next.js + next-intl middleware will set the cookie.
    router.push(newPath);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{currentLanguage.name}</span>
          <span className="sm:hidden">{currentLanguage.flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className="gap-2 cursor-pointer"
          >
            <span>{language.flag}</span>
            <span>{language.name}</span>
            {locale === language.code && (
              <span className="ml-auto text-primary">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
