import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    // Exchange the temporary code for a permanent session
    await supabase.auth.exchangeCodeForSession(code);
  }

  // Redirect to the localized home page after login
  const locale = requestUrl.pathname.split('/')[1] || 'en';
  return NextResponse.redirect(`${requestUrl.origin}/${locale}`);
}
