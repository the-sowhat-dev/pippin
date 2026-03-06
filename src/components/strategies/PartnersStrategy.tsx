"use client";

import { LexendFont } from "@/utils/fonts";
import { PartnersLogosCarousel } from "../PartnersLogosCarousel";

export function PartnersStrategy() {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex flex-col z-0">
        <div className="w-full h-1/2 bg-white" />
        <div className="w-full h-1/2 bg-[#C2E7FF]" />
      </div>

      <div className="relative z-10 p-2 sm:p-6">
        <div
          className={`flex flex-col items-center bg-[#35C055] p-3 sm:p-10 py-8 rounded-2xl text-green-900`}>
          <div className="relative lg:max-w-xl max-w-[90%] mx-auto mb-4 md:mb-8">
            <h2
              className={`${LexendFont.className} text-xl sm:text-2xl font-bold relative text-center`}>
              Nous mettons en compétition les meilleurs conseillers en gestion de patrimoine,
              banques et fintechs pour qu'ils répondent à votre besoin
              <br />
              <span className="text-white/90">Matchez avec ceux de votre choix !</span>
            </h2>
          </div>

          <PartnersLogosCarousel row={1} direction={"left-to-right"} />
          <PartnersLogosCarousel row={2} direction={"right-to-left"} />
        </div>
      </div>
    </div>
  );
}
