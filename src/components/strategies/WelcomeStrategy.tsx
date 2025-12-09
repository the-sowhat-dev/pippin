'use client';

import Image from 'next/image';

import { Android, Apple } from '@mui/icons-material';
import { useLanguage } from '@/i18n/LanguageProvider';
import { PrimaryLink } from '@/components/PrimaryLink';
import { WordsCarousel } from '@/components/WordsCarousel';
import { AndroidAppStoreLink, AppleAppStoreLink } from '../../../lib/utils';

export default function WelcomeStrategy() {
  const { messages } = useLanguage();

  return (
    <section>
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
          <p className="w-[60%] text-center flex self-center pb-8 sm:text-xl text-pretty font-semibold text-white ">
            {messages.home.hero.tagline}
          </p>
          {/* APPLE DOWNLOAD BUTTON */}
          <PrimaryLink title={messages.home.hero.download.ios} link={AppleAppStoreLink}>
            <Apple fontSize="medium" />
          </PrimaryLink>

          {/* ANDROID DOWNLOAD BUTTON */}
          <PrimaryLink title={messages.home.hero.download.android} link={AndroidAppStoreLink}>
            <Android fontSize="medium" />
          </PrimaryLink>
        </div>

        <div className="flex basis-1/2 self-center justify-center items-center sm:items-end max-w-[300px] sm:max-w-[600px]">
          <Image
            src={'/images/welcome_mockup.png'}
            alt="Strategy Image"
            style={{
              maxHeight: '600px',
              width: 'auto',
              objectFit: 'contain',
            }}
            width={1100}
            height={1578}
          />
        </div>
      </div>

      <WordsCarousel />
    </section>
  );
}
