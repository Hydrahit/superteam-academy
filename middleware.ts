import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

/**
 * next-intl middleware
 *
 * Responsibilities:
 *  - Reads the locale from the URL prefix  (/en/…, /pt-br/…, /es/…)
 *  - On first visit (no prefix), redirects to the defaultLocale (/en/…)
 *  - Sets the NEXT_LOCALE cookie so subsequent navigations are stable
 *
 * Place this file at the project root: middleware.ts
 */
export default createMiddleware({
  // Must match the array in i18n.ts exactly
  locales,

  // English is the default – first-time visitors land here
  defaultLocale,

  // Always show the locale prefix in the URL (/en/, /pt-br/, /es/)
  // This makes the switcher logic simple: just swap the first path segment.
  localePrefix: 'always',

  // Honour the browser's Accept-Language header only on the very first visit.
  // After that, the URL (and cookie) take precedence.
  localeDetection: true,
});

export const config = {
  // Run on every route EXCEPT Next.js internals, API routes, and static files.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
