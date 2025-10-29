/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const communities = [
  {
    id: "gaming",
    title: "Gaming",
    description:
      "From retro arcade classics to modern esports, gaming unites players across generations and platforms in shared digital worlds.",
    image:
      "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&q=80",
    gridClass: "col-span-2 lg:col-span-2 row-span-1",
    imagePosition: "right",
  },
  {
    id: "comics",
    title: "Comics",
    description:
      "Sequential art that spans superhero sagas, indie graphic novels, and manga—where every panel tells a thousand stories.",
    image:
      "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=800&q=80",
    gridClass: "col-span-2 row-span-2",
    imagePosition: "bottom",
  },
  {
    id: "music",
    title: "Music",
    description:
      "From vinyl collecting to concert pilgrimages, music nerds dissect every note, riff, and hidden track with devotional precision.",
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80",
    gridClass: "col-span-2 row-span-2",
    imagePosition: "bottom",
  },
  {
    id: "theatre",
    title: "Theatre",
    description:
      "Stage magic and dramatic craft—where every performance is ephemeral, every rehearsal sacred, and every opening night transformative.",
    image:
      "https://images.unsplash.com/photo-1503095396549-807759245b35?w=800&q=80",
    gridClass: "col-span-2 lg:col-span-2 row-span-1",
    imagePosition: "left",
  },
  {
    id: "anime",
    title: "Anime",
    description:
      "Japanese animation that transcends borders—complex narratives, stunning visuals, and communities bound by shared passion.",
    image:
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&q=80",
    gridClass: "col-span-4 row-span-1",
    imagePosition: "bottom",
  },
];

const Noise = () => {
  return (
    <div
      className="absolute inset-0 opacity-[0.58] pointer-events-none mix-blend-overlay z-50"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }}
    />
  );
};

const WobbleCommunityCard = ({ community, index }: any) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (event: any) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - (rect.left + rect.width / 2)) / 20;
    const y = (event.clientY - (rect.top + rect.height / 2)) / 20;
    setMousePosition({ x, y });
  };

  const imageStyles = {
    right: "bottom-0 right-0 w-full h-48 md:w-2/3 md:h-3/4",
    left: "bottom-0 left-0 w-full h-48 md:w-2/3 md:h-3/4",
    bottom:
      "bottom-0 right-0 w-full h-48 md:w-2/3 md:h-3/4 md:bottom-0 md:right-0",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      style={{
        transform: isHovering
          ? `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0)`
          : "translate3d(0, 0, 0)",
      }}
      className={`${community.gridClass} relative overflow-hidden rounded-2xl bg-gradient-to-br from-[blue] via-blue-600 to-[yellow] border border-white/5 hover:border-white/10 rounded-xl`}
    >
      <div className="relative h-full overflow-hidden rounded-2xl">
        <motion.div
          style={{
            transform: isHovering
              ? `translate3d(${-mousePosition.x}px, ${-mousePosition.y}px, 0) scale(1.03)`
              : "translate3d(0, 0, 0) scale(1)",
          }}
          className="h-full relative"
        >
          <Noise />

          {/* Text */}
          <div className="relative z-50 p-8 pb-56 md:pb-10 lg:p-10 flex flex-col justify-center h-full">
            <div className="space-y-3 max-w-xl">
              <div className="inline-block px-3 py-1 rounded-full text-xs bg-white/10 border border-white/20 text-white/90">
                Community
              </div>

              <h2 className="text-2xl lg:text-3xl font-bold text-white">
                {community.title}
              </h2>

              <p className="text-sm lg:text-base text-neutral-200/90 leading-relaxed">
                {community.description}
              </p>

              {isHovering && (
                <motion.div
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="pt-2"
                >
                  <span className="inline-flex items-center gap-2 text-sm text-white/60">
                    Explore community
                    <svg width="16" height="16" fill="none">
                      <path
                        d="M3 8h10M9 4l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </motion.div>
              )}
            </div>
          </div>

          {/* Image */}
          <div
            className={`absolute z-20 ${
              imageStyles[community.imagePosition as keyof typeof imageStyles]
            } rounded-lg overflow-hidden`}
          >
            <motion.img
              src={community.image}
              alt={community.title}
              className="w-full h-full object-cover"
              animate={{ scale: isHovering ? 1.08 : 1 }}
              transition={{ duration: 0.5 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default function NerdCommunities() {
  return (
    <div className="min-h-screen text-white">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 lg:pt-24 pb-12">
        <motion.div
          className="space-y-4 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-neutral-400">
            Nerd Communities
          </h1>
          <p className="text-xl text-neutral-400 leading-relaxed">
            Passionate collectives united by shared obsessions, deep knowledge,
            and authentic enthusiasm.
          </p>
        </motion.div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 auto-rows-[minmax(320px,auto)]">
          {communities.map((community, index) => (
            <WobbleCommunityCard
              key={community.id}
              community={community}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <motion.div
        className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent max-w-4xl mx-auto mb-12"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
    </div>
  );
}
