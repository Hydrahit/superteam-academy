"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/lib/navigation";
import { Languages } from "lucide-react";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const nextLocale = locale === "en" ? "pt" : "en";
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <button
      onClick={toggleLocale}
      className="flex items-center gap-3 px-4 py-3 w-full text-white/40 hover:text-[#00FF94] hover:bg-white/5 rounded-xl transition-all font-['JetBrains_Mono'] text-xs"
    >
      <Languages className="w-5 h-5" />
      <span className="md:inline hidden uppercase tracking-widest">
        {locale === "en" ? "English" : "Português"}
      </span>
    </button>
  );
}
