import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

// Define your supported locales
const locales = ['en', 'es', 'pt'];

export default getRequestConfig(async ({ requestLocale }) => {
  // 1. Await the locale promise (New Standard)
  const locale = await requestLocale;

  // 2. Validate that the incoming locale is supported
  if (!locales.includes(locale as any)) notFound();

  return {
    // 3. Explicitly return the locale (Required in future versions)
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
