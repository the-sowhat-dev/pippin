'use client';

import { useLanguage } from '@/i18n/LanguageProvider';

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="px-3 py-1 rounded-md text-sm font-medium transition-colors hover:bg-white/10"
      aria-label={`Switch to ${language === 'fr' ? 'English' : 'French'}`}
    >
      {language === 'fr' ? 'EN' : 'FR'}
    </button>
  );
}
