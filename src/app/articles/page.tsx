import { EmptyState } from "@/components/empty-state";

export default function ArticlesPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Articles &amp; notes
      </h1>
      <p className="mt-3 max-w-lg text-muted-foreground">
        Thoughts on building software, from concept through launch.
      </p>

      <EmptyState title="No articles yet" description="Writing coming soon." />
    </div>
  );
}
