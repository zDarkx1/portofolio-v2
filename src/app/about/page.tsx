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

function PosterGrid({
  items,
}: {
  items: { title: string; color: string }[];
}) {
  return (
    <Reveal as="div" stagger className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.title}
          className="flex aspect-[3/4] items-end overflow-hidden rounded-xl p-3"
          style={{ background: item.color }}
        >
          <span className="text-sm font-medium text-white/90 drop-shadow">
            {item.title}
          </span>
        </div>
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

      <div
        className="mt-8 flex aspect-[16/9] w-full items-center justify-center rounded-xl bg-muted text-muted-foreground"
        aria-label="Person working on laptop"
      >
        <span className="text-4xl">{"\u{1F468}‍\u{1F4BB}"}</span>
      </div>

      {/* Story */}
      <Section>
        <SectionHeader title="Story" />
        <div className="space-y-4 text-muted-foreground">
          {aboutStory.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
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
            <span
              key={tech}
              className="rounded-full border bg-card px-3 py-1.5 text-sm text-muted-foreground"
            >
              {tech}
            </span>
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
        <Reveal as="div" stagger>
          {latest.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </Reveal>
      </Section>
    </div>
  );
}
