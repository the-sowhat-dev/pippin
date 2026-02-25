import Image from "next/image";
import { AppleAppStoreLink } from "../utils/stores";

export function AppleAppStoreButton() {
  const handleClick = () => {
    if (typeof window !== "undefined" && window.gtag_report_conversion) {
      window.gtag_report_conversion(AppleAppStoreLink);
    }
  };

  return (
    <a
      href={AppleAppStoreLink}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 sm:gap-3 bg-black text-white py-1.5 sm:py-2 rounded-lg hover:opacity-90 w-fit min-w-[180px] sm:min-w-[200px] justify-center hover:scale-105 transition-all duration-300">
      <div className="relative w-8 h-8 sm:w-10 sm:h-10">
        <Image
          src="/icons/apple-icon.svg"
          alt="Apple Logo"
          fill
          className="object-contain"
          sizes="(min-width: 640px) 40px, 32px"
        />
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-[12px] opacity-90">Télécharger dans</span>
        <span className="text-base sm:text-xl font-semibold tracking-wider">l&apos;App Store</span>
      </div>
    </a>
  );
}
