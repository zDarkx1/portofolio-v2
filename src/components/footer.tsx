import { profile } from "@/lib/data";
import { ContributionGraph } from "@/components/contribution-graph";
import { GlassPanel } from "@/components/glass-surface/GlassPanel";

export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-3xl px-4 pb-16">
      <ContributionGraph />
      <GlassPanel
        borderRadius={16}
        className="mt-12"
        contentClassName="flex flex-col items-start justify-between gap-2 px-5 py-4 text-sm text-muted-foreground sm:flex-row sm:items-center"
      >
        <p>© {profile.fullName}. Built with Next.js &amp; Tailwind.</p>
        <a
          href={`mailto:${profile.email}`}
          className="text-foreground underline-offset-4 hover:underline"
        >
          {profile.email}
        </a>
      </GlassPanel>
    </footer>
  );
}
