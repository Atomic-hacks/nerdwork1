"use client";
import { motion } from "framer-motion";
import Button from "./ui/Button";

const communityData = [
  { id: 1, title: "Pop Culture", bg: "/comic-con1.jpg", span: "col-span-2" },
  { id: 2, title: "Video Games", bg: "/comic-con2.jpg", span: "col-span-1" },
  { id: 3, title: "Comics", bg: "/comic-con6.jpg", span: "col-span-1" },
  { id: 4, title: "Anime", bg: "/comic-con8.jpg", span: "col-span-2" },
  { id: 5, title: "Books", bg: "/comic-con7.jpg", span: "col-span-1" },
  { id: 6, title: "Movies", bg: "/comic-con3.jpg", span: "col-span-2" },
];

export default function CommunitySection() {
  return (
    <section className="relative max-w-[1440px] mx-auto md:mt-40 mb-40 mt-0 text-white overflow-hidden flex flex-col">
      {/* Hero */}
      <div className="min-h-[20vh] flex flex-col justify-center items-center text-center px-10 space-y-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl italic text-blue-300! font-semibold tracking-tight"
        >
          People, Passion, Community.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="text-lg md:text-xl text-white/70 max-w-2xl mt-4"
        >
          No matter your passion, there&apos;s a community for you.
        </motion.p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 md:px-16 mt-12 auto-rows-[minmax(250px,_1fr)]">
        {communityData.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            whileHover={{ scale: 1.03 }}
            className={`relative group rounded-2xl overflow-hidden ${c.span} h-[300px] md:h-[350px] lg:h-[400px]`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url(${c.bg})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
            <div className="absolute bottom-0 p-6 md:p-8 z-10">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">
                {c.title}
              </h2>
              <Button title="Join community" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
