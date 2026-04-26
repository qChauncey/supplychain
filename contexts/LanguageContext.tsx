"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { type Lang, translations, type Translations } from "@/lib/i18n";

interface LanguageContextValue {
  lang: Lang;
  t: Translations;
  toggle: () => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "zh",
  t: translations.zh,
  toggle: () => {},
});

function detectLang(): Lang {
  if (typeof navigator === "undefined") return "zh";
  const stored = localStorage.getItem("sc-lang") as Lang | null;
  if (stored === "zh" || stored === "en") return stored;
  const browser = navigator.language || (navigator.languages?.[0] ?? "zh");
  return browser.toLowerCase().startsWith("zh") ? "zh" : "en";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("zh");

  useEffect(() => {
    setLang(detectLang());
  }, []);

  const toggle = () => {
    setLang((prev) => {
      const next: Lang = prev === "zh" ? "en" : "zh";
      localStorage.setItem("sc-lang", next);
      return next;
    });
  };

  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang], toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
