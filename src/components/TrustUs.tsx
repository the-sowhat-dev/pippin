'use client';

import { LexendFont } from '@/utils/fonts';
import { Handshake } from '@mui/icons-material';
import Image from 'next/image';
import { motion } from 'framer-motion';

const PartnerLogos = [
  {
    src: '/images/yomoni.png',
    alt: 'Yomoni',
    delay: 0,
    duration: 3,
    y: -15,
  },
  {
    src: '/images/prosper-conseil.png',
    alt: 'Prosper Conseil',
    delay: 0.5,
    duration: 4,
    y: -20,
  },
  {
    src: '/images/baltis-conseil.png',
    alt: 'Baltis Groupe Magelim',
    delay: 0.2,
    duration: 3.5,
    y: -18,
  },
  {
    src: '/images/green-got.png',
    alt: 'Green Got',
    delay: 0.8,
    duration: 3.5,
    y: -18,
  },
];

export default function TrustUs() {
  return (
    <div className='relative'>
      <div className='absolute inset-0 flex flex-col z-0'>
        <div className='w-full h-1/2 bg-white' />
        <div className='w-full h-1/2 bg-[#C2E7FF]' />
      </div>


      <div className='relative z-10 p-4 sm:p-12'>
        <div
          className={`flex flex-col items-center bg-[#35C055] gap-8 md:gap-16 p-4 sm:p-8 py-16 rounded-2xl text-green-900`}
        >
          <div className="flex flex-col items-center gap-16">
            <div className="relative max-w-xl mx-auto my-8">
              <h2 className={`${LexendFont.className} text-xl sm:text-2xl font-bold relative text-center`}>
                Ils nous font confiance. <br /> <span className="text-white/90">Découvrez nos partenaires pilotes</span>
              </h2>
            </div>

            <div className="flex flex-wrap justify-center gap-8 sm:gap-16">
              {PartnerLogos.map((logo, index) => (
                <motion.div
                  key={index}
                  animate={{ y: [0, logo.y, 0] }}
                  transition={{
                    duration: logo.duration,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: logo.delay,
                  }}
                  className="relative overflow-hidden transition-all duration-300"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={300}
                    height={150}
                    className="w-[200px] sm:w-[250px] h-auto object-contain"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
