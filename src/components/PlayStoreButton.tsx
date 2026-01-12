import Image from 'next/image';
import { AndroidAppStoreLink } from '../../lib/utils';

export function PlayStoreButton() {
  const handleClick = () => {
    if (typeof window !== 'undefined' && window.gtag_report_conversion) {
      window.gtag_report_conversion(AndroidAppStoreLink);
    }
  };

  return (
    <a
      href={AndroidAppStoreLink}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 sm:gap-3 bg-black text-white py-1.5 sm:py-2 rounded-lg hover:opacity-90 w-fit min-w-[180px] sm:min-w-[200px] justify-center hover:scale-105 transition-all duration-300"
    >
      <div className="relative w-8 h-8 sm:w-10 sm:h-10">
        <Image
          src="/icons/play-store-icon.svg"
          alt="Play Store Logo"
          fill
          className="object-contain"
          sizes="(min-width: 640px) 40px, 32px"
        />
      </div>
      <div className="flex flex-col items-start leading-none">
        <span className="text-[12px] opacity-90">Disponible sur</span>
        <span className="text-base sm:text-xl font-semibold tracking-wider">Google Play</span>
      </div>
    </a>
  );
}
