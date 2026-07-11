"use client";
import { useEffect, useState } from "react";

// From @efferd/use-scroll. Boolean that flips once the page scrolls past a
// threshold, with hysteresis (separate up/down thresholds) to avoid flicker.
export function useScroll(downThreshold: number, upThreshold?: number) {
  const [scrolled, setScrolled] = useState(false);
  const scrollUpThreshold = upThreshold ?? downThreshold / 2;

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled((prev) => {
        if (prev) {
          return y > scrollUpThreshold;
        }
        return y > downThreshold;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [downThreshold, scrollUpThreshold]);

  return scrolled;
}
