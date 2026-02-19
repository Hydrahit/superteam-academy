'use client';

/**
 * components/layout/LanguageSwitcher.tsx
 *
 * ── Root cause of the broken switcher ────────────────────────────────────────
 *
 * The previous version used router.push(newPath) for locale switching.
 * router.push() is a CLIENT-SIDE navigation — Next.js middleware does NOT
 * re-run on client-side navigations. So:
 *
 *   1. URL changes from /en/courses → /pt-br/courses  ✓
 *   2. Middleware never runs again                     ✗
 *   3. next-intl locale context stays as 'en'         ✗
 *   4. Page renders in English despite Portuguese URL  ✗
 *   5. On hard refresh: middleware runs, sets pt-br    ✓ (but user already left)
 *
 * The fix: window.location.href = newPath
 * This triggers a full browser navigation. The middleware runs, reads the
 * /pt-br/ prefix, sets the locale context, and next-intl serves the correct
 * translation messages.
 *
 * ── Three bugs that were also fixed ─────────────────────────────────────────
 *
 * BUG 1 — Wrong locale source
 *   The active locale was read from Zustand store (always 'en' on init).
 *   Fixed: read from usePathname() — the URL is always correct.
 *
 * BUG 2 — No cookie write before navigation
 *   Without setting NEXT_LOCALE cookie, the middleware's Accept-Language
 *   detection (when enabled) would override the user's choice.
 *   Fixed: write NEXT_LOCALE cookie before navigating.
 *
 * BUG 3 — router.push() instead of hard navigation
 *   Described above — the main reason the switcher appeared to do nothing.
 *   Fixed: window.location.href = newPath
 */

import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { usePathname } from 'next/navigation';

// ── Types ─────────────────────────────────────────────────────────────────────

type SupportedLocale = 'en' | 'pt-br' | 'es';

const LANGUAGES: { code: SupportedLocale; name: string; flag: string }[] = [
  { code: 'en',    name: 'English',    flag: '🇺🇸' },
  { code: 'pt-br', name: 'Português',  flag: '🇧🇷' },
  { code: 'es',    name: 'Español',    flag: '🇪🇸' },
];

const LOCALE_CODES = LANGUAGES.map((l) => l.code) as string[];

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Write the NEXT_LOCALE cookie so the middleware uses it as a fallback
 * on routes that don't carry an explicit locale prefix.
 * Max-age: 1 year. SameSite=Lax so it's sent on top-level navigations.
 */
function persistLocaleCookie(locale: string): void {
  if (typeof document === 'undefined') return;
  const maxAge = 60 * 60 * 24 * 365;
  document.cookie = `NEXT_LOCALE=${locale}; Max-Age=${maxAge}; Path=/; SameSite=Lax`;
}

/**
 * Extract the active locale from the current pathname.
 * With localePrefix:'always', the URL is always /{locale}/rest-of-path,
 * so segment [1] is guaranteed to be the locale string.
 */
function localeFromPathname(pathname: string): SupportedLocale {
  const segment = pathname.split('/')[1] ?? '';
  return LOCALE_CODES.includes(segment) ? (segment as SupportedLocale) : 'en';
}

// ── Component ─────────────────────────────────────────────────────────────────

export function LanguageSwitcher() {
  // usePathname() from next/navigation — always reflects the real URL.
  // e.g. "/pt-br/courses/solana-101"
  const pathname = usePathname();

  const currentLocale   = localeFromPathname(pathname);
  const currentLanguage = LANGUAGES.find((l) => l.code === currentLocale) ?? LANGUAGES[0];

  const handleLanguageChange = (newLocale: SupportedLocale): void => {
    if (newLocale === currentLocale) return;

    // 1. Persist cookie BEFORE navigating so the middleware has it immediately.
    persistLocaleCookie(newLocale);

    // 2. Build the new path by swapping the locale segment.
    //    pathname: "/en/courses/solana-101"
    //    segments: ['', 'en', 'courses', 'solana-101']
    const segments = pathname.split('/');
    if (LOCALE_CODES.includes(segments[1] ?? '')) {
      segments[1] = newLocale;                  // replace existing locale
    } else {
      segments.splice(1, 0, newLocale);         // prepend (shouldn't happen with 'always')
    }
    const newPath = segments.join('/') || `/${newLocale}`;

    // 3. HARD navigation — this is the critical fix.
    //    router.push() is client-side: middleware never re-runs, locale never changes.
    //    window.location.href causes a full browser request, middleware runs,
    //    next-intl reads the /pt-br/ prefix and serves the correct messages.
    window.location.href = newPath;
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
        {LANGUAGES.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className="gap-2 cursor-pointer"
          >
            <span>{lang.flag}</span>
            <span>{lang.name}</span>
            {/* Active indicator — driven by URL, never by Zustand */}
            {currentLocale === lang.code && (
              <span className="ml-auto text-primary">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
