'use client';

import Link from 'next/link';
import { useLanguage } from '@/i18n/LanguageProvider';

export function Footer() {
  const { messages } = useLanguage();

  return (
    <div className="w-full bg-black flex flex-col sm:flex-row gap-12 justify-between text-white items-center p-8 sm:px-16">
      <Link href={'/legal'} target="_blank" rel="noopener noreferrer" className="text-sm underline">
        {messages.footer.legal}
      </Link>
    </div>
  );
}
