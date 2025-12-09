'use client';

import { YouTube } from '@mui/icons-material';
import { Instagram, LinkedIn } from '@mui/icons-material';
import { useLanguage } from '@/i18n/LanguageProvider';
import { Title } from '@/components/Title';
import { SocialButton } from '@/components/SocialButton';

export default function SocialsStrategy() {
  const { messages } = useLanguage();

  return (
    <section className="flex flex-col gap-16 items-center p-8 py-12 sm:px-16 sm:py-24">
      <Title text={messages.home.socials.title} />

      <div className="flex w-full items-center gap-8 flex-col">
        <SocialButton
          href="https://www.instagram.com/invstore_app/"
          icon={<Instagram fontSize="large" style={{ color: '#F50E6A' }} />}
        >
          {messages.home.socials.instagram}
        </SocialButton>

        <SocialButton
          href="https://www.linkedin.com/company/invstore/"
          icon={<LinkedIn fontSize="large" style={{ color: '#0C5CBA' }} />}
        >
          {messages.home.socials.linkedin}
        </SocialButton>

        <SocialButton
          href="https://www.tiktok.com/@invstore_app "
          icon={<YouTube fontSize="large" style={{ color: '#FF002F' }} />}
        >
          {messages.home.socials.youtube}
        </SocialButton>
      </div>
    </section>
  );
}
