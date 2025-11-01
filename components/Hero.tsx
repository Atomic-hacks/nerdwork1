"use client";
import React, { useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  Variants,
} from "framer-motion";
import Button from "./ui/Button";

interface Slide {
  id: number;
  image: string;
  title: string;
  description: string;
  cta: string;
}

const slides: Slide[] = [
  {
    id: 1,
    image: "/comic.jpg",
    title: "Welcome to Nerdwork",
    description: "Where passion meets community",
    cta: "Join Us",
  },
  {
    id: 2,
    image: "/comic2.jpg",
    title: "Enter the Nerdverse",
    description: "Explore exclusive comics on the Nerdwork+ platform",
    cta: "Start Reading",
  },
  {
    id: 3,
    image: "/comic5.jpg",
    title: "Beyond Comics",
    description:
      "Attend the most exciting comic conventions, Connect with one of the largest nerd community",
    cta: "See Communities",
  },
];

export default function CinematicHeroSlider() {
  const [current, setCurrent] = useState<number>(0);
  const [direction, setDirection] = useState<number>(0);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const getSlideIndex = (offset: number): number => {
    return (current + offset + slides.length) % slides.length;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 3000);
    return () => clearInterval(timer);
  }, [current]);

  return (
    <div className="relative h-[70vh] max-w-7xl mx-auto overflow-hidden rounded-2xl mt-5 mb-10 md:mb-20">
      {/* Counter - Top Left */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute top-0 left-5 z-30 text-white"
      >
        <div className="flex items-baseline gap-1 text-sm md:text-base font-light tracking-wider">
          <motion.h1
            key={current}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="text-4xl md:text-5xl font-bold"
          >
            {current + 1}
          </motion.h1>
          <div className="absolute top-0 left-8">
            <h1 className="text-white/50 text-lg md:text-2xl">
              /{slides.length}
            </h1>
          </div>
        </div>
        <div className="absolute z-30 flex gap-4 mt-4">
          <motion.button
            onClick={handlePrev}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Previous slide"
            className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors duration-300"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </motion.button>

          <motion.button
            onClick={handleNext}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Next slide"
            className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors duration-300"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </motion.button>
        </div>
      </motion.div>

      {/* 3-Image Carousel Container */}
      {/* Netflix-Style 3D Carousel */}
      <div className="relative h-full w-full flex items-center justify-center perspective-[1200px] overflow-visible">
        {[-1, 0, 1].map((offset) => {
          const index = getSlideIndex(offset);
          const isCenter = offset === 0;

          const variants: Variants = {
            enter: (dir: number) => ({
              x: dir > 0 ? 300 : -300,
              scale: 0.7,
              opacity: 0,
              filter: "blur(10px)",
              rotateY: dir > 0 ? -30 : 30,
              zIndex: 1,
            }),
            center: {
              x: 0,
              scale: 1,
              opacity: 1,
              filter: "blur(0px)",
              rotateY: 0,
              zIndex: 10,
              transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
            },
            sideLeft: {
              x: -250,
              scale: 0.8,
              opacity: 0.6,
              filter: "blur(4px)",
              rotateY: 20,
              zIndex: 5,
              transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
            },
            sideRight: {
              x: 250,
              scale: 0.8,
              opacity: 0.6,
              filter: "blur(4px)",
              rotateY: -20,
              zIndex: 5,
              transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
            },
            exit: (dir: number) => ({
              x: dir > 0 ? -300 : 300,
              scale: 0.7,
              opacity: 0,
              filter: "blur(10px)",
              rotateY: dir > 0 ? 30 : -30,
              zIndex: 1,
              transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
            }),
          };

          const variant =
            offset === 0 ? "center" : offset === -1 ? "sideLeft" : "sideRight";

          return (
            <motion.div
              key={index}
              custom={direction}
              variants={variants}
              initial="enter"
              animate={variant}
              exit="exit"
              layout
              className="absolute w-[70%] md:w-[60%] h-[70%] md:h-[90%] rounded-2xl overflow-hidden cursor-pointer shadow-xl shadow-black/40"
              onClick={
                isCenter ? undefined : offset === -1 ? handlePrev : handleNext
              }
            >
              <img
                src={slides[index].image}
                alt={slides[index].title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            </motion.div>
          );
        })}
      </div>

      {/* Content - Bottom Right */}
      <div className="absolute md:bottom-10 md:right-10 bottom-20 right-0 p-8 md:p-12 lg:p-16 z-20 max-w-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-white text-right flex flex-col items-end"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-3xl md:text-6xl font-bold mb-4 leading-tight"
            >
              {slides[current].title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base md:text-lg text-white/80 mb-8 font-light"
            >
              {slides[current].description}
            </motion.p>

            <Button title={slides[current].cta} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 md:bottom-12 z-30 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setDirection(idx > current ? 1 : -1);
              setCurrent(idx);
            }}
            aria-label={`Go to slide ${idx + 1}`}
            className="relative group"
          >
            <div
              className={`h-0.5 rounded-full transition-all duration-500 ${
                current === idx ? "w-12 bg-white" : "w-8 bg-white/30"
              }`}
            />
            {current === idx && (
              <motion.div
                layoutId="activeSlide"
                className="absolute inset-0 bg-white/20 blur-md -z-10"
                transition={{ duration: 0.5 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
