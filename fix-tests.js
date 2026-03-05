const fs = require('fs');
const path = require('path');

console.log('🛠️ Resolging Module Paths and Syncing TSConfig...');

const rootDir = process.cwd();

// 1. UPDATE TSCONFIG.JSON (The Master Fix)
const tsConfigPath = path.join(rootDir, 'tsconfig.json');
if (fs.existsSync(tsConfigPath)) {
  const tsConfig = JSON.parse(fs.readFileSync(tsConfigPath, 'utf8'));
  
  // Force clean path mapping
  tsConfig.compilerOptions = {
    ...tsConfig.compilerOptions,
    baseUrl: ".",
    paths: {
      "@/*": ["./*"],
      "@/src/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/services/*": ["./src/services/*"]
    }
  };
  
  fs.writeFileSync(tsConfigPath, JSON.stringify(tsConfig, null, 2));
  console.log('✅ tsconfig.json updated with correct @/ aliases.');
}

// 2. CONSOLIDATE 'SRC' FOLDER (Moving app/src to root/src)
const oldSrc = path.join(rootDir, 'app', 'src');
const newSrc = path.join(rootDir, 'src');

if (fs.existsSync(oldSrc)) {
  if (!fs.existsSync(newSrc)) {
    fs.renameSync(oldSrc, newSrc);
    console.log('🚚 Moved app/src to project root /src for standard Next.js 14 structure.');
  } else {
    // If both exist, we need to merge or delete the redundant one
    console.log('⚠️ Both app/src and root/src exist. Cleaning up...');
    fs.rmSync(oldSrc, { recursive: true, force: true });
  }
}

// 3. FINAL DIRECTORY CHECK
const requiredDirs = ['src/store', 'src/services', 'src/components'];
requiredDirs.forEach(d => {
  const fullPath = path.join(rootDir, d);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`📂 Created missing directory: ${d}`);
  }
});

console.log('🚀 Path resolution complete. Try building now!');