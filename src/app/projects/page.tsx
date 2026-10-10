import { EmptyState } from "@/components/empty-state";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/data";

export default function ProjectsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Projects &amp; experiments
      </h1>
      <p className="mt-3 max-w-lg text-muted-foreground">
        A selection of tools, products, and experiments I&apos;ve built.
      </p>

      {projects.length > 0 ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <EmptyState title="No projects yet" description="Work in progress — check back soon." />
      )}
    </div>
  );
}
