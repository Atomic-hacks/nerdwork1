"use client";
import { motion } from "framer-motion";
import React from "react";
import Button from "./ui/Button";
import { Carousel } from "./ui/carousel";

const comics = [
  {
    button: "Read Now",
    title: "Shadow Protocol",
    subtitle: "Vol. 1 • New Series",
    src: "/comic.jpg",
  },
  {
    button: "Read Now",
    title: "Neon Ronin",
    subtitle: "Chapter 12 • Updated Weekly",
    src: "/comic2.jpg",
  },
  {
    button: "Read Now",
    title: "Void Hunters",
    subtitle: "Season 2 Finale",
    src: "/comic3.jpg",
  },
  {
    button: "Read Now",
    title: "Celestial Outlaws",
    subtitle: "Volume 2 • Rising Stars",
    src: "/comic4.jpg",
  },
  {
    button: "Read Now",
    title: "The Rift Chronicles",
    subtitle: "Issue #8 • Dark Horizons",
    src: "/comic5.jpg",
  },
];

export default function ComicDisplaySection() {
  return (
    <section className="relative min-h-screen py-12 md:px-12 overflow-hidden max-w-[1800px] mx-auto rounded-2xl">
      {/* Section Heading */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-20 flex flex-col items-center"
      >
        <h2 className="text-3xl md:text-7xl font-bold text-neutral-50 tracking-tight mb-4">
          Redefining African Storytelling
        </h2>
        <p className="text-neutral-50/60 text-lg max-w-2xl">
          Immerse yourself in breathtaking stories and bold artwork, crafted for
          the next generation of comic lovers.
        </p>
      </motion.div>

      <div className="relative overflow-hidden w-full h-full py-20">
        <Carousel slides={comics} />
      </div>
    </section>
  );
}
