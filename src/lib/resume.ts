// Experience participation and the UNIKOM role were supplied by the owner.
// Event dates/context are linked to organizer pages. Education follows the owner's LinkedIn screenshot.
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
  achievement?: Copy;
  period: Copy | null;
  description: Copy;
  topics: Copy[];
  logos: ExperienceLogo[];
  photo?: { src: string; width: number; height: number; alt: Copy; caption?: Copy; href?: string };
  source?: string;
  coverage?: { label: string; href: string }[];
  project?: { title: string; href: string };
};

const gdgLogo: ExperienceLogo = { src: "/experience/logos/gdg-bandung-light.png", darkSrc: "/experience/logos/gdg-bandung-dark.png", alt: "Google Developer Group Bandung", variant: "stacked" };
const googleIoEvent = "https://gdg.community.dev/events/details/google-gdg-bandung-presents-get-ready-for-google-io-extended-2026/cohost-gdg-bandung/";

export const experience = {
  isSample: false,
  entries: [
    {
      id: "itech-competition-season-9",
      title: "ITECH Competition · Season 9",
      kind: "competition",
      organization: { en: "STMIK LIKMI Bandung", id: "STMIK LIKMI Bandung" },
      role: { en: "SMK Negeri 1 Cimahi Team Member", id: "Anggota Tim SMK Negeri 1 Cimahi" },
      achievement: { en: "3rd Place", id: "Juara 3" },
      period: { en: "11 Apr 2026", id: "11 Apr 2026" },
      description: {
        en: "Won third place with the school team in AI Playground: Battle of Creators, presenting an AI-based student consumption tracker.",
        id: "Meraih juara 3 bersama tim sekolah dalam AI Playground: Battle of Creators, dengan solusi AI untuk memantau pola konsumsi siswa.",
      },
      logos: [{ src: "/experience/logos/stmik-likmi.png", alt: "STMIK LIKMI" }],
      topics: [
        { en: "AI solutions for everyday school challenges", id: "Solusi AI untuk permasalahan sehari-hari di sekolah" },
        { en: "Model demonstrations with Teachable Machine", id: "Demonstrasi model dengan Teachable Machine" },
        { en: "Student consumption tracking and healthy habits", id: "Pemantauan pola konsumsi siswa dan kebiasaan hidup sehat" },
        { en: "Team presentations, solution relevance and practical impact", id: "Presentasi tim, relevansi solusi dan dampak praktis" },
      ],
      source: "https://www.smkn1-cmi.sch.id/2026/04/11/siswa-smk-negeri-1-cimahi-raih-prestasi-di-itech-competition-session-9-ai-playground-battle-of-creators/",
      coverage: [
        { label: "E-Kabari", href: "https://www.e-kabari.com/2026/04/itech-season-9-ai-center-bandung-dorong.html" },
        { label: "Trias Politika", href: "https://triaspolitika.id/itech-season-9-ai-center-bandung-dorong-inovator-ai-dari-sekolah/" },
      ],
      photo: {
        src: "/experience/photos/itech-season-9.jpg", width: 720, height: 480,
        alt: { en: "Third-place award presentation at ITECH Competition Season 9.", id: "Penyerahan penghargaan juara 3 ITECH Competition Season 9." },
        caption: { en: "Season 9 award presentation · Trias Politika", id: "Penyerahan penghargaan Season 9 · Trias Politika" },
        href: "https://triaspolitika.id/itech-season-9-ai-center-bandung-dorong-inovator-ai-dari-sekolah/",
      },
    },
    {
      id: "itech-competition-season-8",
      title: "ITECH Competition · Season 8",
      kind: "competition",
      organization: { en: "STMIK LIKMI Bandung", id: "STMIK LIKMI Bandung" },
      role: { en: "Competition Participant", id: "Peserta Kompetisi" },
      achievement: { en: "2nd Place", id: "Juara 2" },
      period: { en: "8 Feb 2025", id: "8 Feb 2025" },
      description: {
        en: "Won second place in the AI competition organized by STMIK LIKMI, with mentoring support from Indigo.",
        id: "Meraih juara 2 dalam kompetisi AI yang diselenggarakan STMIK LIKMI, dengan dukungan mentoring dari Indigo.",
      },
      logos: [{ src: "/experience/logos/stmik-likmi.png", alt: "STMIK LIKMI" }],
      topics: [
        { en: "AI ideas and technology-based business opportunities", id: "Ide AI dan peluang bisnis berbasis teknologi" },
        { en: "Hands-on machine learning with Teachable Machine", id: "Praktik machine learning dengan Teachable Machine" },
        { en: "Computer vision and audio recognition", id: "Computer vision dan pengenalan audio" },
        { en: "Creativity, relevance and implementation potential", id: "Kreativitas, relevansi dan potensi implementasi" },
      ],
      source: "https://bisnis.cilacap.info/ci-71195/kembangkan-potensi-ai-itech-competition-2025-dan-indigo-siap-cetak-talenta-ai-masa-depan",
      coverage: [{ label: "VRITIMES", href: "https://www.vritimes.com/id/articles/b7d3f721-cbcd-11ee-a262-0a58a9feac02/8567dd1b-e9d9-11ef-a070-0a58a9feac02" }],
    },
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
  isSample: false,
  entries: [
    {
      institution: { en: "SMK Negeri 1 Cimahi", id: "SMK Negeri 1 Cimahi" } satisfies Copy,
      logo: { src: "/education/smkn-1-cimahi.png", width: 100, height: 98, alt: "SMK Negeri 1 Cimahi" },
      qualification: { en: "Vocational High School", id: "Sekolah Menengah Kejuruan" } satisfies Copy,
      major: { en: "Computer Software Engineering", id: "Rekayasa Perangkat Lunak" } satisfies Copy,
      period: { en: "Jul 2024 — Dec 2027", id: "Jul 2024 — Des 2027" } satisfies Copy,
      grade: { en: "Grade XII", id: "Kelas XII" } satisfies Copy,
      subjects: {
        en: ["Software Development", "Cybersecurity"],
        id: ["Pengembangan Perangkat Lunak", "Keamanan Siber"],
      },
    },
  ],
};
