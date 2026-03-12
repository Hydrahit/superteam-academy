"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations, Lang } from "./translations";

/* ══════════════════════════════════════
   THEME CONTEXT
══════════════════════════════════════ */
type Theme = "dark" | "light";
interface ThemeCtx { theme: Theme; setTheme: (t: Theme) => void; toggleTheme: () => void; }

const ThemeContext = createContext<ThemeCtx>({ theme: "dark", setTheme: () => {}, toggleTheme: () => {} });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    const saved = localStorage.getItem("st-theme") as Theme | null;
    const preferred = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    const t = saved ?? preferred;
    setThemeState(t);
    document.documentElement.setAttribute("data-theme", t);
  }, []);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    localStorage.setItem("st-theme", t);
    document.documentElement.setAttribute("data-theme", t);
  };

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);

/* ══════════════════════════════════════
   LANGUAGE CONTEXT
══════════════════════════════════════ */
interface LangCtx { lang: Lang; setLang: (l: Lang) => void; t: typeof translations.en; }

const LangContext = createContext<LangCtx>({ lang: "en", setLang: () => {}, t: translations.en });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("st-lang") as Lang | null;
    const browser = navigator.language.toLowerCase();
    let detected: Lang = "en";
    if (browser.startsWith("pt")) detected = "pt";
    else if (browser.startsWith("es")) detected = "es";
    const l = saved ?? detected;
    setLangState(l);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("st-lang", l);
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export const useTranslation = () => useContext(LangContext);

/* ══════════════════════════════════════
   COMBINED PROVIDER
══════════════════════════════════════ */
export function I18nThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        {children}
      </LanguageProvider>
    </ThemeProvider>
  );
}
