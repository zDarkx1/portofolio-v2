"use client";

import { createContext, useContext, useEffect, useSyncExternalStore, type ReactNode } from "react";

export type Language = "en" | "id";
const KEY = "alrizky-language";
let fallbackLanguage: Language = "en";
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(KEY, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(KEY, callback);
  };
}
function snapshot(): Language {
  try { const stored = localStorage.getItem(KEY); return stored === "id" ? "id" : stored === "en" ? "en" : fallbackLanguage; }
  catch { return fallbackLanguage; }
}
function serverSnapshot(): Language { return "en"; }
const LanguageContext = createContext<{ language: Language; setLanguage: (language: Language) => void; t: (en: string, id: string) => string }>({ language: "en", setLanguage: () => {}, t: (en) => en });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const language = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  function setLanguage(next: Language) {
    fallbackLanguage = next;
    try { localStorage.setItem(KEY, next); } catch { /* Keep the in-memory preference when storage is unavailable. */ }
    window.dispatchEvent(new Event(KEY));
  }
  useEffect(() => { document.documentElement.lang = language; }, [language]);
  return <LanguageContext.Provider value={{ language, setLanguage, t: (en, id) => language === "id" ? id : en }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() { return useContext(LanguageContext); }
