import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';
import { ReactNode } from 'react';

interface SocialButtonProps {
  href: string;
  icon: ReactNode;
  children: ReactNode;
}

export function SocialButton({ href, icon, children }: SocialButtonProps) {
  return (
    <div className="gap-3 flex flex-col items-center">
      <Link
        target="_blank"
        rel="noopener noreferrer"
        href={href}
        className="flex gap-3 justify-center items-center text-md sm:text-lg rounded-md shadow-custom hover:bg-white transition-all duration-300 py-4 px-8 group"
      >
        {icon}
        <span className="text-lg sm:text-xl">{children}</span>
        <ArrowForwardIcon
          fontSize="large"
          className="transform transition-transform group-hover:translate-x-2.5"
        />
      </Link>
    </div>
  );
}
