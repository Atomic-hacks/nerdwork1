import FandomChronicles from "@/components/ComicCon";
import ComicDisplaySection from "@/components/Comics";
import Communities from "@/components/Communities";

import ComicHeroSlider from "@/components/Hero";
import Image from "next/image";

export default function Home() {
  return (
    <main className="max-w-[2160px] relative p-4 mx-auto">
      <ComicHeroSlider />
      <ComicDisplaySection />
      <Communities />
      <FandomChronicles />
    </main>
  );
}
