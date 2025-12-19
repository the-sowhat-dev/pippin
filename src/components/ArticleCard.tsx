import Image from 'next/image';
import { OpenSans } from '../utils/fonts';
import { timeAgo } from '../utils/date';

interface ArticleCardProps {
  title: string;
  subtitle?: string | null;
  slug: string;
  date: Date | string;
  collaboration?: string;
  coverImage?: string | null;
}

export default function ArticleCard({
  title,
  subtitle,
  slug,
  date,
  collaboration,
  coverImage,
}: ArticleCardProps) {
  // Parse date if it's a string
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const timeAgoString = timeAgo(dateObj);

  // Dynamic import for the splash image logic fallback
  let SplashImage;
  if (coverImage) {
    SplashImage = coverImage;
  } else {
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      SplashImage = require(`@/app/blog/a/${slug}/splash.webp`).default;
    } catch (e) {
      console.warn(`Image not found for slug: ${slug}`, e);
      SplashImage = null;
    }
  }

  return (
    <a href={`/blog/a/${slug}`} className="block w-full group">
      <article
        itemScope
        itemType="http://schema.org/BlogPosting"
        className="flex flex-col sm:flex-row gap-6 w-full"
      >
        {/* Image Container - Fixed width on desktop, 3:2 aspect ratio */}
        <div className="relative w-full sm:w-[300px] shrink-0 aspect-[3/2]">
          <div className="w-full h-full rounded-lg shadow-md overflow-hidden relative bg-gray-200">
            {SplashImage ? (
              <Image
                src={SplashImage}
                alt={title}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                fill
                sizes="(max-width: 640px) 100vw, 300px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500"></div>
            )}
            {collaboration && (
              <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded shadow-sm z-10">
                {collaboration}
              </div>
            )}
          </div>
        </div>

        {/* Content Container */}
        <div className="flex flex-col gap-2 pb-4 border-b border-blue-200">
          <time className="text-xs text-gray-400 font-medium text-pretty">{timeAgoString}</time>

          <h2
            className={`text-lg sm:text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors ${OpenSans.className}`}
          >
            {title}
          </h2>

          {subtitle && <p className="text-sm sm:text-base text-gray-600 text-pretty">{subtitle}</p>}
        </div>
      </article>
    </a>
  );
}
