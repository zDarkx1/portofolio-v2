"use client";

import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useMounted } from "@/hooks/use-mounted";
import { useLanguage } from "@/components/language-provider";
import { cn } from "@/lib/utils";

export function AnimatedThemeToggler({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const { t } = useLanguage();
  const mounted = useMounted();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [busy, setBusy] = useState(false);
  const isDark = resolvedTheme === "dark";
  const label = !mounted ? t("Change color theme", "Ganti tema warna") : isDark ? t("Switch to light mode", "Ganti ke mode terang") : t("Switch to dark mode", "Ganti ke mode gelap");

  async function toggleTheme() {
    if (busy) return;
    const next = isDark ? "light" : "dark";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduce || document.hidden || !buttonRef.current) {
      setTheme(next);
      return;
    }
    const { x, y, width, height } = buttonRef.current.getBoundingClientRect();
    const cx = x + width / 2, cy = y + height / 2;
    const radius = Math.hypot(Math.max(cx, innerWidth - cx), Math.max(cy, innerHeight - cy));
    setBusy(true);
    try {
      const transition = document.startViewTransition(() => { flushSync(() => setTheme(next)); });
      await transition.ready;
      const animation = document.documentElement.animate({ clipPath: [`circle(0px at ${cx}px ${cy}px)`, `circle(${radius}px at ${cx}px ${cy}px)`] }, {
        duration: 720,
        easing: "cubic-bezier(.22,1,.36,1)",
        pseudoElement: "::view-transition-new(root)",
      });
      await animation.finished;
    } catch { setTheme(next); }
    finally { setBusy(false); }
  }

  return <button ref={buttonRef} type="button" data-testid="theme-toggle" className={cn("theme-toggle", className)} onClick={toggleTheme} aria-label={label} title={label} disabled={!mounted || busy} aria-busy={busy || undefined}>
    <span key={mounted ? resolvedTheme : "initial"} className="theme-symbol" aria-hidden="true">{mounted ? isDark ? <Sun size={17} /> : <Moon size={17} /> : <span className="theme-placeholder" />}</span>
  </button>;
}
