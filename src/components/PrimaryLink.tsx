import Link from 'next/link';
import { PropsWithChildren } from 'react';

interface Props {
  title: string;
  link: string;
  disabled?: boolean;
}

export function PrimaryLink({ title, children, link, disabled = false }: PropsWithChildren<Props>) {
  return (
    <Link
      aria-disabled={disabled}
      target="_blank"
      rel="noopener noreferrer"
      href={link}
      tabIndex={disabled ? -1 : undefined}
      className={`flex gap-3 justify-center items-center text-base sm:text-lg rounded-md text-white py-3 sm:py-4 px-6 sm:px-12 w-[250px] sm:w-[300px] mx-auto
        ${disabled ? 'bg-blue-500/65 pointer-events-none' : 'bg-[#203649] hover:bg-[#203649]/85 shadow-sm'} `}
    >
      {children}

      <p className="text-nowrap">{title}</p>
    </Link>
  );
}
