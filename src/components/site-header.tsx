"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { nav, profile } from "@/lib/data";
import { useScroll } from "@/hooks/use-scroll";
import { Portal, PortalBackdrop } from "@/components/portal";
import { AnimatedThemeToggler } from "@/components/ruixen/animated-theme-toggler";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

function MobileNav({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-controls="mobile-menu"
        aria-expanded={open}
        aria-label="Toggle menu"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex size-8 items-center justify-center rounded-lg border border-border/60 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
      >
        {open ? <X className="size-4.5" /> : <Menu className="size-4.5" />}
      </button>

      {open && (
        <Portal className="top-0" id="mobile-menu">
          <PortalBackdrop />
          <div className="size-full p-4 pt-20">
            <nav className="grid gap-1">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-lg px-3 py-3 text-lg transition-colors",
                    isActive(pathname, item.href)
                      ? "bg-accent font-medium text-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </Portal>
      )}
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  // Contract only after a meaningful scroll (hysteresis: expand back below 70px).
  const scrolled = useScroll(160, 70);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 mx-auto w-full max-w-full border-b border-transparent transition-all duration-300 ease-out",
        scrolled &&
          "border-border/60 bg-background/70 shadow-sm backdrop-blur-xl backdrop-saturate-150 sm:top-3 sm:max-w-2xl sm:rounded-2xl sm:border",
      )}
    >
      <nav
        className={cn(
          "mx-auto flex h-14 w-full max-w-3xl items-center justify-between gap-2 px-4 transition-all duration-300 ease-out sm:h-12",
          scrolled && "sm:px-3",
        )}
      >
        <Link
          href="/"
          className="rounded-md px-1 font-semibold tracking-tight text-foreground"
        >
          {profile.domain}
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-1 md:flex">
          <div className="flex items-center gap-0.5">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-sm transition-colors",
                  isActive(pathname, item.href)
                    ? "font-medium text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <AnimatedThemeToggler />
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-1 md:hidden">
          <AnimatedThemeToggler />
          <MobileNav pathname={pathname} />
        </div>
      </nav>
    </header>
  );
}
