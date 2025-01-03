import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

i18n
  .use(HttpBackend) // برای بارگذاری ترجمه‌ها از فایل
  .use(LanguageDetector) // برای شناسایی زبان مرورگر
  .use(initReactI18next) // برای اتصال به ری‌اکت
  .init({
    fallbackLng: 'en', // زبان پیش‌فرض
    debug: true, // نمایش اطلاعات دیباگ در کنسول
    interpolation: {
      escapeValue: false, // برای امنیت، اما در ری‌اکت نیاز نیست
    },
  });

export default i18n;
