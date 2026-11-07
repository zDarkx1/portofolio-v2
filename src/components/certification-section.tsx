"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { useLanguage } from "@/components/language-provider";
import { certifications } from "@/lib/certifications";

export function CertificationSection() {
  const { t, language } = useLanguage();
  const rail = useRef<HTMLUListElement>(null);

  function move(direction: number) {
    const list = rail.current;
    const card = list?.firstElementChild;
    if (!list || !card) return;
    const step = card.getBoundingClientRect().width + Number.parseFloat(getComputedStyle(list).columnGap);
    list.scrollBy({ left: direction * step, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  return <section className="certification-section container section-space" id="certifications" aria-labelledby="certifications-heading">
    <div className="section-label"><span><span className="index-no">[04]</span> {t("CERTIFICATIONS", "SERTIFIKASI")}</span><span className="label-detail mono">{String(certifications.length).padStart(2, "0")} / PDF</span></div>
    <div className="section-heading reveal certification-heading">
      <h2 id="certifications-heading">{t("Certifications.", "Sertifikasi.")}</h2>
      <div className="certificate-controls">
        <button type="button" onClick={() => move(-1)} aria-label={t("Previous certificates", "Sertifikat sebelumnya")} aria-controls="certificate-rail"><ArrowLeft size={18} /></button>
        <button type="button" onClick={() => move(1)} aria-label={t("Next certificates", "Sertifikat berikutnya")} aria-controls="certificate-rail"><ArrowRight size={18} /></button>
      </div>
    </div>
    <ul className="certificate-rail" id="certificate-rail" ref={rail} aria-label={t("Certificate collection", "Koleksi sertifikat")}>
      {certifications.map((certificate, index) => <li className="certificate-card" key={certificate.id} data-certificate={certificate.id}>
        <a href={certificate.pdf} target="_blank" rel="noopener noreferrer" className="certificate-preview" aria-label={`${t("Open certificate", "Buka sertifikat")}: ${certificate.title}`}>
          <Image src={certificate.preview} alt={`${t("Certificate preview", "Preview sertifikat")} — ${certificate.title}`} width={1000} height={750} sizes="(max-width: 760px) 80vw, (max-width: 1100px) 45vw, 360px" />
          <span className="certificate-open" aria-hidden="true"><ArrowUpRight size={17} /></span>
        </a>
        <div className="certificate-copy">
          <div className="certificate-meta mono"><span>{certificate.category[language]}</span><span>{String(index + 1).padStart(2, "0")}</span></div>
          <h3>{certificate.title}</h3>
          <p>{certificate.issuer}</p>
          <div className="certificate-bottom"><span className="mono">{certificate.date[language]}</span><a className="text-link" href={certificate.pdf} target="_blank" rel="noopener noreferrer">{t("Open PDF", "Buka PDF")}<ArrowUpRight size={14} /></a></div>
        </div>
      </li>)}
    </ul>
    <p className="certificate-hint mono">{t("Scroll to explore · Select a certificate to view the original PDF", "Geser untuk melihat · Pilih sertifikat untuk membuka PDF asli")}</p>
  </section>;
}
