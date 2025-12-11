'use client';

import { Android, Apple } from '@mui/icons-material';
import Image from 'next/image';
import { PrimaryLink } from '../PrimaryLink';
import { useLanguage } from '@/i18n/LanguageProvider';
import { AndroidAppStoreLink, AppleAppStoreLink } from '../../../lib/utils';

const Actions = [
  {
    image: '/icons/phone.svg',
    title: 'Découvrez des leads pré-qualifiés',
    description:
      'Accédez à une source de prospects dont les besoins financiers sont clairement identifiés.',
  },
  {
    image: '/icons/bow.svg',
    title: 'Ciblez les profils qui vous intéressent',
    description:
      "Filtrez les utilisateurs en fonction de leur situation financière et des produits qu'ils recherchent.",
  },
  {
    image: '/icons/lead.svg',
    title: 'Obtenez de nouveaux clients',
    description: 'Affinez votre offre et engagez la conversation directement sur la plateforme.',
  },
];

export default function ActionsStrategy() {
  const { messages } = useLanguage();

  return (
    <section>
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-16 p-8 px-16  py-16 sm:py-24 m-2 sm:m-8 sm:mx-auto max-w-6xl">
        {Actions.map((action, index) => (
          <div key={index} className="flex flex-col items-center md:items-start gap-4 max-w-96">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <Image
                src={action.image}
                alt={action.title}
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <h3 className="font-bold text-[#203649] text-lg sm:text-xl text-center md:text-left">
                {action.title}
              </h3>
            </div>
            <p className="text-[#203649] opacity-70 text-center md:text-left">
              {action.description}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-8 md:gap-16 bg-[#c2e7ff] p-4 sm:p-8 py-16 sm:py-24 m-2 sm:m-8 rounded-2xl">
        <p className="text-lg sm:text-2xl font-bold relative z-10 text-center leading-relaxed max-w-xl">
          Testez l&apos;application pour vous faire votre propre avis avant le lancement des
          fonctionnalités matching d&apos;ici la fin d&apos;année
        </p>

        <div className="flex flex-col md:flex-row items-center gap-4">
          <PrimaryLink title={messages.home.hero.download.ios} link={AppleAppStoreLink}>
            <Apple fontSize="medium" />
          </PrimaryLink>
          <PrimaryLink title={messages.home.hero.download.android} link={AndroidAppStoreLink}>
            <Android fontSize="medium" />
          </PrimaryLink>
        </div>
      </div>
    </section>
  );
}
