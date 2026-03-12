"use client";

import Image from "next/image";

import { NunitoFont, OpenSans, SourceSansPro } from "@/utils/fonts";
import { AppStoreButtons } from "@/components/AppStoreButtons";
import { QuoteIcon } from "lucide-react";

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
    <section className="relative min-h-screen">
      {/* Top Part: Logo & Space for Header */}
      <div className="min-h-[25vh] lg:min-h-[35vh] bg-[#35c055] flex items-center justify-center pt-16 lg:pt-4 pb-8 lg:pb-0 px-4">
        {/* Logo Column */}
        <div className="basis-2/3 flex justify-center">
          {/* <Image
            src="/images/invstore.svg"
            alt="Invstore Logo"
            width={810}
            height={165}
            priority
            className="max-w-[320px] lg:max-w-[550px] h-auto"
          /> */}
          <span
            className={`${SourceSansPro.className} text-4xl lg:text-6xl text-center text-white`}>
            La première{" "}
            <span className="font-bold">
              marketplace <br /> patrimoniale
            </span>{" "}
            française
          </span>
        </div>

        {/* Space for Mockup on Desktop */}
        <div className="hidden lg:block basis-1/2 h-2 w-full" />
      </div>

      <div className="bg-white h-[4vh] items-center justify-start px-2 text-xl lg:text-2xl lg:px-4 flex overflow-hidden">
        {words.map((word, index) => (
          <span
            key={`${word}-${index}`}
            className={`${word === "|" ? "opacity-30" : "opacity-100"} px-2 lg:px-4 whitespace-nowrap`}>
            {word}
          </span>
        ))}
        {words.map((word, index) => (
          <span
            key={`${word}-${index}`}
            className={`${word === "|" ? "opacity-30" : "opacity-100"} px-2 lg:px-4 whitespace-nowrap`}>
            {word}
          </span>
        ))}
      </div>

      <div className="min-h-[30vh] lg:min-h-[45vh] flex items-center justify-center pt-2 lg:pt-4 px-2 lg:px-4">
        {/* Text and Buttons Column */}
        <div className="flex flex-col items-center lg:basis-1/2 gap-4 lg:gap-8">
          <div className="relative lg:max-w-xl mx-auto max-w-[90%] mt-8 mb-8">
            <QuoteIcon
              fill="#1d4ed8"
              className="absolute w-10 h-10 lg:w-20 lg:h-20 -top-4 lg:-top-12 -left-4 lg:-left-12 text-blue-700 opacity-30 rotate-180"
            />

            <h2 className={`${OpenSans.className} text-xl lg:text-3xl text-center`}>
              <span className={"font-bold"}>Matchez avec le monde de la finance</span>
              <br />
              <span>dans l&apos;application !</span>
            </h2>

            <QuoteIcon
              width={100}
              height={100}
              fill="#1d4ed8"
              className="absolute w-10 h-10 lg:w-20 lg:h-20 -bottom-4 lg:-bottom-12 -right-4 lg:-right-12 text-blue-700 opacity-30"
            />
          </div>
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
