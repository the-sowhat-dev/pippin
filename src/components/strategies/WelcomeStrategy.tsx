'use client';

import Image from 'next/image';

import { WordsCarousel } from '@/components/WordsCarousel';
import { AppleAppStoreButton } from '@/components/AppleAppStoreButton';
import { PlayStoreButton } from '@/components/PlayStoreButton';

export default function WelcomeStrategy() {
  return (
    <section className="bg-[#35c055]">
      <div className="flex items-center justify-center py-12 pt-16 sm:py-12">
        <Image
          priority
          width={1000}
          height={1000}
          style={{
            width: '60%',
            height: 'auto',
            objectFit: 'contain',
          }}
          src="/images/invstore.png"
          alt="Font Logo"
        />
      </div>

      <div className="w-full flex flex-1 p-8 pb-0 gap-8 flex-col sm:flex-row">
        <div className="flex flex-col gap-4 basis-1/2 justify-center">
          <h1 className="w-[60%] text-center self-center pb-8 sm:text-xl text-pretty text-white">
            Notre <span className="font-bold">IA fait matcher chaque profil</span> avec les
            meilleurs experts et opportunités
          </h1>
          {/* APPLE DOWNLOAD BUTTON */}
          <AppleAppStoreButton className="mx-auto" />
          {/* ANDROID DOWNLOAD BUTTON */}
          <PlayStoreButton className="mx-auto" />
        </div>

        <div className="flex basis-1/2 self-center justify-center items-center sm:items-end">
          <Image
            src={'/images/mockup_welcome.png'}
            alt="Strategy Image"
            style={{ maxHeight: '500px', objectFit: 'contain' }}
            width={419}
            height={600}
            fetchPriority="high"
          />
        </div>
      </div>

      <WordsCarousel />
    </section>
  );
}
