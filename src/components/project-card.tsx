import Link from "next/link";
import type { Project } from "@/lib/data";
import { GlassPanel } from "@/components/glass-surface/GlassPanel";

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
      className="group block transition-transform hover:-translate-y-0.5"
    >
      <GlassPanel borderRadius={16} contentClassName="overflow-hidden rounded-[12px]">
        <ProjectCover
          color={project.cover}
          label={project.title}
          className="aspect-[16/10] w-full rounded-[10px]"
        />
        <div className="p-3">
          <h3 className="font-medium text-card-foreground">{project.title}</h3>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {project.description}
          </p>
        </div>
      </GlassPanel>
    </Link>
  );
}
