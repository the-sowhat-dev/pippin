'use client';

import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../../components/ui/carousel';
import { Card, CardContent } from '../../components/ui/card';
import { LexendFont } from '@/utils/fonts';

interface InstagramPostCarouselProps {
  slug: string;
  title: string;
  slideCount: number;
}

export function InstagramPostCarousel({ slug, title, slideCount }: InstagramPostCarouselProps) {
  const slides = Array.from({ length: slideCount }, (_, i) => ({
    id: i,
    src: `${process.env.NEXT_PUBLIC_STORAGE_URL}/insta-carousel/${slug}/slide-${i + 1}.jpg`,
  }));

  const aspectRatio = 360 / 450;

  return (
    <div className="w-full">
      <div className="flex flex-col pl-6">
        <h2 className={`text-xl sm:text-2xl font-bold mb-1 ${LexendFont.className}`}>{title}</h2>
        <h3 className="text-sm sm:text-base text-gray-500 mb-4">
          Retrouvez d'autres posts sur{' '}
          <a
            href="https://www.instagram.com/invstore_app/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-green-700 hover:text-green-800"
          >
            Instagram
          </a>
        </h3>
      </div>
      <div className="w-full px-6 mb-12">
        <Carousel opts={{ align: 'start' }} className="w-full">
          <CarouselContent>
            {slides.map((slide, index) => (
              <CarouselItem
                key={slide.id}
                className="basis-[90%] sm:basis-[60%] md:basis-[40%] lg:basis-1/2 xl:basis-[40%]"
              >
                <div className="p-1">
                  <Card className="border-0 shadow-none">
                    <CardContent
                      className="flex items-center justify-center p-0 relative overflow-hidden rounded-xl bg-gray-100 border-2 border-gray-200"
                      style={{ aspectRatio }}
                    >
                      <Image
                        src={slide.src}
                        alt={`Instagram slide ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
