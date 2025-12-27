'use client';

import { usePathname } from 'next/navigation';
import { Button } from '@radix-ui/themes';

import { useLanguage } from '@/i18n/LanguageProvider';
import { ContactButtonWithDialog } from '@/components/ContactButtonWithDialog';
import { InvLogo } from '@/components/InvLogo';

export default function Header() {
  const pathname = usePathname();
  const isArticlesPage = pathname.startsWith('/blog/a/');
  const isBlogPage = pathname === '/blog';
  const isAppPage = pathname.startsWith('/app');
  const isAdvicePage = pathname === '/advices';
  const isLegalPage = pathname.startsWith('/app/legal') || pathname === '/legal';
  const { messages } = useLanguage();
  const isProPage = pathname === '/pro';
  const isFAQPage = pathname === '/app/faq';

  if (isAdvicePage) return null;

  const showLogo =
    isArticlesPage || isBlogPage || isAppPage || isLegalPage || isProPage || isFAQPage;
  const brightBackground = isArticlesPage || isBlogPage || isFAQPage;

  return (
    <header className="fixed px-4 sm:px-16 text-sm justify-between sm:text-base p-4 gap-4 sm:gap-8 top-0 w-full flex bg-white/05 backdrop-blur-sm z-10">
      {/* Show logo on articles, blog, and app pages */}
      {showLogo && (
        <a href={'/app'} key="logo" className="hidden sm:block">
          <InvLogo
            className={`max-h-[30px] sm:max-h-[30px] w-auto ${brightBackground ? 'text-green-500' : 'text-white'}`}
          />
        </a>
      )}

      <nav
        className={`flex gap-4 sm:gap-8 items-center ${!showLogo ? 'flex-grow justify-end' : ''}`}
      >
        {isAppPage && (
          <a href={'/pro'} key="pro">
            <Button
              size={{ initial: '2', sm: '3' }}
              variant="solid"
              className="bg-white text-green-700 hover:bg-white/85"
            >
              <span className="hidden md:inline">Vous êtes un professionnel ?</span>
              <span className="inline md:hidden">professionnel</span>
            </Button>
          </a>
        )}

        {/* Must use <a/> instead of `next/link` bc <Link/> does not scroll to the top... */}
        {!isLegalPage && !isBlogPage && (
          <a href={'/blog'} key="blog">
            <Button
              size={{ initial: '2', sm: '3' }}
              variant="solid"
              className="bg-gray-200 text-gray-900 hover:bg-gray-200/85"
            >
              {messages.header.articles}
            </Button>
          </a>
        )}

        {!isArticlesPage && <ContactButtonWithDialog />}
        {/* {!isArticlesPage && !isBlogPage && !isLegalPage && <LanguageToggle />} */}
      </nav>
    </header>
  );
}
