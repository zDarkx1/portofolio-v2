"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useLanguage } from "@/components/language-provider";

const MotionContext = createContext<{
  scrollToTop: () => void;
  scrollToSection: (hash: string) => boolean;
  setScrollLocked: (locked: boolean) => void;
}>({
  scrollToTop: () => window.scrollTo({ top: 0, behavior: "smooth" }),
  scrollToSection: () => false,
  setScrollLocked: () => {},
});
export const useGardenMotion = () => useContext(MotionContext);

function scrollToHash(lenis: Lenis | null, hash: string, keyboard = false) {
  let id: string;
  try { id = decodeURIComponent(hash.slice(1)); } catch { return false; }
  const target = document.getElementById(id);
  if (!target) return false;
  if (location.hash !== hash) history.pushState(null, "", hash);
  const header = document.querySelector(".header-inner")?.getBoundingClientRect().height ?? 88;
  const padding = Number.parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
  const focus = () => {
    if (!keyboard) return;
    const hadTabIndex = target.hasAttribute("tabindex");
    if (!hadTabIndex) target.tabIndex = -1;
    target.focus({ preventScroll: true });
    if (!hadTabIndex) target.addEventListener("blur", () => target.removeAttribute("tabindex"), { once: true });
  };
  if (lenis) lenis.scrollTo(target, { offset: padding - header - 18, duration: 1.15, lerp: 0, easing: (t) => 1 - Math.pow(1 - t, 4), onComplete: focus });
  else { target.scrollIntoView(); focus(); }
  return true;
}

export function MotionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { language } = useLanguage();
  const instance = useRef<Lenis | null>(null);
  const previousPath = useRef(pathname);
  const restoringHistory = useRef(false);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: .085,
      smoothWheel: true,
      syncTouch: false,
      autoRaf: false,
      stopInertiaOnNavigate: true,
      respectReducedMotion: true,
      prevent: (node) => Boolean(node.closest("select, input, textarea, [data-lenis-prevent]")),
    });
    instance.current = lenis;
    const update = () => ScrollTrigger.update();
    const tick = (seconds: number) => { if (!document.hidden) lenis.raf(seconds * 1000); };
    lenis.on("scroll", update);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Capture same-page links before Next's router: one scroll animation, one owner.
    const onAnchor = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element).closest<HTMLAnchorElement>("a[href]");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download") || anchor.closest("[data-fullscreen-nav]") || anchor.closest('[data-menu-open="true"]')) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || url.search !== location.search || !url.hash || url.hash === "#main") return;
      if (scrollToHash(lenis, url.hash, event.detail === 0)) event.preventDefault();
    };
    const onVisibility = () => { if (!document.hidden) { lenis.resize(); lenis.scrollTo(window.scrollY, { immediate: true, force: true }); } };
    const onPopState = () => { restoringHistory.current = true; };
    document.addEventListener("click", onAnchor, true);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("popstate", onPopState);
    return () => {
      document.removeEventListener("click", onAnchor, true);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("popstate", onPopState);
      gsap.ticker.remove(tick);
      lenis.off("scroll", update);
      lenis.destroy();
      instance.current = null;
    };
  }, []);

  useEffect(() => {
    const navigated = previousPath.current !== pathname;
    previousPath.current = pathname;
    const restore = restoringHistory.current;
    restoringHistory.current = false;
    const frame = requestAnimationFrame(() => {
      instance.current?.resize();
      if (navigated && !restore) {
        let target: HTMLElement | null = null;
        try { target = location.hash ? document.getElementById(decodeURIComponent(location.hash.slice(1))) : null; } catch { /* Invalid hash: open at the start. */ }
        instance.current?.scrollTo(target ?? 0, { immediate: true, force: true });
      } else instance.current?.scrollTo(window.scrollY, { immediate: true, force: true });
      ScrollTrigger.refresh();
    });
    const zones = document.querySelectorAll<HTMLElement>(".garden-hero, .hero-visual, .ability, .technology-explorer, .portrait-column, .contact-section, .brand");
    const observer = new IntersectionObserver((entries) => entries.forEach(({ target, isIntersecting }) => {
      (target as HTMLElement).dataset.motionVisible = String(isIntersecting);
    }), { rootMargin: "40px" });
    zones.forEach((zone) => observer.observe(zone));
    const onVisibility = () => { document.documentElement.dataset.pageHidden = String(document.hidden); };
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);

    const media = gsap.matchMedia();
    media.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const cleanup: (() => void)[] = [];
      document.querySelectorAll<HTMLElement>(".button-dark, .header-contact, .contact-socials a").forEach((element) => {
        const x = gsap.quickTo(element, "x", { duration: .55, ease: "power3.out" });
        const y = gsap.quickTo(element, "y", { duration: .55, ease: "power3.out" });
        let box = element.getBoundingClientRect();
        const enter = () => { box = element.getBoundingClientRect(); };
        const move = (event: PointerEvent) => { x((event.clientX - box.left - box.width / 2) * .12); y((event.clientY - box.top - box.height / 2) * .15); };
        const leave = () => { x(0); y(0); };
        element.addEventListener("pointerenter", enter); element.addEventListener("pointermove", move); element.addEventListener("pointerleave", leave); element.addEventListener("blur", leave);
        cleanup.push(() => { element.removeEventListener("pointerenter", enter); element.removeEventListener("pointermove", move); element.removeEventListener("pointerleave", leave); element.removeEventListener("blur", leave); });
      });
      return () => cleanup.forEach((dispose) => dispose());
    });
    return () => { cancelAnimationFrame(frame); observer.disconnect(); media.revert(); document.removeEventListener("visibilitychange", onVisibility); };
  }, [pathname, language]);

  function scrollToTop() {
    history.replaceState(null, "", location.pathname + location.search);
    if (instance.current) instance.current.scrollTo(0, { duration: 1.25, lerp: 0, easing: (t) => 1 - Math.pow(1 - t, 4) });
    else window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }
  const setScrollLocked = useCallback((locked: boolean) => {
    if (locked) instance.current?.stop(); else instance.current?.start();
  }, []);
  const scrollToSection = useCallback((hash: string) => scrollToHash(instance.current, hash, true), []);
  return <MotionContext.Provider value={{ scrollToTop, scrollToSection, setScrollLocked }}>{children}</MotionContext.Provider>;
}
