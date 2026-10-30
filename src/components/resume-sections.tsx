"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Code2, GraduationCap, Trophy, Users } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { education, experience, type ExperienceLogo } from "@/lib/resume";

function OrganizerLogo({ logo }: { logo: ExperienceLogo }) {
  return <div className={`experience-logo experience-logo-${logo.variant ?? "symbol"}`}>
    <Image src={logo.src} alt={logo.alt} width={160} height={160} sizes="120px" className={logo.darkSrc ? "experience-logo-light" : undefined} />
    {logo.darkSrc && <Image src={logo.darkSrc} alt="" width={160} height={160} sizes="120px" className="experience-logo-dark" aria-hidden="true" />}
  </div>;
}

export function ResumeSections() {
  const { t, language } = useLanguage();
  return <>
    <section className="journey-section resume-section section-space" id="experience" aria-labelledby="experience-heading">
      <div className="container journey-grid">
        <div className="journey-heading">
          <div className="section-label"><span><span className="index-no">[02]</span> {t("EXPERIENCE", "PENGALAMAN")}</span></div>
          <h2 className="reveal" id="experience-heading">{t("Experience.", "Pengalaman.")}</h2>
          <p className="experience-intro">{t("Competitions, hackathons & community.", "Lomba, hackathon & komunitas.")}</p>
          {experience.isSample && <span className="sample-badge">{t("SAMPLE DATA", "DATA CONTOH")}</span>}
        </div>
        <div className="journey-list">
          <div className="journey-track" aria-hidden="true" />
          {experience.entries.map((entry, index) => {
            const Icon = entry.kind === "community" ? Users : entry.kind === "hackathon" ? Code2 : Trophy;
            return <article className="journey-item experience-entry reveal" key={entry.id} data-experience={entry.id}>
              <div className="journey-node" aria-hidden="true"><Icon size={12} /></div>
              <div className="resume-entry-meta mono"><span>{entry.period?.[language] ?? t("WEB DEVELOPMENT", "WEB DEVELOPMENT")}</span><span>{String(index + 1).padStart(2, "0")}</span></div>
              <div className="experience-entry-grid">
                <div className="experience-logos">{entry.logos.map((logo) => <OrganizerLogo key={logo.src} logo={logo} />)}</div>
                <div className="experience-entry-copy">
                  <span className="experience-kind mono">{entry.kind === "community" ? t("COMMUNITY EVENT", "EVENT KOMUNITAS") : entry.kind === "hackathon" ? "HACKATHON" : t("COMPETITION", "KOMPETISI")}</span>
                  <h3>{entry.title}</h3>
                  <span className="resume-organization">{entry.organization[language]}</span>
                  <span className="experience-role">{entry.role[language]}</span>
                  <p>{entry.description[language]}</p>
                  <div className="experience-links">
                    {"source" in entry && entry.source && <a className="text-link" href={entry.source} target="_blank" rel="noopener noreferrer">{t("Event details", "Detail event")}<ArrowUpRight size={14} /></a>}
                    {"project" in entry && entry.project && <Link className="text-link" href={entry.project.href}>{entry.project.title}<ArrowUpRight size={14} /></Link>}
                  </div>
                </div>
              </div>
            </article>;
          })}
        </div>
      </div>
    </section>

    <section className="education-section resume-section container section-space" id="education" aria-labelledby="education-heading">
      <div className="section-label"><span><span className="index-no">[03]</span> {t("EDUCATION", "PENDIDIKAN")}</span></div>
      <div className="education-grid">
        <div className="education-heading reveal">
          <h2 id="education-heading">{t("Education.", "Pendidikan.")}</h2>
          {education.isSample && <span className="sample-badge">{t("SAMPLE DATA", "DATA CONTOH")}</span>}
        </div>
        <div className="education-list">{education.entries.map((entry) => <article className="education-card reveal" key={entry.institution.en}>
          <div className="education-card-top mono"><GraduationCap size={23} aria-hidden="true" /><span>{entry.period}</span></div>
          <h3>{entry.institution[language]}</h3>
          <p className="education-major">{entry.major[language]}</p>
          <p className="education-qualification">{entry.qualification[language]}</p>
          <div className="resume-tags mono">{entry.subjects[language].map((subject) => <span key={subject}>{subject}</span>)}</div>
        </article>)}</div>
      </div>
    </section>
  </>;
}
