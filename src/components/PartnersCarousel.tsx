"use client";

import Image from "next/image";

import { LexendFont } from "@/utils/fonts";

const PartnerLogos = [
  {
    src: "/images/yomoni.png",
    alt: "Yomoni",
    width: 300,
    height: 150,
  },
  {
    src: "/images/prosper-conseil.png",
    alt: "Prosper Conseil",
    width: 300,
    height: 150,
  },
  {
    src: "/images/baltis-conseil.png",
    alt: "Baltis Groupe Magelim",
    width: 300,
    height: 150,
  },
  {
    src: "/images/green-got.png",
    alt: "Green Got",
    width: 300,
    height: 150,
  },
];

function PartnerCarouselSlide({ items }: { items: typeof PartnerLogos }) {
  return (
    <div className="partner-carousel-slide">
      {items.map((logo, index) => (
        <div key={index} className="inline-flex items-center justify-center w-[200px]">
          <Image
            src={logo.src}
            alt={logo.alt}
            width={logo.width * 2}
            height={logo.height * 2}
            className="object-contain"
          />
        </div>
      ))}
    </div>
  );
}

export function PartnersCarousel() {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex flex-col z-0">
        <div className="w-full h-1/2 bg-white" />
        <div className="w-full h-1/2 bg-[#C2E7FF]" />
      </div>

      <div className="relative z-10 p-2 sm:p-6">
        <div
          className={`flex flex-col items-center bg-[#35C055] gap-4 md:gap-10 p-3 sm:p-10 py-8 rounded-2xl text-green-900`}>
          <div className="relative lg:max-w-xl max-w-[90%] mx-auto">
            <h2
              className={`${LexendFont.className} text-xl sm:text-2xl font-bold relative text-center`}>
              Leurs experts sont en compétition pour répondre à vos besoins
              <br />
              <span className="text-white/90">Matchez avec nos partenaires pilotes</span>
            </h2>
          </div>

          <div className="partner-carousel-track w-full">
            <PartnerCarouselSlide items={PartnerLogos} />
            <PartnerCarouselSlide items={PartnerLogos} />
          </div>
        </div>
      </div>
    </div>
  );
}
