import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    resources: {"en":{"translation":{"welcome":"Learn. Build. Earn.","start":"Start Building","console":"Console","lang":"English"}},"es":{"translation":{"welcome":"Aprender. Construir. Ganar.","start":"Comenzar a Construir","console":"Consola","lang":"Español"}},"pt":{"translation":{"welcome":"Aprender. Construir. Ganhar.","start":"Começar a Construir","console":"Console","lang":"Português"}}},
    interpolation: { escapeValue: false }
  });

export default i18n;