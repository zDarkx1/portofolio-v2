import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "lenis/dist/lenis.css";
import "./theme-motion.css";
import "./scene-effects.css";
import "./react-bits-integration.css";
import "./brand-icons.css";
import "./immersive-nav.css";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";
import { LanguageProvider } from "@/components/language-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { MotionProvider } from "@/components/motion-provider";
import { profile } from "@/lib/data";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
export const metadata: Metadata = {
  metadataBase: new URL(`https://${profile.domain}`),
  title: { default: "Alrizky — Full-stack Developer", template: "%s · Alrizky" },
  description: "Portfolio of Alrizky Filardhi Budiman. Web development projects, experience, and education.",
  openGraph: { title: "Alrizky — Full-stack Developer", description: "Web development projects, experience, and education.", type: "website", images: [{ url: "/avatar.jpg", width: 1080, height: 1080, alt: profile.fullName }] },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={`${geist.variable} ${mono.variable}`} suppressHydrationWarning><body><ThemeProvider attribute="class" defaultTheme="system" enableSystem storageKey="alrizky-theme" disableTransitionOnChange><LanguageProvider><MotionProvider><a className="skip-link" href="#main">Skip to content</a><SiteHeader /><main id="main" tabIndex={-1}>{children}</main><Footer /></MotionProvider></LanguageProvider></ThemeProvider></body></html>;
}
