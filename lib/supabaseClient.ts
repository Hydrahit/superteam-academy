import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export const getSupabaseBrowserClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error(
      "🚨 [SUPABASE FATAL ERROR]: Missing Environment Variables!\n" +
      "Ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set in .env.local"
    );
    throw new Error("System Setup Incomplete: Missing Supabase Keys.");
  }

  return createClientComponentClient();
};
