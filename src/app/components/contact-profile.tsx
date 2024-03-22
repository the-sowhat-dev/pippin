"use client"

import Image from 'next/image'
import Link from 'next/link'
import { mulish } from '../fonts'
import React, { useState } from 'react';

interface ContactProfileProps {
  imagePath: string
  imageAlt: string
  name: string
  title: string
  link: string
  email: string
};

const ContactProfile: React.FC<ContactProfileProps> = ({ imagePath, imageAlt, name, title, link, email }) => {
  const [copySuccess, setCopySuccess] = useState('');
  const [copied, setCopied] = useState(false);

  function copyToClipboard() {
    navigator.clipboard.writeText(email);
    setCopySuccess('Copied!');
    setCopied(true);
  }

  return (
    <>
      <div className='text-center box-container group flex flex-col items-center'>
        <h1 className={`${mulish.className} text-xl sm:text-3xl font-bold mb-8`}>{title}</h1 >

        <div className='bg-gray-300 rounded-full transition-colors duration-500 ease-in-out w-[200px] h-[200px] group-hover:bg-[#0077B7]'>
          <Image
            src={imagePath}
            alt={imageAlt}
            width={200}
            height={200}
            priority
          />
        </div>

        <div className='h-[100px] overflow-hidden transition-all duration-500'>
          <div className='grid grid-rows-2 h-[200px] box-box'>
            <div className='m-auto'>{name}</div>

            {/* Hidden when not hover */}
            <div className='grid grid-rows-2 place-items-center'>
              <Link href={`https://www.linkedin.com/in/${link}`} rel="noopener noreferrer" target="_blank">
                <div className='flex text-box'>
                  <Image src="/linkedin.png" alt="LinkedIn icon" width={20} height={20} style={{ objectFit: 'contain' }} />&nbsp;&nbsp;Linkedin
                </div>
              </Link >

              <button className='flex items-center' onMouseLeave={() => setCopied(false)} onClick={copyToClipboard}>
                {!copied ?
                  <>
                    <Image src="/copy.svg" alt="Copy icon" width={20} height={20} style={{ objectFit: 'contain' }} />&nbsp;&nbsp;{email}
                  </> :
                  <>
                    <Image src="/checked.svg" alt="Copy icon" width={20} height={20} style={{ objectFit: 'contain' }} /> &nbsp;&nbsp;<span className='text-green-600'>{email}</span>
                  </>
                }
              </button>

            </div>
          </div>
        </div>

      </div >
    </>
  );
};

export default ContactProfile
