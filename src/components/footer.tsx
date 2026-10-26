"use client";
import HalftoneWordmarkFooter from "@/components/ui/halftone-wordmark-footer";
import { useLanguage } from "@/components/language-provider";
import { profile } from "@/lib/data";
import { useGardenMotion } from "@/components/motion-provider";
import { BrandIcon } from "@/components/brand-icon";

export function Footer() {
  const { t } = useLanguage();
  const { scrollToTop } = useGardenMotion();
  return <HalftoneWordmarkFooter wordmark="alrizky." label={profile.role} meta={`© 2026 ${profile.fullName}`} preset="paper" palette={{ background: "var(--footer-bg)", ink: "var(--footer-ink)", warm: "var(--accent)" }} dotGap={5} grain={0.25} height="clamp(430px, 46vw, 650px)" onBackToTop={scrollToTop} backToTopLabel={t("Back to top ↑", "Kembali ke atas ↑")} columns={[
    { title: t("Navigation", "Navigasi"), links: [{ label: t("Projects", "Proyek"), href: "/#work" }, { label: t("Experience", "Pengalaman"), href: "/#experience" }, { label: t("Education", "Pendidikan"), href: "/#education" }] },
    { title: t("Elsewhere", "Temukan saya"), links: [{ label: "GitHub ↗", href: profile.github, icon: <BrandIcon name="GitHub" monochrome size={14} /> }, { label: "LinkedIn ↗", href: profile.linkedin, icon: <BrandIcon name="LinkedIn" monochrome size={14} /> }, { label: "Instagram ↗", href: profile.instagram, icon: <BrandIcon name="Instagram" monochrome size={14} /> }] },
    { title: t("Contact", "Kontak"), links: [{ label: profile.email, href: `mailto:${profile.email}` }] },
  ]} />;
}
