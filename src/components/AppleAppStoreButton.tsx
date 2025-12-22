import Link from 'next/link';
import Image from 'next/image';
import { AppleAppStoreLink } from '../../lib/utils';
import { cn } from '../../lib/utils';
import { OpenSans } from '@/utils/fonts';

interface AppleAppStoreButtonProps {
  className?: string;
}

export function AppleAppStoreButton({ className }: AppleAppStoreButtonProps) {
  return (
    <Link
      href={AppleAppStoreLink}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'flex items-center gap-3 bg-black text-white py-2 rounded-lg hover:opacity-90 w-fit min-w-[200px] justify-center hover:scale-105 transition-all duration-300',
        className
      )}
    >
      <Image src="/icons/apple-icon.svg" alt="Apple Logo" width={40} height={40} />
      <div className="flex flex-col leading-none">
        <span className="text-[12px] text-regular opacity-90">Télécharger dans</span>
        <span className="text-xl font-semibold tracking-wider">l&apos;App Store</span>
      </div>
    </Link>
  );
}
