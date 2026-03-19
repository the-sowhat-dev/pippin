"use client";

import { PoppinsFont } from "@/utils/fonts";
import { PartnersLogosCarousel } from "../PartnersLogosCarousel";

export function PartnersStrategy() {
  return (
    <section className="flex flex-col items-center">
      <div className="flex flex-col flex-1 w-full">
        <div className="px-6 max-w-6xl mx-auto flex flex-col gap-4 my-24 w-full">
          <h2
            className={`${PoppinsFont.className} text-5xl text-[50px] text-green-900 max-w-[750px] font-bold`}>
            Conseillers en gestion de patrimoine, banques, fintechs
          </h2>

          <h3
            className={`${PoppinsFont.className} text-xl lg:text-2xl lg:text-[25px] max-w-[750px] text-green-950`}>
            Accèdez gratuitement à plus de 30 experts
          </h3>
        </div>

        <div className="py-12 mb-12 lg:mb-24">
          <PartnersLogosCarousel row={1} direction={"left-to-right"} />
          <PartnersLogosCarousel row={2} direction={"right-to-left"} />
        </div>
      </div>
    </section>
  );
}
