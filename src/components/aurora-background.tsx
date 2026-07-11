// Decorative animated backdrop. Gives the glass surfaces (navbar + Spotify
// card) something colorful to refract, so the "liquid glass" distortion stays
// visible even in dark mode. Pure CSS — no JS, respects reduced motion.

const blobs = [
  { color: "#1DB954", top: "-10%", left: "20%", size: "45vw", delay: "0s" },
  { color: "#6d28d9", top: "20%", left: "-10%", size: "40vw", delay: "-6s" },
  { color: "#2563eb", top: "50%", left: "55%", size: "48vw", delay: "-12s" },
  { color: "#db2777", top: "75%", left: "10%", size: "38vw", delay: "-18s" },
];

export function AuroraBackground() {
  return (
    <div className="aurora" aria-hidden>
      {blobs.map((b, i) => (
        <span
          key={i}
          className="aurora__blob"
          style={{
            background: b.color,
            top: b.top,
            left: b.left,
            width: b.size,
            height: b.size,
            animationDelay: b.delay,
          }}
        />
      ))}
    </div>
  );
}
