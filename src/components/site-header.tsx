"use client";

import { useRouter } from "next/navigation";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { useLanguage } from "@/components/language-provider";
import { AnimatedThemeToggler } from "@/components/ruixen/animated-theme-toggler";
import ImmersiveFullscreenNav from "@/components/ui/immersive-full-screen-nav";
import { profile, projects } from "@/lib/data";
import { BrandIcon } from "@/components/brand-icon";
import { BrandMark } from "@/components/brand-mark";
import { useGardenMotion } from "@/components/motion-provider";

export function SiteHeader() {
  const { t } = useLanguage();
  const router = useRouter();
  const { scrollToTop, scrollToSection, setScrollLocked } = useGardenMotion();
  function navigate(href: string) {
    const url = new URL(href, location.origin);
    if (url.pathname === location.pathname) {
      if (url.hash && scrollToSection(url.hash)) return;
      if (!url.hash) { scrollToTop(); return; }
    }
    router.push(href);
  }
  return <ImmersiveFullscreenNav
    brand={<><BrandMark className="ifn-brand-mark" /><span className="ifn-brand-name">alrizky.</span></>}
    brandLabel={t("Alrizky — home", "Alrizky — beranda")}
    actions={<><LanguageSwitcher /><AnimatedThemeToggler /></>}
    fullName={profile.fullName} role={profile.role} email={profile.email}
    links={[
      { label: t("About", "Tentang"), href: "/#about" },
      { label: t("Experience", "Pengalaman"), href: "/#experience" },
      { label: t("Education", "Pendidikan"), href: "/#education" },
      { label: t("Projects", "Proyek"), href: "/#work" },
      { label: t("Tech stack", "Teknologi"), href: "/#skills" },
      { label: t("Contact", "Kontak"), href: "/#contact" },
    ]}
    projects={projects.map((project) => ({ title: project.title, href: `/projects/${project.slug}`, image: project.cover, alt: project.coverAlt }))}
    socials={[
      { label: "GitHub", href: profile.github, icon: <BrandIcon name="GitHub" monochrome size={17} /> },
      { label: "LinkedIn", href: profile.linkedin, icon: <BrandIcon name="LinkedIn" monochrome size={17} /> },
      { label: "Instagram", href: profile.instagram, icon: <BrandIcon name="Instagram" monochrome size={17} /> },
    ]}
    menuLabel="Menu" closeLabel={t("Close", "Tutup")} navigationLabel={t("Main navigation", "Navigasi utama")}
    projectsLabel={t("Selected projects", "Proyek pilihan")}
    onNavigate={navigate} onScrollLockChange={setScrollLocked}
  />;
}
