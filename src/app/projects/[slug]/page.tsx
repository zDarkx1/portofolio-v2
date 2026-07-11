import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
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
        <ArrowLeft className="size-4" />
        Back to projects
      </Link>

      <ProjectCover
        color={project.cover}
        label={project.title}
        className="mt-6 aspect-[16/9] w-full rounded-xl"
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

      <div className="mt-8 space-y-4 text-muted-foreground">
        <p>
          {project.title} is {project.description.toLowerCase()}. This is a
          placeholder case study — replace it with the real story: the problem,
          your approach, the stack, and the outcome.
        </p>
        <p>
          Add screenshots, architecture notes, and links to the live site or
          repository here.
        </p>
      </div>
    </article>
  );
}
