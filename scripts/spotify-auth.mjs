// One-time helper to obtain a Spotify REFRESH TOKEN.
//
// Prereqs (see SPOTIFY_SETUP.md):
//   1. Create an app at https://developer.spotify.com/dashboard
//   2. Add redirect URI:  http://127.0.0.1:8888/callback
//   3. Put SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in .env.local
//
// Run:  node scripts/spotify-auth.mjs
// Then open the printed URL, approve, and copy the refresh token it prints.

import http from "node:http";
import { readFileSync } from "node:fs";
import { URL } from "node:url";

const PORT = 8888;
const REDIRECT_URI = `http://127.0.0.1:${PORT}/callback`;
const SCOPE = "user-read-currently-playing user-read-playback-state";

function readEnv() {
  const env = { ...process.env };
  try {
    const raw = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
    for (const line of raw.split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && !env[m[1]]) env[m[1]] = m[2];
    }
  } catch {
    /* no .env.local yet */
  }
  return env;
}

const env = readEnv();
const clientId = env.SPOTIFY_CLIENT_ID;
const clientSecret = env.SPOTIFY_CLIENT_SECRET;

if (!clientId || !clientSecret) {
  console.error(
    "\n✗ Missing SPOTIFY_CLIENT_ID / SPOTIFY_CLIENT_SECRET in .env.local\n",
  );
  process.exit(1);
}

const authUrl =
  "https://accounts.spotify.com/authorize?" +
  new URLSearchParams({
    client_id: clientId,
    response_type: "code",
    redirect_uri: REDIRECT_URI,
    scope: SCOPE,
  }).toString();

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://127.0.0.1:${PORT}`);
  if (url.pathname !== "/callback") {
    res.writeHead(404).end();
    return;
  }

  const code = url.searchParams.get("code");
  if (!code) {
    res.writeHead(400).end("No code returned.");
    return;
  }

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT_URI,
    }),
  });

  const data = await tokenRes.json();

  if (!data.refresh_token) {
    res.writeHead(500).end("Failed. Check the terminal.");
    console.error("\n✗ Token exchange failed:\n", data, "\n");
    server.close();
    return;
  }

  res
    .writeHead(200, { "Content-Type": "text/html" })
    .end(
      "<h2>✓ Done. You can close this tab and return to the terminal.</h2>",
    );

  console.log("\n✓ SUCCESS — paste this into .env.local:\n");
  console.log(`SPOTIFY_REFRESH_TOKEN=${data.refresh_token}\n`);
  server.close();
});

server.listen(PORT, () => {
  console.log("\n1. Open this URL in your browser and approve:\n");
  console.log("   " + authUrl + "\n");
  console.log("2. Waiting for the redirect on " + REDIRECT_URI + " ...\n");
});
