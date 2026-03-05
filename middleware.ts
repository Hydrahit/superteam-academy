import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'es', 'pt'],
  
  // Used when no locale matches
  defaultLocale: 'en',
  
  // Always prefix the locale in the URL (e.g., /en/courses)
  localePrefix: 'always'
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(en|es|pt)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};
