import { HeroIntro } from "@/components/hero-intro";
import { NowPlaying } from "@/components/now-playing";
import { Section, SectionHeader } from "@/components/section";

export default function HomePage() {
  return (
    <div>
      <HeroIntro />

      <Section>
        <SectionHeader title="Now playing" />
        <NowPlaying />
      </Section>
    </div>
  );
}
