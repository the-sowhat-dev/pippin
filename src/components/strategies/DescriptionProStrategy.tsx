"use client";

import Image from "next/image";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import { motion } from "framer-motion";

const ImagesPro = [
  {
    src: "/images/france-fintech.png",
    delay: 0,
    duration: 3,
    y: -15,
    href: "https://www.francefintech.org/",
  },
  {
    src: "/images/french-tech.png",
    delay: 0.5,
    duration: 4,
    y: -20,
    href: "https://www.lafrenchtech-stl.com/",
  },
  {
    src: "/images/hub-612.png",
    delay: 0.2,
    duration: 3.5,
    y: -18,
    href: "https://www.hub612.com/",
  },
  {
    src: "/images/powens.png",
    delay: 0.8,
    duration: 3.5,
    y: -18,
    href: "https://www.powens.com/",
  },
];

export default function DescriptionProStrategy({ theme = "green" }: { theme?: "green" | "blue" }) {
  return (
    <section
      className={`flex flex-col items-center ${theme === "green" ? "bg-[#35C055]" : "bg-sky-400"} gap-8 md:gap-16 p-4 sm:p-8 py-16 sm:py-24 m-2 sm:m-8 rounded-2xl text-white`}>
      <div className="flex flex-col items-center gap-16">
        <div className="relative max-w-xl mx-auto my-8">
          <FormatQuoteIcon
            sx={{ fontSize: 100 }}
            className="absolute -top-10 -left-6 text-white opacity-30 rotate-180"
          />
          <h2 className="text-2xl font-bold relative text-center md:text-left leading-relaxed">
            Un projet pensé et conçu au cœur de l&apos;écosystème fintech français.
          </h2>
          <FormatQuoteIcon
            sx={{ fontSize: 100 }}
            className="absolute -bottom-10 -right-6 text-white opacity-30"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-8 sm:gap-16">
          {ImagesPro.map((img, index) => (
            <a
              key={index}
              href={img.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-all duration-300">
              <motion.div
                key={index}
                animate={{ y: [0, img.y, 0] }}
                transition={{
                  duration: img.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: img.delay,
                }}
                className="relative overflow-hidden">
                <Image
                  src={img.src}
                  alt={`Option ${index + 1}`}
                  width={300}
                  height={300}
                  className="w-16 sm:w-24 h-auto object-cover"
                />
              </motion.div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
