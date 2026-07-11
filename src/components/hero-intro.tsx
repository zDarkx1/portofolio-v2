"use client";

import { useRef } from "react";
import { Mail } from "lucide-react";
import { gsap, useGSAP, EASE, prefersReducedMotion } from "@/lib/gsap";
import { GooeyButton } from "@/components/anim/gooey-button";
import { profile } from "@/lib/data";

export function HeroIntro() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>("[data-hero]");

      if (prefersReducedMotion()) {
        gsap.set(items, { autoAlpha: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: EASE } });
      tl.from("[data-hero-avatar]", {
        autoAlpha: 0,
        scale: 0.8,
        y: 8,
        duration: 0.8,
      }).from(
        items,
        {
          autoAlpha: 0,
          y: 22,
          filter: "blur(8px)",
          duration: 0.9,
          stagger: 0.09,
        },
        "-=0.45",
      );
    },
    { scope },
  );

  return (
    <section ref={scope} className="flex flex-col items-start">
      <div
        data-hero-avatar
        className="mb-6 flex size-20 items-center justify-center rounded-full bg-muted text-2xl font-semibold text-muted-foreground"
        aria-label={`${profile.name}'s avatar`}
      >
        {profile.name.charAt(0)}
      </div>
      <h1
        data-hero
        className="text-3xl font-bold tracking-tight sm:text-4xl"
      >
        Hi, I&apos;m {profile.name}
      </h1>
      <p data-hero className="mt-3 max-w-lg text-muted-foreground">
        {profile.tagline}
      </p>
      <div data-hero className="mt-5">
        <GooeyButton
          href={`mailto:${profile.email}`}
          ariaLabel={`Email ${profile.name}`}
        >
          <Mail className="size-4" />
          {profile.email}
        </GooeyButton>
      </div>
    </section>
  );
}
