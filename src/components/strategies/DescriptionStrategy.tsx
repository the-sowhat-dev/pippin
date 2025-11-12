'use client';

import Image from 'next/image';
import { useLanguage } from '@/i18n/LanguageProvider';
import { Title } from '@/components/Title';

export default function DescriptionStrategy() {
  const { messages } = useLanguage();

  return (
    <section className="flex items-center">
      <div className="w-full flex-1 flex flex-col sm:flex-row gap-8 p-8 sm:p-16 pt-12">
        <div className="flex basis-1/2 items-center justify-center p-6">
          <Image
            src={'/images/three_mockups.png'}
            alt="Trois mockups en un pour présentation"
            style={{
              maxHeight: '500px',
              width: '100%',
              objectFit: 'contain',
            }}
            width={800}
            height={800}
          />
        </div>

        <div className="flex basis-1/2 flex-col p-8 md:p-12 gap-8">
          <Title centered={false} text={messages.home.description.title} />
          <p className="sm:text-lg">{messages.home.description.features.accounts}</p>
          <p className="sm:text-lg">{messages.home.description.features.envelopes}</p>
          <p className="sm:text-lg">{messages.home.description.features.security}</p>
          <p className="sm:text-lg">{messages.home.description.features.personalization}</p>
          <p className="font-bold text-blue-500 sm:text-lg">
            {messages.home.description.features.free}
          </p>
        </div>
      </div>
    </section>
  );
}
