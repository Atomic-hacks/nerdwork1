import FandomChronicles from "@/components/ComicCon";
import ComicDisplaySection from "@/components/Comics";

import ComicHeroSlider from "@/components/Hero";
import Image from "next/image";
import CommunitySection from "@/components/Communities";

export default function Home() {
  return (
    <main className="max-w-[2160px] relative px-4 mx-auto">
      <div className="mt-28 md:mt-40">
        <h1 className="text-3xl md:text-5xl text-center">
          Nerdwork
          <br /> Where passion meets community
        </h1>
      </div>
      <ComicHeroSlider />
      <ComicDisplaySection />
      <CommunitySection />
      <FandomChronicles />
    </main>
  );
}
