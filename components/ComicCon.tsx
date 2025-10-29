/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useRef, useState } from "react";
import SponsorCarousel from "./ui/Marquee";

const events = [
  {
    id: 1,
    title: "Lagos Comic-Con",
    year: "2024",
    date: "March 15–17",
    location: "Eko Convention Centre",
    description:
      "Three days where online personas became real faces. The halls echoed with laughter, argument over canon, and the rustle of capes. Over 3,000 attendees proved that African fandom culture had arrived.",
    caption: "Chioma finally met her guild after three years of voice calls",
    image: "/comic-con6.jpg",
    aspect: "wide",
  },
  {
    id: 2,
    title: "Anime Naija Festival",
    year: "2024",
    date: "July 8",
    location: "University of Lagos",
    description:
      "Students transformed lecture halls into Tokyo streets. The cosplay competition drew two hundred participants—some drove four hours just to be there. By sunset, the lawn was filled with people who'd found their people.",
    caption: "Tunde organized this with a Google Doc and pure determination",
    image: "/comic-con3.jpg",
    aspect: "tall",
  },
  {
    id: 3,
    title: "Gaming Lounge",
    year: "2024",
    date: "September 2",
    location: "Ikoyi, Lagos",
    description:
      "What started as fifteen people in a living room grew into eighty strangers becoming friends. They brought their favorite controllers, debated speedrun strategies, and stayed until the hosts literally turned off the lights.",
    caption: "Ada brought her original Game Boy. It still works.",
    image: "/comic-con2.jpg",
    aspect: "wide",
  },
  {
    id: 4,
    title: "Nollywood × Fandom",
    year: "2024",
    date: "October 20",
    location: "Genesis Deluxe Cinemas",
    description:
      "Film students and game developers sat side by side, realizing their crafts weren't so different. The panel ran an hour over schedule because no one wanted to leave. Storytelling, it turns out, is storytelling.",
    caption: "Emeka pitched his game adaptation idea during Q&A",
    image: "/comic-con9.jpg",
    aspect: "tall",
  },
];

const EventBlock = ({ event, index }: any) => {
  const [isVisible, setIsVisible] = useState(false);
  const blockRef = useRef(null);

  const isWide = event.aspect === "wide";
  const isOffset = index % 3 === 1;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15, rootMargin: "50px" }
    );

    if (blockRef.current) {
      observer.observe(blockRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={blockRef}
      className={`
        relative mb-32 lg:mb-48
        ${isWide ? "lg:col-span-2" : "lg:col-span-1"}
        ${isOffset ? "lg:mt-24" : ""}
        transition-all duration-1200 ease-out
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}
      `}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      <figure className="relative group">
        {/* Image container with intentional crop */}
        <div
          className={`
          relative overflow-hidden bg-stone-100
          ${isWide ? "aspect-[16/9]" : "aspect-[3/4]"}
        `}
        >
          <img
            src={event.image}
            alt=""
            className="w-full h-full object-cover transition-transform duration-[3000ms] ease-out group-hover:scale-105"
            loading="lazy"
          />

          {/* Subtle vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Year badge - positioned absolutely */}
        <div className="absolute -top-4 -left-4 bg-neutral-500/80 backdrop-blur-xl px-4 py-2 shadow-lg rounded-full ">
          <span className="text-sm font-medium text-stone-800 tracking-wider">
            {event.year}
          </span>
        </div>

        {/* Caption overlay */}
        <figcaption className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
          <p className="text-sm text-stone-200 italic leading-relaxed">
            {event.caption}
          </p>
        </figcaption>
      </figure>

      {/* Content block */}
      <div className="mt-8 space-y-4">
        <header>
          <h3 className="text-4xl lg:text-5xl font-light text-stone-100 tracking-tight leading-none mb-2">
            {event.title}
          </h3>
          <div className="flex items-baseline gap-3 text-stone-300">
            <time className="text-sm font-medium">{event.date}</time>
            <span className="text-xs">•</span>
            <span className="text-sm">{event.location}</span>
          </div>
        </header>

        <p className="text-base text-stone-400 leading-relaxed max-w-prose">
          {event.description}
        </p>
      </div>

      {/* Decorative line element */}
      <div className="absolute -right-8 top-1/3 w-px h-24 bg-stone-300 hidden lg:block opacity-40" />
    </article>
  );
};

export default function FandomChronicles() {
  return (
    <section className="relative bg-stone-800 mx-28 rounded-xl py-24 lg:py-20 overflow-hidden">
      {/* Minimal texture overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header - editorial style */}
        <header className="mb-20 lg:mb-32 max-w-3xl">
          <p className="text-xs uppercase tracking-widest text-stone-200 mb-4 font-medium">
            Archive / 2024
          </p>
          <h2 className="text-6xl lg:text-7xl font-light text-stone-100 leading-[0.95] mb-8">
            EpiC Comic-Cons
            <br />& IRL meetups
          </h2>
          <p className="text-lg text-stone-300 leading-relaxed">
            3 Years. Thousands of people who&apos;d only known each other
            through screens. What happened when the comments section became a
            room full of faces.
          </p>
        </header>

        {/* Asymmetric grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-12 gap-y-0">
          {events.map((event, index) => (
            <EventBlock key={event.id} event={event} index={index} />
          ))}
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl md:text-5xl text-center text-white">
            Our sponsors
          </h1>
          <SponsorCarousel />
        </div>
      </div>
    </section>
  );
}
