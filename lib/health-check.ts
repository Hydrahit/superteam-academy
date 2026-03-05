export const checkPluginHealth = () => {
  // Next.js requires static references to NEXT_PUBLIC variables on the client
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const solanaRpc = process.env.NEXT_PUBLIC_SOLANA_RPC_URL;

  let hasError = false;

  if (!supabaseUrl) {
    console.warn("⚠️ [PLUGIN ERROR]: Missing NEXT_PUBLIC_SUPABASE_URL. Some features may break.");
    hasError = true;
  }
  
  if (!supabaseKey) {
    console.warn("⚠️ [PLUGIN ERROR]: Missing NEXT_PUBLIC_SUPABASE_ANON_KEY. Some features may break.");
    hasError = true;
  }
  
  if (!solanaRpc) {
    console.warn("⚠️ [PLUGIN ERROR]: Missing NEXT_PUBLIC_SOLANA_RPC_URL. Some features may break.");
    hasError = true;
  }

  // Only print OK if absolutely no errors were found
  if (!hasError) {
    console.log("✅ [SYSTEMS OK]: All Plugins Connected.");
  }
};