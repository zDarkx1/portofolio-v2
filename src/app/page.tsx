import { Mail } from "lucide-react";
import {
  profile,
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

export default function HomePage() {
  const selectedWork = projects.slice(0, 4);
  const latest = articles.slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="flex flex-col items-start">
        <div
          className="mb-6 flex size-20 items-center justify-center rounded-full bg-muted text-2xl font-semibold text-muted-foreground"
          aria-label={`${profile.name}'s avatar`}
        >
          {profile.name.charAt(0)}
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Hi, I&apos;m {profile.name}
        </h1>
        <p className="mt-3 max-w-lg text-muted-foreground">{profile.tagline}</p>
        <a
          href={`mailto:${profile.email}`}
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-foreground underline-offset-4 hover:underline"
        >
          <Mail className="size-4" />
          {profile.email}
        </a>
      </section>

      {/* Selected work */}
      <Section>
        <SectionHeader
          title="Selected work"
          action={{ label: "View all", href: "/projects" }}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {selectedWork.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </Section>

      {/* My stack */}
      <Section>
        <SectionHeader title="My stack" />
        <div className="flex flex-wrap gap-2">
          {stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border bg-card px-3 py-1.5 text-sm text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </Section>

      {/* About */}
      <Section>
        <SectionHeader title="About" />
        <div className="space-y-4 text-muted-foreground">
          {homeBio.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className="mt-6 grid grid-cols-3 gap-3">
          {aboutPhotos.map((photo) => (
            <div
              key={photo.label}
              className="relative flex aspect-square items-end justify-start overflow-hidden rounded-xl"
              style={{ background: photo.color }}
            >
              <span className="m-2 text-2xl">{photo.emoji}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Experience */}
      <Section>
        <SectionHeader title="Experience" />
        <ul className="space-y-1">
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
        </ul>
      </Section>

      {/* Skills */}
      <Section>
        <SectionHeader title="Skills" />
        <ul className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
          {skills.map((skill) => (
            <li
              key={skill}
              className="flex items-start gap-2 text-sm text-muted-foreground"
            >
              <span className="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground" />
              {skill}
            </li>
          ))}
        </ul>
      </Section>

      {/* Latest writing */}
      <Section>
        <SectionHeader
          title="Latest writing"
          action={{ label: "Read all", href: "/articles" }}
        />
        <div>
          {latest.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </Section>
    </div>
  );
}
