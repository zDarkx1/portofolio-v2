"use client";

import { useRef, useState } from "react";
import { Mail } from "lucide-react";
import { gsap, useGSAP, EASE, prefersReducedMotion } from "@/lib/gsap";
import { GooeyButton } from "@/components/anim/gooey-button";
import { Magnetic } from "@/components/anim/magnetic";
import { XIcon, GithubIcon, InstagramIcon } from "@/components/icons";
import { profile } from "@/lib/data";

const socials = [
  { label: "Instagram", href: profile.instagram, Icon: InstagramIcon },
  { label: "GitHub", href: profile.github, Icon: GithubIcon },
  { label: "X", href: profile.twitter, Icon: XIcon },
];

export function HeroIntro() {
  const scope = useRef<HTMLElement>(null);
  const [avatarOk, setAvatarOk] = useState(true);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>("[data-hero]");

      if (prefersReducedMotion()) {
        gsap.set(items, { autoAlpha: 1, y: 0 });
        return;
      }

      // fromTo (not from): the CSS anti-flash rule pins the natural opacity to
      // 0, so a plain .from() would tween 0 -> 0 and never reveal. Pin the end
      // state explicitly.
      const tl = gsap.timeline({ defaults: { ease: EASE } });
      tl.fromTo(
        "[data-hero-avatar]",
        { autoAlpha: 0, scale: 0.8, y: 8 },
        { autoAlpha: 1, scale: 1, y: 0, duration: 0.8 },
      ).fromTo(
        items,
        { autoAlpha: 0, y: 22, filter: "blur(8px)" },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
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
        className="mb-6 size-20 overflow-hidden rounded-full bg-muted"
      >
        {profile.avatar && avatarOk ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={profile.avatar}
            alt={`${profile.name}'s avatar`}
            width={80}
            height={80}
            onError={() => setAvatarOk(false)}
            className="size-full object-cover"
          />
        ) : (
          <div
            className="flex size-full items-center justify-center text-2xl font-semibold text-muted-foreground"
            aria-label={`${profile.name}'s avatar`}
          >
            {profile.name.charAt(0)}
          </div>
        )}
      </div>
      <h1
        data-hero
        className="text-3xl font-bold tracking-tight sm:text-4xl"
      >
        Hi, I&apos;m {profile.fullName}
      </h1>
      <p data-hero className="mt-3 max-w-lg text-muted-foreground">
        {profile.tagline}
      </p>

      <div data-hero className="mt-6 flex flex-wrap items-center gap-3">
        <GooeyButton
          href={`mailto:${profile.email}`}
          ariaLabel={`Email ${profile.name}`}
        >
          <Mail className="size-4" />
          {profile.email}
        </GooeyButton>

        <div className="flex items-center gap-1">
          {socials.map(({ label, href, Icon }) => (
            <Magnetic key={label} strength={0.5}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="inline-flex size-10 items-center justify-center rounded-full border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <Icon className="size-4" />
              </a>
            </Magnetic>
          ))}
        </div>
      </div>
    </section>
  );
}
