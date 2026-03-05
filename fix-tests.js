const fs = require('fs');

console.log('☁️  CONFIGURING VERCEL PRODUCTION SETTINGS...');

const vercelConfig = {
  "version": 2,
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "installCommand": "npm install",
  "regions": ["cle1"], 
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" }
      ]
    }
  ]
};

fs.writeFileSync('vercel.json', JSON.stringify(vercelConfig, null, 2));
console.log('✅ vercel.json generated with security headers.');

// Create a deployment check script
const deployCheck = `
#!/bin/bash
echo "🔍 Running Pre-flight checks..."
npm run build
if [ $? -eq 0 ]; then
  echo "🚀 Build Passed! Ready for Vercel."
else
  echo "❌ Build Failed. Check the errors above."
  exit 1
fi
`;

fs.writeFileSync('deploy-check.sh', deployCheck.trim());
console.log('✅ deploy-check.sh created. Run it before pushing to GitHub.');