'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { ChangeEvent, useTransition } from 'react';
import { Globe } from 'lucide-react';

export const LanguageSwitcher = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    
    // Replace the current locale in the pathname with the new one
    const newPath = pathname.replace(`/${locale}`, `/${nextLocale}`);
    
    startTransition(() => {
      router.replace(newPath);
    });
  };

  return (
    <div className="relative flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors">
      <Globe size={14} className="text-[#14F195]" />
      <select
        defaultValue={locale}
        onChange={onSelectChange}
        disabled={isPending}
        className="bg-transparent text-xs font-mono font-bold text-white outline-none cursor-pointer appearance-none pr-2 uppercase tracking-widest disabled:opacity-50"
      >
        <option value="en" className="bg-[#0a0a0a]">EN</option>
        <option value="es" className="bg-[#0a0a0a]">ES</option>
        <option value="pt" className="bg-[#0a0a0a]">PT</option>
      </select>
    </div>
  );
};
