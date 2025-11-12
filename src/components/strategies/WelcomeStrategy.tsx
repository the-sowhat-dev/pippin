'use client';

import Image from 'next/image';

import { Android, Apple } from '@mui/icons-material';
import { useLanguage } from '@/i18n/LanguageProvider';
import { PrimaryLink } from '@/components/PrimaryLink';
import { WordsCarousel } from '@/components/WordsCarousel';

export default function ArticleCard() {
  const { messages } = useLanguage();

  return (
    <section>
      <div className="flex flex-col w-full gap-4 sm:gap-8 p-8 pt-28">
        <Image
          width={0}
          height={0}
          priority
          style={{
            width: '60%',
            height: 'auto',
            objectFit: 'contain',
          }}
          src="/images/font.svg"
          alt="Font Logo"
        />
        <p className="w-[60%] sm:text-xl text-pretty">{messages.home.hero.tagline}</p>
      </div>

      <div className="w-full flex flex-1 p-8 pb-0 gap-8 flex-col sm:flex-row">
        <div className="flex flex-col gap-4 basis-1/2 justify-center">
          {/* APPLE DOWNLOAD BUTTON */}
          <PrimaryLink
            title={messages.home.hero.download.ios}
            link="https://apps.apple.com/fr/app/sowhat-app/id6736385732"
          >
            <Apple fontSize="medium" />
          </PrimaryLink>

          {/* ANDROID DOWNLOAD BUTTON */}
          <PrimaryLink
            title={messages.home.hero.download.android}
            link="https://play.google.com/store/apps/details?id=com.thesowhatdev.fintech&pcampaignid=web_share"
          >
            <Android fontSize="medium" />
          </PrimaryLink>
        </div>

        <div className="flex basis-1/2 self-center justify-center items-center sm:items-end max-w-[300px] sm:max-w-[600px]">
          <Image
            src={'/images/mockup_nous_3.png'}
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
