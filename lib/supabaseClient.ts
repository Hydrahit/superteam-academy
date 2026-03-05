import { createClient } from "@/lib/supabase/client";

// Static initialization to prevent "not a function" errors during bundling
let supabaseInstance: any = null;

export const getSupabaseBrowserClient = () => {
  if (supabaseInstance) return supabaseInstance;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error("🚨 [SUPABASE ERROR]: Missing Keys in .env.local");
    return null;
  }

  // Defensive check for the helper function
  if (typeof createClientComponentClient !== 'function') {
    console.error("🚨 [SUPABASE FATAL]: createClientComponentClient is not a function. Check package versions!");
    return null;
  }

  supabaseInstance = createClient();
  return supabaseInstance;
};
