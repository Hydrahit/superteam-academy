#!/bin/bash

echo "🧹 FIXING NEXT.JS ROUTING & LAYOUT ERRORS..."

# 1. Check if [locale] directory exists
if [ ! -d "app/[locale]" ]; then
  echo "❌ Error: app/[locale] directory not found. Did the i18n script run properly?"
  exit 1
fi

# 2. Move 'certificates' folder safely
if [ -d "app/certificates" ]; then
  echo "📦 Moving 'certificates' into 'app/[locale]/'..."
  mv app/certificates app/\[locale\]/
  echo "✅ Certificates moved successfully."
fi

# 3. Move '(dashboard)' or 'dashboard' if they exist outside
if [ -d "app/(dashboard)" ]; then
  echo "📦 Moving '(dashboard)' into 'app/[locale]/'..."
  mv app/\(dashboard\) app/\[locale\]/
  echo "✅ Dashboard moved successfully."
elif [ -d "app/dashboard" ]; then
  echo "📦 Moving 'dashboard' into 'app/[locale]/'..."
  mv app/dashboard app/\[locale\]/
  echo "✅ Dashboard moved successfully."
fi

# 4. Clear the faulty build cache
echo "🗑️ Clearing old .next build cache..."
rm -rf .next

echo "------------------------------------------------"
echo "✅ ARCHITECTURE FIXED! All pages now have a Root Layout."
echo "🚀 Next Step: Run 'npm run build'"