"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { Magnetic } from "@/components/anim/magnetic";

const BLOBS = 7;

type GooeyButtonProps = {
  href: string;
  children: ReactNode;
  ariaLabel?: string;
};

/**
 * Signature CTA: magnetic pull + a gooey liquid fill on hover.
 * The gooey blobs live in a blurred/filtered layer so they melt together;
 * the label rides above, always crisp, and inverts color as the fill lands.
 */
export function GooeyButton({ href, children, ariaLabel }: GooeyButtonProps) {
  const root = useRef<HTMLAnchorElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el || prefersReducedMotion()) return;

      const blobs = el.querySelectorAll<HTMLElement>("[data-blob]");
      const label = el.querySelector<HTMLElement>("[data-label]");

      // GSAP owns every transform on the blobs to avoid clashing with Tailwind.
      gsap.set(blobs, { xPercent: -50, yPercent: -50, scale: 0 });

      const tl = gsap.timeline({ paused: true });
      tl.to(blobs, {
        scale: 1,
        duration: 0.5,
        ease: "power3.out",
        stagger: { each: 0.035, from: "center" },
      });
      if (label) tl.to(label, { color: "var(--background)", duration: 0.3 }, 0.1);

      const enter = () => tl.play();
      const leave = () => tl.reverse();
      el.addEventListener("pointerenter", enter);
      el.addEventListener("pointerleave", leave);
      return () => {
        el.removeEventListener("pointerenter", enter);
        el.removeEventListener("pointerleave", leave);
      };
    },
    { scope: root },
  );

  return (
    <Magnetic strength={0.4}>
      <a
        ref={root}
        href={href}
        aria-label={ariaLabel}
        className="relative inline-flex items-center gap-2 overflow-hidden rounded-full border px-5 py-2.5 text-sm font-medium"
      >
        {/* Gooey fill layer */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ filter: "url(#goo)" }}
        >
          {Array.from({ length: BLOBS }).map((_, i) => (
            <span
              key={i}
              data-blob
              className="absolute aspect-square h-[180%] rounded-full bg-foreground"
              style={{ left: `${(i / (BLOBS - 1)) * 100}%`, top: "50%" }}
            />
          ))}
        </span>
        {/* Crisp label above the goo */}
        <span
          data-label
          className="relative z-10 inline-flex items-center gap-2 text-foreground"
        >
          {children}
        </span>
      </a>
    </Magnetic>
  );
}
