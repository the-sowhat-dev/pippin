"use client";

import Image from "next/image";
import { LogoSoup } from "react-logo-soup";

import { LexendFont } from "@/utils/fonts";

const PARTNERS_LOGOS = [
  { src: "/images/partners/yomoni.png", alt: "Yomoni" },
  { src: "/images/partners/prosper-conseil.png", alt: "Prosper Conseil" },
  { src: "/images/partners/baltis-conseil.png", alt: "Baltis Groupe Magelim" },
  { src: "/images/partners/green-got.png", alt: "Green Got" },
  { src: "/images/partners/la-premiere-brique.png", alt: "La Première Brique" },
  { src: "/images/partners/optivest.png", alt: "Optivest" },
  { src: "/images/partners/mon-petit-placement.png", alt: "Mon Petit Placement" },
];

function PartnerCarouselSlide() {
  return (
    <div className="partner-carousel-slide">
      <LogoSoup
        renderImage={(logo) => {
          return (
            <div key={logo.alt} className="h-[72px] w-[120px] md:w-[160px]">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                className="object-contain"
              />
            </div>
          );
        }}
        baseSize={72}
        className="flex flex-row gap-10"
        logos={PARTNERS_LOGOS}
      />
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
            <PartnerCarouselSlide />
            <PartnerCarouselSlide />
            <PartnerCarouselSlide />
            <PartnerCarouselSlide />
          </div>
        </div>
      </div>
    </div>
  );
}
