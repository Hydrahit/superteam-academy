const fs = require('fs');
const path = require('path');

console.log('🌐 Injecting Language Switcher & Navigation Hooks...');

const rootDir = process.cwd();

// 1. Create Navigation wrapper for next-intl
const navConfig = `
import {createSharedPathnamesNavigation} from 'next-intl/navigation';
 
export const locales = ['en', 'pt'] as const;
export const {Link, redirect, usePathname, useRouter} = createSharedPathnamesNavigation({locales});
`;
const libDir = path.join(rootDir, 'src/lib');
if (!fs.existsSync(libDir)) fs.mkdirSync(libDir, { recursive: true });
fs.writeFileSync(path.join(libDir, 'navigation.ts'), navConfig);

// 2. Create the Language Switcher Component
const switcherDir = path.join(rootDir, 'src/presentation/components');
if (!fs.existsSync(switcherDir)) fs.mkdirSync(switcherDir, { recursive: true });

const switcherComponent = `
'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/lib/navigation';
import { Languages } from 'lucide-react';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const nextLocale = locale === 'en' ? 'pt' : 'en';
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <button 
      onClick={toggleLocale}
      className="flex items-center gap-3 px-4 py-3 w-full text-white/40 hover:text-[#00FF94] hover:bg-white/5 rounded-xl transition-all font-['JetBrains_Mono'] text-xs"
    >
      <Languages className="w-5 h-5" />
      <span className="md:inline hidden uppercase tracking-widest">
        {locale === 'en' ? 'English' : 'Português'}
      </span>
    </button>
  );
}
`;
fs.writeFileSync(path.join(switcherDir, 'LanguageSwitcher.tsx'), switcherComponent);

// 3. Inject into Sidebar
const sidebarPath = path.join(rootDir, 'components/layout/AppSidebar.tsx');
if (fs.existsSync(sidebarPath)) {
    let content = fs.readFileSync(sidebarPath, 'utf8');
    if (!content.includes('LanguageSwitcher')) {
        content = "import { LanguageSwitcher } from '@/presentation/components/LanguageSwitcher';\\n" + content;
        content = content.replace('{/* Settings Link */}', '<LanguageSwitcher />\\n            {/* Settings Link */}');
        fs.writeFileSync(sidebarPath, content);
    }
}

console.log('\\n✅ SWITCHER READY. Users can now toggle between EN and PT.');