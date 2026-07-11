import "server-only";

// Server-only Spotify helpers. Secrets never reach the client — the browser
// only ever talks to our own /api/now-playing route.

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT =
  "https://api.spotify.com/v1/me/player/currently-playing";

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

export const spotifyConfigured = Boolean(
  clientId && clientSecret && refreshToken,
);

async function getAccessToken(): Promise<string | null> {
  if (!spotifyConfigured) return null;

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const res = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken as string,
    }),
    cache: "no-store",
  });

  if (!res.ok) return null;
  const data = (await res.json()) as { access_token?: string };
  return data.access_token ?? null;
}

export type NowPlaying = {
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

export async function getNowPlaying(): Promise<NowPlaying> {
  if (!spotifyConfigured) {
    return { configured: false, isPlaying: false };
  }

  const token = await getAccessToken();
  if (!token) return { configured: true, isPlaying: false };

  const res = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  // 204 = nothing playing; 202 = device warming up.
  if (res.status === 204 || res.status > 400) {
    return { configured: true, isPlaying: false };
  }

  const song = (await res.json()) as {
    is_playing?: boolean;
    progress_ms?: number;
    item?: {
      name?: string;
      duration_ms?: number;
      external_urls?: { spotify?: string };
      album?: { name?: string; images?: { url?: string }[] };
      artists?: { name?: string }[];
    };
  };

  if (!song?.item) {
    return { configured: true, isPlaying: false };
  }

  return {
    configured: true,
    isPlaying: song.is_playing ?? false,
    title: song.item.name,
    artist: (song.item.artists ?? []).map((a) => a.name).join(", "),
    album: song.item.album?.name,
    albumImageUrl: song.item.album?.images?.[0]?.url,
    songUrl: song.item.external_urls?.spotify,
    progressMs: song.progress_ms,
    durationMs: song.item.duration_ms,
  };
}
