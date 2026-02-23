"use client";

import { LexendFont } from "@/utils/fonts";
import { PartnersLogosCarousel } from "./PartnersLogosCarousel";

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

          <PartnersLogosCarousel />
        </div>
      </div>
    </div>
  );
}
