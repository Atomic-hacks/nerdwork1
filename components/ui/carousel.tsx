"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Button from "../ui/Button";

interface SlideData {
  title: string;
  subtitle: string;
  button: string;
  src: string;
}

interface CarouselProps {
  slides: SlideData[];
}

export default function FeaturedComics({ slides }: CarouselProps) {
  const [position, setPosition] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const intervalTime = 10000;

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Repeat slides many times for infinite effect
  const repeatedSlides = Array(20).fill(slides).flat();

  const next = () => setPosition(position + 1);
  const prev = () => setPosition(position - 1);

  useEffect(() => {
    const interval = setInterval(next, intervalTime);
    return () => clearInterval(interval);
  }, [position]);

  return (
    <section className="w-full py-16 bg-black text-white overflow-hidden">
      {/* Controls */}
      <div className="flex justify-between items-center px-6 mb-6">
        <h2 className="text-3xl font-semibold">Featured Comics</h2>
        <div className="flex gap-3">
          <button
            onClick={prev}
            className="px-3 py-1.5 rounded-full bg-neutral-800 hover:bg-neutral-700 transition-colors"
          >
            ←
          </button>
          <button
            onClick={next}
            className="px-3 py-1.5 rounded-full bg-neutral-800 hover:bg-neutral-700 transition-colors"
          >
            →
          </button>
        </div>
      </div>

      {/* Carousel - no gap on mobile, gap on desktop */}
      <motion.div
        className="flex gap-0 md:gap-6 md:px-6"
        animate={{
          x: isMobile ? `-${position * 100}%` : `calc(-${position * 26.5}%)`,
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {repeatedSlides.map((slide, i) => (
          <div
            key={i}
            className="relative flex-shrink-0 w-full md:w-[24%] aspect-[3/4] bg-neutral-900 rounded-2xl overflow-hidden group px-6 md:px-0"
          >
            {/* Image */}
            <img
              src={slide.src}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-400"
            />

            {/* Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-2xl" />

            {/* Always visible */}
            <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
              <h3 className="text-lg font-semibold">{slide.title}</h3>
              <Button title={slide.button} />
            </div>

            {/* Subtitle - always visible on mobile, hover on desktop */}
            <div className="absolute bottom-20 bg-linear-to-b from-transparent    via-black/80 to-transparent  p-4 flex flex-col justify-center rounded-2xl opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 z-10">
              <p className="md:text-lg leading-relaxed mb-16">
                {slide.subtitle}
              </p>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
