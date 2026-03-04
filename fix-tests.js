const fs = require('fs');
const path = require('path');

console.log('🚀 Preparing Superteam Academy for Production Deployment...');

const rootDir = process.cwd();

// 1. Create a Production .env.example
const envContent = `# Solana Program Configuration
NEXT_PUBLIC_PROGRAM_ID=ACADemy111111111111111111111111111111111111
NEXT_PUBLIC_SOLANA_NETWORK=devnet

# Helius DAS API (Get yours at helius.dev)
HELIUS_RPC_URL=https://devnet.helius-rpc.com/?api-key=YOUR_KEY_HERE

# Analytics & Monitoring
NEXT_PUBLIC_POSTHOG_KEY=your_key
NEXT_PUBLIC_SENTRY_DSN=your_dsn
`;
fs.writeFileSync(path.join(rootDir, '.env.example'), envContent);

// 2. Final Build Script to clear cache before Vercel build
const packageJsonPath = path.join(rootDir, 'package.json');
if (fs.existsSync(packageJsonPath)) {
    let pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    pkg.scripts["vercel-build"] = "node repair-all.js && next build";
    fs.writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2), 'utf8');
}

// 3. Create a Deployment Summary for the User
const summaryContent = `
# 🏁 Deployment Checklist for Om Dubey

1. **Vercel Dashboard**: Go to Project Settings > Environment Variables.
2. **Add Variables**: Copy keys from .env.example and paste your real Helius/Program IDs.
3. **Connect Wallet**: Ensure your Samsung F34 5G has a compatible Solana wallet (Phantom/Solflare).
4. **Push to Main**: Git push origin main to trigger the final production build.
`;
fs.writeFileSync(path.join(rootDir, 'DEPLOYMENT_GUIDE.md'), summaryContent);

console.log('\\n✅ PRODUCTION READY. Environment template and build scripts updated.');