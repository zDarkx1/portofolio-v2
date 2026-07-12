import { EmptyState } from "@/components/empty-state";

export default function AboutPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">About me</h1>

      <EmptyState title="Coming soon" description="This page is being written." />
    </div>
  );
}
