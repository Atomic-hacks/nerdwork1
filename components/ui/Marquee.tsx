"use client";
import {
  Marquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem,
} from "@/components/ui/shadcn-io/marquee";

const sponsors = [
  "/discord.svg",
  "/vercel.svg",
  "/crunchyroll.svg",
  "/Itel.png",
  "/monster-logo.svg",
];

const SponsorMarquee = () => (
  <div className="flex w-full items-center justify-center py-10">
    <Marquee>
      <MarqueeFade side="left" />
      <MarqueeFade side="right" />
      <MarqueeContent>
        {[...sponsors, ...sponsors].map((src, index) => (
          <MarqueeItem
            key={index}
            className="h-16 w-32 flex items-center justify-center"
          >
            <img
              src={src}
              alt={`Sponsor ${index + 1}`}
              className="h-10 w-auto object-contain opacity-80 hover:opacity-100 transition"
            />
          </MarqueeItem>
        ))}
      </MarqueeContent>
    </Marquee>
  </div>
);

export default SponsorMarquee;
