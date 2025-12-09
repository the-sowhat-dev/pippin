'use client';

import Image from 'next/image';
import { useLanguage } from '@/i18n/LanguageProvider';

export default function DescriptionStrategy() {
  const { messages } = useLanguage();

  return (
    <section className="flex flex-col md:flex-row items-center gap-16 md:gap-8 bg-[#C2E7FF] p-12 sm:p-16">
      <div className="flex-1">
        <Image
          src={'/images/description.svg'}
          alt="Trois mockups en un pour présentation"
          style={{ width: '100%', objectFit: 'contain' }}
          className="max-w-[400px] mx-auto"
          width={6750}
          height={14405}
        />
      </div>

      {/* Separator when flex-col */}
      <div className="block md:hidden w-full h-[1px] bg-white/50" />

      <div className="flex-1 max-w-[500px]">
        <p className="text-2xl font-bold mx-auto">L’application française invstore®</p> <br />{' '}
        analyse votre situation financière en moins de 5 minutes grâce à l’IA, puis vous connecte de
        manière anonyme avec des experts financiers agréés (banquiers et conseillers en gestion de
        patrimoine indépendants), qui sont mis en compétition pour vous proposer les solutions
        d’épargne les plus adaptées à votre besoin.
      </div>
    </section>
  );
}
