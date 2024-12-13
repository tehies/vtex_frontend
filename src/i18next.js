import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
i18n
  .use(LanguageDetector) // Detects user language
  .use(initReactI18next) // Passes i18n instance to react-i18next
  .use(Backend)
  .init({
    debug: true, // Enables debugging messages in the console
    fallbackLng: 'en', // Fallback language if detection fails
    lng: 'en', // Default language
    returnObjects: true,

  });

export default i18n;
