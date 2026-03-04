const fs = require('fs');
const path = require('path');

console.log('🧹 Cleaning up build commands for Vercel...');

const rootDir = process.cwd();
const pkgPath = path.join(rootDir, 'package.json');

if (fs.existsSync(pkgPath)) {
    let pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    
    // Resetting the build command to standard Next.js build
    // This removes the dependency on repair-all.js during deployment
    pkg.scripts["build"] = "next build";
    
    // Removing the troublesome vercel-build script
    if (pkg.scripts["vercel-build"]) {
        delete pkg.scripts["vercel-build"];
    }

    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2), 'utf8');
    console.log('✅ package.json: Build scripts reset to standard.');
}

// Check if repair-all.js actually exists locally
const repairPath = path.join(rootDir, 'repair-all.js');
if (!fs.existsSync(repairPath)) {
    console.log('⚠️ repair-all.js was missing. Creating a dummy placeholder to avoid future errors...');
    fs.writeFileSync(repairPath, "console.log('Repair script placeholder');", 'utf8');
}

console.log('\n🚀 Now run the Git commands to sync with Vercel.');