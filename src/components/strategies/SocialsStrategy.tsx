'use client';

import { YouTube } from '@mui/icons-material';
import { Instagram, LinkedIn, Facebook } from '@mui/icons-material';
import { useLanguage } from '@/i18n/LanguageProvider';
import { Title } from '@/components/new/title';
import { SocialButton } from '@/components/SocialButton';

export default function SocialsStrategy() {
  const { messages } = useLanguage();

  return (
    <section className="flex flex-col gap-16 items-center p-8 py-12 sm:px-16 sm:py-24">
      <Title text={messages.home.socials.title} />

      <div className="flex w-full items-center gap-8 flex-col">
        <SocialButton
          href="https://www.facebook.com/share/9VV2yufSwGX31iXM"
          icon={<Facebook fontSize="large" className="text-[#095DFE]" />}
        >
          {messages.home.socials.facebook}
        </SocialButton>

        <SocialButton
          href="https://www.instagram.com/sowhat_app_officiel/"
          icon={<Instagram fontSize="large" style={{ color: '#F50E6A' }} />}
        >
          {messages.home.socials.instagram}
        </SocialButton>

        <SocialButton
          href="https://www.linkedin.com/company/sowhat-app/"
          icon={<LinkedIn fontSize="large" style={{ color: '#0C5CBA' }} />}
        >
          {messages.home.socials.linkedin}
        </SocialButton>

        <SocialButton
          href="https://www.youtube.com/@sowhat_app"
          icon={<YouTube fontSize="large" style={{ color: '#FF002F' }} />}
        >
          {messages.home.socials.youtube}
        </SocialButton>
      </div>
    </section>
  );
}
