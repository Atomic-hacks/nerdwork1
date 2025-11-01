"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaDiscord, FaTwitter, FaYoutube, FaMedium } from "react-icons/fa";
import Button from "../ui/Button";

const socialLinks = [
  { href: "https://discord.com", icon: <FaDiscord /> },
  { href: "https://twitter.com", icon: <FaTwitter /> },
  { href: "https://youtube.com", icon: <FaYoutube /> },
  { href: "https://medium.com", icon: <FaMedium /> },
];

const quickLinks = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: "#" },
      { label: "Nerdwork+", href: "#" },
      { label: "Events", href: "#" },
      { label: "Company", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
      { label: "Blog", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact Us", href: "#" },
      { label: "Cookie Policy", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  },
];

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end start"], // similar to ScrollTrigger start/end
  });

  // Map scroll progress (0 → 1) to Y translation (0 → -350px)
  const y = useTransform(scrollYProgress, [0, 1], [0, -350]);

  return (
    <footer
      ref={footerRef}
      className="relative mx-auto max-w-5xl overflow-hidden text-white"
    >
      {/* Animated Image */}
      <motion.div
        style={{ y }}
        className="pointer-events-none absolute z-50 hidden -translate-x-1/2 md:-bottom-40 md:left-96 md:block"
      >
        <img
          src="footer.jpg"
          alt="Footer animation"
          className="size-[400px] object-contain"
        />
      </motion.div>

      <div className="container mx-auto mt-40 px-6 py-4">
        {/* Top Section */}
        <div className="relative mb-16 flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <img src="/nerdwork.jpg" className=" h-10 object-cover" />
            </div>

            <p className="mb-6 max-w-[250px] text-neutral-50">
              We are inviting you into the ultimate nerd universe
            </p>

            <Button title="Join Us" />
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-8 md:flex-row md:gap-12">
            {quickLinks.map((section, idx) => (
              <div key={idx}>
                <h3 className="mb-6 font-normal text-white uppercase">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a
                        href={link.href}
                        className="text-neutral-50 transition-colors hover:text-blue-700"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Image - Static at bottom */}
        <div className="absolute -bottom-20 left-1/3 md:hidden">
          <img
            src="/footer.jpg"
            alt="Footer animation"
            className="size-96 object-contain"
          />
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col gap-6 border-t border-gray-800 pt-8 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-6">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-xl text-neutral-50 transition-colors hover:text-blue-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
