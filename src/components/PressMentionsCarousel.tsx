'use client';

import Image from 'next/image';
import Link from 'next/link';

import { LexendFont, SourceSansPro } from '@/utils/fonts';

export type PressMentionItem = {
  url: string;
  title: string;
  imageTitle: string;
  imageSrc: string;
  width: number;
  height: number;
};

const PRESS_MENTIONS: PressMentionItem[] = [
  {
    url: 'https://www.forbes.fr/business/2026-leconomie-de-la-resilience-entre-contraintes-macroeconomiques-et-crises-sectorielles-silencieuses/',
    title: 'Forbes',
    imageTitle: 'Invstore citée parmi les startups à suivre en 2026',
    imageSrc: '/images/forbes.png',
    width: 600,
    height: 162,
  },
  {
    url: 'https://finyear.com/invstore-la-nouvelle-app-de-matching-entre-epargnants-et-conseillers-financiers',
    title: 'Finyear',
    imageTitle: 'Notre communiqué de presse',
    imageSrc: '/images/finyear.png',
    width: 702,
    height: 234,
  },
  {
    url: 'https://www.gestiondefortune.com/banque-cgp/rubriques-banque-privee/actualites/12908-invstore-lance-un-tinder-de-lepargne.html',
    title: 'Gestion de Fortune',
    imageTitle: '"Invstore lance un Tinder de l\'épargne"',
    imageSrc: '/images/gestion-de-fortune.png',
    width: 702,
    height: 234,
  },
  {
    url: 'https://www.parlonsfinance.fr/articles/invstore-lance-le-matching-epargnants-conseillers',
    title: 'Parlons Finance',
    imageTitle: 'Invstore lance le matching épargnants-conseillers',
    imageSrc: '/images/parlons-finance.png',
    width: 600,
    height: 48,
  }
];

function PressCarouselSlide({ items }: { items: PressMentionItem[] }) {
  return (
    <div className="press-carousel-slide ">
      {items.map((item) => (
        <Link
          key={item.url}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          title={item.title}
          className="press-carousel-item transition-transform duration-300 hover:scale-105"
        >
          <Image
            src={item.imageSrc}
            alt={item.title}
            width={item.width}
            height={item.height}
            className="press-carousel-image object-contain"
          />
          <span className={`text-white/70 ${SourceSansPro.className} press-carousel-caption`}>
            {item.imageTitle}
          </span>
        </Link>
      ))}
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
      </div>
    </div>
  );
}
