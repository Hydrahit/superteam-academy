#!/bin/bash

echo "🔐 INITIATING ENVIRONMENT CONFIGURATION..."
echo "------------------------------------------"

# Prompt for Supabase Credentials
read -p "Enter Supabase URL (e.g., https://xyz.supabase.co): " SB_URL
read -p "Enter Supabase Anon Key: " SB_ANON
read -p "Enter Supabase Service Role Key (Keep Secret): " SB_SERVICE

# Prompt for Solana Credentials
read -p "Enter Solana RPC URL (Helius/Alchemy/Quicknode): " SOL_RPC

# Set Site URL (Default for local development)
SITE_URL="http://localhost:3000"

# 1. Create .env.local file
echo "✍️  Writing to .env.local..."

cat <<EOF > .env.local
# --- SUPABASE CONFIGURATION ---
NEXT_PUBLIC_SUPABASE_URL=$SB_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=$SB_ANON
SUPABASE_SERVICE_ROLE_KEY=$SB_SERVICE

# --- SOLANA CONFIGURATION ---
NEXT_PUBLIC_SOLANA_RPC_URL=$SOL_RPC

# --- APP CONFIGURATION ---
NEXT_PUBLIC_SITE_URL=$SITE_URL
EOF

# 2. Add .env.local to .gitignore if not present
if ! grep -q ".env.local" .gitignore; then
  echo ".env.local" >> .gitignore
  echo "🛡️  Added .env.local to .gitignore for security."
fi

echo "------------------------------------------"
echo "✅ .env.local has been generated successfully!"
echo "🚀 You are now ready to run 'npm run dev'."