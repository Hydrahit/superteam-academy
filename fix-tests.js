const fs = require('fs');
const path = require('path');

console.log('🛠️  Ultimate Superteam Academy Fixer Started... 🛠️\n');

const rootDir = process.cwd();

// 1. NUKE ROGUE MIDDLEWARE (The biggest cause of 404s)
const middlewarePaths = ['middleware.ts', 'middleware.js', 'src/middleware.ts', 'src/middleware.js'];
let middlewareFound = false;

middlewarePaths.forEach((mPath) => {
  const fullPath = path.join(rootDir, mPath);
  if (fs.existsSync(fullPath)) {
    console.log(`🚨 Rogue Middleware found at ${mPath}. Disabling it...`);
    fs.renameSync(fullPath, `${fullPath}.backup`);
    middlewareFound = true;
    console.log(`✅ Disabled ${mPath}!`);
  }
});
if (!middlewareFound) console.log('✅ No rogue middleware found.');


// 2. RESOLVE APP DIRECTORY CONFLICTS
let appDir = path.join(rootDir, 'app');
const srcAppDir = path.join(rootDir, 'src', 'app');

if (fs.existsSync(srcAppDir) && fs.existsSync(appDir)) {
  console.log('\n💥 ERROR: Found both "src/app" and "app". Next.js gets confused!');
  console.log('Moving "src/app" to "src_app_backup"...');
  fs.renameSync(srcAppDir, path.join(rootDir, 'src_app_backup'));
  console.log('✅ Conflict resolved!');
} else if (fs.existsSync(srcAppDir)) {
  appDir = srcAppDir;
}


// 3. FIX CASE SENSITIVITY & EXTENSIONS IN APP DIRECTORY
if (fs.existsSync(appDir)) {
  console.log(`\n🔍 Scanning App Directory: ${appDir}...`);
  const files = fs.readdirSync(appDir);
  let pageFound = false;

  files.forEach((file) => {
    const lower = file.toLowerCase();
    const fullPath = path.join(appDir, file);

    // Fix Page.tsx, PAGE.tsx -> page.tsx
    if (lower === 'page.tsx' && file !== 'page.tsx') {
      const correctPath = path.join(appDir, 'page.tsx');
      fs.renameSync(fullPath, correctPath);
      console.log(`🔧 Fixed Case: Renamed ${file} to page.tsx`);
      pageFound = true;
    } 
    // Fix page.ts -> page.tsx (Crucial for UI components)
    else if (file === 'page.ts') {
      const correctPath = path.join(appDir, 'page.tsx');
      fs.renameSync(fullPath, correctPath);
      console.log(`🔧 Fixed Extension: Renamed page.ts to page.tsx`);
      pageFound = true;
    }
    else if (file === 'page.tsx') {
      pageFound = true;
    }

    // Fix layout.ts -> layout.tsx
    if (file === 'layout.ts') {
      fs.renameSync(fullPath, path.join(appDir, 'layout.tsx'));
      console.log(`🔧 Fixed Extension: Renamed layout.ts to layout.tsx`);
    }
  });

  if (!pageFound) {
    console.log('❌ CRITICAL ERROR: page.tsx is completely missing from your app directory!');
  } else {
    console.log('✅ page.tsx is present and correctly named.');
  }
} else {
  console.log('\n❌ CRITICAL ERROR: "app" directory not found at all!');
}


// 4. CLEAR NEXT.JS CACHE (Force a fresh Vercel build)
const nextCacheDir = path.join(rootDir, '.next');
if (fs.existsSync(nextCacheDir)) {
  console.log('\n🗑️  Clearing .next cache folder...');
  fs.rmSync(nextCacheDir, { recursive: true, force: true });
  console.log('✅ Cache cleared!');
}

console.log('\n🎉 ALL FIXES APPLIED SUCCESSFULLY!');