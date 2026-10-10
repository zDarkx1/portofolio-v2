import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data";
import { ProjectCover } from "@/components/project-card";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <article>
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to projects
      </Link>

      <ProjectCover
        src={project.cover}
        alt={project.coverAlt}
        className="mt-6 aspect-[16/9] w-full rounded-xl border"
      />

      <div className="mt-6">
        <span className="text-sm text-muted-foreground">{project.category}</span>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">
          {project.title}
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {project.description}
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-80"
        >
          Visit live site <ArrowUpRight className="size-4" aria-hidden="true" />
        </a>
        <a
          href={project.repositoryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
        >
          GitHub repository <ArrowUpRight className="size-4" aria-hidden="true" />
        </a>
      </div>

      <section className="mt-8">
        <h2 className="text-lg font-semibold">Overview</h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">{project.overview}</p>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold">Highlights</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed text-muted-foreground">
          {project.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold">Built with</h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <li key={technology} className="rounded-full border bg-card px-3 py-1 text-sm text-muted-foreground">
              {technology}
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
