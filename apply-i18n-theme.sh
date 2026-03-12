#!/bin/bash

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo ""
echo -e "${GREEN}╔══════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║  🌍 Applying i18n (EN/PT-BR/ES) + Themes     ║${NC}"
echo -e "${GREEN}╚══════════════════════════════════════════════╝${NC}"
echo ""

if [ ! -f "package.json" ]; then
  echo -e "${RED}❌ Run from project root!${NC}"; exit 1
fi

# Check all required files
REQUIRED=(translations.ts context.tsx courses-v2.tsx leaderboard-v2.tsx dashboard-v2.tsx)
for f in "${REQUIRED[@]}"; do
  if [ ! -f "$f" ]; then
    echo -e "${RED}❌ Missing: $f${NC}"; exit 1
  fi
done

# ── 1. Create lib/i18n directory ──────────────────────
echo -e "${BLUE}[1/7] Creating lib/i18n/ directory...${NC}"
mkdir -p lib/i18n
echo -e "${GREEN}  ✓ lib/i18n/ ready${NC}"

# ── 2. Copy translations ──────────────────────────────
echo ""
echo -e "${BLUE}[2/7] Installing translations (EN / PT-BR / ES)...${NC}"
cp translations.ts lib/i18n/translations.ts
echo -e "${GREEN}  ✓ lib/i18n/translations.ts${NC}"

# ── 3. Copy context (Language + Theme providers) ──────
echo ""
echo -e "${BLUE}[3/7] Installing i18n + Theme context providers...${NC}"
cp context.tsx lib/i18n/context.tsx
echo -e "${GREEN}  ✓ lib/i18n/context.tsx${NC}"

# ── 4. Update Courses page ────────────────────────────
echo ""
echo -e "${BLUE}[4/7] Applying V3 Courses page (i18n + theme)...${NC}"
mkdir -p app/courses
[ -f "app/courses/page.tsx" ] && cp app/courses/page.tsx app/courses/page.tsx.bak
cp courses-v2.tsx app/courses/page.tsx
echo -e "${GREEN}  ✓ app/courses/page.tsx${NC}"

# ── 5. Update Leaderboard page ────────────────────────
echo ""
echo -e "${BLUE}[5/7] Applying V3 Leaderboard page (i18n + theme)...${NC}"
mkdir -p app/leaderboard
[ -f "app/leaderboard/page.tsx" ] && cp app/leaderboard/page.tsx app/leaderboard/page.tsx.bak
cp leaderboard-v2.tsx app/leaderboard/page.tsx
echo -e "${GREEN}  ✓ app/leaderboard/page.tsx${NC}"

# ── 6. Update Dashboard page ──────────────────────────
echo ""
echo -e "${BLUE}[6/7] Applying V3 Dashboard page (i18n + theme)...${NC}"
mkdir -p app/dashboard
[ -f "app/dashboard/page.tsx" ] && cp app/dashboard/page.tsx app/dashboard/page.tsx.bak
cp dashboard-v2.tsx app/dashboard/page.tsx
echo -e "${GREEN}  ✓ app/dashboard/page.tsx${NC}"

# ── 7. Patch landing page navbar ─────────────────────
echo ""
echo -e "${BLUE}[7/7] Patching landing page (hydration fix + theme attr)...${NC}"
if [ -f "app/page.tsx" ]; then
  # Fix hydration error on STYLES
  sed -i 's/<style>{STYLES}<\/style>/<style dangerouslySetInnerHTML={{__html: STYLES}} suppressHydrationWarning \/>/g' app/page.tsx

  # Add data-theme to root div so CSS vars work on landing too
  sed -i 's/className="crt" style={{position:\"relative\",background:\"#060608\"/className="crt" style={{position:"relative",background:"var(--bg, #060608)"/g' app/page.tsx

  echo -e "${GREEN}  ✓ Landing page patched${NC}"
else
  echo -e "${YELLOW}  ⚠ app/page.tsx not found — skipping landing patch${NC}"
fi

# Clear cache
rm -rf .next

echo ""
echo -e "${GREEN}╔══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║  ✅ i18n + Themes Applied!                                   ║${NC}"
echo -e "${GREEN}╠══════════════════════════════════════════════════════════════╣${NC}"
echo -e "${GREEN}║                                                              ║${NC}"
echo -e "${GREEN}║  🌍 Languages:  EN 🇺🇸  PT-BR 🇧🇷  ES 🇲🇽                     ║${NC}"
echo -e "${GREEN}║  🎨 Themes:     Dark 🌙  Light ☀️                            ║${NC}"
echo -e "${GREEN}║  💾 Persisted:  localStorage (survives refresh)              ║${NC}"
echo -e "${GREEN}║  🌐 Auto-detect: Browser language on first visit             ║${NC}"
echo -e "${GREEN}║                                                              ║${NC}"
echo -e "${GREEN}║  Pages updated:                                              ║${NC}"
echo -e "${GREEN}║  📚  /courses     — lang switcher + theme toggle             ║${NC}"
echo -e "${GREEN}║  🏆  /leaderboard — lang switcher + theme toggle             ║${NC}"
echo -e "${GREEN}║  📊  /dashboard   — lang switcher + translated achievements  ║${NC}"
echo -e "${GREEN}║                                                              ║${NC}"
echo -e "${GREEN}║  Files added:                                                ║${NC}"
echo -e "${GREEN}║  📄  lib/i18n/translations.ts                                ║${NC}"
echo -e "${GREEN}║  📄  lib/i18n/context.tsx                                    ║${NC}"
echo -e "${GREEN}║                                                              ║${NC}"
echo -e "${GREEN}║  Run: npm run dev → http://localhost:3000                    ║${NC}"
echo -e "${GREEN}╚══════════════════════════════════════════════════════════════╝${NC}"
echo ""
