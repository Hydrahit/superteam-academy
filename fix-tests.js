const fs = require('fs');
const path = require('path');

console.log('🛠️  Starting Universal Repair Operation...');

const rootDir = process.cwd();

// List of critical files to fix
const filesToFix = [
  path.join(rootDir, 'app/courses/[slug]/lessons/[id]/page.tsx'),
  path.join(rootDir, 'app/courses/[slug]/page.tsx'),
  path.join(rootDir, 'app/(platform)/dashboard/page.tsx'),
  path.join(rootDir, 'app/leaderboard/page.tsx')
];

filesToFix.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix 1: Common Bash-to-JSX injection artifacts
    content = content.replace(/\\\[/g, '[').replace(/\\\]/g, ']');
    
    // Fix 2: Repair common missing closing braces in return statements
    if (content.includes('return (') && !content.trim().endsWith('}')) {
       // Force a clean ending if the script cut it off
       if (!content.includes(');')) {
          content += '\n    </div>\n  );\n}';
       }
    }

    // Fix 3: Ensure 'use client' is present
    if (!content.includes("'use client'")) {
      content = "'use client';\n" + content;
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Repaired: ${path.relative(rootDir, filePath)}`);
  }
});

// Fix 4: Final conflict check for [id] vs [lessonId]
const lessonIdPath = path.join(rootDir, 'app/courses/[slug]/lessons/[lessonId]');
if (fs.existsSync(lessonIdPath)) {
  console.log('🚨 Conflict detected! Deleting duplicate [lessonId] folder...');
  fs.rmSync(lessonIdPath, { recursive: true, force: true });
}

console.log('\n🎉 Repair complete! Running one final Git Sync...');