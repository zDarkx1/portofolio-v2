"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import GlassSurface, { type GlassSurfaceProps } from "./GlassSurface";

type GlassPanelProps = {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  borderRadius?: number;
  width?: GlassSurfaceProps["width"];
  height?: GlassSurfaceProps["height"];
} & Partial<Omit<GlassSurfaceProps, "children" | "className">>;

/**
 * Thin, opinionated wrapper around <GlassSurface /> for the common case:
 * a full-width, content-height frosted panel. Inner padding is applied by the
 * caller via `contentClassName` so each surface can size its own content.
 */
export function GlassPanel({
  children,
  className,
  contentClassName,
  borderRadius = 20,
  width = "100%",
  height = "auto",
  backgroundOpacity = 0.1,
  saturation = 1.4,
  ...rest
}: GlassPanelProps) {
  return (
    <GlassSurface
      width={width}
      height={height}
      borderRadius={borderRadius}
      backgroundOpacity={backgroundOpacity}
      saturation={saturation}
      className={cn("w-full", className)}
      {...rest}
    >
      <div className={cn("w-full", contentClassName)}>{children}</div>
    </GlassSurface>
  );
}

/** Small inline pill/badge rendered as a glass surface. */
export function GlassPill({
  children,
  className,
  contentClassName,
}: {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}) {
  return (
    <GlassSurface
      width="auto"
      height="auto"
      borderRadius={9999}
      backgroundOpacity={0.12}
      saturation={1.4}
      className={cn("inline-flex", className)}
    >
      <span
        className={cn(
          "px-2.5 py-1 text-sm text-muted-foreground",
          contentClassName,
        )}
      >
        {children}
      </span>
    </GlassSurface>
  );
}
