'use client';

import Image from 'next/image';
import * as React from 'react';

import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { CardDemo } from './yt-card';

const images = [
  '1_connexion.png',
  '2_consultation.png',
  '3_consultation_2.png',
  '4_consultation_3.png',
  '5_donut.png',
  '6_budget.png',
  '7_epargne.png',
  '8_simulation.png',
];

const titles = [
  'Inscription rapide et gratuite',
  'Connexion des comptes bancaires...',
  '...des comptes épargne...',
  '...et de tous vos autres biens.',
  'Vision complète du patrimoine.',
  'Gestion du budget...',
  `...de projets d'épargne...`,
  `...avec simulateur intégré.`,
];

export function CarouselDemo() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <section
      className={`py-16 px-8 sm:py-32 sm:px-16 sm:pt-32 gap-32 bg-gradient-to-b from-yellow-400 to-yellow-300`}
    >
      <div className="flex flex-col gap-8">
        <Carousel
          className="w-full sm:max-w-lg md:max-w-xl lg:max-w-4xl 2xl:max-w-7xl mx-auto"
          opts={{
            slidesToScroll: 1,
            breakpoints: {
              1024: {
                // 'lg' breakpoint
                slidesToScroll: 2,
              },
            },
          }}
          setApi={setApi}
        >
          <CarouselContent className="-ml-2 lg:-ml-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <CarouselItem key={index} className="pl-2 lg:pl-4 basis-full lg:basis-1/2">
                <div className="p-1">
                  <Card className="bg-transparent border-none shadow-none">
                    <CardContent className="flex flex-col aspect-video items-center justify-center gap-8">
                      <span className="text-2xl sm:text-4xl font-semibold text-center">
                        {titles[index]}
                      </span>
                      <Image
                        src={`/images/${images[index]}`}
                        alt={`Étape n°${index + 1} du carousel`}
                        width={1100}
                        height={2279}
                        className="w-[200px] sm:w-[230px]"
                        style={{
                          objectFit: 'contain',
                        }}
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

        <div className="flex gap-2 justify-center">
          {[...Array(8)].map((_, i) => {
            if (i + 1 === current) {
              return <div key={i} className="w-2 h-2 rounded-full bg-secondary"></div>;
            }

            return <div key={i} className="w-2 h-2 rounded-full bg-yellow-600"></div>;
          })}
        </div>
      </div>

      <div className={`mt-12 flex-col lg:flex-row flex gap-8 justify-center`}>
        <CardDemo
          title={`Comprendre Sowhat en vidéo`}
          description={`Et ce, grâce à Shakespear...`}
          link={`https://youtu.be/5iWyIuG5aHw`}
        />
        <CardDemo
          title={`Pourquoi Sowhat est sûre ?`}
          description={`30 secondes pour comprendre notre politique de sécurité pour vos données personnelles et vos données bancaires.`}
          link={`https://www.youtube.com/shorts/_wupOKMEI6c`}
        />
        <CardDemo
          title={`Pas encore convaincu(e) ?`}
          description={`Tout est résumé ici, rien que pour vous !`}
          link={`https://www.veed.io/view/d2b369f4-6785-4efd-9499-7076efa127b2`}
        />
      </div>
    </section>
  );
}
