// Experience participation and the UNIKOM role were supplied by the owner.
// Event dates/context are linked to organizer pages. Education is still sample data.
type Copy = { en: string; id: string };

export type ExperienceLogo = {
  src: string;
  darkSrc?: string;
  alt: string;
  variant?: "stacked" | "wide" | "padded" | "wordmark" | "monochrome";
};
export type ExperienceEntry = {
  id: string;
  title: string;
  kind: "competition" | "hackathon" | "community";
  organization: Copy;
  role: Copy;
  period: Copy | null;
  description: Copy;
  topics: Copy[];
  logos: ExperienceLogo[];
  photo?: { src: string; width: number; height: number; alt: Copy };
  source?: string;
  project?: { title: string; href: string };
};

const gdgLogo: ExperienceLogo = { src: "/experience/logos/gdg-bandung-light.png", darkSrc: "/experience/logos/gdg-bandung-dark.png", alt: "Google Developer Group Bandung", variant: "stacked" };
const googleIoEvent = "https://gdg.community.dev/events/details/google-gdg-bandung-presents-get-ready-for-google-io-extended-2026/cohost-gdg-bandung/";

export const experience = {
  isSample: false,
  entries: [
    {
      id: "innoventure-chapter-1",
      title: "Innoventure Chapter I",
      kind: "competition",
      organization: { en: "Universitas Komputer Indonesia (UNIKOM)", id: "Universitas Komputer Indonesia (UNIKOM)" },
      role: { en: "Full-stack Developer", id: "Full-stack Developer" },
      period: null,
      description: {
        en: "Participated in the web development competition as a full-stack developer.",
        id: "Mengikuti lomba web development sebagai full-stack developer.",
      },
      logos: [{ src: "/experience/logos/unikom.png", alt: "UNIKOM" }],
      topics: [
        { en: "Web development competition", id: "Kompetisi pengembangan web" },
        { en: "Full-stack development role", id: "Peran pengembangan full-stack" },
      ],
    },
    {
      id: "gmt-build-week-vol-1",
      title: "Build Week Hackathon · Vol. 1",
      kind: "hackathon",
      organization: { en: "Girl Meets Tech", id: "Girl Meets Tech" },
      role: { en: "Hackathon Participant", id: "Peserta Hackathon" },
      period: { en: "Jul — Aug 2026", id: "Jul — Agu 2026" },
      description: {
        en: "Participated in the first Build Week, a Web3 hackathon focused on DApps on BOT Chain.",
        id: "Mengikuti Build Week edisi pertama, hackathon Web3 dengan fokus DApp di BOT Chain.",
      },
      logos: [{ src: "/experience/logos/gmt.webp", alt: "Girl Meets Tech", variant: "padded" }],
      topics: [
        { en: "Web3 DApps on BOT Chain", id: "DApp Web3 di BOT Chain" },
        { en: "Solidity contracts connected to a web frontend", id: "Smart contract Solidity yang terhubung ke frontend web" },
      ],
      source: "https://www.girlmeetstech.org/guidebook-build-week-hackathon",
    },
    {
      id: "gmt-build-week-vol-2",
      title: "Build Week Hackathon · Vol. 2",
      kind: "hackathon",
      organization: { en: "Girl Meets Tech", id: "Girl Meets Tech" },
      role: { en: "Hackathon Participant", id: "Peserta Hackathon" },
      period: { en: "Sep 2026", id: "Sep 2026" },
      description: {
        en: "Participated in the second Build Week Hackathon, focused on Web3 applications on BOT Chain.",
        id: "Mengikuti Build Week Hackathon edisi kedua untuk pengembangan aplikasi Web3 di BOT Chain.",
      },
      logos: [{ src: "/experience/logos/gmt.webp", alt: "Girl Meets Tech", variant: "padded" }],
      topics: [
        { en: "EVM smart contracts and BOT Chain deployment", id: "Smart contract EVM dan deployment di BOT Chain" },
        { en: "Wallet-connected frontend and DApp demos", id: "Frontend dengan koneksi wallet dan demo DApp" },
        { en: "AI and real-world asset application tracks", id: "Jalur aplikasi AI dan real-world assets" },
      ],
      source: "https://www.girlmeetstech.org/guidebook-build-week-hackathon-vol2",
    },
    {
      id: "google-io-mini-hackathon-2026",
      title: "Google I/O Extended Bandung 2026 · Mini Hackathon",
      kind: "hackathon",
      organization: { en: "GDG Bandung", id: "GDG Bandung" },
      role: { en: "Mini Hackathon Participant", id: "Peserta Mini Hackathon" },
      period: { en: "23 Aug 2026", id: "23 Agu 2026" },
      description: {
        en: "Participated in the mini hackathon held as part of Google I/O Extended Bandung 2026.",
        id: "Mengikuti mini hackathon dalam rangkaian Google I/O Extended Bandung 2026.",
      },
      logos: [gdgLogo],
      topics: [
        { en: "Team-based vibe coding and problem solving", id: "Vibe coding berkelompok dan pemecahan masalah" },
        { en: "AI prototyping with Gemini API, Firebase Genkit or MediaPipe", id: "Prototipe AI dengan Gemini API, Firebase Genkit atau MediaPipe" },
        { en: "Prototype presentations and judging", id: "Presentasi prototipe dan penjurian" },
      ],
      source: googleIoEvent,
    },
    {
      id: "google-io-extended-bandung-2026",
      title: "Google I/O Extended Bandung 2026",
      kind: "community",
      organization: { en: "GDG Bandung", id: "GDG Bandung" },
      role: { en: "Event Participant", id: "Peserta Event" },
      period: { en: "23 Aug 2026", id: "23 Agu 2026" },
      description: {
        en: "Attended the developer community event featuring Google I/O updates and technology talks.",
        id: "Mengikuti event komunitas developer dengan pembaruan Google I/O dan sesi teknologi.",
      },
      logos: [{ src: "/experience/logos/io-extended.png", alt: "Google I/O Extended Bandung", variant: "monochrome" }],
      topics: [
        { en: "Gemini, Gemma and Google Cloud AI updates", id: "Pembaruan Gemini, Gemma dan Google Cloud AI" },
        { en: "Agentic workflows for mobile development", id: "Workflow agentic untuk pengembangan mobile" },
        { en: "Modern web applications and interactive AI", id: "Aplikasi web modern dan AI interaktif" },
        { en: "Collaborative AI prototyping and community networking", id: "Prototipe AI kolaboratif dan jejaring komunitas" },
      ],
      photo: {
        src: "/experience/photos/google-io-extended-bandung-2026.webp",
        width: 1200,
        height: 737,
        alt: {
          en: "Attendees posing together behind a GDG sign at Google I/O Extended Bandung 2026.",
          id: "Foto bersama peserta dengan papan GDG di acara Google I/O Extended Bandung 2026.",
        },
      },
      source: googleIoEvent,
    },
    {
      id: "itechnocup-web-development-2026",
      title: "iTechnocup 2026 · Web Development",
      kind: "competition",
      organization: { en: "Politeknik Negeri Jakarta (PNJ)", id: "Politeknik Negeri Jakarta (PNJ)" },
      role: { en: "Web Development Participant", id: "Peserta Web Development" },
      period: { en: "2026", id: "2026" },
      description: {
        en: "Participated in the Web Development competition organized by Politeknik Negeri Jakarta.",
        id: "Mengikuti lomba Web Development yang diselenggarakan Politeknik Negeri Jakarta.",
      },
      logos: [{ src: "/experience/logos/itechnocup.svg", alt: "iTechnocup", variant: "wordmark" }, { src: "/experience/logos/pnj.png", alt: "Politeknik Negeri Jakarta" }],
      topics: [
        { en: "Web development competition", id: "Kompetisi pengembangan web" },
        { en: "EventTwin: event sustainability simulation", id: "EventTwin: simulasi keberlanjutan acara" },
      ],
      project: { title: "EventTwin", href: "/projects/event-twin" },
    },
    {
      id: "devfest-bandung-2025",
      title: "DevFest Bandung 2025",
      kind: "community",
      organization: { en: "GDG Bandung", id: "GDG Bandung" },
      role: { en: "Event Participant", id: "Peserta Event" },
      period: { en: "29 Nov 2025", id: "29 Nov 2025" },
      description: {
        en: "Attended DevFest Bandung 2025 at Universitas Kristen Maranatha.",
        id: "Mengikuti DevFest Bandung 2025 di Universitas Kristen Maranatha.",
      },
      logos: [gdgLogo],
      topics: [
        { en: "AI/ML and Gemini for applications and developer workflows", id: "AI/ML dan Gemini untuk aplikasi dan workflow developer" },
        { en: "Google Cloud infrastructure for scalable applications", id: "Infrastruktur Google Cloud untuk aplikasi yang skalabel" },
        { en: "Generative AI experiences with Firebase and Genkit", id: "Pengalaman generative AI dengan Firebase dan Genkit" },
        { en: "Web performance and animated CSS interfaces", id: "Performa web dan antarmuka animasi CSS" },
        { en: "Kotlin Multiplatform across mobile, TV and web", id: "Kotlin Multiplatform untuk mobile, TV dan web" },
      ],
      source: "https://gdg.community.dev/events/details/google-gdg-bandung-presents-devfest-bandung-2025-the-biggest-developer-festival-in-indonesia/",
    },
    {
      id: "devfest-bandung-2024",
      title: "DevFest Bandung 2024",
      kind: "community",
      organization: { en: "GDG Bandung", id: "GDG Bandung" },
      role: { en: "Event Participant", id: "Peserta Event" },
      period: { en: "7 Dec 2024", id: "7 Des 2024" },
      description: {
        en: "Attended DevFest Bandung 2024 at Universitas Kristen Maranatha.",
        id: "Mengikuti DevFest Bandung 2024 di Universitas Kristen Maranatha.",
      },
      logos: [gdgLogo],
      topics: [
        { en: "LLM capabilities, limitations and production machine learning", id: "Kemampuan dan batasan LLM serta machine learning di produksi" },
        { en: "Gemini integration with Android and IoT devices", id: "Integrasi Gemini dengan perangkat Android dan IoT" },
        { en: "Real-time voice AI agents", id: "Voice AI agent secara real-time" },
        { en: "Interactive web storytelling with scroll-driven CSS", id: "Storytelling web interaktif dengan CSS berbasis scroll" },
        { en: "UI/UX design from concept to interface", id: "Desain UI/UX dari konsep hingga antarmuka" },
      ],
      source: "https://gdg.community.dev/events/details/google-gdg-bandung-presents-devfest-bandung-2024-1/",
    },
  ] satisfies ExperienceEntry[],
};

export const education = {
  isSample: true,
  entries: [
    {
      institution: { en: "School name", id: "Nama sekolah" } satisfies Copy,
      qualification: { en: "Vocational High School", id: "Sekolah Menengah Kejuruan" } satisfies Copy,
      major: { en: "Software Engineering", id: "Rekayasa Perangkat Lunak" } satisfies Copy,
      period: "2023 — 2026",
      subjects: {
        en: ["Web programming", "Databases", "Software development"],
        id: ["Pemrograman web", "Basis data", "Pengembangan perangkat lunak"],
      },
    },
  ],
};
