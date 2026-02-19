/**
 * middleware.ts — project root
 *
 * Replaces createIntlMiddleware() with explicit locale routing.
 *
 * WHY WE DITCHED createIntlMiddleware():
 *   next-intl v3's localeDetection:false only suppresses Accept-Language header
 *   detection. It does NOT suppress NEXT_LOCALE cookie detection. So a stale
 *   NEXT_LOCALE=pt-br cookie (from testing, a previous deploy, or anything)
 *   overrides defaultLocale:'en' on every bare-path request — permanently.
 *
 * HOW THIS MIDDLEWARE DECIDES THE LOCALE:
 *   Priority 1 — URL path prefix   /pt-br/courses → 'pt-br'
 *   Priority 2 — NEXT_LOCALE cookie (only if it's a valid locale)
 *   Priority 3 — 'en' (hardcoded fallback — never Accept-Language)
 *
 *   On every response we write NEXT_LOCALE=<resolved-locale> so the cookie
 *   always matches what's in the URL.
 */

import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

// ── Locale config (keep in sync with i18n.ts) ─────────────────────────────────

const LOCALES    = ['en', 'pt-br', 'es'] as const;
type Locale      = typeof LOCALES[number];
const DEFAULT_LOCALE: Locale = 'en';          // ← single source of truth

// ── Route protection ──────────────────────────────────────────────────────────

const PROTECTED_PATTERNS = [
  /^\/dashboard(\/.*)?$/,
  /^\/courses\/[^/]+\/lessons(\/.*)?$/,
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function isValidLocale(s: string): s is Locale {
  return (LOCALES as readonly string[]).includes(s);
}

/**
 * Extract the locale prefix from a pathname.
 * /en/courses → 'en'
 * /pt-br/dashboard → 'pt-br'
 * /about → null
 */
function getLocaleFromPath(pathname: string): Locale | null {
  const segment = pathname.split('/')[1] ?? '';
  return isValidLocale(segment) ? segment : null;
}

/**
 * Strip the locale prefix and return the bare path.
 * /en/courses/solana-101 → /courses/solana-101
 * /about → /about
 */
function stripLocalePrefix(pathname: string): string {
  const locale = getLocaleFromPath(pathname);
  if (!locale) return pathname;
  const after = pathname.slice(locale.length + 1); // +1 for leading /
  return after === '' ? '/' : after;
}

function isProtectedPath(barePath: string): boolean {
  return PROTECTED_PATTERNS.some((p) => p.test(barePath));
}

// ── Main middleware ───────────────────────────────────────────────────────────

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;

  // ── Step 1: Resolve the correct locale ───────────────────────────────────
  //
  // Priority: URL prefix > valid NEXT_LOCALE cookie > 'en'
  // We deliberately ignore Accept-Language entirely.
  // We also ignore a NEXT_LOCALE cookie that holds an invalid value.

  const localeInUrl = getLocaleFromPath(pathname);

  const cookieLocaleRaw = request.cookies.get('NEXT_LOCALE')?.value ?? '';
  const cookieLocale: Locale | null = isValidLocale(cookieLocaleRaw)
    ? cookieLocaleRaw
    : null;

  // If the URL already has a valid locale prefix, that is canonical — trust it.
  // Otherwise fall back to cookie, then to 'en'.
  const resolvedLocale: Locale = localeInUrl ?? cookieLocale ?? DEFAULT_LOCALE;

  // ── Step 2: Redirect bare paths to /{locale}/... ──────────────────────────
  //
  // Visitor hits /              → redirect to /en/
  // Visitor hits /courses       → redirect to /en/courses
  // Visitor hits /pt-br/courses → no redirect (locale already in URL)

  if (!localeInUrl) {
    const redirectUrl = new URL(
      `/${resolvedLocale}${pathname === '/' ? '' : pathname}`,
      request.url,
    );
    // Copy query params
    request.nextUrl.searchParams.forEach((value, key) => {
      redirectUrl.searchParams.set(key, value);
    });

    const redirectResponse = NextResponse.redirect(redirectUrl, { status: 307 });

    // Write the cookie so future requests land on the same locale
    redirectResponse.cookies.set('NEXT_LOCALE', resolvedLocale, {
      path:     '/',
      maxAge:   60 * 60 * 24 * 365,
      sameSite: 'lax',
      httpOnly: false, // must be readable by the LanguageSwitcher (client JS)
    });

    return redirectResponse;
  }

  // ── Step 3: Cookie hygiene ────────────────────────────────────────────────
  //
  // The URL has a locale prefix. Make sure the cookie matches it so there's
  // never a mismatch between what the URL says and what the cookie says.

  const needsCookieUpdate = request.cookies.get('NEXT_LOCALE')?.value !== localeInUrl;

  // ── Step 4: Auth guard for protected routes ───────────────────────────────

  const barePath = stripLocalePrefix(pathname);

  if (!isProtectedPath(barePath)) {
    // Public route — just pass through (+ fix cookie if needed)
    const response = NextResponse.next();
    if (needsCookieUpdate) {
      response.cookies.set('NEXT_LOCALE', localeInUrl, {
        path:     '/',
        maxAge:   60 * 60 * 24 * 365,
        sameSite: 'lax',
        httpOnly: false,
      });
    }
    return response;
  }

  // Protected route — validate Supabase session
  const response = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    const redirectUrl = new URL(`/${localeInUrl}`, request.url);
    redirectUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Authenticated — sync cookie if needed
  if (needsCookieUpdate) {
    response.cookies.set('NEXT_LOCALE', localeInUrl, {
      path:     '/',
      maxAge:   60 * 60 * 24 * 365,
      sameSite: 'lax',
      httpOnly: false,
    });
  }

  return response;
}

// ── Matcher ───────────────────────────────────────────────────────────────────

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/|auth/callback|.*\\..*).*)',
  ],
};
