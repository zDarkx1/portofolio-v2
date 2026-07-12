import { profile } from "@/lib/data";
import { ContributionGraph } from "@/components/contribution-graph";

export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-3xl px-4 pb-16">
      <ContributionGraph />
      <div className="mt-12 border-t pt-6 text-sm text-muted-foreground">
        <p>© 2026 {profile.domain}</p>
      </div>
    </footer>
  );
}
