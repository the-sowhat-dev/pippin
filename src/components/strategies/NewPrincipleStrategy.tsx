import { OpenSans, PoppinsFont, RobotoFont, SourceSansPro } from "@/utils/fonts";
import Image from "next/image";
import React from "react";

interface Principle {
  id: number;
  title: string;
  texts: string[];
  image: string;
}

const principles = [
  {
    id: 1,
    title: "Analyse IA personnalisée en 5 minutes",
    texts: [
      "__Installez l’app__ et complétez votre profil en quelques minutes.",
      "__Obtenez une analyse IA immédiate__ pour optimiser votre situation.",
    ],
    image: "step-1.png",
  },
  {
    id: 2,
    title: "Recommandations et offres de produits adaptés",
    texts: [
      "__L’algorithme invstore®__ vous connecte aux meilleures opportunités, en toute confidentialité.",
      "__Des recommandations ou offres sur-mesure__ envoyées directement dans votre application.",
    ],
    image: "step-0.png",
  },
  {
    id: 3,
    title: "Contrôle de la négociation",
    texts: [
      "__Choisissez avec qui échanger__ selon les meilleures réponses.",
      "__Choisissez votre conseiller__ et avancez pas à pas.",
    ],
    image: "step-3.png",
  },
];

function RichText({ text }: { text: string }) {
  // Format: "__highlight__ normal __highlight__"
  const parts = text.split(/(__.*?__)/g).filter(Boolean);

  return (
    <span>
      {parts.map((part, idx) => {
        const isHighlighted = part.startsWith("__") && part.endsWith("__");
        const content = isHighlighted ? part.slice(2, -2) : part;

        return (
          <span key={idx} className={isHighlighted ? "text-green-800" : "text-gray-900/40"}>
            {content}
          </span>
        );
      })}
    </span>
  );
}

const PrincipleCard = ({ principle, index }: { principle: Principle; index: number }) => {
  // Alternate layout on lg+ (2nd, 4th, ... cards)
  const isAlternate = index % 2 === 1;

  return (
    <div className="grid grid-cols-1 gap-6 py-10 lg:grid-cols-2 lg:items-start">
      {/* Title */}
      <h2
        className={`${PoppinsFont.className} px-6 text-4xl font-bold text-black lg:text-5xl lg:text-[50px] lg:row-start-1 max-w-[750px] ${
          isAlternate ? "lg:col-start-2" : "lg:col-start-1"
        }`}>
        {principle.title}
      </h2>

      {/* Image: square wrapper, positioned between title & texts on mobile, right side on lg+ */}
      <div
        className={`px-6 lg:row-start-1 lg:row-span-2 ${
          isAlternate ? "lg:col-start-1" : "lg:col-start-2"
        }`}>
        <div className="aspect-square w-full rounded-2xl bg-slate-100 border border-slate-200 p-6">
          <div className="relative h-full w-full">
            <Image
              src={`/images/${principle.image}`}
              alt={principle.title}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* Texts */}
      <div
        className={`flex flex-col gap-4 px-6 lg:row-start-2 max-w-[750px] ${
          isAlternate ? "lg:col-start-2" : "lg:col-start-1"
        }`}>
        {principle.texts.map((t, idx) => (
          <p key={idx} className={`${SourceSansPro.className} text-lg lg:text-xl font-bold`}>
            <RichText text={t} />
          </p>
        ))}
      </div>
    </div>
  );
};

export const NewPrincipleStrategy = () => {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto flex flex-col gap-2 lg:gap-12">
        {principles.map((principle, index) => (
          <PrincipleCard key={principle.id} principle={principle} index={index} />
        ))}
      </div>
    </section>
  );
};
