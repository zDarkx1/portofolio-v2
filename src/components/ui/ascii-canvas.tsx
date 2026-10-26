"use client";

import { useEffect, useRef, useState } from "react";
import NextImage from "next/image";
import { adjustedColor, drawCells, drawPostEffects, inkGarden, sampleCells, type AsciiSettings } from "@/lib/ascii-engine";

type Props = { src?: string; alt: string; settings?: Partial<AsciiSettings>; className?: string; scrollDriven?: boolean };
export function AsciiCanvas({ src = "/ink-garden.webp", alt, settings, className = "", scrollDriven = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null), canvasRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);
  const settingsKey = JSON.stringify(settings ?? {});
  useEffect(() => {
    const canvas = canvasRef.current, root = containerRef.current;
    if (!canvas || !root) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const config: AsciiSettings = { ...inkGarden, ...JSON.parse(settingsKey) };
    const ink = config.ink;
    const syncPalette = () => {
      if (!ink?.startsWith("var(")) return;
      config.ink = getComputedStyle(root).getPropertyValue(ink.slice(4, -1)).trim() || "#8f9e7a";
    };
    syncPalette();
    const source = document.createElement("canvas"), scratch = document.createElement("canvas"), maskLayer = document.createElement("canvas");
    const sourceCtx = source.getContext("2d", { willReadFrequently: true });
    const photo = new Image(), mask = new Image();
    let w = 1, h = 1, frame = 0, last = 0, alive = true, visible = false, samples: ReturnType<typeof sampleCells> = [];
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const draw = (time: number) => {
      frame = 0;
      if (!alive || !visible || document.hidden || !samples.length) return;
      if (time - last < 1000 / 40 && config.animated && !media.matches) { frame = requestAnimationFrame(draw); return; }
      last = time;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, w, h);
      if (config.bgMode === "solid") { ctx.fillStyle = config.background ?? "#f4f1e9"; ctx.fillRect(0, 0, w, h); }
      else if (config.bgMode !== "none") { ctx.save(); ctx.globalAlpha = config.bgOpacity / 100; if (config.bgMode === "blur") ctx.filter = `blur(${config.bgBlur}px)`; ctx.drawImage(source, 0, 0); ctx.restore(); }
      let progress = 0;
      if (scrollDriven && !media.matches) { const bounds = root.getBoundingClientRect(); progress = Math.max(0, Math.min(1, -bounds.top / bounds.height)); }
      drawCells(ctx, samples, config, media.matches ? 0 : time, progress);
      drawPostEffects(ctx, scratch, config, w, h, media.matches ? 0 : time);
      if (config.mask.enabled && config.mask.dataUrl && mask.complete && mask.naturalWidth) {
        maskLayer.width = w; maskLayer.height = h; const m = maskLayer.getContext("2d");
        if (m) { m.drawImage(mask, 0, 0, w, h); m.globalCompositeOperation = config.mask.invert ? "source-out" : "source-in"; m.drawImage(source, 0, 0); ctx.drawImage(maskLayer, 0, 0); }
      }
      if (config.animated && !media.matches) frame = requestAnimationFrame(draw);
    };
    const wake = () => { if (!frame && visible && !document.hidden) frame = requestAnimationFrame(draw); };
    const resize = () => {
      if (!alive || !photo.naturalWidth || !sourceCtx) return;
      const bounds = root.getBoundingClientRect(); w = Math.max(1, Math.round(Math.min(bounds.width, 1000))); h = Math.max(1, Math.round(bounds.height * w / Math.max(1, bounds.width)));
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr); source.width = w; source.height = h;
      const scale = Math.max(w / photo.naturalWidth, h / photo.naturalHeight);
      sourceCtx.drawImage(photo, (w - photo.naturalWidth * scale) / 2, (h - photo.naturalHeight * scale) / 2, photo.naturalWidth * scale, photo.naturalHeight * scale);
      samples = sampleCells(sourceCtx.getImageData(0, 0, w, h), Math.max(2, config.cellSize)).map((sample) => {
        const [r, g, b] = adjustedColor(sample.r, sample.g, sample.b, config);
        return { ...sample, colorStyle: `rgb(${r} ${g} ${b})` };
      });
      wake();
    };
    photo.onload = resize; photo.onerror = () => { if (alive) setFailed(true); }; photo.src = src;
    if (config.mask.enabled && config.mask.dataUrl) { mask.onload = wake; mask.src = config.mask.dataUrl; }
    const resizeObserver = new ResizeObserver(resize); resizeObserver.observe(root);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) wake(); else { cancelAnimationFrame(frame); frame = 0; } }, { rootMargin: "80px" }); observer.observe(root);
    const onVisibility = () => { if (document.hidden) { cancelAnimationFrame(frame); frame = 0; } else wake(); };
    document.addEventListener("visibilitychange", onVisibility); media.addEventListener("change", wake);
    let dark = document.documentElement.classList.contains("dark");
    const themeObserver = new MutationObserver(() => { const next = document.documentElement.classList.contains("dark"); if (next === dark) return; dark = next; syncPalette(); cancelAnimationFrame(frame); frame = 0; last = 0; draw(performance.now()); });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => { alive = false; photo.onload = null; photo.onerror = null; mask.onload = null; cancelAnimationFrame(frame); resizeObserver.disconnect(); observer.disconnect(); themeObserver.disconnect(); document.removeEventListener("visibilitychange", onVisibility); media.removeEventListener("change", wake); };
  }, [src, settingsKey, scrollDriven]);
  return <div className={`ascii-canvas ${className}`} ref={containerRef} role="img" aria-label={alt}>
    <canvas ref={canvasRef} aria-hidden="true" />
    {failed && <span className="ascii-error">{alt}<br /><span aria-hidden="true">. : + * # + : .</span></span>}
    <noscript><NextImage src={src} alt={alt} fill unoptimized /></noscript>
  </div>;
}
