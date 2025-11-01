"use client";
import { motion } from "framer-motion";
import React from "react";
import Button from "./ui/Button";
import Carousel from "./ui/carousel";

const comics = [
  {
    button: "Read Now",
    title: "Shadow Protocol",
    subtitle:
      "When a rogue AI threatens to expose government secrets, an elite hacker must choose between loyalty and truth in this pulse-pounding cyberpunk thriller.",
    src: "/comic.jpg",
  },
  {
    button: "Read Now",
    title: "Neon Ronin",
    subtitle:
      "A dishonored samurai navigates the neon-lit streets of Neo-Tokyo, seeking redemption while battling corrupt corporations and ancient demons.",
    src: "/comic2.jpg",
  },
  {
    button: "Read Now",
    title: "Void Hunters",
    subtitle:
      "As reality fractures across dimensions, a ragtag crew of bounty hunters faces their greatest challenge yet—stopping the collapse of the multiverse itself.",
    src: "/comic3.jpg",
  },
  {
    button: "Read Now",
    title: "Celestial Outlaws",
    subtitle:
      "Pirates, rebels, and revolutionaries unite across the galaxy to overthrow a tyrannical empire that has ruled the stars for centuries.",
    src: "/comic4.jpg",
  },
  {
    button: "Read Now",
    title: "The Rift Chronicles",
    subtitle:
      "When portals to parallel worlds begin appearing, a young scientist discovers her inventions are the key to either saving humanity or destroying it.",
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
          Redefining{" "}
          <span className="italic font-semibold md:text-8xl text-4xl text-blue-400">
            African
          </span>{" "}
          Storytelling
        </h2>
        <p className="text-blue-100 text-lg max-w-2xl">
          Immerse yourself in breathtaking stories and bold artwork, crafted for
          the next generation of comic lovers.
        </p>
      </motion.div>

      <div className="relative overflow-hidden w-full h-full ">
        <Carousel slides={comics} />
      </div>
    </section>
  );
}
