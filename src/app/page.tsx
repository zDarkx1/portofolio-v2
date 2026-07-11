import { NowPlaying } from "@/components/now-playing";

export default function HomePage() {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <NowPlaying />
      </div>
    </div>
  );
}
