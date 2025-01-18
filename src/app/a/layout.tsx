import Footer from '@/src/components/footer';
import Link from 'next/link';
import Image from 'next/image';

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full bg-gradient-to-b from-yellow-100 to-yellow-50">
      <div className="px-8 sm:px-16 text-sm justify-between sm:text-base p-4 sm:p-8 gap-4 sm:gap-8 absolute top-0 w-full flex bg-white/05 backdrop-blur-sm z-10">
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
        <Link href={'/a'}>
          <div className="px-5 sm:px-8 py-2 bg-gray-200">Articles</div>
        </Link>
      </div>

      <article className="min-h-screen mx-auto max-w-2xl prose prose-quoteless prose-neutral dark:prose-invert p-8 sm:p-16 pt-24 sm:pt-32">
        {children}
      </article>

      <Footer />
    </div>
  );
}
