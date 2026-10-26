// Canvas2D implementation of the supplied Ink Garden recipe. No editor runtime.
export const renderModes = ["characters", "dither", "mosaic", "pixel", "dots", "cross", "diamond", "voxel", "lego", "mixed", "lines", "diagonal", "braille", "disco", "hexdump", "matrix", "rings", "hearts", "stars", "hexagons", "triangles", "bubbles", "hatch", "contour", "halfblocks"] as const;
export type RenderMode = typeof renderModes[number];
type Effect = { enabled: boolean; intensity: number };
export type AsciiSettings = {
  renderMode: RenderMode; bgMode: "none" | "blur" | "solid" | "original"; bgBlur: number; bgOpacity: number;
  cellSize: number; coverage: number; invert: boolean; styleBlend: GlobalCompositeOperation;
  charSet: string; customChars: string; brightness: number; contrast: number; edgeEmphasis: number; density: number;
  toneCurve: { x: number; y: number }[]; tint: string; tintOpacity: number; overlayBlend: GlobalCompositeOperation;
  saturation: number; grayscale: number; blurType: "off" | "gaussian" | "directional" | "radial" | "tilt" | "lens" | "progressive";
  blurAmount: number; blurAngle: number; directionalBothSides: boolean; tiltFocus: number; tiltPosition: number; tiltFeather: number;
  lensFocus: number; blurCenterX: number; blurCenterY: number; progressivePosition: number; progressiveReverse: boolean;
  pfx: Record<"scanLines" | "vignette" | "bloom" | "chromatic" | "filmGrain" | "glitch" | "halftone" | "pixelate" | "filmDust", Effect>;
  animated: boolean; animStyle: "wave" | "pulse" | "shimmer" | "ripple" | "flicker"; animSpeed: Effect; animIntensity: Effect;
  lights: { enabled: boolean; points: { x: number; y: number; radius: number; intensity: number }[] };
  mask: { enabled: boolean; invert: boolean; dataUrl: string | null };
  ink?: string; background?: string;
};
export const inkGarden: AsciiSettings = {
  renderMode: "dither", bgMode: "none", bgBlur: 12, bgOpacity: 90, cellSize: 9, coverage: 100, invert: false,
  styleBlend: "source-over", charSet: "standard", customChars: "", brightness: 0, contrast: 158, edgeEmphasis: 0, density: 20,
  toneCurve: [{ x: 0, y: 0 }, { x: 1, y: 1 }], tint: "#3ca6ff", tintOpacity: 0, overlayBlend: "multiply", saturation: 100, grayscale: 0,
  blurType: "off", blurAmount: 35, blurAngle: 0, directionalBothSides: false, tiltFocus: 35, tiltPosition: 50, tiltFeather: 15,
  lensFocus: 40, blurCenterX: 50, blurCenterY: 50, progressivePosition: 55, progressiveReverse: false,
  pfx: { vignette: { enabled: false, intensity: 38 }, scanLines: { enabled: false, intensity: 40 }, chromatic: { enabled: false, intensity: 15 }, bloom: { enabled: false, intensity: 25 }, filmGrain: { enabled: false, intensity: 30 }, glitch: { enabled: false, intensity: 20 }, pixelate: { enabled: false, intensity: 15 }, halftone: { enabled: false, intensity: 20 }, filmDust: { enabled: false, intensity: 20 } },
  animated: true, animStyle: "pulse", animSpeed: { enabled: true, intensity: 100 }, animIntensity: { enabled: true, intensity: 60 },
  lights: { enabled: false, points: [] }, mask: { enabled: false, invert: false, dataUrl: null, },
};
export function clamp(value: number, low = 0, high = 1) { return Math.min(high, Math.max(low, value)); }
export function luminance(r: number, g: number, b: number) { return (r * .2126 + g * .7152 + b * .0722) / 255; }
export function tone(value: number, points: AsciiSettings["toneCurve"]) {
  if (points.length < 2) return clamp(value);
  const sorted = [...points].sort((a, b) => a.x - b.x);
  for (let i = 1; i < sorted.length; i++) {
    if (value <= sorted[i].x) { const a = sorted[i - 1], b = sorted[i]; return clamp(a.y + (b.y - a.y) * clamp((value - a.x) / (b.x - a.x || 1))); }
  }
  return clamp(sorted.at(-1)!.y);
}
export function adjustedColor(r: number, g: number, b: number, settings: AsciiSettings): [number, number, number] {
  // Like saturation, the recipe's contrast is a percentage: 100 is neutral.
  const factor = Math.max(0, settings.contrast) / 100;
  const values = [r, g, b].map((value) => clamp(factor * (value + settings.brightness * 2.55 - 128) + 128, 0, 255));
  const gray = luminance(values[0], values[1], values[2]) * 255;
  return values.map((value) => {
    const saturated = gray + (value - gray) * settings.saturation / 100;
    return Math.round(clamp(saturated + (gray - saturated) * settings.grayscale / 100, 0, 255));
  }) as [number, number, number];
}
export type Sample = { x: number; y: number; r: number; g: number; b: number; l: number; edge: number; colorStyle?: string };

// Exact average over every pixel in each cell, computed only on image/size changes.
export function sampleCells(image: ImageData, cell: number): Sample[] {
  const { width, height, data } = image;
  const cols = Math.ceil(width / cell), rows = Math.ceil(height / cell);
  const result: Sample[] = [];
  for (let y = 0; y < height; y += cell) for (let x = 0; x < width; x += cell) {
    let r = 0, g = 0, b = 0, n = 0;
    for (let sy = y; sy < Math.min(y + cell, height); sy++) for (let sx = x; sx < Math.min(x + cell, width); sx++) {
      const p = (sy * width + sx) * 4; r += data[p]; g += data[p + 1]; b += data[p + 2]; n++;
    }
    r /= n; g /= n; b /= n;
    result.push({ x, y, r, g, b, l: luminance(r, g, b), edge: 0 });
  }
  result.forEach((item, i) => {
    const col = i % cols, row = Math.floor(i / cols);
    const right = result[row * cols + Math.min(cols - 1, col + 1)];
    const down = result[Math.min(rows - 1, row + 1) * cols + col];
    item.edge = Math.hypot(item.l - right.l, item.l - down.l);
  });
  return result;
}
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const CHARSETS: Record<string, string> = { standard: " .,:;i1tfLCG08@", blocks: " ░▒▓█", binary: " 01", minimal: " .:+*#@", code: " .{}[]/<>01" };
function polygon(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, sides: number, rotate = 0, inner?: number) {
  ctx.beginPath();
  const count = inner ? sides * 2 : sides;
  for (let i = 0; i < count; i++) { const a = i / count * Math.PI * 2 + rotate; const radius = inner && i % 2 ? r * inner : r; const px = x + Math.cos(a) * radius, py = y + Math.sin(a) * radius; if (i) ctx.lineTo(px, py); else ctx.moveTo(px, py); }
  ctx.closePath(); ctx.fill();
}
export function drawCells(ctx: CanvasRenderingContext2D, cells: Sample[], settings: AsciiSettings, time: number, progress = 0) {
  const c = Math.max(2, settings.cellSize), chars = settings.customChars || CHARSETS[settings.charSet] || CHARSETS.standard;
  const speed = settings.animSpeed.enabled ? settings.animSpeed.intensity / 100 : 0;
  const intensity = settings.animated && settings.animIntensity.enabled ? settings.animIntensity.intensity / 100 : 0;
  const clock = time * .001 * speed;
  ctx.textBaseline = "middle"; ctx.textAlign = "center"; ctx.font = `${c * 1.22}px ui-monospace, monospace`;
  ctx.globalCompositeOperation = settings.styleBlend;
  for (let i = 0; i < cells.length; i++) {
    const sample = cells[i], { x, y } = sample;
    if (((i * 37) % 100) >= settings.coverage) continue;
    let l = tone(sample.l, settings.toneCurve);
    l = clamp(l + sample.edge * settings.edgeEmphasis / 100);
    if (settings.invert) l = 1 - l;
    if (l < .022 && settings.renderMode !== "matrix") continue;
    let motion = 0;
    if (settings.animStyle === "wave") motion = Math.sin(x * .014 + clock * 1.7);
    else if (settings.animStyle === "ripple") motion = Math.sin(Math.hypot(x - 260, y - 230) * .035 - clock * 2);
    else if (settings.animStyle === "shimmer") motion = Math.sin(x * .07 + y * .05 + clock * 3);
    else if (settings.animStyle === "flicker") motion = Math.sin(i * 31.7 + Math.floor(clock * 8));
    else motion = Math.sin(clock * 1.6 + y * .008);
    const size = c * clamp(.5 + l * .6 + settings.density / 250, .15, 1.2);
    const dx = x + c / 2 + motion * intensity * c * .18;
    const dy = y + c / 2 + Math.sin(x * .02 + clock) * intensity * .8 + progress * Math.sin(i * 2.1) * 9;
    if (settings.ink) ctx.fillStyle = settings.ink;
    else if (sample.colorStyle) ctx.fillStyle = sample.colorStyle;
    else { const [r, g, b] = adjustedColor(sample.r, sample.g, sample.b, settings); ctx.fillStyle = `rgb(${r} ${g} ${b})`; }
    ctx.strokeStyle = ctx.fillStyle;
    ctx.globalAlpha = clamp((.35 + Math.sqrt(l) * .7) * (1 + motion * intensity * .13)); ctx.lineWidth = Math.max(.6, c * .1);
    const mode = settings.renderMode === "mixed" ? (["characters", "dots", "cross", "lines"] as const)[i % 4] : settings.renderMode;
    if (mode === "characters" || mode === "hexdump" || mode === "braille" || mode === "halfblocks" || mode === "matrix") {
      let glyph = chars[Math.floor(l * (chars.length - 1))];
      if (mode === "hexdump") glyph = "0123456789ABCDEF"[Math.floor(l * 15)];
      if (mode === "braille") glyph = String.fromCharCode(0x2800 + Math.floor(l * 255));
      if (mode === "halfblocks") glyph = l > .7 ? "█" : l > .45 ? "▀" : "▄";
      if (mode === "matrix") { const rain = (clock * 35 + x * 3) % (ctx.canvas.height / (ctx.getTransform().d || 1) + 150); ctx.fillStyle = "#5dad67"; ctx.globalAlpha = clamp(1 - Math.abs(y - rain) / 160) * Math.max(.1, l); glyph = "01アイウエオカキクケコ"[(i + Math.floor(clock * 5)) % 12]; }
      ctx.fillText(glyph, dx, dy);
    } else if (mode === "dither") {
      if (Math.sqrt(l) * (0.8 + settings.density / 100) > BAYER[(Math.floor(y / c) % 4) * 4 + Math.floor(x / c) % 4] / 16) ctx.fillRect(dx - c * .29, dy - c * .29, c * .58, c * .58);
    } else if (mode === "dots" || mode === "rings" || mode === "bubbles" || mode === "disco") {
      if (mode === "disco") ctx.fillStyle = `hsl(${(i * 17 + clock * 30) % 360} 70% 60%)`;
      ctx.beginPath(); ctx.arc(dx, dy, size * (mode === "bubbles" ? .65 : .37), 0, Math.PI * 2);
      if (mode === "rings" || mode === "bubbles") ctx.stroke(); else ctx.fill();
    } else if (mode === "diamond") polygon(ctx, dx, dy, size * .55, 4);
    else if (mode === "hexagons") polygon(ctx, dx + (Math.floor(y / c) % 2) * c * .2, dy, size * .52, 6);
    else if (mode === "stars") polygon(ctx, dx, dy, size * .55, 5, -Math.PI / 2, .42);
    else if (mode === "triangles") polygon(ctx, dx, dy, size * .65, 3, i % 2 ? Math.PI / 2 : -Math.PI / 2);
    else if (mode === "hearts") { ctx.font = `${size}px serif`; ctx.fillText("♥", dx, dy); }
    else if (mode === "cross" || mode === "lines" || mode === "diagonal" || mode === "hatch" || mode === "contour") {
      if (mode === "contour" && sample.edge < .04 && Math.floor(l * 12) % 3 !== 0) continue;
      ctx.beginPath();
      if (mode === "cross") { ctx.moveTo(dx - size / 2, dy); ctx.lineTo(dx + size / 2, dy); ctx.moveTo(dx, dy - size / 2); ctx.lineTo(dx, dy + size / 2); }
      else if (mode === "lines" || mode === "contour") { ctx.moveTo(dx - size / 2, dy); ctx.lineTo(dx + size / 2, dy + sample.edge * c * 2); }
      else { ctx.moveTo(dx - size / 2, dy + size / 2); ctx.lineTo(dx + size / 2, dy - size / 2); if (mode === "hatch" && l > .35) { ctx.moveTo(dx - size / 2, dy - size / 2); ctx.lineTo(dx + size / 2, dy + size / 2); } }
      ctx.stroke();
    } else {
      const s = mode === "pixel" ? c : size;
      ctx.fillRect(dx - s / 2, dy - s / 2, s, s);
      if (mode === "lego") { ctx.fillStyle = "#ffffff66"; ctx.beginPath(); ctx.arc(dx, dy, c * .19, 0, Math.PI * 2); ctx.fill(); }
      if (mode === "voxel") { ctx.fillStyle = "#00000044"; ctx.fillRect(dx, dy - s / 2, s / 2, s); }
    }
  }
  ctx.globalAlpha = 1; ctx.globalCompositeOperation = "source-over";
}

export function drawPostEffects(ctx: CanvasRenderingContext2D, scratch: HTMLCanvasElement, settings: AsciiSettings, w: number, h: number, time: number) {
  const fx = settings.pfx;
  if (settings.tintOpacity > 0) { ctx.globalCompositeOperation = settings.overlayBlend; ctx.globalAlpha = clamp(settings.tintOpacity / 100); ctx.fillStyle = settings.tint; ctx.fillRect(0, 0, w, h); ctx.globalAlpha = 1; ctx.globalCompositeOperation = "source-over"; }
  if (settings.blurType !== "off" && settings.blurAmount > 0) {
    const amount = settings.blurAmount / 12;
    scratch.width = ctx.canvas.width; scratch.height = ctx.canvas.height;
    const s = scratch.getContext("2d"); s?.drawImage(ctx.canvas, 0, 0);
    if (settings.blurType === "directional" || settings.blurType === "radial") {
      ctx.globalAlpha = .15;
      for (let i = settings.directionalBothSides ? -3 : 0; i <= 3; i++) { const angle = settings.blurAngle * Math.PI / 180; ctx.drawImage(scratch, Math.cos(angle) * amount * i, Math.sin(angle) * amount * i, w, h); }
    } else {
      ctx.save();
      if (settings.blurType === "tilt") { const y = settings.tiltPosition / 100 * h, band = settings.tiltFocus / 100 * h; ctx.beginPath(); ctx.rect(0, 0, w, Math.max(0, y - band / 2)); ctx.rect(0, y + band / 2, w, h); ctx.clip(); }
      if (settings.blurType === "lens") { ctx.beginPath(); ctx.rect(0, 0, w, h); ctx.arc(settings.blurCenterX / 100 * w, settings.blurCenterY / 100 * h, settings.lensFocus / 100 * Math.min(w, h), 0, Math.PI * 2, true); ctx.clip("evenodd"); }
      if (settings.blurType === "progressive") { const y = settings.progressivePosition / 100 * h; ctx.beginPath(); ctx.rect(0, settings.progressiveReverse ? 0 : y, w, settings.progressiveReverse ? y : h - y); ctx.clip(); }
      ctx.filter = `blur(${amount}px)`; ctx.drawImage(scratch, 0, 0, w, h); ctx.restore();
    }
    ctx.globalAlpha = 1; ctx.filter = "none";
  }
  if (fx.pixelate.enabled) { const scale = Math.max(.04, 1 - fx.pixelate.intensity / 105); scratch.width = Math.ceil(w * scale); scratch.height = Math.ceil(h * scale); const s = scratch.getContext("2d"); s?.drawImage(ctx.canvas, 0, 0, scratch.width, scratch.height); ctx.imageSmoothingEnabled = false; ctx.drawImage(scratch, 0, 0, w, h); ctx.imageSmoothingEnabled = true; }
  if (fx.bloom.enabled || fx.chromatic.enabled || fx.glitch.enabled) {
    scratch.width = ctx.canvas.width; scratch.height = ctx.canvas.height; const s = scratch.getContext("2d"); s?.drawImage(ctx.canvas, 0, 0);
    if (fx.bloom.enabled) { ctx.save(); ctx.filter = `blur(${fx.bloom.intensity / 5}px)`; ctx.globalCompositeOperation = "screen"; ctx.globalAlpha = fx.bloom.intensity / 160; ctx.drawImage(scratch, 0, 0, w, h); ctx.restore(); }
    if (fx.chromatic.enabled) { ctx.globalAlpha = fx.chromatic.intensity / 250; ctx.globalCompositeOperation = "screen"; ctx.drawImage(scratch, fx.chromatic.intensity / 12, 0, w, h); ctx.drawImage(scratch, -fx.chromatic.intensity / 12, 0, w, h); ctx.globalAlpha = 1; ctx.globalCompositeOperation = "source-over"; }
    if (fx.glitch.enabled) { const strip = (Math.floor(time / 130) * 37) % Math.max(1, h - 12); ctx.drawImage(scratch, 0, strip * scratch.height / h, scratch.width, 9 * scratch.height / h, Math.sin(time) * fx.glitch.intensity / 3, strip, w, 9); }
  }
  if (fx.scanLines.enabled) { ctx.fillStyle = `rgba(0,0,0,${fx.scanLines.intensity / 400})`; for (let y = 0; y < h; y += 4) ctx.fillRect(0, y, w, 1); }
  if (fx.halftone.enabled) { ctx.fillStyle = `rgba(0,0,0,${fx.halftone.intensity / 180})`; for (let y = 0; y < h; y += 7) for (let x = 0; x < w; x += 7) { ctx.beginPath(); ctx.arc(x, y, 1, 0, 7); ctx.fill(); } }
  if (fx.filmGrain.enabled || fx.filmDust.enabled) { const amount = fx.filmGrain.enabled ? fx.filmGrain.intensity : fx.filmDust.intensity / 5; ctx.fillStyle = `rgba(128,128,128,${amount / 200})`; for (let i = 0; i < amount * 15; i++) { const seed = i * 137.508 + Math.floor(time / 100) * 17; ctx.fillRect(Math.abs(Math.sin(seed)) * w, Math.abs(Math.cos(seed * 1.7)) * h, fx.filmDust.enabled ? 2 : 1, 1); } }
  if (fx.vignette.enabled) { const gradient = ctx.createRadialGradient(w / 2, h / 2, w * .15, w / 2, h / 2, Math.max(w, h) * .7); gradient.addColorStop(0, "transparent"); gradient.addColorStop(1, `rgba(0,0,0,${fx.vignette.intensity / 100})`); ctx.fillStyle = gradient; ctx.fillRect(0, 0, w, h); }
  if (settings.lights.enabled) for (const point of settings.lights.points) { const radius = Math.max(1, point.radius * Math.min(w, h)); const light = ctx.createRadialGradient(point.x * w, point.y * h, 0, point.x * w, point.y * h, radius); light.addColorStop(0, `rgba(255,240,205,${clamp(point.intensity)})`); light.addColorStop(1, "transparent"); ctx.globalCompositeOperation = "screen"; ctx.fillStyle = light; ctx.fillRect(0, 0, w, h); ctx.globalCompositeOperation = "source-over"; }
}
