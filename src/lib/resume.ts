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
  logos: ExperienceLogo[];
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
      project: { title: "EventTwin", href: "/projects/event-twin" },
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
