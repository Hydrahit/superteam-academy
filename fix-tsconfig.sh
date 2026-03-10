#!/bin/bash

GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo ""
echo -e "${BLUE}[1/2] Excluding tests from Next.js build...${NC}"

# Fix tsconfig.json - exclude tests and programs folders
node -e "
const fs = require('fs');
const tsconfig = JSON.parse(fs.readFileSync('tsconfig.json', 'utf8'));

// Add exclude array
tsconfig.exclude = [
  'node_modules',
  'tests',
  'programs',
  'target'
];

fs.writeFileSync('tsconfig.json', JSON.stringify(tsconfig, null, 2));
console.log('tsconfig.json updated');
"

echo -e "${GREEN}  ✓ tsconfig.json updated (tests excluded)${NC}"

echo ""
echo -e "${BLUE}[2/2] Running build...${NC}"
npm run build

if [ $? -eq 0 ]; then
  echo ""
  echo -e "${GREEN}╔══════════════════════════════════════════════════╗${NC}"
  echo -e "${GREEN}║  ✅ Build successful!                            ║${NC}"
  echo -e "${GREEN}║  Run: npm run dev                                ║${NC}"
  echo -e "${GREEN}║  🌐 http://localhost:3000                        ║${NC}"
  echo -e "${GREEN}╚══════════════════════════════════════════════════╝${NC}"
else
  echo -e "\033[0;31m❌ Still failing — paste errors above!\033[0m"
fi
