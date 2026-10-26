import type { Metadata } from "next";
import { FieldNotesIndex } from "@/components/field-note-pages";
export const metadata: Metadata = { title: "Field notes", description: "Notes on creative coding, scroll-driven design, and making things thoughtfully.", alternates: { canonical: "/articles" } };
export default function ArticlesPage() { return <FieldNotesIndex />; }
