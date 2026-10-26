"use client";

import { BriefcaseBusiness, GraduationCap } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { education, experience } from "@/lib/resume";
import { BrandLabel } from "@/components/brand-icon";

export function ResumeSections() {
  const { t, language } = useLanguage();
  return <>
    <section className="journey-section resume-section section-space" id="experience" aria-labelledby="experience-heading">
      <div className="container journey-grid">
        <div className="journey-heading">
          <div className="section-label"><span><span className="index-no">[02]</span> {t("EXPERIENCE", "PENGALAMAN")}</span></div>
          <h2 className="reveal" id="experience-heading">{t("Experience.", "Pengalaman.")}</h2>
          {experience.isSample && <span className="sample-badge">{t("SAMPLE DATA", "DATA CONTOH")}</span>}
        </div>
        <div className="journey-list">
          <div className="journey-track" aria-hidden="true" />
          {experience.entries.map((entry, index) => <article className="journey-item reveal" key={entry.organization.en}>
            <div className="journey-node" aria-hidden="true"><BriefcaseBusiness size={12} /></div>
            <div className="resume-entry-meta mono"><span>{entry.period}</span><span>0{index + 1}</span></div>
            <h3>{entry.role[language]}</h3>
            <span className="resume-organization">{entry.organization[language]}</span>
            <p>{entry.description[language]}</p>
            <div className="resume-tags mono">{entry.tools.map((tool) => <BrandLabel key={tool} name={tool} size={14} />)}</div>
          </article>)}
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
