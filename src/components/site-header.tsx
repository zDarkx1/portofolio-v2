"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { useLanguage } from "@/components/language-provider";
import { AnimatedThemeToggler } from "@/components/ruixen/animated-theme-toggler";
import CardNav from "@/components/react-bits/CardNav";
import { profile } from "@/lib/data";
import { BrandIcon } from "@/components/brand-icon";

const palette = {
  "--cn-panel": "color-mix(in srgb, var(--background) 90%, transparent)",
  "--cn-edge": "var(--border)", "--cn-highlight": "color-mix(in srgb, var(--foreground) 5%, transparent)",
  "--cn-text": "var(--foreground)", "--cn-muted": "var(--quiet)", "--cn-ring": "var(--accent)",
  "--cn-hover": "var(--surface-soft)", "--cn-tile": "var(--surface-soft)",
  "--cn-tile-rim": "inset 0 0 0 1px var(--border)",
  "--cn-cta": "var(--foreground)", "--cn-cta-ink": "var(--background)",
  "--cn-cta-shadow": "none", "--cn-shadow": "0 10px 36px #00000012",
  "--cn-bar": "64px", "--cn-logo": "36px", "--cn-radius": "12px",
} as CSSProperties;

export function SiteHeader() {
  const { t } = useLanguage();
  return <header className="site-header bits-header"><div className="header-inner bits-header-inner">
    <CardNav
      logo={<span className="brand"><span className="brand-mark">a<span>*</span></span><span className="brand-caption">ALRIZKY<br /><span>PORTFOLIO</span></span></span>}
      logoAlt="Alrizky — home" logoHref="/" linkComponent={Link}
      items={[
        { label: t("Profile", "Profil"), links: [{ label: t("About", "Tentang"), href: "/#about" }, { label: t("Experience", "Pengalaman"), href: "/#experience" }, { label: t("Education", "Pendidikan"), href: "/#education" }] },
        { label: t("Projects", "Proyek"), links: [{ label: "Pactra", href: "/projects/pactra" }, { label: "EventTwin", href: "/projects/event-twin" }, { label: t("Tech stack", "Teknologi"), href: "/#skills" }] },
        { label: t("Contact", "Kontak"), links: [{ label: profile.email, href: `mailto:${profile.email}` }, { label: "GitHub", href: profile.github, icon: <BrandIcon name="GitHub" monochrome size={16} /> }, { label: "LinkedIn", href: profile.linkedin, icon: <BrandIcon name="LinkedIn" monochrome size={16} /> }] },
      ]}
      cta={{ label: t("Contact ↗", "Kontak ↗"), href: "/#contact" }}
      actions={<><LanguageSwitcher /><AnimatedThemeToggler /></>}
      menuText={t("Menu", "Menu")} closeText={t("Close", "Tutup")}
      ariaLabel={t("Main navigation", "Navigasi utama")}
      cardEffect="unfold" bounce={.18} stagger={.1} cardHeight={180} maxWidth={1200} style={palette}
    />
  </div></header>;
}
