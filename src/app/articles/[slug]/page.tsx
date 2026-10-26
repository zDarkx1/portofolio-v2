import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fieldNotes } from "@/lib/field-notes";
import { FieldNoteDetail } from "@/components/field-note-pages";
export function generateStaticParams() { return fieldNotes.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const note = fieldNotes.find((item) => item.slug === slug);
  return note ? { title: note.title.en, description: note.excerpt.en, alternates: { canonical: `/articles/${slug}` } } : { title: "Note not found" };
}
export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = fieldNotes.find((item) => item.slug === slug);
  if (!note) notFound();
  return <FieldNoteDetail note={note} />;
}
