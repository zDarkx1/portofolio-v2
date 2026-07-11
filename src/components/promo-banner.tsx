import { ArrowRight } from "lucide-react";
import { GlassPanel } from "@/components/glass-surface/GlassPanel";

export function PromoBanner() {
  return (
    <div className="w-full px-4 pt-3">
      <GlassPanel
        borderRadius={9999}
        className="mx-auto max-w-3xl"
        contentClassName="flex items-center justify-center gap-2 px-4 py-1.5 text-xs text-muted-foreground sm:text-sm"
      >
        <span>This portfolio template is built with Next.js &amp; Tailwind.</span>
        <a
          href="#"
          className="inline-flex items-center gap-1 font-medium text-foreground underline-offset-4 hover:underline"
        >
          Get Template
          <ArrowRight className="size-3" />
        </a>
      </GlassPanel>
    </div>
  );
}
