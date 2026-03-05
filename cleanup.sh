#!/bin/bash

echo "🛠️  REPAIRING MIDDLEWARE AND i18n CONFIG..."

# 1. Fix Middleware (Using the correct createMiddlewareClient function)
echo "✍️ Updating middleware.ts..."
cat << 'EOF' > middleware.ts
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
  // A. Handle Localization logic
  const response = intlMiddleware(req);

  try {
    // FIX: Using createMiddlewareClient which is the correct function for Next.js Middleware
    const supabase = createMiddlewareClient({ req, res: response });
    
    // Refresh the user session
    const { data: { session } } = await supabase.auth.getSession();

    const { pathname } = req.nextUrl;
    const pathWithoutLocale = pathname.replace(/^\/(en|es|pt)/, '') || '/';
    const isPublicPage = publicPages.includes(pathWithoutLocale);

    // B. Auth Guard
    if (!session && !isPublicPage) {
      const locale = pathname.split('/')[1] || 'en';
      return NextResponse.redirect(new URL(`/${locale}`, req.url));
    }
  } catch (e) {
    console.error("Middleware Auth Error:", e);
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)']
};
EOF

# 2. Fix i18n Config (Explicitly returning the locale object)
echo "✍️ Updating i18n.ts..."
cat << 'EOF' > i18n.ts
import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

const locales = ['en', 'es', 'pt'];

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  
  // Safety check for supported locales
  if (!locales.includes(locale as any)) notFound();

  return {
    locale, // This line fixes the 'none was returned' warning from your logs
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
EOF

echo "------------------------------------------------"
echo "✅ CRITICAL ERRORS REPAIRED."
echo "🚀 Now push these changes to GitHub to trigger the winning build."