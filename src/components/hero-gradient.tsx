"use client";

import { useTheme } from "next-themes";
import GradientASCII from "@/components/react-bits/GradientASCII";

export function HeroGradient() {
  const { resolvedTheme } = useTheme();
  const light = resolvedTheme === "light";
  return <div className="hero-gradient" aria-hidden="true">
    <GradientASCII
      colors={light ? ["#748367", "#a1af86", "#c89772", "#d7dec9"] : ["#263d2a", "#53744c", "#c08b60", "#d3dfb4"]}
      shape="horizon" cellSize={14} density={.72} glyphOpacity={.65}
      gradientOpacity={.3} glow={.18} flow={.7} speed={.65} scale={1.1}
      flicker={.12} grain={.035} lightMode={light} dpr={1.25}
      characters=" .:+*#@" clickEffect="wave" mouseInteraction
    />
  </div>;
}
