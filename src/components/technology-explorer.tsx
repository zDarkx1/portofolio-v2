"use client";

import { useState } from "react";
import { Code2, Database, Sparkles } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import BranchedMenu from "@/components/react-bits/BranchedMenu";
import { BrandLabel } from "@/components/brand-icon";

const groups = [
  { id: "frontend", title: { en: "Frontend", id: "Frontend" }, ascii: "< / >", tags: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { id: "backend", title: { en: "Backend", id: "Backend" }, ascii: "{ : }", tags: ["Go", "REST APIs", "PostgreSQL", "Supabase"] },
  { id: "motion", title: { en: "Motion & graphics", id: "Animasi & grafis" }, ascii: ".*+", tags: ["GSAP", "Canvas 2D", "ASCII", "Lenis"] },
];

export function TechnologyExplorer() {
  const { t, language } = useLanguage();
  const [selected, setSelected] = useState("frontend");
  const current = groups.find((group) => group.id === selected) ?? groups[0];
  return <div className="technology-explorer reveal">
    <div className="technology-tree">
      <span className="mono tree-path">~/stack</span>
      <BranchedMenu
        items={[
          { label: "Development", children: [{ value: "frontend", label: "Frontend", icon: <Code2 size={16} /> }, { value: "backend", label: "Backend", icon: <Database size={16} /> }] },
          { label: t("Visual", "Visual"), children: [{ value: "motion", label: t("Motion & graphics", "Animasi & grafis"), icon: <Sparkles size={16} /> }] },
        ]}
        defaultOpen={[0, 1]} defaultActive="frontend"
        onSelect={(value: string) => setSelected(value)}
        color="var(--foreground)" accentColor="var(--accent)" lineColor="var(--border)"
        width={270} rowHeight={40} fontSize={13} ariaLabel={t("Technology groups", "Kelompok teknologi")}
      />
    </div>
    <div className="technology-stage" role="region" aria-label={t("Selected technology group", "Kelompok teknologi terpilih")} aria-live="polite">
      <div className="technology-stage-bar mono"><span><i />{current.id}.tsx</span><span>{String(groups.indexOf(current) + 1).padStart(2, "0")} / 03</span></div>
      <div className="technology-stage-content" key={current.id}>
        <div className="technology-symbol" aria-hidden="true">{current.ascii}<span /><span /></div>
        <h3>{current.title[language]}</h3>
        <div className="technology-chips">{current.tags.map((tag, index) => <BrandLabel name={tag} size={23} key={tag} style={{ animationDelay: `${index * .06}s` }} />)}</div>
      </div>
    </div>
  </div>;
}
