"use client";

import Image from "next/image";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import { LexendFont } from "@/utils/fonts";

const steps = [
  { number: "1️⃣", text: "quel que soit le montant que vous souhaitez investir" },
  { number: "2️⃣", text: "vous complétez votre profil en quelques minutes" },
  { number: "3️⃣", text: "nous l'anonymisons pour vous protéger" },
  { number: "4️⃣", text: "les experts (CGP, banque, fintech) sont mis en compétition" },
  { number: "5️⃣", text: "ce sont eux qui viennent à vous directement dans l'application" },
  { number: "6️⃣", text: "vous matchez avec celui ou ceux qui répondent le mieux à votre besoin" },
];

export function DescriptionStrategy() {
  return (
    <section className="bg-[#C2E7FF] text-base md:text-[19px]">
      <div className="flex flex-col md:flex-row items-center gap-16 md:gap-8 p-12 sm:p-16 sm:pb-24 ">
        <div className="md:basis-1/2">
          <Image
            src={"/images/description.svg"}
            alt="Trois mockups en un pour présentation"
            style={{ width: "100%", objectFit: "contain" }}
            className="max-w-[400px] mx-auto"
            width={6750}
            height={14405}
          />
        </div>

        {/* Separator when flex-col */}
        <div className="block md:hidden w-full h-[1px] bg-white/50" />

        <div className="flex flex-col gap-14 items-center md:basis-1/2">
          <div className="md:max-w-[600px]">
            <p className="text-justify text-pretty">
              <span className="font-bold">L&apos;application française invstore®</span> transforme
              l&apos;
              <span className="font-bold">expérience d'achat des produits d'épargne</span> en
              facilitant l'accès des particuliers aux conseillers financiers spécialisés.
            </p>

            <br />

            <p className="text-pretty text-justify">
              Elle reprend les codes des applications de rencontre – associés à l&apos;Intelligence
              Artificielle – pour repenser votre parcours client :
            </p>

            <br />

            <div className="flex flex-col gap-4">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="group flex items-start gap-3 p-4 rounded-lg transition-all duration-300 hover:bg-white hover:shadow-md hover:scale-[1.02]">
                  <span className="text-2xl flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                    {step.number}
                  </span>
                  <p className="leading-relaxed text-gray-700">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quote */}
      <div className="p-2">
        <div className="relative lg:max-w-2xl mx-auto max-w-[90%] mt-8 lg:mt-10 mb-16 lg:mb-48">
          <FormatQuoteIcon
            sx={{ fontSize: 100 }}
            className="absolute -top-12 -left-6 md:left-6 lg:-left-6 text-blue-700 opacity-30 rotate-180"
          />

          <h2 className={`${LexendFont.className} text-xl lg:text-3xl text-center text-blue-950`}>
            L&apos;application de ceux qui n&apos;ont pas le temps de s&apos;occuper de leur argent.
          </h2>

          <FormatQuoteIcon
            sx={{ fontSize: 100 }}
            className="absolute -bottom-12 -right-6 md:right-6 lg:-right-6 text-blue-700 opacity-30"
          />
        </div>
      </div>
    </section>
  );
}
