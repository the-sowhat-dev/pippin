'use client';

import WelcomeStrategy from '@/components/strategies/WelcomeStrategy';
import PrinciplesStrategy from '@/components/strategies/PrinciplesStrategy';
import DescriptionStrategy from '@/components/strategies/DescriptionStrategy';
import QandAStrategy from '@/components/strategies/QandAStrategy';
import FiveMinutesStrategy from '@/components/strategies/FiveMinutesStrategy';
import InvstoreStrategy from '@/components/strategies/InvstoreStrategy';
import { PrimaryLink } from '@/components/PrimaryLink';
import { Android, Apple } from '@mui/icons-material';
import { useLanguage } from '@/i18n/LanguageProvider';
import { AndroidAppStoreLink, AppleAppStoreLink } from '../../../lib/utils';

export default function Page() {
  const { messages } = useLanguage();

  return (
    <main>
      <WelcomeStrategy />

      <DescriptionStrategy />

      <FiveMinutesStrategy />

      {/* <BrandsListStrategy /> */}

      <PrinciplesStrategy />

      {/* DOWNLOAD BUTTON */}
      <div className="flex flex-col sm:flex-row bg-gradient-to-b from-[#203649] to-[#405e79] p-4 md:p-8 gap-4">
        {/* APPLE DOWNLOAD BUTTON */}

        <PrimaryLink darkBg={true} title={messages.home.hero.download.ios} link={AppleAppStoreLink}>
          <Apple fontSize="medium" style={{ color: '#203649' }} />
        </PrimaryLink>
        {/* ANDROID DOWNLOAD BUTTON */}
        <PrimaryLink
          darkBg={true}
          title={messages.home.hero.download.android}
          link={AndroidAppStoreLink}
        >
          <Android fontSize="medium" style={{ color: '#203649' }} />
        </PrimaryLink>
      </div>

      <InvstoreStrategy />

      <QandAStrategy />

      {/* <SocialsStrategy /> */}
    </main>
  );
}
