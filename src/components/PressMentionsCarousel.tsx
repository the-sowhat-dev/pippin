"use client";

import Image from "next/image";
import Link from "next/link";
import { LogoSoup } from "react-logo-soup";

import { LexendFont, SourceSansPro } from "@/utils/fonts";

type PressMentionItem = {
  about: string;
  alt: string;
  title: string;
  src: string;
};

const PRESS_MENTIONS: PressMentionItem[] = [
  {
    about:
      "https://www.forbes.fr/business/2026-leconomie-de-la-resilience-entre-contraintes-macroeconomiques-et-crises-sectorielles-silencieuses/",
    alt: "Forbes",
    title: "Invstore citée parmi les startups à suivre en 2026",
    src: "/images/media/forbes.png",
  },
  {
    about:
      "https://finyear.com/invstore-la-nouvelle-app-de-matching-entre-epargnants-et-conseillers-financiers",
    alt: "Finyear",
    title: "Notre communiqué de presse",
    src: "/images/media/finyear.png",
  },
  {
    about:
      "https://www.gestiondefortune.com/banque-cgp/rubriques-banque-privee/actualites/12908-invstore-lance-un-tinder-de-lepargne.html",
    alt: "Gestion de Fortune",
    title: '"Invstore lance un Tinder de l\'épargne"',
    src: "/images/media/gestion-de-fortune.png",
  },
  {
    about:
      "https://www.parlonsfinance.fr/articles/invstore-lance-le-matching-epargnants-conseillers",
    alt: "Parlons Finance",
    title: "Invstore lance le matching épargnants-conseillers",
    src: "/images/media/parlons-finance.png",
  },
  {
    about:
      "https://www.bfmtv.com/economie/replay-emissions/le-pitch/video-le-pitch-invstore-application-dediee-aux-epargnants-19-02_VN-202602190096.html",
    alt: "BFM Business",
    title: 'Invstore dans "Le Pitch" (BFM Business)',
    src: "/images/media/bfm-business.png",
  },
];

function PressCarouselSlide({ items }: { items: PressMentionItem[] }) {
  return (
    <div className="press-carousel-slide ">
      <LogoSoup
        renderImage={(logo) => {
          const logoFound = PRESS_MENTIONS.find((l) => l.alt === logo.alt);
          if (!logoFound) {
            return null;
          }
          return (
            <Link
              key={logoFound.alt}
              href={logoFound.about}
              target="_blank"
              rel="noopener noreferrer"
              title={logoFound.title}
              className="press-carousel-item transition-transform duration-300 hover:scale-105">
              <Image
                src={logo.src}
                alt={logoFound.alt}
                width={logo.width}
                height={logo.height}
                className="object-contain"
              />
              <span className={`text-white/70 ${SourceSansPro.className} press-carousel-caption`}>
                {logoFound.title}
              </span>
            </Link>
          );
        }}
        baseSize={72}
        className="flex flex-row gap-10"
        logos={PRESS_MENTIONS}
      />
    </div>
  );
}

export function PressMentionsCarousel() {
  return (
    <div className={`${LexendFont.className} press-carousel`}>
      <h2 className="mx-auto text-center text-xl sm:text-2xl font-bold relative text-white">
        Ils parlent de nous.
      </h2>
      <div className="press-carousel-track">
        <PressCarouselSlide items={PRESS_MENTIONS} />
        <PressCarouselSlide items={PRESS_MENTIONS} />
        <PressCarouselSlide items={PRESS_MENTIONS} />
        <PressCarouselSlide items={PRESS_MENTIONS} />
      </div>
    </div>
  );
}
