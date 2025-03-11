import Link from 'next/link';
import Image from 'next/image';

import { Title } from './new/title';
import { Brand, BRANDS } from '../utils/brands';

export default function BrandsListStrategy() {
  return (
    <section className="flex flex-col gap-16 py-8 sm:py-16 pt-12">
      <Title text="Ils parlent de nous" />
      <ScrollingBrandsBanner brands={BRANDS} />
    </section>
  );
}

// Enhanced Brand component specifically for the banner
function BannerBrand({ logo, link, name, width, height }: Brand) {
  return (
    <Link
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      title={name}
      className="flex items-center justify-center p-2 mx-8 md:mx-12  rounded-lg  hover:shadow-md transition-all duration-300 h-[140px] w-[140px] md:h-[160px] md:w-[160px] hover:bg-white"
    >
      <div className="relative group p-2">
        <Image
          src={logo}
          alt={name}
          width={width}
          height={height}
          priority
          className="transition-transform duration-300 group-hover:scale-110"
          style={{ objectFit: 'contain', maxHeight: 90, maxWidth: 90 }}
        />
        <div className="absolute -bottom-6 left-0 right-0 text-center text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {name}
        </div>
      </div>
    </Link>
  );
}

function ScrollingBrandsBanner({ brands }: { brands: Brand[] }) {
  // Triple the brands array to create a seamless loop
  const allBrands = [...brands, ...brands, ...brands];

  return (
    <div className="w-full h-[250px] overflow-hidden relative flex items-center">
      {/* Fade effect on the left */}
      <div className="absolute left-0 top-0 h-full w-24  to-transparent z-10"></div>

      {/* Fade effect on the right */}
      <div className="absolute right-0 top-0 h-full w-24  to-transparent z-10"></div>

      {/* Subtle top and bottom borders */}
      <div className="absolute top-0 left-0 right-0 h-px to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px to-transparent"></div>

      <div className="scrolling-banner-container absolute flex items-center h-[250px]">
        {allBrands.map((brand, index) => (
          <div key={`${brand.name}-${index}`} className="flex items-center justify-center">
            <BannerBrand
              logo={brand.logo}
              name={brand.name}
              link={brand.link}
              width={brand.width}
              height={brand.height}
            />
          </div>
        ))}
      </div>

      <style jsx>{`
        .scrolling-banner-container {
          animation: scroll 50s linear infinite;
          display: flex;
          width: max-content;
          will-change: transform;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 3));
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .scrolling-banner-container {
            animation-duration: 100s;
          }
        }

        /* Pause animation on hover */
        @media (hover: hover) {
          .scrolling-banner-container:hover {
            animation-play-state: paused;
          }
        }
      `}</style>
    </div>
  );
}
