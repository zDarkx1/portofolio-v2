import type { ComponentType, HTMLAttributes } from "react";
export type GradientASCIIProps = HTMLAttributes<HTMLDivElement> & {
  colors?: string[]; shape?: "horizon" | "pinch" | "rise" | "eclipse";
  characters?: string; cellSize?: number; density?: number; glyphOpacity?: number;
  glow?: number; depthOfField?: number; flicker?: number; softness?: number; scale?: number;
  flow?: number; speed?: number; gradientOpacity?: number; grain?: number; variation?: number;
  mouseInteraction?: boolean; scrambleRadius?: number; clickEffect?: "wave" | "burst" | "none";
  intro?: boolean; lightMode?: boolean; fontFamily?: string; dpr?: number;
};
declare const GradientASCII: ComponentType<GradientASCIIProps>;
export default GradientASCII;
