"use client";
import { useLanguage } from "@/components/language-provider";

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();
  return <div className="language-switcher" role="group" aria-label={t("Site language", "Bahasa situs")}>
    {(["en", "id"] as const).map((item) => <button key={item} type="button" lang={item} aria-label={item === "en" ? "Read in English" : "Baca dalam Bahasa Indonesia"} aria-pressed={language === item} onClick={() => setLanguage(item)}>{item.toUpperCase()}</button>)}
  </div>;
}
