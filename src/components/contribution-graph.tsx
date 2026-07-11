// GitHub-style contribution grid — the signature element of the Echo template.
// Deterministic pattern (no randomness) so server and client render identically.
import { GlassPanel } from "@/components/glass-surface/GlassPanel";

const WEEKS = 52;
const DAYS = 7;

// A small deterministic hash → 0..4 intensity level.
function level(week: number, day: number): number {
  const seed = (week * 7 + day) * 2654435761;
  const v = (seed ^ (seed >>> 15)) >>> 0;
  const n = v % 100;
  if (n < 45) return 0;
  if (n < 65) return 1;
  if (n < 82) return 2;
  if (n < 94) return 3;
  return 4;
}

const levelClass = [
  "bg-muted",
  "bg-foreground/25",
  "bg-foreground/45",
  "bg-foreground/70",
  "bg-foreground",
];

export function ContributionGraph() {
  return (
    <section className="mt-16">
      <h2 className="mb-4 text-sm font-medium text-muted-foreground">
        Contribution Graph
      </h2>
      <GlassPanel borderRadius={16} contentClassName="overflow-x-auto p-4">
        <div className="flex gap-[3px]">
          {Array.from({ length: WEEKS }).map((_, week) => (
            <div key={week} className="flex flex-col gap-[3px]">
              {Array.from({ length: DAYS }).map((_, day) => (
                <div
                  key={day}
                  className={`size-[10px] rounded-[2px] ${levelClass[level(week, day)]}`}
                  title={`Week ${week + 1}, day ${day + 1}`}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-end gap-1 text-xs text-muted-foreground">
          <span>Less</span>
          {levelClass.map((c, i) => (
            <span key={i} className={`size-[10px] rounded-[2px] ${c}`} />
          ))}
          <span>More</span>
        </div>
      </GlassPanel>
    </section>
  );
}
