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
};

export const projects: Project[] = [
  { slug: "echo-ui-v3", title: "Echo UI v3", description: "Component library & design system", category: "Featured", cover: "#e2e8f0" },
  { slug: "justos", title: "JustOS", description: "Productivity OS for Creators", category: "Featured", cover: "#fde68a" },
  { slug: "happy-stats", title: "Happy Stats", description: "Lightweight analytics dashboard", category: "Featured", cover: "#bbf7d0" },
  { slug: "cactus-plant", title: "Cactus Plant", description: "Realtime collaboration framework", category: "Open Source", cover: "#a7f3d0" },
  { slug: "stellar", title: "Stellar", description: "Modern space exploration platform", category: "Personal", cover: "#c7d2fe" },
  { slug: "neobase", title: "Neobase", description: "Next-generation database solution", category: "Open Source", cover: "#fbcfe8" },
  { slug: "charter", title: "Charter", description: "Legal services made accessible", category: "Personal", cover: "#fed7aa" },
  { slug: "echo", title: "Echo", description: "Revolutionary audio platform", category: "Featured", cover: "#ddd6fe" },
  { slug: "plasma", title: "Plasma", description: "Energy management system", category: "Personal", cover: "#fecaca" },
  { slug: "scalar", title: "Scalar", description: "API documentation platform", category: "Open Source", cover: "#bae6fd" },
  { slug: "sonic", title: "Sonic", description: "High-speed data processing", category: "Personal", cover: "#f5d0fe" },
  { slug: "streamline", title: "Streamline", description: "Workflow automation suite", category: "Featured", cover: "#d9f99d" },
  { slug: "relative", title: "Relative", description: "Family tree mapping software", category: "Personal", cover: "#fef08a" },
  { slug: "bloom", title: "Bloom", description: "Sustainable beauty brand", category: "Personal", cover: "#fbcfe8" },
];

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  displayDate: string;
};

export const articles: Article[] = [
  {
    slug: "scaling-a-side-project-to-10k-users",
    title: "Scaling a side project to 10k users",
    excerpt:
      "How a weekend idea grew into a widely used product — lessons about infrastructure, patience, and why “just ship it” only works when you’re ready.",
    date: "2025-11-04",
    displayDate: "Nov 4, 2025",
  },
  {
    slug: "why-i-still-love-writing-vanilla-javascript",
    title: "Why I still love writing vanilla JavaScript",
    excerpt:
      "Despite evolving frameworks, I still love plain JavaScript — code that runs instantly in the browser, no setup, no build step.",
    date: "2025-11-01",
    displayDate: "Nov 1, 2025",
  },
  {
    slug: "thinking-in-components",
    title: "Thinking in components",
    excerpt:
      "Modern interface building is about systems, not pages. A component-based mindset transforms how you design, code, and even debug.",
    date: "2025-10-25",
    displayDate: "Oct 25, 2025",
  },
  {
    slug: "the-cost-of-over-engineering",
    title: "The cost of over-engineering",
    excerpt:
      "A caution against building overly flexible systems — a reminder that clarity often scales better than cleverness.",
    date: "2025-10-20",
    displayDate: "Oct 20, 2025",
  },
];

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
