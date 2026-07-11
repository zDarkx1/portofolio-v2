import { NextResponse } from "next/server";
import { getNowPlaying } from "@/lib/spotify";

// Always run fresh — this reflects live playback state.
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const data = await getNowPlaying();
    return NextResponse.json(data, {
      headers: { "Cache-Control": "no-store, max-age=0" },
    });
  } catch {
    return NextResponse.json(
      { configured: true, isPlaying: false },
      { headers: { "Cache-Control": "no-store, max-age=0" } },
    );
  }
}
