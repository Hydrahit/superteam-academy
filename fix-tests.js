const fs = require('fs');
const path = require('path');

console.log('🧹 UNIFYING DYNAMIC ROUTES (Windows Safe Mode)...');

const rootDir = process.cwd();
const oldPath = path.join(rootDir, 'app/courses/[courseId]');
const newPath = path.join(rootDir, 'app/courses/[slug]');

try {
    if (fs.existsSync(oldPath)) {
        // Agar [slug] pehle se hai, toh sirf andar ki files check karo
        if (fs.existsSync(newPath)) {
            console.log('⚠️ Destination [slug] already exists. Removing old [courseId]...');
            fs.rmSync(oldPath, { recursive: true, force: true });
        } else {
            fs.renameSync(oldPath, newPath);
            console.log('✅ Successfully renamed to [slug]');
        }
    } else {
        console.log('ℹ️ Folder [courseId] not found. Already renamed?');
    }

    // Update code inside [lessonId]/page.tsx
    const lessonPage = path.join(newPath, '[lessonId]', 'page.tsx');
    if (fs.existsSync(lessonPage)) {
        let content = fs.readFileSync(lessonPage, 'utf8');
        content = content.replace(/courseId/g, 'slug');
        fs.writeFileSync(lessonPage, content);
        console.log('✨ Code updated inside [lessonId]/page.tsx');
    }

} catch (err) {
    console.error('❌ Error occurred:', err.message);
    console.log('\n💡 TIP: Close your code editor and stop "npm run dev", then try again.');
}