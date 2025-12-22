import Link from 'next/link';
import Image from 'next/image';
import { AndroidAppStoreLink } from '../../lib/utils';
import { cn } from '../../lib/utils';

interface PlayStoreButtonProps {
  className?: string;
}

export function PlayStoreButton({ className }: PlayStoreButtonProps) {
  return (
    <Link
      href={AndroidAppStoreLink}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'flex items-center gap-3 bg-black text-white py-2 rounded-lg hover:opacity-90 w-fit min-w-[200px] justify-center hover:scale-105 transition-all duration-300',
        className
      )}
    >
      <Image src="/icons/play-store-icon.svg" alt="Play Store Logo" width={40} height={40} />
      <div className="flex flex-col items-start leading-none">
        <span className="text-[12px] text-regular opacity-90">Disponible sur</span>
        <span className="text-xl font-semibold tracking-wider">Google Play</span>
      </div>
    </Link>
  );
}
