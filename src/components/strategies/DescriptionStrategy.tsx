'use client';

import Image from 'next/image';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

export default function DescriptionStrategy() {
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

      <div className="flex flex-1 flex-col gap-14 items-center">
        <div className="flex-1 max-w-[500px] text-pretty text-justify">
          <span className="font-bold">L&apos;application française invstore®</span> analyse votre
          situation financière <span className="font-bold">en moins de 5 minutes grâce à l’IA</span>
          , puis vous <span className="font-bold">connecte de manière anonyme</span> avec des
          experts financiers agréés (banquiers et conseillers en gestion de patrimoine
          indépendants), qui sont <span className="font-bold">mis en compétition</span> pour vous
          proposer les{' '}
          <span className="font-bold">solutions d’épargne les plus adaptées à votre besoin</span>.
        </div>

        <div className="flex flex-col items-center gap-16 md:gap-8 mb-16">
          <div className="relative max-w-xl mx-auto md:mx-0 p-4">
            <FormatQuoteIcon
              sx={{ fontSize: 100 }}
              className="absolute -top-10 -left-6 text-[#35c055] opacity-30 rotate-180"
            />
            <p className="text-2xl font-bold relative z-10 text-center md:text-left text-[#1a5d2a] leading-relaxed">
              Moins de 5 minutes pour une analyse IA gratuite de ma situation financière ?
            </p>
            <FormatQuoteIcon
              sx={{ fontSize: 100 }}
              className="absolute -bottom-10 -right-6 text-[#35c055] opacity-30"
            />
          </div>

          <div className="bg-[#35c055] rounded-lg overflow-hidden flex-shrink-0 shadow-xl transform rotate-1 transition-transform hover:rotate-0">
            <Image
              src={'/images/woman-bed-notify-min.png'}
              alt="Five minutes to analyze your financial situation"
              style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
              className="max-w-[500px]"
              width={1280}
              height={853}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
