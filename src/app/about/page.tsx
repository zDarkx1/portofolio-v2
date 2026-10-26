import type { Metadata } from "next";
import { DigitalGarden } from "@/components/digital-garden";
export const metadata: Metadata = { title: "About", description: "About Alrizky Filardhi Budiman, including experience and education.", alternates: { canonical: "/about" } };

export default function AboutPage() {
  return <DigitalGarden aboutOnly />;
}
