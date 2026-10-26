import Image from "next/image";
import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { LinkedInIcon } from "@/components/icons";
import { brandIcons } from "@/lib/brand-icons";

const lightInk: Record<string, string> = {
  react: "#087ea4", tailwindcss: "#0786a1", go: "#007d9c",
  supabase: "#228458", gsap: "#25801c", vitest: "#277d46", javascript: "#8a7100",
};
const neutral = new Set(["nextjs", "github", "radixui", "solidity"]);
const normalize = (name: string) => name.toLowerCase().replace(/[^a-z0-9]/g, "").replace(/^html5$/, "html").replace(/^css3$/, "css");

export function BrandIcon({ name, size = 18, monochrome = false, className = "" }: { name: string; size?: number; monochrome?: boolean; className?: string }) {
  const key = normalize(name);
  const icon = brandIcons[key as keyof typeof brandIcons];
  const localImage = key === "lenis" || key === "foundry" ? `/brands/${key}.png` : null;
  if (!icon && !localImage && key !== "linkedin") return null;
  const followsInk = monochrome || neutral.has(key);
  const color = key === "linkedin" ? "#0A66C2" : icon ? `#${icon.hex}` : "currentColor";
  const style = {
    "--brand-size": `${size}px`,
    "--brand-light": followsInk ? "currentColor" : lightInk[key] ?? color,
    "--brand-dark": followsInk ? "currentColor" : key === "linkedin" ? "#70b5f9" : color,
  } as CSSProperties;
  return <span className={`brand-icon ${className}`} style={style} data-brand={key} aria-hidden="true">
    {localImage ? <Image src={localImage} alt="" width={size} height={size} unoptimized className={`brand-image brand-image-${key}`} />
      : key === "linkedin" ? <LinkedInIcon />
      : <svg viewBox="0 0 24 24" fill="currentColor" focusable="false"><path d={icon.path} /></svg>}
  </span>;
}

type LabelProps = HTMLAttributes<HTMLSpanElement> & { name: string; size?: number; monochrome?: boolean; children?: ReactNode };
export function BrandLabel({ name, size = 17, monochrome = false, children, className = "", ...props }: LabelProps) {
  return <span className={`brand-label ${className}`} {...props}><BrandIcon name={name} size={size} monochrome={monochrome} /><span className="brand-label-text">{children ?? name}</span></span>;
}
