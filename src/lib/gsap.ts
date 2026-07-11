"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register plugins once, on the client.
gsap.registerPlugin(ScrollTrigger, useGSAP);

// A calm, editorial easing shared across the site — no bounce, no overshoot.
export const EASE = "power3.out";

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export { gsap, ScrollTrigger, useGSAP };
