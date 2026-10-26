"use client";

import { useEffect, useRef } from "react";

// One small canvas for the page atmosphere. No React updates on animation frames.
export function AmbientField() {
  const root = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const layer = root.current, surface = canvas.current;
    if (!layer || !surface) return;
    const ctx = surface.getContext("2d");
    if (!ctx) return;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const glyphs = ["+", "*", ".", ":", "[ ]", "01", "/", "<>" ];
    const pointer = { x: -1000, y: -1000 };
    const ripples: { x: number; y: number; age: number }[] = [];
    let width = 1, height = 1, dpr = 1, frame = 0, last = 0, elapsed = 0, visible = false;
    let ink = "#858e77", accent = "#d26a43", dark = document.documentElement.classList.contains("dark");
    let particles: { x: number; y: number; phase: number; glyph: string }[] = [];
    const palette = () => {
      const style = getComputedStyle(layer);
      ink = style.getPropertyValue("--quiet").trim() || ink;
      accent = style.getPropertyValue("--accent").trim() || accent;
    };
    const wake = () => { if (!frame && visible && !document.hidden) frame = requestAnimationFrame(draw); };
    function draw(now: number) {
      frame = 0;
      if (!visible || document.hidden) return;
      if (!media.matches && now - last < 1000 / 30) { wake(); return; }
      const dt = Math.min((now - last) / 1000, .05);
      last = now;
      if (!media.matches) elapsed += dt;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.clearRect(0, 0, width, height);
      ctx!.lineWidth = .7;
      const scroll = media.matches ? 0 : window.scrollY * .025;
      const positions = particles.map((point, index) => ({
        x: point.x * width + Math.sin(elapsed * .16 + point.phase) * 25,
        y: ((point.y * height + Math.cos(elapsed * .18 + point.phase) * 28 - scroll * (1 + index % 3 * .3)) % (height + 80) + height + 80) % (height + 80) - 40,
      }));
      ctx!.strokeStyle = ink;
      for (let i = 0; i < positions.length; i++) {
        const a = positions[i];
        for (let j = i + 1; j < positions.length; j++) {
          const b = positions[j], distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance > 145) continue;
          ctx!.globalAlpha = (1 - distance / 145) * .22;
          ctx!.beginPath(); ctx!.moveTo(a.x, a.y); ctx!.lineTo(b.x, b.y); ctx!.stroke();
        }
        const near = Math.hypot(a.x - pointer.x, a.y - pointer.y);
        if (near < 180 && !media.matches) {
          ctx!.globalAlpha = (1 - near / 180) * .45;
          ctx!.beginPath(); ctx!.moveTo(a.x, a.y); ctx!.lineTo(pointer.x, pointer.y); ctx!.stroke();
        }
        ctx!.globalAlpha = .22 + (Math.sin(elapsed * .7 + particles[i].phase) + 1) * .1;
        ctx!.fillStyle = i % 7 === 0 ? accent : ink;
        ctx!.font = `${i % 5 === 0 ? 14 : 10}px monospace`;
        ctx!.fillText(particles[i].glyph, a.x, a.y);
      }
      ctx!.strokeStyle = accent;
      for (let i = ripples.length - 1; i >= 0; i--) {
        const ripple = ripples[i]; ripple.age += dt;
        if (ripple.age > 1.2) { ripples.splice(i, 1); continue; }
        ctx!.globalAlpha = (1 - ripple.age / 1.2) * .35;
        ctx!.beginPath(); ctx!.arc(ripple.x, ripple.y, 8 + ripple.age * 130, 0, Math.PI * 2); ctx!.stroke();
      }
      ctx!.globalAlpha = 1;
      if (!media.matches) wake();
    }
    const resize = () => {
      width = window.innerWidth; height = window.innerHeight;
      dpr = Math.min(devicePixelRatio || 1, 1.5);
      surface.width = Math.round(width * dpr); surface.height = Math.round(height * dpr);
      const count = width < 760 ? 20 : 48;
      particles = Array.from({ length: count }, (_, i) => ({
        x: ((i * 73 + 19) % 101) / 100,
        y: ((i * 43 + 7) % 97) / 96,
        phase: i * 2.399,
        glyph: glyphs[i % glyphs.length],
      }));
      wake();
    };
    const move = (event: PointerEvent) => { if (event.pointerType === "mouse") { pointer.x = event.clientX; pointer.y = event.clientY; } };
    const leave = () => { pointer.x = -1000; pointer.y = -1000; };
    const pulse = (event: PointerEvent) => {
      if (media.matches) return;
      ripples.push({ x: event.clientX, y: event.clientY, age: 0 });
      if (ripples.length > 4) ripples.shift();
    };
    const visibility = () => { cancelAnimationFrame(frame); frame = 0; wake(); };
    const motionChange = () => { cancelAnimationFrame(frame); frame = 0; ripples.length = 0; wake(); };
    palette(); resize();
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; layer.dataset.fieldVisible = String(visible); visibility(); });
    observer.observe(layer.parentElement ?? layer);
    const theme = new MutationObserver(() => {
      const next = document.documentElement.classList.contains("dark");
      if (next !== dark) { dark = next; palette(); wake(); }
    });
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    window.addEventListener("resize", resize);
    document.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    document.addEventListener("pointerdown", pulse, { passive: true });
    document.addEventListener("visibilitychange", visibility);
    media.addEventListener("change", motionChange);
    return () => {
      cancelAnimationFrame(frame); observer.disconnect(); theme.disconnect();
      window.removeEventListener("resize", resize); document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave); document.removeEventListener("pointerdown", pulse);
      document.removeEventListener("visibilitychange", visibility); media.removeEventListener("change", motionChange);
    };
  }, []);
  return <div className="ambient-field" ref={root} aria-hidden="true" data-field-visible="false"><div className="scene-aura aura-sage" /><div className="scene-aura aura-warm" /><canvas ref={canvas} /></div>;
}
