"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, Check, Copy } from "lucide-react";
import { BrandLabel } from "@/components/brand-icon";
import { gsap, useGSAP } from "@/lib/gsap";
import { profile, projects } from "@/lib/data";
import { useLanguage } from "@/components/language-provider";
import { ResumeSections } from "@/components/resume-sections";
import { AsciiCanvas } from "@/components/ui/ascii-canvas";
import { AmbientField } from "@/components/ui/ambient-field";
import { HeroGradient } from "@/components/hero-gradient";
import TiltedCard from "@/components/react-bits/TiltedCard";
import { TechnologyExplorer } from "@/components/technology-explorer";
import { RefinedProjectImage } from "@/components/refined-project-image";

function SectionLabel({ number, children, detail }: { number: string; children: React.ReactNode; detail?: string }) {
  return <div className="section-label"><span><span className="index-no">[{number}]</span> {children}</span>{detail && <span className="label-detail">{detail}</span>}</div>;
}

export function DigitalGarden({ aboutOnly = false }: { aboutOnly?: boolean }) {
  const { t, language } = useLanguage();
  const root = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(".hero-copy > *", { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: .08, ease: "power3.out", clearProps: "transform,opacity" });
      gsap.fromTo(".hero-visual", { opacity: 0 }, { opacity: 1, duration: 1.5, ease: "power2.out", clearProps: "opacity" });
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((element) => {
        if (element.getBoundingClientRect().top < window.innerHeight * .9) { gsap.set(element, { y: 0, opacity: 1 }); return; }
        gsap.fromTo(element, { y: 28, opacity: .12 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 92%", once: true } });
      });
      gsap.to(".hero-art", { y: 75, rotate: 4, ease: "none", scrollTrigger: { trigger: ".garden-hero", start: "top top", end: "bottom top", scrub: .8 } });
      gsap.to(".scroll-ticker-inner", { xPercent: -14, ease: "none", scrollTrigger: { trigger: ".scroll-ticker", start: "top bottom", end: "bottom top", scrub: .75 } });
      gsap.to(".reading-progress", { scaleX: 1, transformOrigin: "left", ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: true } });
      gsap.fromTo(".hero-letter", { yPercent: 115, rotate: 8 }, { yPercent: 0, rotate: 0, duration: 1.1, stagger: .055, delay: .15, ease: "power4.out", clearProps: "transform" });
      gsap.utils.toArray<HTMLElement>(".section-label").forEach((label) => {
        gsap.fromTo(label, { "--line-progress": 0 }, { "--line-progress": 1, duration: 1.3, ease: "power3.inOut", scrollTrigger: { trigger: label, start: "top 88%", once: true } });
      });
      gsap.utils.toArray<HTMLElement>(".about-copy h2, .journey-heading h2, .education-heading h2, .section-heading h2, .contact-grid h2").forEach((heading) => {
        gsap.fromTo(heading, { clipPath: "inset(0 0 100% 0)", y: 24 }, { clipPath: "inset(0 0 0% 0)", y: 0, duration: 1.05, ease: "power3.out", scrollTrigger: { trigger: heading, start: "top 90%", once: true } });
      });
      gsap.utils.toArray<HTMLElement>(".journey-item").forEach((item) => {
        gsap.to(item, { scrollTrigger: { trigger: item, start: "top 68%", end: "bottom 42%", toggleClass: "is-current" } });
      });
      if (!aboutOnly) {
        gsap.utils.toArray<HTMLElement>(".work-card").forEach((card) => {
          gsap.fromTo(card.querySelector(".work-watermark"), { x: -35 }, { x: 35, ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: 1 } });
          gsap.fromTo(card.querySelector(".preview-image img"), { yPercent: 6, scale: 1.13 }, { yPercent: -3, scale: 1.02, ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: .8 } });
          gsap.fromTo(card.querySelector(".work-preview"), { clipPath: "inset(8% 0 8% 0 round 18px)" }, { clipPath: "inset(0% 0 0% 0 round 0px)", ease: "none", scrollTrigger: { trigger: card, start: "top 88%", end: "top 25%", scrub: .65 } });
        });
      }
    });
    media.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.to(".portrait-ascii", { opacity: 0, ease: "none", scrollTrigger: { trigger: ".portrait-frame", start: "top 65%", end: "bottom 50%", scrub: .65 } });
      gsap.to(".journey-track", { scaleY: 1, transformOrigin: "top", ease: "none", scrollTrigger: { trigger: ".journey-list", start: "top 65%", end: "bottom 65%", scrub: .5 } });
    });
    media.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const cleanup: (() => void)[] = [];
      gsap.utils.toArray<HTMLElement>(".ability, .education-card, .work-preview").forEach((card) => {
        const rx = gsap.quickTo(card, "rotationX", { duration: .65, ease: "power3.out" });
        const ry = gsap.quickTo(card, "rotationY", { duration: .65, ease: "power3.out" });
        gsap.set(card, { transformPerspective: 1000 });
        card.dataset.tiltReady = "true";
        let box = card.getBoundingClientRect();
        const enter = () => { box = card.getBoundingClientRect(); card.dataset.hovered = "true"; };
        const move = (event: PointerEvent) => {
          const px = (event.clientX - box.left) / box.width, py = (event.clientY - box.top) / box.height;
          rx((.5 - py) * 7); ry((px - .5) * 9);
          card.style.setProperty("--pointer-x", `${px * 100}%`); card.style.setProperty("--pointer-y", `${py * 100}%`);
        };
        const leave = () => { rx(0); ry(0); delete card.dataset.hovered; };
        card.addEventListener("pointerenter", enter); card.addEventListener("pointermove", move); card.addEventListener("pointerleave", leave);
        cleanup.push(() => { card.removeEventListener("pointerenter", enter); card.removeEventListener("pointermove", move); card.removeEventListener("pointerleave", leave); delete card.dataset.tiltReady; delete card.dataset.hovered; card.style.removeProperty("--pointer-x"); card.style.removeProperty("--pointer-y"); });
      });
      const visual = root.current?.querySelector<HTMLElement>(".hero-visual");
      if (!visual) return () => cleanup.forEach((dispose) => dispose());
      const x = gsap.quickTo(".hero-orbit-scene", "x", { duration: 1.2, ease: "power3.out" });
      const y = gsap.quickTo(".hero-orbit-scene", "y", { duration: 1.2, ease: "power3.out" });
      const move = (event: PointerEvent) => { const box = visual.getBoundingClientRect(); x((event.clientX - box.left - box.width / 2) * .055); y((event.clientY - box.top - box.height / 2) * .045); };
      const leave = () => { x(0); y(0); };
      visual.addEventListener("pointermove", move); visual.addEventListener("pointerleave", leave);
      return () => { cleanup.forEach((dispose) => dispose()); visual.removeEventListener("pointermove", move); visual.removeEventListener("pointerleave", leave); };
    });
    return () => { media.revert(); if (copyTimer.current) clearTimeout(copyTimer.current); };
  }, { scope: root, dependencies: [language, aboutOnly], revertOnUpdate: true });

  async function copyEmail() {
    try { await navigator.clipboard.writeText(profile.email); setCopied(true); setCopyFailed(false); if (copyTimer.current) clearTimeout(copyTimer.current); copyTimer.current = setTimeout(() => setCopied(false), 2500); }
    catch { setCopyFailed(true); }
  }

  return <div className="garden concise-garden" ref={root}>
    <AmbientField />
    <div className="reading-progress" aria-hidden="true" />
    <div className="hero-scene">
      <HeroGradient />
    <section className="garden-hero container" id="top">
      <div className="hero-eyebrow"><span className="status-dot" /> {t("PERSONAL PORTFOLIO", "PORTOFOLIO PERSONAL")}<span className="hero-edition">2026</span></div>
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="mono hero-intro">{t("HELLO, I’M", "HALO, SAYA")}<span className="terminal-caret" aria-hidden="true">_</span></p>
          <h1 aria-label="Alrizky"><span className="hero-name" aria-hidden="true">{Array.from("Alrizky").map((letter, index) => <span className="hero-letter" key={index} style={{ animationDelay: `${index * .065}s` }}>{letter}</span>)}<span className="hero-name-period">.</span></span><span className="hero-asterisk" aria-hidden="true">✳</span></h1>
          <p className="hero-role">Full-stack <em>developer.</em></p>
          <p className="hero-description">{t("Building web applications with ", "Membangun aplikasi web dengan ")}<BrandLabel name="React" size={15} />, <BrandLabel name="Next.js" size={15} />{t(", and ", ", dan ")}<BrandLabel name="Go" size={18} />.</p>
          <div className="hero-ctas"><Link href="/#work" className="button button-dark">{t("View projects", "Lihat proyek")}<ArrowDownRight size={18} /></Link><a href="#experience" className="text-link">{t("Experience", "Pengalaman")}<ArrowRight size={16} /></a></div>
        </div>
        <div className="hero-visual">
          <div className="hero-orbit-scene" aria-hidden="true"><div className="hero-orbit orbit-outer"><i /><i /></div><div className="hero-orbit orbit-inner"><i /></div><div className="hero-axis axis-x" /><div className="hero-axis axis-y" /><span className="orbit-tag tag-ui">{`< UI />`}</span><span className="orbit-tag tag-api">{`{ API }`}</span><span className="orbit-cross">+</span></div>
          <div className="hero-corner tl" /><div className="hero-corner tr" /><div className="hero-corner bl" /><div className="hero-corner br" />
          <div className="ambient-glyphs" aria-hidden="true"><span>+</span><span>[ ]</span><span>*</span><span>0x1</span><span>:</span><span>./</span></div>
          <span className="visual-coordinate mono">FERN / ASCII</span>
          <div className="hero-art-drift"><AsciiCanvas className="hero-art" alt={t("Animated ASCII fern", "Pakis ASCII bergerak")} settings={{ renderMode: "characters", cellSize: 5, ink: "var(--ascii-ink)", contrast: 60, density: 70, animStyle: "wave", grayscale: 100, toneCurve: [{ x: 0, y: 0 }, { x: .022, y: 0 }, { x: .15, y: .68 }, { x: .55, y: 1 }, { x: 1, y: 1 }] }} scrollDriven /></div>
          <div className="visual-caption"><span className="ascii-caption-icon">{`{ * }`}</span><span className="mono">CANVAS 2D</span></div>
        </div>
      </div>
      <div className="hero-bottom"><span className="mono">{profile.fullName.toUpperCase()}</span><a href="#about" className="mono scroll-cue">SCROLL<ArrowDown size={15} /></a><span className="mono hero-year">[ 01 — 06 ]</span></div>
    </section>
    </div>

    <div className="scroll-ticker" aria-hidden="true"><div className="scroll-ticker-inner">{Array.from({ length: 4 }, (_, i) => <span key={i}>{["React", "Next.js", "TypeScript", "Go", "Canvas 2D"].map((brand) => <span className="ticker-brand" key={brand}><BrandLabel name={brand} size={16} /><b>✳</b></span>)}</span>)}</div></div>

    <section className="about-section container section-space" id="about">
      <SectionLabel number="01">{t("ABOUT", "TENTANG")}</SectionLabel>
      <div className="about-grid">
        <div className="portrait-column reveal">
          <TiltedCard className="portrait-tilt" containerHeight="var(--portrait-height,440px)" imageHeight="100%" imageWidth="100%" containerWidth="100%" rotateAmplitude={9} scaleOnHover={1.035} radius={2} floating gyroscope={false} intro={false} showTooltip={false} glare={.38} shadow={.25} displayOverlayContent overlayDepth={32} overlayContent={<span className="portrait-depth-label mono">{profile.name} ↗</span>}>
          <div className="portrait-frame">
            <div className="portrait-scan" aria-hidden="true" />
            <Image src={profile.avatar} alt={profile.fullName} fill sizes="(max-width: 760px) 90vw, 420px" className="portrait-photo" />
            <AsciiCanvas src={profile.avatar} alt={t("ASCII portrait of Alrizky", "Potret ASCII Alrizky")} className="portrait-ascii" settings={{ renderMode: "characters", cellSize: 6, grayscale: 100, ink: "var(--ascii-ink)", invert: true, contrast: 100, animated: false }} />
          </div>
          </TiltedCard>
          <div className="photo-caption mono"><span>ALRIZKY FILARDHI BUDIMAN</span><span>↗</span></div>
        </div>
        <div className="about-copy reveal">
          <h2>{t("About me.", "Tentang saya.")}</h2>
          <p className="about-lead">{profile.fullName}</p>
          <p>{t("Full-stack developer. I build web interfaces, APIs, and interactive applications. My projects include Pactra and EventTwin.", "Full-stack developer. Saya mengembangkan antarmuka web, API, dan aplikasi interaktif. Proyek saya antara lain Pactra dan EventTwin.")}</p>
          <div className="about-resume-links"><a className="text-link" href="#experience">{t("Experience", "Pengalaman")}<ArrowDownRight size={15} /></a><a className="text-link" href="#education">{t("Education", "Pendidikan")}<ArrowDownRight size={15} /></a></div>
          <a className="text-link" href={profile.github} target="_blank" rel="noopener noreferrer"><BrandLabel name="GitHub" monochrome /><ArrowUpRight size={14} /></a>
        </div>
      </div>
    </section>

    <ResumeSections />

    {!aboutOnly && <>
      <section className="work-section section-space" id="work">
        <div className="container">
          <SectionLabel number="04">{t("PROJECTS", "PROYEK")}</SectionLabel>
          <div className="section-heading reveal"><h2>{t("Selected projects.", "Proyek pilihan.")}</h2><Link href="/projects" className="text-link">{t("All projects", "Semua proyek")}<ArrowUpRight size={17} /></Link></div>
          <div className="project-stack">{projects.map((project, i) => <article key={project.slug} className={`work-card work-card-${i}`}>
            <span className="work-watermark" aria-hidden="true">0{i + 1}</span>
            <div className="work-card-top mono"><span>0{i + 1}</span><span>{i === 0 ? "FULL-STACK / WEB3" : "SIMULATION / WEB APP"}</span></div>
            <div className="work-card-grid">
              <div className="work-card-copy">
                <h3>{project.title}<span>↗</span></h3>
                <p>{i === 0 ? t("Work agreements with localization checks and human acceptance.", "Kesepakatan kerja dengan pemeriksaan lokalisasi dan keputusan akhir oleh manusia.") : t("Simulate an event’s waste, energy, costs, and accessibility.", "Simulasi sampah, energi, biaya, dan aksesibilitas sebuah acara.")}</p>
                <div className="project-tags">{project.technologies.slice(0, 4).map((tech) => <BrandLabel key={tech} name={tech} size={15} />)}</div>
                <Link href={`/projects/${project.slug}`} className="button button-outline">{t("Project details", "Detail proyek")}<ArrowUpRight size={17} /></Link>
                <span className="work-note mono">{i === 0 ? t("IN DEVELOPMENT · TESTNET", "DALAM PENGEMBANGAN · TESTNET") : "ITECHNO CUP 2026"}</span>
              </div>
              <Link href={`/projects/${project.slug}`} className="work-preview" aria-label={`${t("View", "Lihat")} ${project.title}`}>
                <div className="browser-chrome"><span /><span /><span /><div>{new URL(project.liveUrl).hostname}</div><ArrowUpRight size={12} /></div>
                <div className="preview-image"><RefinedProjectImage src={project.cover} alt={project.coverAlt} sizes="(max-width: 760px) 90vw, 640px" /></div>
                <div className="preview-bottom mono"><span>{t("PROJECT DETAILS", "DETAIL PROYEK")}</span><ArrowUpRight size={18} /></div>
              </Link>
            </div>
          </article>)}</div>
        </div>
      </section>

      <section className="skills-section container section-space" id="skills">
        <SectionLabel number="05">{t("TECHNOLOGIES", "TEKNOLOGI")}</SectionLabel>
        <div className="section-heading reveal"><h2>{t("Tech stack.", "Teknologi.")}</h2></div>
        <TechnologyExplorer />
      </section>

    </>}

    <section className="contact-section" id="contact">
      <div className="container contact-inner">
        <SectionLabel number="06">{t("CONTACT", "KONTAK")}</SectionLabel>
        <div className="contact-grid">
          <div className="reveal"><span className="contact-ascii" aria-hidden="true">{`( * )`}</span><h2>{t("Get in touch.", "Hubungi saya.")}</h2><p>{t("Email me for project discussions or collaboration.", "Email untuk diskusi proyek atau kolaborasi.")}</p></div>
          <div className="contact-links">
            <a href={`mailto:${profile.email}`} className="email-link">{profile.email}<ArrowUpRight size={30} /></a>
            <div className="contact-copy"><span className="mono" aria-live="polite">{copied ? t("EMAIL COPIED", "EMAIL TERSALIN") : copyFailed ? t("SELECT THE EMAIL ABOVE TO COPY", "PILIH EMAIL DI ATAS UNTUK MENYALIN") : t("COPY EMAIL", "SALIN EMAIL")}</span><button type="button" className="icon-button" onClick={copyEmail} aria-label={t("Copy email address", "Salin alamat email")}>{copied ? <Check size={17} /> : <Copy size={17} />}</button></div>
            <div className="contact-socials"><a href={profile.github} target="_blank" rel="noopener noreferrer"><BrandLabel name="GitHub" monochrome /><ArrowUpRight size={15} /></a><a href={profile.linkedin} target="_blank" rel="noopener noreferrer"><BrandLabel name="LinkedIn" monochrome /><ArrowUpRight size={15} /></a><a href={profile.instagram} target="_blank" rel="noopener noreferrer"><BrandLabel name="Instagram" monochrome /><ArrowUpRight size={15} /></a></div>
          </div>
        </div>
      </div>
    </section>
  </div>;
}
