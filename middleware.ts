import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';

const locales = ['en', 'es', 'pt'];
const publicPages = ['/', '/auth/callback', '/courses'];

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: 'en'
});

export default async function middleware(req: NextRequest) {
  const response = intlMiddleware(req);

  try {
    // FIX: createMiddlewareClient is the correct function for Vercel Edge Runtime
    const supabase = createMiddlewareClient({ req, res: response });
    const { data: { session } } = await supabase.auth.getSession();

    const { pathname } = req.nextUrl;
    const pathWithoutLocale = pathname.replace(/^\/(en|es|pt)/, '') || '/';
    const isPublicPage = publicPages.includes(pathWithoutLocale);

    if (!session && !isPublicPage) {
      const locale = pathname.split('/')[1] || 'en';
      return NextResponse.redirect(new URL(`/${locale}`, req.url));
    }
  } catch (e) {
    console.error("Middleware Sync Error:", e);
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)']
};
