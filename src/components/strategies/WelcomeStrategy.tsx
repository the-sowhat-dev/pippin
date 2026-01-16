'use client';

import Image from 'next/image';

import { AppleAppStoreButton } from '@/components/AppleAppStoreButton';
import { PlayStoreButton } from '@/components/PlayStoreButton';
import TrustUs from '../TrustUs';

export default function WelcomeStrategy() {
  return (
    <section className="bg-[#35c055]">
      <div className="flex items-center justify-center py-12 pt-16 sm:py-12 max-w-4xl mx-auto">
        <Image
          priority
          width={1288}
          height={500}
          src="/images/invstore.png"
          alt="Logo d'invstore®"
        />
      </div>

      <div className="w-full flex flex-1 pb-0 gap-8 flex-col sm:flex-row">
        <div className="flex flex-col gap-4 basis-1/2 justify-center">
          <div className="mx-auto flex flex-col gap-4">
            {/* APPLE DOWNLOAD BUTTON */}
            <AppleAppStoreButton />
            {/* ANDROID DOWNLOAD BUTTON */}
            <PlayStoreButton />
          </div>
        </div>

        <div className="flex basis-1/2 self-center justify-center items-center sm:items-end">
          <Image
            src={'/images/mockup_welcome.png'}
            alt="Strategy Image"
            style={{ maxHeight: '550px', objectFit: 'contain' }}
            width={419}
            height={600}
            fetchPriority="high"
          />
        </div>
      </div>

      <TrustUs />
    </section>
  );
}
