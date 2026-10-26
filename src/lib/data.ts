// Verified identity and project content.
// Editorial copy lives in digital-garden.tsx; bilingual case studies in project-copy.ts.

export const profile = {
  name: "Alrizky",
  fullName: "Alrizky Filardhi Budiman",
  domain: "alrizky.me",
  role: "Full-stack developer",
  tagline: "Full-stack developer who loves building things from idea to launch.",
  email: "me@alrizky.me",
  avatar: "/avatar.jpg",
  github: "https://github.com/zDarkx1",
  linkedin: "https://www.linkedin.com/in/alrizky/",
  instagram: "https://www.instagram.com/richkey.dev/",
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Articles", href: "/articles" },
];

export type Project = {
  slug: string;
  title: string;
  description: string;
  category: "Featured" | "Open Source" | "Personal";
  cover: string;
  coverAlt: string;
  repositoryUrl: string;
  liveUrl: string;
  overview: string;
  highlights: string[];
  technologies: string[];
};

export const projects: Project[] = [
  {
    slug: "pactra",
    title: "Pactra",
    description:
      "Evidence-linked work agreements with reproducible localization checks and human-led acceptance.",
    category: "Featured",
    cover: "/projects/pactra.jpg",
    coverAlt: "Pactra landing page with the headline Good work starts with shared clarity.",
    repositoryUrl: "https://github.com/zDarkx1/Pactra",
    liveUrl: "https://pactra.my.id",
    overview:
      "Pactra helps buyers and workers agree on requirements before a localization job begins. A Next.js workspace connects to a Go backend for reproducible checks, while optional AI review provides evidence-linked suggestions. Acceptance remains a human decision; a successful check is not payment authorization. The project is a development foundation with escrow flows targeting BOT Chain Testnet, not a finished production marketplace.",
    highlights: [
      "Deterministic checks for JSON key parity, nonblank translations, placeholders, and required terms.",
      "Wallet-authenticated workspaces with private tasks, versioned submissions, and buyer review.",
      "Optional advisory AI review and testnet escrow flows, with human acceptance kept separate from checker results.",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Go", "Solidity", "Foundry", "Supabase"],
  },
  {
    slug: "event-twin",
    title: "EventTwin",
    description:
      "A digital twin for sustainable events, simulating waste, energy, cost, and accessibility before the event begins.",
    category: "Featured",
    cover: "/projects/event-twin.jpg",
    coverAlt: "EventTwin dashboard showing event parameters, waste, energy, cost, inclusion, and sustainability scores.",
    repositoryUrl: "https://github.com/zDarkx1/event-twin",
    liveUrl: "https://event-twin.vercel.app",
    overview:
      "Built for ITechno Cup 2026, EventTwin helps event organizers compare planning decisions across waste, energy, cost, and inclusion. Its rule-based simulation runs in the browser and compares changes against a frozen baseline. Coefficients and model assumptions are documented, while optional AI Insight explains the results rather than calculating or changing them.",
    highlights: [
      "Instant what-if simulations across four impact dimensions and an aggregate sustainability score.",
      "Accessibility scoring and recommendations ranked by impact per rupiah.",
      "Side-by-side scenario comparison and shareable URLs without an account or database.",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Radix UI", "Vitest"],
  },
];


export type Article = { slug: string; title: string; excerpt: string; date: string; displayDate: string };
