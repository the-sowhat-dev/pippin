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
      className="flex items-center gap-3 bg-black text-white py-2 rounded-lg hover:opacity-90 w-fit min-w-[200px] justify-center hover:scale-105 transition-all duration-300"
    >
      <Image src="/icons/play-store-icon.svg" alt="Play Store Logo" width={40} height={40} />
      <div className="flex flex-col items-start leading-none">
        <span className="text-[12px] text-regular opacity-90">Disponible sur</span>
        <span className="text-xl font-semibold tracking-wider">Google Play</span>
      </div>
    </a>
  );
}
