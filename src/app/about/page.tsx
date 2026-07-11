import {
  projects,
  articles,
  stack,
  aboutStory,
  favoriteMovies,
  favoriteCars,
} from "@/lib/data";
import { Section, SectionHeader } from "@/components/section";
import { ProjectCard } from "@/components/project-card";
import { ArticleCard } from "@/components/article-card";
import { Reveal } from "@/components/anim/reveal";
import { GlassPanel, GlassPill } from "@/components/glass-surface/GlassPanel";

function PosterGrid({
  items,
}: {
  items: { title: string; color: string }[];
}) {
  return (
    <Reveal as="div" stagger className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {items.map((item) => (
        <GlassPanel
          key={item.title}
          borderRadius={14}
          contentClassName="overflow-hidden rounded-[10px]"
        >
          <div
            className="flex aspect-[3/4] w-full items-end rounded-[8px] p-3"
            style={{ background: item.color }}
          >
            <span className="text-sm font-medium text-white/90 drop-shadow">
              {item.title}
            </span>
          </div>
        </GlassPanel>
      ))}
    </Reveal>
  );
}

export default function AboutPage() {
  const building = projects.slice(0, 2);
  const latest = articles.slice(0, 3);

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">About me</h1>

      <GlassPanel
        borderRadius={16}
        className="mt-8"
        contentClassName="flex aspect-[16/9] items-center justify-center text-muted-foreground"
      >
        <span className="text-4xl" aria-label="Person working on laptop">
          {"\u{1F468}‍\u{1F4BB}"}
        </span>
      </GlassPanel>

      {/* Story */}
      <Section>
        <SectionHeader title="Story" />
        <GlassPanel borderRadius={16} contentClassName="space-y-4 p-5 text-muted-foreground">
          {aboutStory.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </GlassPanel>
      </Section>

      {/* Favorite Movies */}
      <Section>
        <SectionHeader title="Favorite movies" />
        <PosterGrid items={favoriteMovies} />
      </Section>

      {/* Favorite Cars */}
      <Section>
        <SectionHeader title="Favorite cars" />
        <PosterGrid items={favoriteCars} />
      </Section>

      {/* My Stack */}
      <Section>
        <SectionHeader title="My stack" />
        <Reveal as="div" stagger className="flex flex-wrap gap-2">
          {stack.map((tech) => (
            <GlassPill key={tech}>{tech}</GlassPill>
          ))}
        </Reveal>
      </Section>

      {/* Currently Building */}
      <Section>
        <SectionHeader
          title="Currently building"
          action={{ label: "View all", href: "/projects" }}
        />
        <Reveal
          as="div"
          stagger
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {building.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </Reveal>
      </Section>

      {/* Latest Writing */}
      <Section>
        <SectionHeader
          title="Latest writing"
          action={{ label: "Read all", href: "/articles" }}
        />
        <Reveal as="div" stagger className="flex flex-col gap-3">
          {latest.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </Reveal>
      </Section>
    </div>
  );
}
