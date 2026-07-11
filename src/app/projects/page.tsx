"use client";

import { useState } from "react";
import { projects } from "@/lib/data";
import { ProjectCard } from "@/components/project-card";
import { cn } from "@/lib/utils";

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
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-sm transition-colors",
              filter === f
                ? "border-foreground bg-foreground text-background"
                : "bg-card text-muted-foreground hover:text-foreground",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {visible.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </div>
  );
}
