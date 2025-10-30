"use client";
import { motion } from "framer-motion";
import Button from "./ui/Button";

const communityData = [
  { id: 1, title: "Pop Culture", bg: "/comic-con1.jpg" },
  { id: 2, title: "Video Games", bg: "/comic-con2.jpg" },
  { id: 3, title: "Comics", bg: "/comic-con6.jpg" },
  { id: 4, title: "Theatre", bg: "/comic-con5.jpg" },
  { id: 5, title: "Anime", bg: "/comic-con8.jpg" },
  { id: 6, title: "Books", bg: "/comic-con7.jpg" },
  { id: 7, title: "Movies", bg: "/comic-con3.jpg" },
  { id: 8, title: "Music", bg: "/comic-con3.jpg" },
];

export default function CommunitySection() {
  return (
    <section className="relative max-w-[1440px] mx-auto mb-40 text-white overflow-hidden flex flex-col">
      {/* Hero Intro */}
      <div className="min-h-[50vh] flex flex-col justify-center items-center text-center px-10 space-y-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl md:text-7xl font-semibold tracking-tight"
        >
          People,
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-6xl md:text-7xl font-semibold tracking-tight"
        >
          Passion,
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-6xl md:text-7xl font-semibold tracking-tight"
        >
          Community.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="text-lg md:text-xl text-white/70 max-w-2xl mt-6"
        >
          No matter your passion, there&apos;s a community for you.
        </motion.p>
      </div>

      {/* Bento-style layout */}
      <div className="grid grid-cols-6 md:grid-cols-12 gap-5 md:gap-8 px-6 md:px-16 mt-20">
        {communityData.map((c, i) => {
          // Custom shape logic for the "bento" look
          const layoutMap: Record<number, string> = {
            1: "col-span-6 md:col-span-7 row-span-2 h-[60vh]",
            2: "col-span-6 md:col-span-5 h-[40vh]",
            3: "col-span-6 md:col-span-4 h-[40vh]",
            4: "col-span-6 md:col-span-8 h-[50vh]",
            5: "col-span-6 md:col-span-6 h-[45vh]",
            6: "col-span-6 md:col-span-6 h-[55vh]",
            7: "col-span-6 md:col-span-8 h-[60vh]",
            8: "col-span-6 md:col-span-4 h-[40vh]",
          };

          return (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className={`relative group rounded-2xl overflow-hidden ${
                layoutMap[c.id] || "col-span-6 h-[40vh]"
              }`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${c.bg})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent" />
              <div className="absolute bottom-0 p-8 z-10">
                <h2 className="text-3xl font-semibold tracking-tight mb-3">
                  {c.title}
                </h2>
                <Button title="Join community" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
