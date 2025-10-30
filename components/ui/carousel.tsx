"use client";

import { useState, useRef, useId, useEffect } from "react";
import Button from "./Button";

interface SlideData {
  title: string;
  button: string;
  src: string;
  subtitle: string;
}

interface SlideProps {
  slide: SlideData;
  index: number;
  current: number;
  handleSlideClick: (index: number) => void;
}

const Slide = ({ slide, index, current, handleSlideClick }: SlideProps) => {
  const slideRef = useRef<HTMLLIElement>(null);
  const xRef = useRef<number>(0);
  const yRef = useRef<number>(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const animate = () => {
      if (!slideRef.current) return;
      const x = xRef.current;
      const y = yRef.current;
      slideRef.current.style.setProperty("--x", `${x}px`);
      slideRef.current.style.setProperty("--y", `${y}px`);
      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const handleMouseMove = (event: React.MouseEvent) => {
    const el = slideRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const factor = window.innerWidth < 768 ? 60 : 30; // subtle on mobile
    xRef.current = (event.clientX - (r.left + r.width / 2)) / factor;
    yRef.current = (event.clientY - (r.top + r.height / 2)) / factor;
  };

  const handleMouseLeave = () => {
    xRef.current = 0;
    yRef.current = 0;
  };

  const imageLoaded = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.style.opacity = "1";
  };

  const { src, title, subtitle } = slide;

  return (
    <div className="perspective-distant transform-3d">
      <li
        ref={slideRef}
        className="flex flex-1 flex-col items-center justify-center relative text-center text-white opacity-100
                   transition-all duration-300 ease-in-out w-[90vw] max-w-[500px] h-[70vw] max-h-[600px] mx-auto sm:mx-20 z-10"
        onClick={() => handleSlideClick(index)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform:
            current !== index
              ? "scale(0.98) rotateX(8deg)"
              : "scale(1) rotateX(0deg)",
          transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          transformOrigin: "bottom",
        }}
      >
        <div
          className="absolute top-0 left-0 w-full h-full bg-[#1D1F2F] rounded-xl overflow-hidden transition-all duration-150 ease-out"
          style={{
            transform:
              current === index ? "translate3d(var(--x), var(--y), 0)" : "none",
          }}
        >
          <img
            className="absolute inset-0 w-[125%] h-[125%] object-cover opacity-100 transition-opacity duration-600 ease-in-out"
            style={{
              opacity: current === index ? 1 : 0.5,
            }}
            alt={title}
            src={src}
            onLoad={imageLoaded}
            loading="eager"
            decoding="sync"
          />
          {current === index && (
            <div className="absolute inset-0 bg-black/30 transition-all duration-1000" />
          )}
        </div>

        <article
          className={`relative p-[4vmin] transition-opacity duration-1000 ease-in-out z-30 ${
            current === index ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <h2 className="text-lg sm:text-2xl md:text-4xl font-semibold text-neutral-200!">
            {title}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-white/70 mb-4">
            {subtitle}
          </p>
          <div className="flex justify-center">
            <Button title={title} />
          </div>
        </article>
      </li>
    </div>
  );
};

interface CarouselControlProps {
  type: string;
  title: string;
  handleClick: () => void;
}

const CarouselControl = ({
  type,
  title,
  handleClick,
}: CarouselControlProps) => {
  return (
    <button
      className={`w-10 h-10 flex items-center mx-2 justify-center bg-neutral-50/0 backdrop-blur-xl border border-neutral-700
                 rounded-full hover:scale-105 active:scale-95 transition duration-200 mt-5 ${
                   type === "previous" ? "rotate-180" : ""
                 }`}
      title={title}
      onClick={handleClick}
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
    </button>
  );
};

interface CarouselProps {
  slides: SlideData[];
}

export function Carousel({ slides }: CarouselProps) {
  const [current, setCurrent] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);

  const extendedSlides = [slides[slides.length - 1], ...slides, slides[0]];

  useEffect(() => {
    if (!isTransitioning) return;

    const handleTransitionEnd = () => {
      setIsTransitioning(false);

      if (current === 0) {
        if (listRef.current) listRef.current.style.transition = "none";
        setCurrent(slides.length);
        setTimeout(() => {
          if (listRef.current) listRef.current.style.transition = "";
        }, 50);
      } else if (current === extendedSlides.length - 1) {
        if (listRef.current) listRef.current.style.transition = "none";
        setCurrent(1);
        setTimeout(() => {
          if (listRef.current) listRef.current.style.transition = "";
        }, 50);
      }
    };

    const list = listRef.current;
    if (list) {
      list.addEventListener("transitionend", handleTransitionEnd);
      return () =>
        list.removeEventListener("transitionend", handleTransitionEnd);
    }
  }, [isTransitioning, current, slides.length, extendedSlides.length]);

  const handlePreviousClick = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(current - 1);
  };

  const handleNextClick = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(current + 1);
  };

  const handleSlideClick = (index: number) => {
    if (current !== index && !isTransitioning) {
      setIsTransitioning(true);
      setCurrent(index);
    }
  };

  const id = useId();

  return (
    <div
      className="relative w-[90vw] max-w-[1000px] h-[70vw] max-h-[600px] mx-auto"
      aria-labelledby={`carousel-heading-${id}`}
    >
      <div className="flex absolute -top-20 right-60 sm:right-96 justify-end w-full px-4 sm:px-0">
        <CarouselControl
          type="previous"
          title="Go to previous slide"
          handleClick={handlePreviousClick}
        />
        <CarouselControl
          type="next"
          title="Go to next slide"
          handleClick={handleNextClick}
        />
      </div>
      <ul
        ref={listRef}
        className="absolute flex mx-auto transition-transform duration-1000 ease-in-out"
        style={{
          transform: `translateX(-${current * (100 / extendedSlides.length)}%)`,
        }}
      >
        {extendedSlides.map((slide, index) => (
          <Slide
            key={index}
            slide={slide}
            index={index}
            current={current}
            handleSlideClick={handleSlideClick}
          />
        ))}
      </ul>
    </div>
  );
}
