import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';

// 1. Localization Config
const locales = ['en', 'es', 'pt'];
const publicPages = ['/', '/auth/callback', '/courses'];

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: 'en'
});

export default async function middleware(req: NextRequest) {
  // A. Generate the initial localized response
  const response = intlMiddleware(req);

  try {
    // B. Initialize Supabase SSR Client with custom cookie handlers
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return req.cookies.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            // Securely attach new session cookies to the i18n response
            response.cookies.set({ name, value, ...options });
          },
          remove(name: string, options: CookieOptions) {
            // Securely clear cookies from the i18n response on logout
            response.cookies.set({ name, value: '', ...options });
          },
        },
      }
    );

    // C. Get the user securely (Replaces getSession for better security in SSR)
    const { data: { user } } = await supabase.auth.getUser();

    // D. Elite Route Guarding
    const { pathname } = req.nextUrl;
    const pathWithoutLocale = pathname.replace(/^\/(en|es|pt)/, '') || '/';
    const isPublicPage = publicPages.includes(pathWithoutLocale);

    // If a guest tries to access a protected dashboard/profile page
    if (!user && !isPublicPage) {
      const locale = pathname.split('/')[1] || 'en';
      return NextResponse.redirect(new URL(`/${locale}`, req.url));
    }
  } catch (e) {
    // Failsafe: If Supabase throws an error (e.g., missing env vars), 
    // we log it but don't crash the entire app.
    console.error("🚨 Middleware SSR Error:", e);
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)']
};
