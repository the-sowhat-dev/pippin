'use client';

import Image from 'next/image';
import { AppleAppStoreButton } from '@/components/AppleAppStoreButton';
import { PlayStoreButton } from '@/components/PlayStoreButton';
import Link from 'next/link';
import { Button } from '../ui/button';
import { MousePointer } from 'lucide-react';
import { motion } from 'framer-motion';

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
  return (
    <section>
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-16 p-8 px-16  py-16 sm:py-24 m-2 sm:m-8 sm:mx-auto max-w-6xl">
        {Actions.map((action, index) => (
          <div key={index} className="flex flex-col items-center md:items-start gap-4 max-w-96">
            <div className="flex flex-col md:flex-row items-center gap-4 hover:text-green-50 transition-all duration-300">
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

      <div className='flex flex-col sm:flex-row gap-8 items-center justify-center sm:mb-16 relative'>
        <Image
          src="/images/pro-mac.png"
          alt="Actions"
          width={1622}
          height={980}
          className="w-[300px] sm:w-[700px] h-auto object-contain"
        />

        <div className="flex justify-center mb-16 relative sm:absolute bottom-0 left-0 right-0">
          <Link href="/pro/form" className="relative">
            <Button
              size="lg"
              className="text-md sm:text-lg px-8 py-6 rounded-lg bg-green-500 hover:scale-105 transition-all duration-300 hover:bg-green-600"
            >
              Nous rejoindre
            </Button>

            {/* Animated cursor icon */}
            <motion.div
              className="absolute pointer-events-none"
              animate={{
                x: [40, -10, 0],
                y: [40, -10, 0],
                scale: [1, 0.9, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
                times: [0, 0.5, 1],
              }}
              style={{
                bottom: '-20px',
                right: '-20px',
              }}
            >
              <MousePointer className="w-8 h-8 text-green-700 drop-shadow-lg" />
            </motion.div>
          </Link>
        </div>
      </div>


      <div className="flex flex-col items-center gap-8 md:gap-16 bg-[#c2e7ff] p-4 sm:p-8 py-16 sm:py-24 m-2 sm:m-8 rounded-2xl">
        <p className="text-lg sm:text-2xl font-bold relative text-center leading-relaxed max-w-xl">
          Testez l&apos;application pour vous faire votre propre avis avant le lancement des
          fonctionnalités matching dans les prochaines semaines.
        </p>

        <div className="flex flex-col md:flex-row items-center gap-4">
          <AppleAppStoreButton />
          <PlayStoreButton />
        </div>
      </div>
    </section>
  );
}
