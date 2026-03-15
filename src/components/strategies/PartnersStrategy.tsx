"use client";

import { LexendFont } from "@/utils/fonts";
import { PartnersLogosCarousel } from "../PartnersLogosCarousel";

export function PartnersStrategy() {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex flex-col z-0">
        <div className="w-full h-1/2 bg-white" />
        <div className="w-full h-1/2 bg-white" />
      </div>

      <div className="relative z-1 p-2 sm:p-6">
        <div
          className={`flex flex-col items-center bg-[#35C055] p-3 sm:p-10 py-8 rounded-2xl text-green-900`}>
          <div className="lg:max-w-xl max-w-[90%] mb-4 md:mb-8 lg:text-center">
            <h2 className={`text-xl sm:text-2xl font-bold relative`}>
              Nous mettons en compétition les meilleurs conseillers en gestion de patrimoine,
              banques et fintechs
              <br />
              <div className="text-white/90 mt-2 text-right sm:text-left lg:text-center">
                pour vous offrir les conseils et produits les plus adaptés à votre besoin
              </div>
            </h2>
          </div>

          <PartnersLogosCarousel row={1} direction={"left-to-right"} />
          <PartnersLogosCarousel row={2} direction={"right-to-left"} />
        </div>
      </div>
    </div>
  );
}
