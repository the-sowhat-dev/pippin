'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ContactButtonWithDialog } from '@/src/components/new/contact-button-with-dialog';

export const Header = () => {
  const pathname = usePathname();
  const isArticlesPage = pathname.startsWith('/a');

  return (
    <div className="px-8 sm:px-16 text-sm justify-between sm:text-base p-4 gap-4 sm:gap-8 absolute top-0 w-full flex bg-white/05 backdrop-blur-sm z-10">
      {/* Show logo only on articles pages */}
      {isArticlesPage && (
        <Link href={'/'}>
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
      <div className={`flex gap-4 sm:gap-8 ${!isArticlesPage ? 'flex-grow justify-end' : ''}`}>
        {/* Must use <a/> instead of `next/link` bc <Link/> does not scroll to the top... */}
        <a href={'/a'}>
          <div className="px-5 sm:px-8 py-2 bg-gray-200 hover:bg-gray-200/80">Articles</div>
        </a>
        {!isArticlesPage && <ContactButtonWithDialog />}
      </div>
    </div>
  );
};
