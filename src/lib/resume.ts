// Placeholder resume data requested by the owner. Replace these entries with
// real details, then set isSample to false for the relevant section.
type Copy = { en: string; id: string };

export const experience = {
  isSample: true,
  entries: [
    {
      organization: { en: "Company name", id: "Nama perusahaan" } satisfies Copy,
      role: { en: "Frontend Developer Intern", id: "Magang Frontend Developer" } satisfies Copy,
      period: "2025 — 2026",
      description: {
        en: "Built responsive web pages and reusable UI components.",
        id: "Mengembangkan halaman web responsif dan komponen UI yang dapat digunakan ulang.",
      } satisfies Copy,
      tools: ["React", "TypeScript", "Tailwind CSS"],
    },
    {
      organization: { en: "Organization / community", id: "Organisasi / komunitas" } satisfies Copy,
      role: { en: "Web Development Team", id: "Tim Pengembangan Web" } satisfies Copy,
      period: "2024 — 2025",
      description: {
        en: "Created an event website and maintained its content.",
        id: "Membuat situs kegiatan dan memperbarui kontennya.",
      } satisfies Copy,
      tools: ["HTML", "CSS", "JavaScript"],
    },
  ],
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
