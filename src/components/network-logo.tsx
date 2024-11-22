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
    <Link className="w-[60px] sm:w-[100px]" href={href} rel="noopener noreferrer" target="_blank">
      <Image src={src} alt={alt} width={100} height={100} style={{ objectFit: 'contain' }} />
    </Link>
  );
};

export default NetworkLogo;