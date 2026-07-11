import { ArrowRight } from "lucide-react";

export function PromoBanner() {
  return (
    <div className="w-full border-b bg-muted/50">
      <div className="mx-auto flex max-w-3xl items-center justify-center gap-2 px-4 py-2 text-xs text-muted-foreground sm:text-sm">
        <span>This portfolio template is built with Next.js & Tailwind.</span>
        <a
          href="#"
          className="inline-flex items-center gap-1 font-medium text-foreground underline-offset-4 hover:underline"
        >
          Get Template
          <ArrowRight className="size-3" />
        </a>
      </div>
    </div>
  );
}
