"use client";

// Adapted from the Hyperiux Vault component supplied by the portfolio owner.
// Retains its clip-path wipe, staggered reveals, and character hover animation.
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type MouseEvent, type ReactNode, type RefObject } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { gsap } from "@/lib/gsap";

const FOCUSABLE = 'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])';
const CLIPS = {
  bottom: { closed: "inset(100% 0% 0% 0%)", exit: "inset(0% 0% 100% 0%)" },
  top: { closed: "inset(0% 0% 100% 0%)", exit: "inset(100% 0% 0% 0%)" },
  left: { closed: "inset(0% 100% 0% 0%)", exit: "inset(0% 0% 0% 100%)" },
  right: { closed: "inset(0% 0% 0% 100%)", exit: "inset(0% 100% 0% 0%)" },
};

function useFocusTrap(active: boolean, root: RefObject<HTMLElement | null>, onEscape: () => void) {
  const escape = useRef(onEscape);
  useLayoutEffect(() => { escape.current = onEscape; }, [onEscape]);
  useEffect(() => {
    if (!active || !root.current) return;
    const container = root.current;
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const focusable = () => Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((element) =>
      !element.closest("[inert]") && element.getClientRects().length > 0 && getComputedStyle(element).visibility !== "hidden");
    const frame = requestAnimationFrame(() => container.querySelector<HTMLElement>("[data-nav-link]")?.focus({ preventScroll: true }));
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); escape.current(); return; }
      if (event.key !== "Tab") return;
      const items = focusable(), first = items[0], last = items.at(-1);
      if (!first || !last) { event.preventDefault(); return; }
      if (event.shiftKey && (document.activeElement === first || !container.contains(document.activeElement))) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !container.contains(document.activeElement))) {
        event.preventDefault(); first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(frame); document.removeEventListener("keydown", onKeyDown);
      if (previous?.isConnected) previous.focus({ preventScroll: true });
    };
  }, [active, root]);
}

export interface FullscreenNavLink { label: string; href: string }
export interface FullscreenNavProject { title: string; href: string; image: string; alt: string }
export interface FullscreenNavSocial extends FullscreenNavLink { icon: ReactNode }
export interface ImmersiveFullscreenNavProps {
  brand: ReactNode;
  brandLabel: string;
  actions?: ReactNode;
  links: FullscreenNavLink[];
  projects: FullscreenNavProject[];
  socials: FullscreenNavSocial[];
  email: string;
  fullName: string;
  role: string;
  menuLabel: string;
  closeLabel: string;
  navigationLabel: string;
  projectsLabel: string;
  clipOrigin?: keyof typeof CLIPS;
  onNavigate: (href: string) => void;
  onScrollLockChange: (locked: boolean) => void;
}

function NavLinkHover({ label }: { label: string }) {
  return <><span className="sr-only">{label}</span><span className="ifn-link-word" aria-hidden="true">
    {Array.from(label).map((character, index) => <span key={index} style={{ transitionDelay: `${index * .015}s` }}>{character === " " ? "\u00a0" : character}</span>)}
  </span></>;
}

export default function ImmersiveFullscreenNav({ brand, brandLabel, actions, links, projects, socials, email, fullName, role, menuLabel, closeLabel, navigationLabel, projectsLabel, clipOrigin = "top", onNavigate, onScrollLockChange }: ImmersiveFullscreenNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPresent, setIsPresent] = useState(false);
  const root = useRef<HTMLElement>(null);
  const panel = useRef<HTMLElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const animation = useRef<gsap.core.Timeline | null>(null);
  const openIntent = useRef(false);
  const navigationFrame = useRef(0);
  const pendingHref = useRef<string | null>(null);
  const callbacks = useRef({ onNavigate, onScrollLockChange });
  useLayoutEffect(() => { callbacks.current = { onNavigate, onScrollLockChange }; }, [onNavigate, onScrollLockChange]);

  const finishClose = useCallback(() => {
    if (openIntent.current) return;
    setIsPresent(false);
    const href = pendingHref.current;
    pendingHref.current = null;
    if (href) {
      callbacks.current.onScrollLockChange(false);
      navigationFrame.current = requestAnimationFrame(() => callbacks.current.onNavigate(href));
    }
  }, []);
  const close = () => {
    openIntent.current = false;
    setIsOpen(false);
    const timeline = animation.current;
    if (!timeline || timeline.progress() === 0) {
      timeline?.pause(0);
      if (panel.current) gsap.set(panel.current, { autoAlpha: 0 });
      finishClose();
    } else timeline.timeScale(1.35).reverse();
  };
  useFocusTrap(isPresent, root, close);

  useEffect(() => {
    if (!isPresent) return;
    const htmlOverflow = document.documentElement.style.overflow;
    const content = Array.from(document.querySelectorAll<HTMLElement>("body > main, #main, body > footer, .hwf-root"));
    const previousInert = content.map((element) => element.inert);
    document.documentElement.style.overflow = "hidden";
    content.forEach((element) => { element.inert = true; });
    callbacks.current.onScrollLockChange(true);
    return () => {
      document.documentElement.style.overflow = htmlOverflow;
      content.forEach((element, index) => { element.inert = previousInert[index]; });
      callbacks.current.onScrollLockChange(false);
    };
  }, [isPresent]);

  useLayoutEffect(() => {
    if (!panel.current || !card.current) return;
    const element = panel.current;
    const surface = card.current;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const reveal = element.querySelectorAll("[data-nav-reveal]");
    const context = gsap.context(() => {
      gsap.set(element, { autoAlpha: 0 });
      gsap.set(surface, { clipPath: reduced ? "inset(0% 0% 0% 0%)" : CLIPS[clipOrigin].closed, y: reduced ? 0 : -8 });
      gsap.set(reveal, { opacity: reduced ? 1 : 0, y: reduced ? 0 : 14 });
    }, root);
    const timeline = gsap.timeline({ paused: true, onReverseComplete: finishClose });
    animation.current = timeline;
    timeline.to(element, { autoAlpha: 1, duration: reduced ? .1 : .18 }, 0)
      .to(surface, { clipPath: "inset(0% 0% 0% 0%)", y: 0, duration: reduced ? .1 : .48, ease: "power3.inOut" }, 0)
      .to(reveal, { opacity: 1, y: 0, duration: reduced ? 0 : .3, stagger: reduced ? 0 : .018, ease: "power3.out" }, reduced ? 0 : .12);
    if (openIntent.current) timeline.progress(1);
    return () => { cancelAnimationFrame(navigationFrame.current); timeline.kill(); context.revert(); };
  }, [clipOrigin, finishClose]);

  function navigate(event: MouseEvent<HTMLAnchorElement>, href: string) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault(); pendingHref.current = href; close();
  }

  return <><div className="ifn-header-spacer" aria-hidden="true" /><header ref={root} className="site-header immersive-header" data-menu-open={isPresent} role={isPresent ? "dialog" : undefined} aria-modal={isPresent || undefined} aria-label={isPresent ? navigationLabel : undefined}>
    <div className="header-inner immersive-header-inner">
      <Link href="/" aria-label={brandLabel} className="ifn-brand" onClick={isPresent ? (event) => navigate(event, "/") : undefined}>{brand}</Link>
      <div className="ifn-header-actions">{actions}<button type="button" className="ifn-toggle" aria-expanded={isOpen} aria-controls="fullscreen-navigation" onClick={() => {
        if (openIntent.current) close(); else {
          cancelAnimationFrame(navigationFrame.current);
          pendingHref.current = null; openIntent.current = true; setIsPresent(true); setIsOpen(true);
          animation.current?.timeScale(1).play();
        }
      }}>
        <span className="ifn-toggle-label">{isOpen ? closeLabel : menuLabel}</span><span className="ifn-toggle-icon" aria-hidden="true">{isOpen ? <X size={18} /> : <Menu size={18} />}</span>
      </button></div>
    </div>
    <nav ref={panel} id="fullscreen-navigation" className="ifn-panel" data-fullscreen-nav data-lenis-prevent aria-label={navigationLabel} aria-hidden={!isPresent} inert={!isPresent} style={{ visibility: "hidden", opacity: 0 }} onClick={(event) => { if (event.target === event.currentTarget) close(); }}>
      <div ref={card} className="ifn-panel-content">
        <div className="ifn-panel-heading mono" data-nav-reveal><span>{fullName}</span><span>{role}</span></div>
        <div className="ifn-panel-grid">
          <div className="ifn-links">{links.map((link, index) => <div key={link.href} data-nav-reveal>
            <Link href={link.href} data-nav-link className="ifn-link" onClick={(event) => navigate(event, link.href)}>
              <span className="ifn-link-number mono" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><NavLinkHover label={link.label} /><ArrowUpRight aria-hidden="true" />
            </Link>
          </div>)}</div>
          <div className="ifn-projects"><span className="ifn-projects-label mono" data-nav-reveal>{projectsLabel}</span>{projects.slice(0, 2).map((project) => <Link key={project.href} href={project.href} className="ifn-project" data-nav-reveal onClick={(event) => navigate(event, project.href)}>
            <div className="ifn-project-image"><Image src={project.image} alt={project.alt} fill sizes="(max-width: 600px) 40vw, 230px" /></div>
            <span>{project.title}<ArrowUpRight size={15} aria-hidden="true" /></span>
          </Link>)}</div>
        </div>
        <div className="ifn-panel-footer" data-nav-reveal><a href={`mailto:${email}`} className="ifn-email">{email}<ArrowUpRight size={16} /></a><div className="ifn-socials">{socials.map((social) => <a key={social.href} href={social.href} target="_blank" rel="noopener noreferrer">{social.icon}<span>{social.label}</span><ArrowUpRight size={13} /></a>)}</div></div>
      </div>
    </nav>
  </header></>;
}
