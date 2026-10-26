"use client";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { fieldNotes, type FieldNote } from "@/lib/field-notes";

export function FieldNotesIndex() {
  const { t, language } = useLanguage();
  return <div className="page-shell"><span className="page-eyebrow">FIELD NOTES / OPEN NOTEBOOK</span><h1>{t("Thinking out loud.", "Berpikir lewat tulisan.")}</h1><p className="page-lead">{t("Small observations from the workbench. Notes on code, motion, and making things a little more thoughtfully.", "Pengamatan kecil dari meja kerja. Catatan tentang kode, gerak, dan proses membuat sesuatu dengan lebih sadar.")}</p><div className="notes-list">{fieldNotes.map((note, i) => <Link key={note.slug} href={`/articles/${note.slug}`} className="note-row"><span className="mono note-number">0{i + 1}</span><div><span className="mono note-category">{note.category[language]}</span><h3>{note.title[language]}</h3></div><span className="mono note-time">{note.minutes} {t("MIN READ", "MENIT BACA")}</span><ArrowUpRight size={22} /></Link>)}</div></div>;
}
export function FieldNoteDetail({ note }: { note: FieldNote }) {
  const { t, language } = useLanguage();
  const next = fieldNotes[(fieldNotes.findIndex((item) => item.slug === note.slug) + 1) % fieldNotes.length];
  return <article className="page-shell"><Link href="/articles" className="detail-back"><ArrowLeft size={15} />{t("Back to field notes", "Kembali ke catatan")}</Link><div className="article-body"><span className="page-eyebrow">{note.category[language]}</span><h1>{note.title[language]}</h1><div className="article-meta"><span>{note.minutes} {t("MIN READ", "MENIT BACA")}</span><span>{t("GARDEN NOTE / 2026", "CATATAN GARDEN / 2026")}</span></div><p className="page-lead">{note.excerpt[language]}</p>{note.sections.map((section) => <section key={section.heading.en}><h2>{section.heading[language]}</h2><p>{section.body[language]}</p></section>)}<div style={{ borderTop: "1px solid var(--border)", paddingTop: 30, marginTop: 55 }}><span className="page-eyebrow">{t("NEXT NOTE", "CATATAN BERIKUTNYA")}</span><p><Link className="text-link" href={`/articles/${next.slug}`}>{next.title[language]}<ArrowUpRight size={16} /></Link></p></div></div></article>;
}
