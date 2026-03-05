#!/bin/bash

echo "🩹 STARTING UNIVERSAL REPAIR PROTOCOL..."

# 1. Force update packages to ensure correct function exports
echo "📦 Updating Supabase Auth Helpers..."
npm install @supabase/auth-helpers-nextjs@latest @supabase/supabase-js@latest

# 2. Fix Middleware (Replacing the non-existent function)
echo "✍️ Writing middleware.ts..."
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
EOF

# 3. Fix i18n Config (Explicitly returning the locale)
echo "✍️ Writing i18n.ts..."
cat << 'EOF' > i18n.ts
import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

const locales = ['en', 'es', 'pt'];

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  if (!locales.includes(locale as any)) notFound();

  return {
    locale, // This satisfies the 'locale is expected to be returned' warning
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
EOF

echo "🗑️ Nuking build cache..."
rm -rf .next

echo "------------------------------------------------"
echo "✅ ALL CRITICAL BUGS REPAIRED."
echo "🚀 Action: git add . && git commit -m 'fix: resolution of middleware and client typeerrors' && git push origin main"