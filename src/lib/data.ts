// Placeholder content mirroring the "Echo" template (persona: John).
// Swap these values for your own later — the UI reads everything from here.

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

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  displayDate: string;
};

export const articles: Article[] = [];

export type Experience = {
  company: string;
  role: string;
  period: string;
  href: string;
};

export const experience: Experience[] = [
  { company: "Cactus Plant", role: "Full-stack developer", period: "2024 — Present", href: "#" },
  { company: "Happy Stats", role: "Full-stack developer", period: "2023 — 2024", href: "#" },
  { company: "JustOS", role: "Frontend developer", period: "2021 — 2023", href: "#" },
  { company: "Freelance", role: "Frontend developer", period: "2019 — 2021", href: "#" },
];

export const skills: string[] = [
  "React / Next.js",
  "TypeScript / JavaScript (ES6+)",
  "State management (Zustand, Redux, Context)",
  "Responsive design & accessibility",
  "Motion & interaction (Framer Motion, GSAP)",
  "API integration & data fetching",
  "Node.js / Express / Fastify",
  "RESTful & GraphQL API design",
  "PostgreSQL / Prisma ORM",
  "Authentication & authorization",
  "WebSockets & real-time systems",
];

export const stack: string[] = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "PostgreSQL",
  "Prisma",
  "Tailwind CSS",
  "Redis",
  "Docker",
  "Vercel",
];

export const aboutStory: string[] = [
  "I've spent years coding across the frontend and backend, always focused on building products that balance thoughtful design, solid architecture, and a great user experience.",
  "I care about clarity, simplicity, and craftsmanship. I gravitate toward lightweight, flexible tools that get out of the way and let me ship.",
  "I'm John, a full-stack developer who loves turning ideas into real, working products.",
];

export const homeBio: string[] = [
  "I started coding out of curiosity, building small browser games and landing pages before growing into full products.",
  "These days I work across the stack with TypeScript, React, Next.js, Node, and PostgreSQL — shipping things end to end.",
  "Outside of code you'll find me writing, contributing to open source, and teaching what I've learned.",
];

export const favoriteMovies = [
  { title: "F1", color: "#dc2626" },
  { title: "Home Alone", color: "#16a34a" },
  { title: "Mission Impossible", color: "#0f172a" },
  { title: "Rain Man", color: "#a16207" },
  { title: "Top Gun Maverick", color: "#0369a1" },
  { title: "The Shawshank Redemption", color: "#374151" },
];

export const favoriteCars = [
  { title: "Nissan Skyline GT-R", color: "#1e3a8a" },
  { title: "Honda Civic Type-R", color: "#b91c1c" },
  { title: "Audi R8", color: "#111827" },
  { title: "BMW M5", color: "#1f2937" },
  { title: "Xiaomi SU7", color: "#0891b2" },
  { title: "Mercedes-Benz S-Class", color: "#334155" },
];

export const aboutPhotos = [
  { emoji: "\u{1F468}‍\u{1F4BB}", label: "Coding", color: "#1e293b" },
  { emoji: "\u{1F3D4}️", label: "Golden Gate", color: "#b45309" },
  { emoji: "\u{1F436}", label: "French Bulldog", color: "#a16207" },
];
