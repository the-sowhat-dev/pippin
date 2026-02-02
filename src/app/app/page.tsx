'use client';

import WelcomeStrategy from '@/components/strategies/WelcomeStrategy';
import PrinciplesStrategy from '@/components/strategies/PrinciplesStrategy';
import DescriptionStrategy from '@/components/strategies/DescriptionStrategy';
import QandAStrategy from '@/components/strategies/QandAStrategy';
import FiveMinutesStrategy from '@/components/strategies/FiveMinutesStrategy';
import InvstoreStrategy from '@/components/strategies/InvstoreStrategy';
import { AppleAppStoreButton } from '@/components/AppleAppStoreButton';
import { PlayStoreButton } from '@/components/PlayStoreButton';

export default function Page() {
  return (
    <main>
      <WelcomeStrategy />

      {/* <WordsCarousel /> */}

      <DescriptionStrategy />

      <PrinciplesStrategy />

      <FiveMinutesStrategy />

      {/* DOWNLOAD BUTTON */}
      <div className="flex flex-col sm:flex-row items-center bg-gradient-to-b from-[#203649] to-[#405e79] p-4 py-8 md:p-8 gap-4 justify-center">
        {/* APPLE DOWNLOAD BUTTON */}
        <AppleAppStoreButton />
        {/* ANDROID DOWNLOAD BUTTON */}
        <PlayStoreButton />
      </div>

      <InvstoreStrategy />

      <QandAStrategy />
    </main>
  );
}
