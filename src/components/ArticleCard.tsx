import Image from "next/image";
import { RobotoFont, LexendFont } from "@/utils/fonts";
import { timeAgo } from "../utils/date";
import { InstagramPostCarousel } from "./InstagramPostCarousel";
import { CollaborationBlock } from "./CollaborationBlock";

interface ArticleCardProps {
  title: string;
  subtitle?: string | null;
  slug: string;
  date: Date | string;
  collaboration?: string | null;
  coverImage?: string | null;
  readingTime: number;
}

export default function ArticleCard({
  title,
  subtitle,
  slug,
  date,
  collaboration,
  coverImage,
  readingTime,
}: ArticleCardProps) {
  // Parse date if it's a string
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const timeAgoString = timeAgo(dateObj);

  if (coverImage === "insta-carousel") {
    return <InstagramPostCarousel slug={slug} slideCount={readingTime} title={title} />;
  }

  return (
    <a href={`/blog/a/${slug}`} className="block w-full group">
      {collaboration && <CollaborationBlock id={collaboration} />}
      <article
        itemScope
        itemType="http://schema.org/BlogPosting"
        className="flex flex-col sm:flex-row gap-6 w-full">
        {/* Image Container - Fixed width on desktop, 3:2 aspect ratio */}
        <div className="relative w-full sm:w-[300px] shrink-0 aspect-[3/2]">
          <div className="w-full h-full rounded-lg overflow-hidden relative bg-gray-200 border-2 group-hover:border-gray-200 border-gray-100">
            {coverImage ? (
              <Image
                src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${coverImage}.webp`}
                alt={title}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                fill
                sizes="(max-width: 640px) 100vw, 300px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500"></div>
            )}
            {collaboration && (
              <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded z-10">
                {collaboration}
              </div>
            )}
          </div>
        </div>

        {/* Content Container */}
        <div
          className={`flex flex-col gap-2 pb-4 border-b group-hover:border-gray-200 border-gray-100 ${RobotoFont.className}`}>
          <time className="text-xs text-gray-400 font-medium text-pretty">{timeAgoString}</time>

          <h2
            className={`text-lg sm:text-xl font-bold text-gray-900 group-hover:text-green-800 transition-colors ${LexendFont.className}`}>
            {title}
          </h2>

          {subtitle && <p className="text-sm sm:text-base text-gray-600 text-pretty">{subtitle}</p>}
        </div>
      </article>
    </a>
  );
}
