import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import th from "./locales/th.json";
import en from "./locales/en.json";
import zh from "./locales/zh.json";

const STORAGE_KEY = "shd_lang";
const saved = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;

i18n
  .use(initReactI18next)
  .init({
    resources: {
      th: { translation: th },
      en: { translation: en },
      zh: { translation: zh },
    },
    lng: saved || "th",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

export function setLang(lang: "th" | "en" | "zh") {
  i18n.changeLanguage(lang);
  try { window.localStorage.setItem(STORAGE_KEY, lang); } catch {}
}

export default i18n;
