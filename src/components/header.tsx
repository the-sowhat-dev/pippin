'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Button } from '@radix-ui/themes';

import { LanguageToggle } from './LanguageToggle';
import { useLanguage } from '@/i18n/LanguageProvider';
import { ContactButtonWithDialog } from '@/components/ContactButtonWithDialog';

export default function Header() {
  const pathname = usePathname();
  const isArticlesPage = pathname.startsWith('/blog/a/');
  const isBlogPage = pathname === '/blog';
  const isAppPage = pathname.startsWith('/app');
  const isAdvicePage = pathname === '/advices';
  const { messages } = useLanguage();

  if (isAdvicePage) return null;

  const showLogo = isArticlesPage || isBlogPage || isAppPage;

  return (
    <div className="fixed px-8 sm:px-16 text-sm justify-between sm:text-base p-4 gap-4 sm:gap-8 top-0 w-full flex bg-white/05 backdrop-blur-sm z-10">
      {/* Show logo on articles, blog, and app pages */}
      {showLogo && (
        <Link href={'/app'}>
          <Image
            src={'/images/logo-blanc.png'}
            alt="Logo"
            style={{
              width: 'auto',
              objectFit: 'contain',
            }}
            className="max-h-[30px] sm:max-h-[40px]"
            width={1100}
            height={1578}
          />
        </Link>
      )}

      {/* Right-side content with flex-grow when no logo */}
      <div
        className={`flex gap-4 sm:gap-8 items-center ${!showLogo ? 'flex-grow justify-end' : ''}`}
      >
        {/* Show Home link on blog pages */}
        {(isBlogPage || isArticlesPage) && (
          <Link href={'/app'}>
            <Button size="3" variant="ghost" className="hover:bg-gray-200/20">
              Accueil
            </Button>
          </Link>
        )}

        {/* Must use <a/> instead of `next/link` bc <Link/> does not scroll to the top... */}
        <a href={'/blog'}>
          <Button
            size="3"
            variant="solid"
            className="bg-gray-200 text-gray-900 hover:bg-gray-200/85"
          >
            {messages.header.articles}
          </Button>
        </a>

        {!isArticlesPage && <ContactButtonWithDialog />}

        {!isArticlesPage && !isBlogPage && <LanguageToggle />}
      </div>
    </div>
  );
}
