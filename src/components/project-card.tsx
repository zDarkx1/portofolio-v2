import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/data";

export function ProjectCover({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden bg-white ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) calc(100vw - 32px), 736px"
        className="object-contain"
      />
    </div>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block overflow-hidden rounded-xl border bg-card transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
    >
      <ProjectCover
        src={project.cover}
        alt={project.coverAlt}
        className="aspect-[16/9] w-full border-b"
      />
      <div className="p-5">
        <span className="text-xs font-medium text-muted-foreground">{project.category}</span>
        <h3 className="mt-1 text-lg font-semibold text-card-foreground">{project.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>
        <span className="mt-4 inline-block text-sm font-medium">View project &rarr;</span>
      </div>
    </Link>
  );
}
