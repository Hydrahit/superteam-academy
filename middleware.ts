import { createMessagesServerClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';

// 1. Define supported locales (Same as your i18n config)
const locales = ['en', 'es', 'pt'];
const publicPages = ['/', '/courses', '/auth/callback']; // Pages that don't need login

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: 'en'
});

export default async function middleware(req: NextRequest) {
  // 2. Run i18n Middleware first to handle locale redirection
  const response = intlMiddleware(req);

  // 3. Initialize Supabase client to refresh session
  const supabase = createMessagesServerClient({ req, res: response });
  const { data: { session } } = await supabase.auth.getSession();

  const { pathname } = req.nextUrl;

  // 4. Check if the path is protected (e.g., /en/profile or /en/dashboard)
  // We check if the path (minus the locale) is in our public list
  const pathWithoutLocale = pathname.replace(/^\/(en|es|pt)/, '') || '/';
  const isPublicPage = publicPages.includes(pathWithoutLocale);

  // 5. Auth Guard: If not logged in and trying to access private page -> Redirect to Home
  if (!session && !isPublicPage) {
    const locale = pathname.split('/')[1] || 'en';
    const loginUrl = new URL(`/${locale}`, req.url);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  // Match all pathnames except for internal ones and static files
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)']
};
