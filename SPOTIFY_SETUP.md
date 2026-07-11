# Spotify "Now Playing" — Setup

The home page shows the track you're currently playing on Spotify, live.
You need three secrets, kept in `.env.local` (already gitignored).

## 1. Create a Spotify app

1. Go to <https://developer.spotify.com/dashboard> and log in.
2. Click **Create app**. Name it anything (e.g. "Portfolio Now Playing").
3. Under **Redirect URIs**, add exactly:
   ```
   http://127.0.0.1:8888/callback
   ```
4. Save. Open the app's **Settings** to copy the **Client ID** and **Client secret**.

## 2. Add the client credentials

Put them in `.env.local`:

```
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret
SPOTIFY_REFRESH_TOKEN=
```

## 3. Get the refresh token (one time)

Run the helper script:

```
node scripts/spotify-auth.mjs
```

- It prints a URL — open it, log in, and click **Agree**.
- Your browser redirects back and the terminal prints:
  ```
  SPOTIFY_REFRESH_TOKEN=AQD...
  ```
- Paste that line into `.env.local` (replace the empty value).

## 4. Restart

```
npm run dev
```

Play something on Spotify and open <http://localhost:3000> — it should appear
within ~5 seconds. If nothing is playing, the widget shows "Not playing".

## Deploying (Vercel)

Add the same three env vars in **Project → Settings → Environment Variables**.
The refresh token doesn't expire, so it keeps working.
