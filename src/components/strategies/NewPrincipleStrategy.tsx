import { OpenSans, PoppinsFont, RobotoFont, SourceSansPro } from "@/utils/fonts";
import Image from "next/image";
import React from "react";
import { AppQRCode } from "../AppQRCode";

interface Principle {
  id: number;
  title: string;
  texts: string[];
  image: string;
}

const principles = [
  {
    id: 1,
    title: "Analyse IA personnalisée",
    texts: [
      "__Installez l’app__ et complétez votre profil en moins de 5 minutes.",
      "__Obtenez immédiatement un rapport IA__ pour comprendre votre situation.",
    ],
    image: "step-1.png",
  },
  {
    id: 2,
    title: "Conseils et produits adaptés",
    texts: [
      "Laissez __le monde de la finance__ vous faire des recommandations sur-mesure.",
      "__Les professionnels sont mis en compétition__ pour répondre à votre besoin.",
    ],
    image: "step-0.png",
  },
  {
    id: 3,
    title: "Contrôle de la négociation",
    texts: [
      "__Votre profil reste anonyme__ tout au long du processus.",
      "Matchez uniquement avec le ou les conseillers de votre choix, __c’est sans engagement !__",
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
  const isLast = index === principles.length - 1;

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
        <div className="aspect-square mx-auto w-full rounded-2xl max-w-[500px] bg-slate-100 border border-slate-200 p-6">
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={`/images/${principle.image}`}
              alt={principle.title}
              className="object-contain"
              fill
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

        {isLast && <AppQRCode size={160} className="mt-4 self-center hidden lg:block" />}
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
