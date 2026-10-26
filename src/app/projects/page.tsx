import type { Metadata } from "next";
import { ProjectIndex } from "@/components/project-pages";
export const metadata: Metadata = { title: "Selected work", description: "Pactra, EventTwin, and the ideas behind the work of Alrizky Filardhi Budiman.", alternates: { canonical: "/projects" } };
export default function ProjectsPage() { return <ProjectIndex />; }
