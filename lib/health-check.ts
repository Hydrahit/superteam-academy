export const checkPluginHealth = () => {
  const requiredEnv = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'NEXT_PUBLIC_SOLANA_RPC_URL'
  ];

  requiredEnv.forEach((env) => {
    if (!process.env[env]) {
      console.warn(`⚠️ [PLUGIN ERROR]: Missing ${env}. Some features may break.`);
    }
  });

  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SOLANA_RPC_URL) {
    console.log("✅ [SYSTEMS OK]: All Plugins Connected.");
  }
};
