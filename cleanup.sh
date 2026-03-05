#!/bin/bash

echo "🧹 SWEEPING REMAINING ZOMBIE IMPORTS..."

# 1. Create the robust Server-Side SSR Client
mkdir -p lib/supabase
echo "✍️ Creating lib/supabase/server.ts..."
cat << 'EOF' > lib/supabase/server.ts
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function createClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // Next.js Server Components cannot set cookies directly, 
            // handled safely by our middleware.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch (error) {}
        },
      },
    }
  );
}
EOF

# 2. Fix the Auth Callback Route
echo "✍️ Updating app/auth/callback/route.ts..."
cat << 'EOF' > app/auth/callback/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const supabase = createClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  const locale = requestUrl.pathname.split('/')[1] || 'en';
  return NextResponse.redirect(`${requestUrl.origin}/${locale}`);
}
EOF

# 3. Safely patch the deep Lesson Page using Node.js
echo "⚙️  Patching app/[locale]/courses/[slug]/[lessonId]/page.tsx..."
node -e "
const fs = require('fs');
const filePath = 'app/[locale]/courses/[slug]/[lessonId]/page.tsx';
if (fs.existsSync(filePath)) {
  let content = fs.readFileSync(filePath, 'utf8');
  // Replace the old import with the new server client
  content = content.replace(/import \{.*?createServerComponentClient.*?\} from '@supabase\/auth-helpers-nextjs';/g, 'import { createClient } from \'@/lib/supabase/server\';');
  // Replace the old initialization with the new one
  content = content.replace(/createServerComponentClient\(\{.*?\}\)/g, 'createClient()');
  fs.writeFileSync(filePath, content);
  console.log('✅ Lesson page patched successfully.');
} else {
  console.log('⚠️ Lesson page not found, skipping patch.');
}
"

echo "------------------------------------------------"
echo "✅ ALL GHOST IMPORTS DESTROYED."