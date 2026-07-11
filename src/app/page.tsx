import { HomeContent } from "@/components/HomeContent";
import { PixelCharacter } from "@/components/PixelCharacter";
import { OpeningSequence } from "@/components/OpeningSequence";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { AmbientFog } from "@/components/AmbientFog";

export default function Home() {
  return (
    <>
      <OpeningSequence />
      <AmbientFog />
      <SiteHeader />
      <main id="main-content">
        <PixelCharacter />
        <HomeContent />
      </main>
      <SiteFooter />
    </>
  );
}
