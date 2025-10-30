"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Button from "../ui/Button";
import { FaArrowRight } from "react-icons/fa6";

const navItems = ["Nerdwork+", "Communities", "Events", "Company"];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500`}
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-[1600px] mx-auto flex items-center justify-between px-6 lg:px-12 h-20">
        {/* Logo */}
        <motion.div className="flex items-center gap-2 px-6 bg-neutral-500/0 backdrop-blur-md py-3 rounded-full border border-white/10 cursor-pointer ">
          <img src="/nerdwork.jpg" className=" h-10 object-cover" />
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden group md:flex items-center gap-3 rounded-full border border-white/10 bg-neutral-500/0 backdrop-blur-md px-6 py-4">
          {navItems.map((item) => (
            <motion.div
              key={item}
              className="relative px-5 py-2 rounded-full text-sm font-medium text-white/80 cursor-pointer overflow-hidden"
              initial="rest"
              whileHover="hover"
              animate="rest"
            >
              <motion.a
                href={`#${item.toLowerCase()}`}
                className="transition-all duration-300 hover:text-white/95 relative z-10"
              >
                {item}
              </motion.a>

              {/* Cinematic underline */}
              <motion.div
                variants={{
                  rest: { scaleX: 0, opacity: 0 },
                  hover: {
                    scaleX: 1,
                    opacity: 1,
                    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                className="absolute bottom-0 left-0 right-0 h-[3px] origin-left bg-gradient-to-r from-blue-500 via-blue-600/80 to-blue-500 z-50"
              />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <Button
          title="Join Us"
          containerClass="hidden sm:flex py-5! items-center!"
          rightIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
            >
              <g transform="rotate(-35 12 12)">
                <path
                  d="M5 12h14M13 5l6 7-6 7"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
            </svg>
          }
        />

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden w-9 h-9 flex flex-col justify-center items-center gap-1.5"
        >
          <motion.span
            className="w-6 h-0.5 bg-white rounded-full"
            animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 6 : 0 }}
          />
          <motion.span
            className="w-6 h-0.5 bg-white rounded-full"
            animate={{ opacity: isMenuOpen ? 0 : 1 }}
          />
          <motion.span
            className="w-6 h-0.5 bg-white rounded-full"
            animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -6 : 0 }}
          />
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="absolute top-20 left-0 w-full bg-black/90 backdrop-blur-xl border-t border-white/5 flex flex-col items-center gap-6 py-8 md:hidden"
        >
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-white/80 text-lg hover:text-white transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <Button title="Join Us" />
        </motion.div>
      )}
    </motion.nav>
  );
}
