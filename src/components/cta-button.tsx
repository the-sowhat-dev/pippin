'use client';

import Image from 'next/image';

import Link from 'next/link';

export function CTAButton() {
  return (
    <div className="gap-3 flex flex-col items-center">
      <Link
        href={'https://apps.apple.com/fr/app/sowhat-app/id6736385732'}
        className="flex gap-3 justify-center items-center text-md sm:text-lg bg-blue-500 rounded-md shadow-custom text-white hover:bg-blue-500/85 transition-all duration-300 py-4 px-8"
      >
        <Image
          src={'/images/apple_logo.png'}
          alt={'Apple logo'}
          width={18}
          height={18}
          style={{ objectFit: 'contain', marginTop: -4 }}
        />

        <span className="block sm:hidden">Télécharger</span>
        <span className="hidden sm:block">{`Télécharger l'application`}</span>
      </Link>
      <span className="text-md sm:text-lg text-blue-500 text-center">
        (Arrive bientôt sur Android)
      </span>
    </div>
  );
}
