"use client";

import { useRef, type MouseEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import {
  Speed,
  Verified,
  Handshake,
  Balance,
  MoneyOff,
  AccountBalance,
  Instagram,
  LinkedIn,
} from "@mui/icons-material";
import { Title } from "../Title";
import DescriptionProStrategy from "./DescriptionProStrategy";
import { LexendFont } from "@/utils/fonts";

const items = [
  {
    textBefore: "J'ai accès en ",
    highlight: "moins de 5 minutes",
    textAfter: " à une analyse IA de ma situation",
    Icon: Speed,
    gradient: "from-[#203649] to-[#405E79]",
    glowColor: "59, 130, 246",
    span: "md:col-span-1",
  },
  {
    textBefore: "Je récupère le pouvoir de la négociation : ici c'est la finance qui ",
    highlight: "se bat pour moi",
    textAfter: ", pas l'inverse",
    Icon: Handshake,
    gradient: "from-[#35C055] to-[#86f0ad]",
    glowColor: "16, 185, 129",
    span: "md:col-span-2",
  },
  {
    textBefore: "invstore® ne vend pas de produits financiers : son algorithme n'a ",
    highlight: "aucun intérêt à m'orienter",
    textAfter: " vers un conseiller ou un produit en particulier",
    Icon: Balance,
    gradient: "from-[#35C055] to-[#86f0ad]",
    glowColor: "16, 185, 129",
    span: "md:col-span-2",
  },
  {
    textBefore: "Tout est ",
    highlight: "gratuit pour moi",
    textAfter: ", ce sont les experts financiers qui payent",
    Icon: MoneyOff,
    gradient: "from-[#3264AC] to-[#79D1FB]",
    glowColor: "59, 130, 246",
    span: "md:col-span-1",
  },
  {
    textBefore: "Je peux aussi gagner du temps en gérant ",
    highlight: "tous mes comptes bancaires",
    textAfter: " depuis une seule application",
    Icon: AccountBalance,
    gradient: "from-[#3264AC] to-[#79D1FB]",
    glowColor: "59, 130, 246",
    span: "md:col-span-2",
  },
  {
    textBefore: "Quel que soit ce que signifie « gagner mieux » pour moi, ",
    highlight: "invstore® répond à mon besoin",
    textAfter: "",
    Icon: Verified,
    gradient: "from-[#203649] to-[#405E79]",
    glowColor: "59, 130, 246",
    span: "md:col-span-1",
  },
];

function GlowCard({ item, index }: { item: (typeof items)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  const background = useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, rgba(${item.glowColor}, 0.12), transparent 80%)`;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        delay: index * 0.12,
        type: "spring",
        stiffness: 80,
        damping: 15,
      }}
      className={`relative group rounded-2xl border border-white/50 bg-white/60 backdrop-blur-xl p-8 ${item.span} overflow-hidden cursor-default transition-[border-color,box-shadow] duration-500 hover:border-white/90 hover:shadow-2xl hover:shadow-blue-200/30`}>
      {/* Mouse-tracking glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background }}
      />

      {/* Gradient accent line */}
      <div
        className={`absolute left-0 right-0 top-0 h-[3px] bg-gradient-to-r ${item.gradient} opacity-0 transition-all duration-500 group-hover:opacity-100`}
      />

      {/* Floating icon */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: 3 + index * 0.3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="mb-5">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${item.gradient} shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:shadow-xl`}>
          <item.Icon sx={{ fontSize: 28 }} className="text-white" />
        </div>
      </motion.div>

      {/* Text with highlighted key phrase */}
      <div className="relative">
        <p className="text-lg leading-relaxed text-gray-700">
          {item.textBefore}
          <span
            className={`font-bold bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}>
            {item.highlight}
          </span>
          {item.textAfter}
        </p>
      </div>
    </motion.div>
  );
}

export default function InvstoreStrategy() {
  return (
    <>
      <section className="relative bg-[#C2E7FF] px-4 py-16 sm:px-8 flex flex-col gap-10 sm:gap-16 overflow-hidden">
        {/* Decorative background blobs for depth */}
        <div className="pointer-events-none absolute -left-40 -top-40 h-80 w-80 rounded-full bg-blue-300/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-cyan-300/30 blur-3xl" />

        <Title id="why-join" text="Pourquoi rejoindre l'expérience invstore® ?" />

        <div className="relative mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {items.map((item, index) => (
              <GlowCard key={index} item={item} index={index} />
            ))}
          </div>
        </div>

        <DescriptionProStrategy theme="blue" />
      </section>

      {/* Social section */}
      <div className="relative bg-gradient-to-b from-[#203649] to-[#405e79] p-4 py-8 md:p-8 overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/10 blur-3xl" />

        <div className="relative flex flex-col sm:flex-row max-w-4xl gap-8 mx-auto justify-between items-center">
          <p className="text-base sm:text-lg text-center text-white">
            Suivez-nous sur{" "}
            <span className={`${LexendFont.className} text-green-100`}>les réseaux</span> pour plus
            d&apos;informations.
          </p>
          <div className="flex gap-4">
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.instagram.com/invstore_app/"
              className="group relative flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-pink-500/20">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-500 to-orange-400 opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
              <Instagram fontSize="large" style={{ color: "#F50E6A" }} />
            </Link>

            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/company/invstore/"
              className="group relative flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-blue-500/20">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
              <LinkedIn fontSize="large" style={{ color: "#0C5CBA" }} />
            </Link>

            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.tiktok.com/@invstore_app"
              className="group relative flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-gray-500/20">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-800 to-gray-600 opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
              <Image
                width={28}
                height={28}
                style={{ objectFit: "contain" }}
                src="/icons/tiktok.svg"
                alt="TikTok icon"
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
