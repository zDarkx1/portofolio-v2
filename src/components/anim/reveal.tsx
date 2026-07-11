"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP, EASE, prefersReducedMotion } from "@/lib/gsap";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger direct children instead of the wrapper itself. */
  stagger?: boolean;
  /** Delay before the reveal starts (seconds). */
  delay?: number;
  as?: ElementType;
};

/**
 * Scroll-triggered reveal: fade up 20px with a soft blur-to-clear.
 * Small distance + power3.out = tasteful, not theatrical.
 * Respects prefers-reduced-motion (content simply appears).
 */
export function Reveal({
  children,
  className,
  stagger = false,
  delay = 0,
  as,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const Tag = (as ?? "div") as ElementType;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const targets = stagger
        ? (Array.from(el.children) as HTMLElement[])
        : [el];

      if (prefersReducedMotion()) {
        gsap.set(targets, { autoAlpha: 1, y: 0, filter: "blur(0px)" });
        return;
      }

      gsap.fromTo(
        targets,
        { autoAlpha: 0, y: 20, filter: "blur(8px)" },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.9,
          ease: EASE,
          delay,
          stagger: stagger ? 0.08 : 0,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        },
      );
    },
    { scope: ref },
  );

  return (
    <Tag
      ref={ref}
      className={className}
      {...(stagger ? { "data-reveal-group": "" } : { "data-reveal": "" })}
    >
      {children}
    </Tag>
  );
}
