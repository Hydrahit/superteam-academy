#!/bin/bash
echo "🔍 Running Pre-flight checks..."
npm run build
if [ $? -eq 0 ]; then
  echo "🚀 Build Passed! Ready for Vercel."
else
  echo "❌ Build Failed. Check the errors above."
  exit 1
fi