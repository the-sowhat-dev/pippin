'use client';

import Link from 'next/link';
import Image from 'next/image';

interface NetworkLogoProps {
  href: string;
  alt: string;
  src: string;
}

const NetworkLogo: React.FC<NetworkLogoProps> = ({ href, src, alt }) => {
  return (
    <Link className="w-[50px] sm:w-[80px]" href={href} rel="noopener noreferrer" target="_blank">
      <Image src={src} alt={alt} width={80} height={80} style={{ objectFit: 'contain' }} />
    </Link>
  );
};

export default NetworkLogo;
