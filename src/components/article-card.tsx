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
  const SplashImage = require(`@/src/app/a/${slug}/splash.png`).default;

  return (
    <Link href={`/a/${slug}`}>
      <div className="aspect-[3/4] max-w-[300px] hover:border-yellow-400 hover:shadow-md">
        {/* Image Container - Square aspect ratio */}
        <div className="relative aspect-square">
          <Image
            src={SplashImage}
            alt={title}
            className={`w-full h-full object-cover`}
            width={1000}
            height={700}
          />
        </div>

        {/* Content Container */}
        <div className="p-4 bg-white">
          <time className="text-sm text-gray-500 mb-2 block">{date}</time>
          <h2 className={`sm:text-lg font-semibold line-clamp-2 ${OpenSans.className}`}>{title}</h2>
        </div>
      </div>
    </Link>
  );
}
