/**
 * middleware.ts — project root
 *
 * Chains two concerns in one middleware function:
 *
 *   1. next-intl locale routing  (/{locale}/...)
 *      Handles URL prefix, cookie persistence, and locale detection.
 *
 *   2. Supabase auth route protection
 *      Reads the Supabase session from HttpOnly cookies and redirects
 *      unauthenticated users away from protected routes.
 *
 * ── Why both concerns live here ───────────────────────────────────────────────
 *
 * Next.js only runs ONE middleware per request. We can't stack two.
 * The pattern is: run next-intl first (to get the locale-prefixed response),
 * then run Supabase auth checks on the SAME request before returning.
 *
 * ── Protected routes ──────────────────────────────────────────────────────────
 *
 *   /[locale]/dashboard/**                → requires Supabase session
 *   /[locale]/courses/[slug]/lessons/**   → requires Supabase session
 *
 *   Public:  /[locale]/courses            (catalog — anyone can browse)
 *            /[locale]/leaderboard        (public rankings)
 *            /[locale]                    (landing page)
 *            /auth/callback               (OAuth redirect — must be public!)
 *            /api/**                      (API routes handle their own auth)
 *
 * ── Auth check method ─────────────────────────────────────────────────────────
 *
 * We use createServerClient from @supabase/ssr to read the session from
 * the request's cookies. We call getUser() (not getSession()) because
 * getUser() re-validates the JWT with Supabase's server, preventing stale
 * or tampered tokens from granting access.
 *
 * Requires: npm install @supabase/ssr
 */

import { NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { createServerClient } from '@supabase/ssr';
import { locales, defaultLocale } from './i18n';

// ── next-intl middleware (handles locale prefixing + cookie) ──────────────────

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  localePrefix:    'always',
  localeDetection: false,
});

// ── Route protection rules ────────────────────────────────────────────────────

const PROTECTED_PATTERNS = [
  /^\/dashboard(\/.*)?$/,                        // /dashboard, /dashboard/...
  /^\/courses\/[^/]+\/lessons(\/.*)?$/,          // /courses/slug/lessons/...
];

/**
 * Given a pathname that may or may not have a locale prefix,
 * strip the prefix and return the bare path (e.g. /en/dashboard → /dashboard).
 */
function stripLocale(pathname: string): string {
  const localePattern = new RegExp(`^\\/(${locales.join('|')})(\\/.*)$`);
  const match = pathname.match(localePattern);
  return match ? (match[2] || '/') : pathname;
}

function isProtectedPath(pathname: string): boolean {
  const bare = stripLocale(pathname);
  return PROTECTED_PATTERNS.some((pattern) => pattern.test(bare));
}

// ── Main middleware ───────────────────────────────────────────────────────────

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;

  // ── Step 1: Always run next-intl first ─────────────────────────────────────
  // This may return a redirect (e.g. /dashboard → /en/dashboard) or
  // set the locale cookie. We capture the response to return it later.
  const intlResponse = intlMiddleware(request);

  // If intl issued a redirect, honour it immediately — no auth check needed.
  if (intlResponse.status === 307 || intlResponse.status === 308) {
    return intlResponse;
  }

  // ── Step 2: Auth guard for protected routes ─────────────────────────────────
  if (!isProtectedPath(pathname)) {
    return intlResponse; // Public route — return intl response unmodified
  }

  // Build a Supabase client that reads cookies from the incoming request.
  // We also need to forward any Set-Cookie headers from Supabase (token refresh)
  // to the outgoing response.
  let supabaseResponse = intlResponse;

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // Forward cookie updates to the final response
          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // getUser() validates the JWT on Supabase's server — never trust getSession() alone.
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    // Unauthenticated — redirect to the locale-prefixed landing page.
    // Derive the locale from the URL so we redirect to the right language.
    const localeMatch = pathname.match(new RegExp(`^\\/(${locales.join('|')})`));
    const locale = localeMatch ? localeMatch[1] : defaultLocale;

    // Preserve the intended destination so we can redirect back after sign-in.
    const redirectUrl = new URL(`/${locale}`, request.url);
    redirectUrl.searchParams.set('redirect', pathname);

    return NextResponse.redirect(redirectUrl);
  }

  // Authenticated — return the intl response (may have refreshed auth cookies).
  return supabaseResponse;
}

// ── Matcher ───────────────────────────────────────────────────────────────────

export const config = {
  matcher: [
    /*
     * Match every route EXCEPT:
     *   _next/static   — static assets
     *   _next/image    — Next.js image optimisation
     *   favicon.ico    — favicon
     *   *.{ext}        — any file with an extension (images, fonts, etc.)
     *   api/auth/**    — auth API routes handle their own auth
     *
     * Note: /auth/callback MUST be excluded — it's the OAuth redirect URI.
     */
    '/((?!_next/static|_next/image|favicon.ico|api/|auth/callback|.*\\..*).*)',
  ],
};
