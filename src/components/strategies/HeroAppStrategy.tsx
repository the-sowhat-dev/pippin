"use client";

import Image from "next/image";

import { NunitoFont } from "@/utils/fonts";
import { AppStoreButtons } from "@/components/AppStoreButtons";

const words = [
  "Assurance-vie",
  "|",
  "Bourse",
  "|",
  "PER",
  "|",
  "Défiscalisation",
  "|",
  "Bilan patrimonial",
  "|",
  "PEA",
  "|",
  "Retraite",
  "|",
  "Transmission",
  "|",
];

export function HeroAppStrategy() {
  return (
    <section className="relative">
      {/* Top Part: Logo & Space for Header */}
      <div className="min-h-[25vh] lg:min-h-[35vh] bg-[#35c055] flex items-center justify-center pt-16 lg:pt-4 pb-8 lg:pb-0 px-4">
        {/* Logo Column */}
        <div className="basis-2/3 flex justify-center">
          <Image
            src="/images/invstore.svg"
            alt="Invstore Logo"
            width={810}
            height={165}
            priority
            className="max-w-[320px] lg:max-w-[550px] h-auto"
          />
        </div>

        {/* Space for Mockup on Desktop */}
        <div className="hidden lg:block basis-1/2 h-2 w-full" />
      </div>

      <div className="bg-green-200 h-[4vh] lg:h-[3vh] items-center justify-start px-2 lg:px-4 flex overflow-hidden">
        {words.map((word, index) => (
          <span
            key={`${word}-${index}`}
            className={`text-green-950 ${word === "|" ? "opacity-30" : "opacity-70"} text-sm lg:text-base px-2 lg:px-4 whitespace-nowrap`}>
            {word}
          </span>
        ))}
        {words.map((word, index) => (
          <span
            key={`${word}-${index}`}
            className={`text-green-950 ${word === "|" ? "opacity-30" : "opacity-70"} text-sm lg:text-base px-2 lg:px-4 whitespace-nowrap`}>
            {word}
          </span>
        ))}
      </div>

      <div className="min-h-[30vh] lg:min-h-[45vh] flex items-center justify-center pt-2 lg:pt-4 px-2 lg:px-4">
        {/* Text and Buttons Column */}
        <div className="flex flex-col items-center lg:basis-1/2 gap-4 lg:gap-8">
          <h1 className={`${NunitoFont.className} text-2xl lg:text-3xl text-center`}>
            vous n&apos;avez pas le temps
            <br />
            <span className="font-bold block mt-1 lg:mt-2">de vous occuper de votre argent ?</span>
          </h1>

          <AppStoreButtons layout="column" />
        </div>

        {/* Space for Mockup on Desktop */}
        <div className="hidden lg:block basis-1/2 w-full" />
      </div>

      {/* Bottom Part: Text & Buttons & Mockup */}
      <div className="relative lg:absolute lg:bottom-0 lg:left-0 lg:right-0 lg:top-0 flex flex-row items-center justify-center">
        <div className="hidden lg:block basis-1/2 w-full" />

        {/* Positioned mockup: absolute on desktop, relative on mobile */}
        <div className="h-full basis-1/2 flex items-center justify-center mt-10 lg:mt-20">
          <Image
            src="/images/mockup-welcome.png"
            alt="Invstore App Mockup"
            width={747}
            height={970}
            priority
            className="max-w-[360px] lg:max-w-[500px] drop-shadow-xl"
          />
        </div>
      </div>
    </section>
  );
}
