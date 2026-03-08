"use client";

import Image from "next/image";

const steps = [
  { number: "1️⃣", text: "quel que soit le montant que vous souhaitez investir" },
  { number: "2️⃣", text: "vous complétez votre profil en quelques minutes" },
  { number: "3️⃣", text: "nous l'anonymisons pour vous protéger" },
  { number: "4️⃣", text: "Les spécialistes de l'épargne et du patrimoine sont mis en compétition" },
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
            unoptimized
          />
        </div>

        {/* Separator when flex-col */}
        <div className="block md:hidden w-full h-[1px] bg-white/50" />

        <div className="flex flex-col gap-14 items-center md:basis-1/2">
          <div className="md:max-w-[600px]">
            <p className="text-justify text-pretty">
              L&apos;application française invstore® reprend
              <span className="font-bold"> les codes des applications de rencontre</span> – associés
              à l&apos;intelligence artificielle – pour
              <span className="font-bold">
                {" "}
                faciliter l’accès aux conseillers financiers spécialisés :
              </span>
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
    </section>
  );
}
