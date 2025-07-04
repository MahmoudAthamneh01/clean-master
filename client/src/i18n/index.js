import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation files
import arTranslations from './locales/ar.json';
import enTranslations from './locales/en.json';

const resources = {
  ar: {
    translation: arTranslations
  },
  en: {
    translation: enTranslations
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ar', // Default to Arabic
    lng: 'ar', // Set Arabic as the initial language
    
    interpolation: {
      escapeValue: false
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage']
    },
    
    // Force reload translations
    load: 'languageOnly',
    cleanCode: true,
    
    // Debug in development
    debug: false
  });

// Ensure Arabic is loaded on startup
if (i18n.language !== 'ar') {
  i18n.changeLanguage('ar');
}

export default i18n; 