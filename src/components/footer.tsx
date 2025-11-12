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

      <Link
        href={
          'https://sowhat99-my.sharepoint.com/:f:/g/personal/hugo_bayoud_sowhat-app_com/EtRACoCC5M1NlaLgbXfdGhkB6po0755BznP4JILb4Z9Fyw'
        }
        className="px-8 py-2 text-black bg-gray-200"
      >
        {messages.footer.pressKit}
      </Link>
    </div>
  );
}
