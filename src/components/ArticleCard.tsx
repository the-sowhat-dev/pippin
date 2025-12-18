import Image from 'next/image';

import { OpenSans } from '../utils/fonts';

interface ArticleCardProps {
  title: string;
  slug: string;
  date: string;
  collaboration?: string;
}

export default function ArticleCard({ title, slug, date, collaboration }: ArticleCardProps) {
  // Dynamic import for the splash image
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const SplashImage = require(`@/app/blog/a/${slug}/splash.webp`).default;

  // Must use <a/> instead of `next/link` bc <Link/> does not scroll to the top...
  return (
    <a href={`/blog/a/${slug}`}>
      <article
        itemScope
        itemType="http://schema.org/BlogPosting"
        className="relative aspect-[3/4] max-w-[250px] sm:max-w-[300px] hover:shadow-md group"
      >
        {/* Image Container - Square aspect ratio with hover transition */}
        <div className="overflow-hidden aspect-square flex">
          <div className="overflow-hidden">
            <Image
              src={SplashImage}
              alt={title}
              className={`w-full h-full object-cover duration-300 group-hover:scale-105`}
              width={1000}
              height={700}
            />
          </div>
        </div>

        {/* Content Container with flex-grow on hover */}
        <div className="absolute bottom-0 left-0 right-0">
          {collaboration && (
            <div className="bg-gradient-to-t from-blue-500 to-transparent h-[100px] flex items-end pb-2 justify-center">
              <p className="text-white font-bold text-sm">{collaboration}</p>
            </div>
          )}
          <div className="bg-white p-3 gap-1 flex flex-col">
            <h2
              className={`h-[3em] group-hover:h-[9em] overflow-hidden transition-[height] duration-300 ${OpenSans.className}`}
            >
              {title}
            </h2>
            <time className="text-sm text-gray-500 mb-2 block">{date}</time>
          </div>
        </div>
      </article>
    </a>
  );
}
