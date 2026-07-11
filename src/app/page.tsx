import {
  projects,
  articles,
  experience,
  skills,
  stack,
  homeBio,
  aboutPhotos,
} from "@/lib/data";
import { Section, SectionHeader } from "@/components/section";
import { ProjectCard } from "@/components/project-card";
import { ArticleCard } from "@/components/article-card";
import { HeroIntro } from "@/components/hero-intro";
import { Reveal } from "@/components/anim/reveal";

export default function HomePage() {
  const selectedWork = projects.slice(0, 4);
  const latest = articles.slice(0, 3);

  return (
    <div>
      <HeroIntro />

      {/* Selected work */}
      <Section>
        <SectionHeader
          title="Selected work"
          action={{ label: "View all", href: "/projects" }}
        />
        <Reveal
          as="div"
          stagger
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {selectedWork.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </Reveal>
      </Section>

      {/* My stack */}
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

      {/* About */}
      <Section>
        <SectionHeader title="About" />
        <Reveal as="div" stagger className="space-y-4 text-muted-foreground">
          {homeBio.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </Reveal>
        <Reveal as="div" stagger className="mt-6 grid grid-cols-3 gap-3">
          {aboutPhotos.map((photo) => (
            <div
              key={photo.label}
              className="relative flex aspect-square items-end justify-start overflow-hidden rounded-xl"
              style={{ background: photo.color }}
            >
              <span className="m-2 text-2xl">{photo.emoji}</span>
            </div>
          ))}
        </Reveal>
      </Section>

      {/* Experience */}
      <Section>
        <SectionHeader title="Experience" />
        <Reveal as="ul" stagger className="space-y-1">
          {experience.map((job) => (
            <li key={job.company}>
              <a
                href={job.href}
                className="group -mx-3 flex items-center justify-between gap-4 rounded-lg px-3 py-3 transition-colors hover:bg-accent"
              >
                <div>
                  <p className="font-medium text-foreground group-hover:underline group-hover:underline-offset-4">
                    {job.company}
                  </p>
                  <p className="text-sm text-muted-foreground">{job.role}</p>
                </div>
                <span className="shrink-0 text-sm text-muted-foreground">
                  {job.period}
                </span>
              </a>
            </li>
          ))}
        </Reveal>
      </Section>

      {/* Skills */}
      <Section>
        <SectionHeader title="Skills" />
        <Reveal
          as="ul"
          stagger
          className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2"
        >
          {skills.map((skill) => (
            <li
              key={skill}
              className="flex items-start gap-2 text-sm text-muted-foreground"
            >
              <span className="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground" />
              {skill}
            </li>
          ))}
        </Reveal>
      </Section>

      {/* Latest writing */}
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
