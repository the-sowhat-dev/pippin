import Link from 'next/link';
import { PropsWithChildren } from 'react';

interface Props {
  title: string;
  link: string;
}

export function PrimaryLink({ title, children, link }: PropsWithChildren<Props>) {
  return (
    <Link
      target="_blank"
      rel="noopener noreferrer"
      href={link}
      className="flex gap-3 justify-center items-center text-base sm:text-lg bg-blue-500 rounded-md shadow-custom text-white hover:bg-blue-500/85 transition-all duration-300 py-3 sm:py-4 px-6 sm:px-12"
    >
      {children}

      <p className="text-nowrap">{title}</p>
    </Link>
  );
}
