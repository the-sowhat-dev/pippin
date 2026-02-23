"use client";

import Image from "next/image";
import Link from "next/link";

import { LexendFont, SourceSansPro } from "@/utils/fonts";

type PressMentionItem = {
  about: string;
  alt: string;
  title: string;
  src: string;
};

const PressMentions: PressMentionItem[] = [
  {
    about:
      "https://www.forbes.fr/business/2026-leconomie-de-la-resilience-entre-contraintes-macroeconomiques-et-crises-sectorielles-silencieuses/",
    alt: "Forbes",
    title: "Invstore citée parmi les startups à suivre en 2026",
    src: "/images/media-mentions/forbes.png",
  },
  {
    about:
      "https://finyear.com/invstore-la-nouvelle-app-de-matching-entre-epargnants-et-conseillers-financiers",
    alt: "Finyear",
    title: "Notre communiqué de presse",
    src: "/images/media-mentions/finyear.png",
  },
  {
    about:
      "https://www.gestiondefortune.com/banque-cgp/rubriques-banque-privee/actualites/12908-invstore-lance-un-tinder-de-lepargne.html",
    alt: "Gestion de Fortune",
    title: '"Invstore lance un Tinder de l\'épargne"',
    src: "/images/media-mentions/gestion-de-fortune.png",
  },
  {
    about:
      "https://www.parlonsfinance.fr/articles/invstore-lance-le-matching-epargnants-conseillers",
    alt: "Parlons Finance",
    title: "Invstore lance le matching épargnants-conseillers",
    src: "/images/media-mentions/parlons-finance.png",
  },
  {
    about:
      "https://www.bfmtv.com/economie/replay-emissions/le-pitch/video-le-pitch-invstore-application-dediee-aux-epargnants-19-02_VN-202602190096.html",
    alt: "BFM Business",
    title: 'Invstore dans "Le Pitch" (BFM Business)',
    src: "/images/media-mentions/bfm-business.png",
  },
];

const PressMentionsItems = () => {
  return (
    <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
      {PressMentions.map((partner) => (
        <li key={partner.alt} className="transition-transform duration-300 hover:scale-105">
          <Link
            href={partner.about}
            target="_blank"
            rel="noopener noreferrer"
            title={partner.title}>
            <Image
              src={partner.src}
              alt={partner.alt}
              width={300}
              height={200}
              className="object-contain w-[150px] md:w-[170px]"
            />
            <p
              className={`text-white/70 ${SourceSansPro.className} text-sm md:text-base text-center mt-2`}>
              {partner.title}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export function PressMentionsCarousel() {
  return (
    <div
      className={`${LexendFont.className} space-y-10 p-4 pb-8 sm:p-8 bg-gradient-to-b from-[#203649] to-[#405e79]`}>
      <h2 className="mx-auto text-center text-xl sm:text-2xl font-bold relative text-white">
        Ils parlent de nous.
      </h2>
      <div className="w-full inline-flex flex-nowrap overflow-hidden">
        <PressMentionsItems />
        <PressMentionsItems />
      </div>
    </div>
  );
}
