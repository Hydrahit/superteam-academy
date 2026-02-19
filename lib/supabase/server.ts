/**
 * lib/supabase/server.ts
 *
 * Creates a Supabase client that reads/writes cookies from the Next.js
 * request/response cycle. Use this in:
 *   - Server Components (read-only cookies)
 *   - API Routes / Route Handlers (read + write cookies)
 *   - Middleware (via the middleware-specific factory)
 *
 * NEVER use this in Client Components — use lib/supabase/client.ts instead.
 *
 * Requires: npm install @supabase/ssr
 */

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { Database } from '@/lib/supabaseClient';

/**
 * For Server Components and Route Handlers.
 * Reads cookies from the current request automatically via next/headers.
 */
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Server Components can't set cookies — the middleware handles refresh.
          }
        },
      },
    }
  );
}

/**
 * For Route Handlers that need to write auth cookies (e.g. /auth/callback).
 * Pass the NextResponse so cookies can be mutated on the outgoing response.
 */
export function createSupabaseRouteHandlerClient(
  requestCookies: ReturnType<typeof cookies> extends Promise<infer T> ? T : never
) {
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return requestCookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            requestCookies.set(name, value, options)
          );
        },
      },
    }
  );
}
