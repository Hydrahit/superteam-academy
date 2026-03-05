import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';

// 1. i18n Configuration
const locales = ['en', 'es', 'pt'];
const publicPages = ['/', '/auth/callback', '/courses'];

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: 'en'
});

export default async function middleware(req: NextRequest) {
  // A. Handle i18n first (This creates the initial response object)
  const response = intlMiddleware(req);

  // B. Safety Check: If Env Vars are missing, skip auth to prevent 500 error
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error("🚨 [MIDDLEWARE ERROR]: Missing Supabase Env Vars on Vercel!");
    return response; // Return i18n response anyway so the site doesn't crash
  }

  try {
    // C. Initialize Supabase with the i18n response
    const supabase = createMiddlewareClient({ req, res: response });
    
    // This refreshes the session if it exists
    const { data: { session } } = await supabase.auth.getSession();

    const { pathname } = req.nextUrl;
    
    // D. Auth Guard Logic
    const pathWithoutLocale = pathname.replace(/^\/(en|es|pt)/, '') || '/';
    const isPublicPage = publicPages.includes(pathWithoutLocale);

    // Redirect to home if accessing protected page without session
    if (!session && !isPublicPage) {
      const locale = pathname.split('/')[1] || 'en';
      return NextResponse.redirect(new URL(`/${locale}`, req.url));
    }

  } catch (error) {
    console.error("⚠️ [MIDDLEWARE AUTH EXCEPTION]:", error);
  }

  return response;
}

export const config = {
  // Matcher for all paths except static assets
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)']
};
