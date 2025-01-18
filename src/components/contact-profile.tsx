'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { OpenSans } from '../utils/fonts';

interface ContactProfileProps {
  imagePath: string;
  imageAlt: string;
  name: string;
  title: string;
  link: string;
}

const ContactProfile: React.FC<ContactProfileProps> = ({
  imagePath,
  imageAlt,
  name,
  title,
  link,
}) => {
  return (
    <>
      <div className="text-center box-container group flex flex-col items-center">
        <h1 className={`${OpenSans.className} text-l sm:text-2xl font-bold mb-8`}>{title}</h1>

        <div className="bg-gray-300 rounded-full transition-colors duration-500 ease-in-out mb-8 w-[120px] sm:w-[200px] sm:h-[200px] group-hover:bg-[#0077B7]">
          <Image
            src={imagePath}
            alt={imageAlt}
            width={200}
            height={200}
            priority
            className="w-[120px] sm:w-[200px]"
          />
        </div>

        <Link
          href={`https://www.linkedin.com/in/${link}`}
          rel="noopener noreferrer"
          target="_blank"
          style={{
            display: 'flex',
            gap: 12,
            fontSize: 18,
            flexDirection: 'row',
            backgroundColor: 'white',
            borderRadius: 8,
            padding: 12,
            paddingRight: 24,
            paddingLeft: 24,
          }}
        >
          <Image
            src="/images/linkedin_logo.png"
            alt="LinkedIn icon"
            width={32}
            height={32}
            className="w-[24px] sm:w-[24px]"
            style={{ objectFit: 'contain' }}
          />
          <div className="m-auto text-sm sm:text-base">{name}</div>
        </Link>
      </div>
    </>
  );
};

export default ContactProfile;
