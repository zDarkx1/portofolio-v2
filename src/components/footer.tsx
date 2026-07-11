import { profile } from "@/lib/data";
import { ContributionGraph } from "@/components/contribution-graph";

export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-3xl px-4 pb-16">
      <ContributionGraph />
      <div className="mt-12 flex flex-col items-start justify-between gap-2 border-t pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center">
        <p>
          © {profile.fullName}. Built with Next.js & Tailwind.
        </p>
        <a
          href={`mailto:${profile.email}`}
          className="text-foreground underline-offset-4 hover:underline"
        >
          {profile.email}
        </a>
      </div>
    </footer>
  );
}
