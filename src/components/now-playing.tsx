"use client";

import { useEffect, useRef, useState } from "react";
import GlassSurface from "@/components/glass-surface/GlassSurface";

type NowPlayingData = {
  configured: boolean;
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumImageUrl?: string;
  songUrl?: string;
  progressMs?: number;
  durationMs?: number;
};

const POLL_MS = 5000;

function fmt(ms: number) {
  const total = Math.floor(ms / 1000);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function SpotifyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.52 17.34c-.24.36-.66.48-1.02.24-2.82-1.74-6.36-2.1-10.56-1.14-.42.12-.78-.18-.9-.54-.12-.42.18-.78.54-.9 4.56-1.02 8.52-.6 11.64 1.32.42.18.48.66.3 1.02zm1.44-3.3c-.3.42-.84.6-1.26.3-3.24-1.98-8.16-2.58-11.94-1.38-.48.12-1.02-.12-1.14-.6-.12-.48.12-1.02.6-1.14C9.9 9.9 15.3 10.56 19.02 12.84c.42.24.6.84.3 1.2h-.36zm.12-3.36C15.24 8.4 8.82 8.16 5.1 9.3c-.6.18-1.2-.18-1.38-.72-.18-.6.18-1.2.72-1.38 4.32-1.32 11.34-1.02 15.72 1.5.54.3.72 1.02.42 1.56-.3.48-1.02.66-1.5.36z" />
    </svg>
  );
}

function Equalizer({ playing }: { playing: boolean }) {
  return (
    <span className="flex items-end gap-[2px]" aria-hidden>
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className="w-[3px] rounded-full bg-[#1DB954]"
          style={{
            height: 12,
            animation: playing
              ? `eq 0.9s ease-in-out ${i * 0.15}s infinite`
              : "none",
            transformOrigin: "bottom",
            opacity: playing ? 1 : 0.4,
          }}
        />
      ))}
    </span>
  );
}

export function NowPlaying() {
  const [data, setData] = useState<NowPlayingData | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const baseRef = useRef(0);
  const fetchedAtRef = useRef(0);

  // Poll the API.
  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const res = await fetch("/api/now-playing", { cache: "no-store" });
        const json = (await res.json()) as NowPlayingData;
        if (!alive) return;
        setData(json);
        baseRef.current = json.progressMs ?? 0;
        fetchedAtRef.current = Date.now();
        setElapsed(json.progressMs ?? 0);
      } catch {
        /* keep last known state */
      }
    };
    load();
    const id = setInterval(load, POLL_MS);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  // Advance the progress bar locally between polls for a live feel.
  useEffect(() => {
    if (!data?.isPlaying || !data.durationMs) return;
    const id = setInterval(() => {
      const next = baseRef.current + (Date.now() - fetchedAtRef.current);
      setElapsed(Math.min(next, data.durationMs ?? next));
    }, 250);
    return () => clearInterval(id);
  }, [data?.isPlaying, data?.durationMs]);

  // Loading skeleton
  if (!data) {
    return (
      <Shell>
        <div className="flex items-center gap-4">
          <div className="size-16 shrink-0 animate-pulse rounded-lg bg-muted" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-2/3 animate-pulse rounded bg-muted" />
            <div className="h-3 w-1/3 animate-pulse rounded bg-muted" />
          </div>
        </div>
      </Shell>
    );
  }

  if (!data.configured) {
    return (
      <Shell>
        <div className="flex items-center gap-3 text-muted-foreground">
          <SpotifyIcon className="size-6 text-[#1DB954]" />
          <p className="text-sm">
            Spotify isn&apos;t connected yet — add your credentials to see live
            playback here.
          </p>
        </div>
      </Shell>
    );
  }

  const hasTrack = Boolean(data.title);

  if (!hasTrack) {
    return (
      <Shell>
        <div className="flex items-center gap-3">
          <SpotifyIcon className="size-6 text-[#1DB954]" />
          <div>
            <p className="text-sm font-medium">Not playing</p>
            <p className="text-sm text-muted-foreground">
              Nothing on Spotify right now.
            </p>
          </div>
        </div>
      </Shell>
    );
  }

  const duration = data.durationMs ?? 0;
  const pct = duration ? Math.min(100, (elapsed / duration) * 100) : 0;

  return (
    <Shell>
      <div className="flex items-center gap-4">
        {data.albumImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={data.albumImageUrl}
            alt={data.album ?? "Album cover"}
            width={64}
            height={64}
            className="size-16 shrink-0 rounded-lg object-cover shadow-sm"
          />
        ) : (
          <div className="size-16 shrink-0 rounded-lg bg-muted" />
        )}

        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2 text-xs font-medium text-[#1DB954]">
            <Equalizer playing={data.isPlaying} />
            <span>{data.isPlaying ? "Now playing" : "Paused"}</span>
          </div>
          <a
            href={data.songUrl}
            target="_blank"
            rel="noreferrer"
            className="block truncate font-semibold text-foreground hover:underline"
          >
            {data.title}
          </a>
          <p className="truncate text-sm text-muted-foreground">
            {data.artist}
          </p>
        </div>

        <SpotifyIcon className="hidden size-6 shrink-0 text-[#1DB954] sm:block" />
      </div>

      {/* Live progress */}
      <div className="mt-4">
        <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-[#1DB954] transition-[width] duration-200 ease-linear"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="mt-1.5 flex justify-between text-[11px] tabular-nums text-muted-foreground">
          <span>{fmt(elapsed)}</span>
          <span>{fmt(duration)}</span>
        </div>
      </div>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <GlassSurface
      width="100%"
      height="auto"
      borderRadius={20}
      backgroundOpacity={0.1}
      saturation={1.4}
      className="w-full"
    >
      <div className="w-full p-5">{children}</div>
    </GlassSurface>
  );
}
