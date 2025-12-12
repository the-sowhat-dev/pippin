import { Instagram, LinkedIn } from '@mui/icons-material';
import Link from 'next/link';
import Image from 'next/image';

export default function SocialsProStrategy() {
  return (
    <div className="flex flex-col gap-8 items-center">
      <p className="text-center mx-8 text-xl sm:text-2xl font-medium text-gray-800">
        Suivez-nous sur les réseaux pour plus d&apos;informations
      </p>
      <div className="flex gap-4">
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href={'https://www.instagram.com/invstore_app/'}
          className="h-16 w-16 transition-all duration-300 hover:scale-105 bg-white/60 border-2 border-white/80 hover:border-white hover:bg-white rounded-full items-center flex justify-center"
        >
          <Instagram fontSize="large" style={{ color: '#F50E6A' }} />
        </Link>

        <Link
          target="_blank"
          rel="noopener noreferrer"
          href={'https://www.linkedin.com/company/invstore/'}
          className="h-16 w-16 transition-all duration-300 hover:scale-105 bg-white/60 border-2 border-white/80 hover:border-white hover:bg-white rounded-full items-center flex justify-center"
        >
          <LinkedIn fontSize="large" style={{ color: '#0C5CBA' }} />
        </Link>

        <Link
          target="_blank"
          rel="noopener noreferrer"
          href={'https://www.tiktok.com/@invstore_app'}
          className="h-16 w-16 transition-all duration-300 hover:scale-105 bg-white/60 border-2 border-white/80 hover:border-white hover:bg-white rounded-full items-center flex justify-center"
        >
          <Image
            width={28}
            height={28}
            style={{ objectFit: 'contain' }}
            src="/icons/tiktok.svg"
            alt="TikTok icon"
          />
        </Link>
      </div>
    </div>
  );
}
