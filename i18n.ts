import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

const locales = ['en', 'es', 'pt'];

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  
  // Safety check for supported locales
  if (!locales.includes(locale as any)) notFound();

  return {
    locale, // This line fixes the 'none was returned' warning from your logs
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
