"use client";

import { useState } from "react";
import { projects } from "@/lib/data";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/anim/reveal";
import GlassSurface from "@/components/glass-surface/GlassSurface";

const FILTERS = ["All", "Featured", "Open Source", "Personal"] as const;
type Filter = (typeof FILTERS)[number];

export default function ProjectsPage() {
  const [filter, setFilter] = useState<Filter>("All");

  const visible = projects.filter(
    (p) => filter === "All" || p.category === filter,
  );

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Projects &amp; experiments
      </h1>
      <p className="mt-3 max-w-lg text-muted-foreground">
        A selection of tools, products, and experiments I&apos;ve built over the
        years.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const active = filter === f;
          if (active) {
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background"
              >
                {f}
              </button>
            );
          }
          return (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <GlassSurface
                width="auto"
                height="auto"
                borderRadius={9999}
                backgroundOpacity={0.12}
                saturation={1.4}
              >
                <span className="px-3 py-1">{f}</span>
              </GlassSurface>
            </button>
          );
        })}
      </div>

      <Reveal
        key={filter}
        as="div"
        stagger
        className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2"
      >
        {visible.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </Reveal>
    </div>
  );
}
