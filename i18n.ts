import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const locales = ['en', 'pt-br', 'es'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  'en': 'English',
  'pt-br': 'Português',
  'es': 'Español',
};

/**
 * next-intl v3 uses the async `requestLocale` parameter.
 * The middleware sets this from the URL prefix; we validate it here
 * and load the matching message bundle.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  // `requestLocale` is a Promise in next-intl v3 — await it first.
  const locale = await requestLocale;

  if (!locale || !locales.includes(locale as Locale)) {
    notFound();
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
