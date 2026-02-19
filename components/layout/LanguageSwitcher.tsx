'use client';

/**
 * components/layout/LanguageSwitcher.tsx
 *
 * ── What was broken (three separate bugs) ────────────────────────────────────
 *
 * BUG 1 — Wrong locale source
 *   The old component read `locale` from the Zustand store (lib/store/user.ts),
 *   which always initialises to 'en'. So:
 *     - The active checkmark always showed English, even on a Portuguese page.
 *     - `if (newLocale === locale) return` silently no-op'd when a pt-BR user
 *       clicked Portuguese (Zustand said 'en', new = 'pt-br' → proceed, but
 *       then on the next page load Zustand reset to 'en' again).
 *
 * BUG 2 — No explicit cookie write
 *   The switcher relied on the middleware to set NEXT_LOCALE during the
 *   redirect. But with localeDetection:true the middleware re-read
 *   Accept-Language and overwrote that cookie immediately.
 *
 * BUG 3 — stale guard after navigation
 *   Even when navigation succeeded, useLocale() from Zustand returned 'en'
 *   on every fresh page load, making the UI look like the switch reverted.
 *
 * ── The fixes ────────────────────────────────────────────────────────────────
 *
 * FIX 1 — Derive current locale directly from usePathname()
 *   With localePrefix:'always' the locale is always segment [1] of the URL.
 *   This is 100 % accurate with zero provider dependencies.
 *
 * FIX 2 — Write NEXT_LOCALE cookie explicitly before navigating
 *   next-intl reads this cookie (name: 'NEXT_LOCALE') as the second-highest
 *   priority source (after the URL prefix). Writing it client-side ensures
 *   the choice persists even on routes that might not carry the prefix.
 *
 * FIX 3 — Remove Zustand from locale logic entirely
 *   Zustand is still used for other user state; locale is now URL-driven.
 */

import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter, usePathname } from 'next/navigation';

// ── Supported locales (must match i18n.ts + middleware.ts) ───────────────────
type SupportedLocale = 'en' | 'pt-br' | 'es';

const LANGUAGES: { code: SupportedLocale; name: string; flag: string }[] = [
  { code: 'en',    name: 'English',   flag: '🇺🇸' },
  { code: 'pt-br', name: 'Português', flag: '🇧🇷' },
  { code: 'es',    name: 'Español',   flag: '🇪🇸' },
];

const LOCALE_CODES = LANGUAGES.map((l) => l.code);

// ── Cookie helpers ────────────────────────────────────────────────────────────

/**
 * Write the NEXT_LOCALE cookie.
 * next-intl middleware reads this as the fallback when the URL has no prefix.
 * Max-age 1 year; SameSite=Lax so it's sent on top-level navigations.
 */
function setLocaleCookie(locale: string): void {
  if (typeof document === 'undefined') return;
  const maxAge = 60 * 60 * 24 * 365; // 1 year
  document.cookie = `NEXT_LOCALE=${locale}; Max-Age=${maxAge}; Path=/; SameSite=Lax`;
}

// ── Derive locale from current pathname ───────────────────────────────────────

/**
 * With localePrefix:'always' the URL is always /{locale}/rest-of-path.
 * Split the pathname and check whether segment [1] is a known locale.
 * Falls back to 'en' if somehow we're on a non-prefixed route.
 */
function getLocaleFromPath(pathname: string): SupportedLocale {
  const segment = pathname.split('/')[1] ?? '';
  return (LOCALE_CODES as string[]).includes(segment)
    ? (segment as SupportedLocale)
    : 'en';
}

// ── Component ─────────────────────────────────────────────────────────────────

export function LanguageSwitcher() {
  const router   = useRouter();
  const pathname = usePathname(); // e.g. "/en/courses/solana-101"

  // FIX 1: read from URL, not from Zustand
  const currentLocale   = getLocaleFromPath(pathname);
  const currentLanguage = LANGUAGES.find((l) => l.code === currentLocale) ?? LANGUAGES[0];

  const handleLanguageChange = (newLocale: SupportedLocale): void => {
    // No-op if already on the requested locale
    if (newLocale === currentLocale) return;

    // FIX 2: write cookie BEFORE navigating so the middleware reads the new
    // value even if the user lands on a route without an explicit prefix.
    setLocaleCookie(newLocale);

    // Build the new path by swapping the locale segment.
    // pathname is always "/{locale}/..." with localePrefix:'always'.
    const segments = pathname.split('/');
    // segments: ['', 'en', 'courses', 'solana-101']
    //              ^0   ^1    ^2          ^3

    if ((LOCALE_CODES as string[]).includes(segments[1] ?? '')) {
      // Normal case — replace the existing locale segment
      segments[1] = newLocale;
    } else {
      // Fallback — prepend locale (shouldn't occur with 'always' prefix)
      segments.splice(1, 0, newLocale);
    }

    const newPath = segments.join('/') || `/${newLocale}`;
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
        {LANGUAGES.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className="gap-2 cursor-pointer"
          >
            <span>{language.flag}</span>
            <span>{language.name}</span>
            {/* FIX 3: active mark driven by URL, not Zustand */}
            {currentLocale === language.code && (
              <span className="ml-auto text-primary">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
