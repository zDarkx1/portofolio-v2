type Copy = { en: string; id: string };
type Certification = {
  id: string;
  title: string;
  issuer: string;
  date: Copy;
  category: Copy;
  pdf: string;
  preview: string;
  pages: number;
};

// Transcribed from the owner's original PDFs, including visually reviewed artwork.
export const certifications: Certification[] = [
  {
    id: "itech-season-9", title: "ITECH Competition Season 9", issuer: "STMIK LIKMI",
    date: { en: "11 Apr 2026", id: "11 Apr 2026" }, category: { en: "3rd Place", id: "Juara 3" },
    pdf: "/certificates/itech-season-9.pdf", preview: "/certificates/previews/itech-season-9.jpg", pages: 1,
  },
  {
    id: "itech-season-8", title: "ITECH Competition Season 8", issuer: "STMIK LIKMI",
    date: { en: "8 Feb 2025", id: "8 Feb 2025" }, category: { en: "2nd Place", id: "Juara 2" },
    pdf: "/certificates/itech-season-8.pdf", preview: "/certificates/previews/itech-season-8.jpg", pages: 1,
  },
  {
    id: "ibm-skillsbuild", title: "AI dan Kemahiran Masa Depan", issuer: "Junior Achievement | IBM SkillsBuild",
    date: { en: "25 Sep 2026", id: "25 Sep 2026" }, category: { en: "Completion", id: "Penyelesaian" },
    pdf: "/certificates/ibm-skillsbuild.pdf", preview: "/certificates/previews/ibm-skillsbuild.jpg", pages: 1,
  },
  {
    id: "cyber-security-webinar", title: "Getting Started with Industrial Cybersecurity", issuer: "ID-Networkers",
    date: { en: "25 Jul 2025", id: "25 Jul 2025" }, category: { en: "Webinar", id: "Webinar" },
    pdf: "/certificates/cyber-security-webinar.pdf", preview: "/certificates/previews/cyber-security-webinar.jpg", pages: 1,
  },
  {
    id: "itech-training", title: "Training Session ITECH Season 8", issuer: "STMIK LIKMI",
    date: { en: "1 Feb 2025", id: "1 Feb 2025" }, category: { en: "Training", id: "Pelatihan" },
    pdf: "/certificates/itech-training.pdf", preview: "/certificates/previews/itech-training.jpg", pages: 1,
  },
  {
    id: "digital-mindset", title: "Pengantar Mindset Digital 1: Mengubah Masa Depan Anda Dengan Pola Pikir Digital", issuer: "Komdigi · Digital Talent Scholarship",
    date: { en: "22 Jul 2026", id: "22 Jul 2026" }, category: { en: "Training · 2 hours", id: "Pelatihan · 2 JP" },
    pdf: "/certificates/digital-mindset.pdf", preview: "/certificates/previews/digital-mindset.jpg", pages: 2,
  },
];
