"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./ui/Button";

const faqs = [
  {
    q: "What is Nerdwork all about?",
    a: "Nerdwork is a creative entertainment studio and thriving fan community, best known for its annual Nerdwork Comic-Con. Nerdwork is an intersection of storytelling, tech, culture and fandom. From cosplay showcases and gaming tournaments to animation screenings and tech exhibitions — Nerdwork celebrates creativity in all forms. We are not just an event; we're the home for fans.",
  },
  {
    q: "Do I need to be a weeb/nerd to attend a comic con?",
    a: "Not at all. Nerdwork welcomes everyone — from hardcore fans to the simply curious. It’s all about shared fun and creativity.",
  },
  {
    q: "Do I have to wear a costume?",
    a: "Costumes are totally optional but always celebrated. Whether you’re cosplaying or just spectating, you’ll fit right in.",
  },
  {
    q: "Can I buy tickets at the door?",
    a: "Tickets are typically available at the door unless sold out. However, we strongly recommend getting them online in advance.",
  },
  {
    q: "What activities can I expect at a comic con?",
    a: "Expect panels, workshops, cosplay shows, tournaments, art showcases, exhibitions, and exclusive merch drops — there’s always something for everyone.",
  },
  {
    q: "Are there age restrictions for attendees?",
    a: "Nerdwork is a family-friendly event. Some after-dark programs may have age restrictions, but general entry is open to all.",
  },
  {
    q: "Can I meet my favorite creators or celebrities?",
    a: "Yes! Many guests host signings, meet-and-greets, and Q&A sessions during the event.",
  },
  {
    q: "Will there be merchandise available for purchase?",
    a: "Absolutely. Expect official Nerdwork gear, rare collectibles, and community-made art across multiple booths.",
  },
  {
    q: "Are pets allowed at the event?",
    a: "Unfortunately, pets aren’t permitted unless they’re certified service animals.",
  },
  {
    q: "What are the health and safety guidelines for attendees?",
    a: "We follow current safety regulations, including sanitation stations and crowd management for everyone’s comfort and well-being.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="max-w-3xl mx-auto text-white py-20 px-6">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-semibold mb-2">
          Frequently Asked Questions
        </h2>
        <p className="text-neutral-400 mb-6">
          What fans everywhere have been asking.
        </p>
        <Button
          title="Contact Support"
          containerClass="mt-4 inline-flex py-4 items-center gap-2"
          rightIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 rotate-45"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h14M12 5l7 7-7 7"
              />
            </svg>
          }
        />
      </div>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <motion.div
            key={i}
            className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-4 cursor-pointer"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            whileHover={{ backgroundColor: "rgba(255,255,255,0.06)" }}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-medium">{faq.q}</h3>
              <motion.span
                animate={{ rotate: openIndex === i ? 45 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-xl text-white/70"
              >
                +
              </motion.span>
            </div>
            <AnimatePresence>
              {openIndex === i && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-sm text-neutral-400 mt-3 leading-relaxed"
                >
                  {faq.a}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
