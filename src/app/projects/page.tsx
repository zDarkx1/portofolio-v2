import { EmptyState } from "@/components/empty-state";

export default function ProjectsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Projects &amp; experiments
      </h1>
      <p className="mt-3 max-w-lg text-muted-foreground">
        A selection of tools, products, and experiments I&apos;ve built.
      </p>

      <EmptyState title="No projects yet" description="Work in progress — check back soon." />
    </div>
  );
}
