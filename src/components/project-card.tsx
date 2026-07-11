import Link from "next/link";
import type { Project } from "@/lib/data";

export function ProjectCover({
  color,
  label,
  className = "",
}: {
  color: string;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center overflow-hidden ${className}`}
      style={{
        background: `linear-gradient(135deg, ${color} 0%, ${color}cc 100%)`,
      }}
    >
      <span className="text-lg font-semibold text-black/60 mix-blend-luminosity">
        {label}
      </span>
    </div>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block overflow-hidden rounded-xl border bg-card transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      <ProjectCover
        color={project.cover}
        label={project.title}
        className="aspect-[16/10] w-full"
      />
      <div className="p-4">
        <h3 className="font-medium text-card-foreground">{project.title}</h3>
        <p className="mt-0.5 text-sm text-muted-foreground">
          {project.description}
        </p>
      </div>
    </Link>
  );
}
