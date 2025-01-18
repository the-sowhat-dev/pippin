import Link from 'next/link';
import Image from 'next/image';
import { OpenSans } from '../utils/fonts';

interface ArticleCardProps {
  title: string;
  slug: string;
  date: string;
}

export default function ArticleCard({ title, slug, date }: ArticleCardProps) {
  // Dynamic import for the splash image
  const SplashImage = require(`@/src/app/a/${slug}/splash.jpg`).default;

  return (
    <Link href={`/a/${slug}`} className="block group">
      <div className="relative w-full aspect-[3/4] max-w-[300px] bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-gray-300 transition-all hover:shadow-sm">
        {/* Image Container - Square aspect ratio */}
        <div className="relative w-full aspect-square">
          <Image
            src={SplashImage}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Content Container */}
        <div className="p-4 absolute bottom-0 w-full bg-gradient-to-t from-white via-white/95 to-white/0">
          <time className="text-sm text-gray-500 mb-2 block">{date}</time>
          <h2
            className={`text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-gray-700 ${OpenSans.className}`}
          >
            {title}
          </h2>
        </div>
      </div>
    </Link>
  );
}
