/**
 * app/auth/callback/route.ts
 *
 * Handles the redirect from Google OAuth after the user approves the consent.
 *
 * Flow:
 *   Google → Supabase → this route → /dashboard (or error page)
 *
 * Supabase appends ?code=xxx to the redirect URL. This route:
 *   1. Exchanges the code for a session (sets auth cookies).
 *   2. Redirects the user to /dashboard on success.
 *   3. Redirects to /?error=... on failure.
 *
 * Security:
 *   - Uses @supabase/ssr so the session is stored in HttpOnly cookies.
 *   - The code is one-time-use and expires quickly (Supabase enforces this).
 *   - PKCE flow (default in Supabase v2) prevents code interception attacks.
 */

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import type { Database } from '@/lib/supabaseClient';

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code  = searchParams.get('code');
  const next  = searchParams.get('next') ?? '/en/dashboard';
  const error = searchParams.get('error');

  // Supabase can redirect back with an error (e.g. user denied consent)
  if (error) {
    const desc = searchParams.get('error_description') ?? error;
    console.error('[auth/callback] OAuth error:', desc);
    return NextResponse.redirect(
      new URL(`/en?auth_error=${encodeURIComponent(desc)}`, origin)
    );
  }

  if (!code) {
    return NextResponse.redirect(
      new URL('/en?auth_error=missing_code', origin)
    );
  }

  // Exchange the code for a session
  const cookieStore = await cookies();

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        },
      },
    }
  );

  const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

  if (exchangeError) {
    console.error('[auth/callback] Code exchange failed:', exchangeError.message);
    return NextResponse.redirect(
      new URL(
        `/en?auth_error=${encodeURIComponent(exchangeError.message)}`,
        origin
      )
    );
  }

  // Success — the DB trigger `handle_new_auth_user` has already created
  // the user_profiles row. Redirect to dashboard (or the 'next' param).
  const redirectTo = next.startsWith('/') ? next : '/en/dashboard';
  return NextResponse.redirect(new URL(redirectTo, origin));
}
