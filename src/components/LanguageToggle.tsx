'use client';

import { useLanguage } from '@/i18n/LanguageProvider';
import { Button } from '@radix-ui/themes';

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Button
      size="3"
      variant="outline"
      onClick={toggleLanguage}
      aria-label={`Switch to ${language === 'fr' ? 'English' : 'French'}`}
    >
      {language === 'fr' ? 'EN' : 'FR'}
    </Button>
  );
}
