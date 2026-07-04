import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const TOKEN_URL = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_URL = "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED_URL =
  "https://api.spotify.com/v1/me/player/recently-played?limit=1";

async function getAccessToken() {
  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } =
    process.env;
  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
    return null;
  }
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
      ).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: SPOTIFY_REFRESH_TOKEN,
    }),
    cache: "no-store",
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.access_token as string;
}

interface TrackPayload {
  configured: boolean;
  isPlaying: boolean;
  title?: string;
  artist?: string;
  url?: string;
  progressMs?: number;
  durationMs?: number;
}

export async function GET() {
  const token = await getAccessToken();
  if (!token) {
    return NextResponse.json<TrackPayload>({ configured: false, isPlaying: false });
  }
  const headers = { Authorization: `Bearer ${token}` };

  const now = await fetch(NOW_PLAYING_URL, { headers, cache: "no-store" });
  if (now.status === 200) {
    const data = await now.json();
    if (data?.item) {
      return NextResponse.json<TrackPayload>({
        configured: true,
        isPlaying: data.is_playing,
        title: data.item.name,
        artist: data.item.artists.map((a: { name: string }) => a.name).join(", "),
        url: data.item.external_urls.spotify,
        progressMs: data.progress_ms,
        durationMs: data.item.duration_ms,
      });
    }
  }

  // Nothing playing right now — fall back to the last played track
  const recent = await fetch(RECENTLY_PLAYED_URL, { headers, cache: "no-store" });
  if (recent.ok) {
    const data = await recent.json();
    const track = data?.items?.[0]?.track;
    if (track) {
      return NextResponse.json<TrackPayload>({
        configured: true,
        isPlaying: false,
        title: track.name,
        artist: track.artists.map((a: { name: string }) => a.name).join(", "),
        url: track.external_urls.spotify,
      });
    }
  }

  return NextResponse.json<TrackPayload>({ configured: true, isPlaying: false });
}
