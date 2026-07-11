"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  /** How far the element travels toward the cursor (px at the edge). */
  strength?: number;
};

/**
 * Magnetic pointer effect. The element eases toward the cursor while hovered
 * and springs back on leave. Uses gsap.quickTo for cheap, buttery updates.
 */
export function Magnetic({
  children,
  className,
  strength = 0.35,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;

      const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });

      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const relX = e.clientX - (r.left + r.width / 2);
        const relY = e.clientY - (r.top + r.height / 2);
        xTo(relX * strength);
        yTo(relY * strength);
      };
      const onLeave = () => {
        xTo(0);
        yTo(0);
      };

      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
      return () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
      };
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={cnInline(className)}>
      {children}
    </div>
  );
}

// tiny inline join to avoid importing cn in a leaf client file
function cnInline(c?: string) {
  return ["inline-block will-change-transform", c].filter(Boolean).join(" ");
}
