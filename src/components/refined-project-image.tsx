"use client";

import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "@/components/language-provider";
import RefineFrame from "@/components/react-bits/RefineFrame";

export function RefinedProjectImage({ src, alt, sizes, priority = false, aspectRatio = "16 / 10" }: { src: string; alt: string; sizes: string; priority?: boolean; aspectRatio?: string }) {
  const { t } = useLanguage();
  const [status, setStatus] = useState<"queued" | "complete" | "error">("queued");
  const [attempt, setAttempt] = useState(0);
  return <RefineFrame
    status={status} ariaLabel={alt} width={2000} aspectRatio={aspectRatio} radius={0}
    background="var(--surface-soft)" color="var(--foreground)" className="project-refine"
    stageDuration={130} hideAfter={1700}
    labels={{ queued: t("Loading preview", "Memuat pratinjau"), complete: t("Preview ready", "Pratinjau siap"), error: t("Image unavailable", "Gambar tidak tersedia") }}
    retryLabel={t("Retry", "Coba lagi")}
    onRetry={(event: React.MouseEvent) => { event.preventDefault(); event.stopPropagation(); setStatus("queued"); setAttempt((value) => value + 1); }}
  >
    <Image key={`${src}-${attempt}`} src={src} alt={alt} fill sizes={sizes} priority={priority} onLoad={() => setStatus("complete")} onError={() => setStatus("error")} />
  </RefineFrame>;
}
