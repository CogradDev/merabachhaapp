import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import hiTranslation from './locales/hi/translation.json'; // Hindi translations

const resources = {
  hi: { translation: hiTranslation }, // Add other languages here
};

i18n
  .use(initReactI18next) // Bind i18n to React
  .init({
    resources,
    lng: 'hi', // Default language (Hindi in this case)
    fallbackLng: 'hi', // Fallback language if translation is missing
    interpolation: {
      escapeValue: false, // React already protects against XSS
    },
  });

export default i18n;
