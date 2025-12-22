'use client';

import WelcomeStrategy from '@/components/strategies/WelcomeStrategy';
import PrinciplesStrategy from '@/components/strategies/PrinciplesStrategy';
import DescriptionStrategy from '@/components/strategies/DescriptionStrategy';
import QandAStrategy from '@/components/strategies/QandAStrategy';
import FiveMinutesStrategy from '@/components/strategies/FiveMinutesStrategy';
import InvstoreStrategy from '@/components/strategies/InvstoreStrategy';
import { useLanguage } from '@/i18n/LanguageProvider';
import { AppleAppStoreButton } from '@/components/AppleAppStoreButton';
import { PlayStoreButton } from '@/components/PlayStoreButton';

export default function Page() {
  const { messages } = useLanguage();

  return (
    <main>
      <WelcomeStrategy />

      <DescriptionStrategy />

      <FiveMinutesStrategy />

      <PrinciplesStrategy />

      {/* DOWNLOAD BUTTON */}
      <div className="flex flex-col sm:flex-row bg-gradient-to-b from-[#203649] to-[#405e79] p-4 md:p-8 gap-4 justify-center">
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
