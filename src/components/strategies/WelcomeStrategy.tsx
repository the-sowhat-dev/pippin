'use client';

import Image from 'next/image';
import { NunitoFont } from '@/utils/fonts';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { PlayStoreButton } from '@/components/PlayStoreButton';
import { AppleAppStoreButton } from '@/components/AppleAppStoreButton';

export default function WelcomeStrategy() {
  return (
    <section className="bg-white">
      <div className="relative min-h-screen flex flex-col overflow-hidden">
        {/* Upper Green Background */}
        <div className="absolute top-0 left-0 right-0 h-[35vh] lg:h-[45vh] bg-[#35c055]" />

        {/* Main Content Container */}
        <div className="relative z-[1] flex-grow flex flex-col max-w-[1400px] mx-auto w-full px-6 lg:px-20">
          {/* Top Part: Logo & Space for Header */}
          <div className="h-[40vh] lg:h-[45vh] grid grid-cols-1 lg:grid-cols-2 w-full">
            {/* Logo Column */}
            <div className="flex items-center justify-center lg:justify-start pt-8 lg:pt-0">
              <div className="w-full max-w-[320px] sm:max-w-[550px]">
                <Image
                  src="/images/invstore.png"
                  alt="Invstore Logo"
                  width={1288}
                  height={500}
                  priority
                  className="w-full h-auto"
                />
              </div>
            </div>
            {/* Space for Mockup on Desktop */}
            <div className="hidden lg:block" />
          </div>

          {/* Bottom Part: Text & Buttons & Mockup */}
          <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full pb-12 lg:pb-0 py-0">
            {/* Text and Buttons Column */}
            <div className="flex flex-col justify-center items-center space-y-8 lg:space-y-12">
              <h1 className={`${NunitoFont.className} text-2xl lg:text-3xl text-center w-[80%] sm:w-full max-w-[700px]`}>
                vous aimeriez gagner mieux avec votre épargne <span className="font-bold">mais vous manquez de temps ?</span>
              </h1>

              <div className="flex flex-col sm:flex-row gap-4 items-center w-full justify-center">
                <div className="scale-90 lg:scale-100 origin-center lg:origin-left">
                  <AppleAppStoreButton />
                </div>
                <div className="scale-90 lg:scale-100 origin-center lg:origin-left">
                  <PlayStoreButton />
                </div>
              </div>
            </div>

            {/* Mockup Column */}
            <div className="relative flex justify-center lg:justify-end items-center">
              {/* Positioned mockup: absolute on desktop, relative on mobile */}
              <div className="max-w-[360px] lg:max-w-[500px] lg:absolute lg:-top-56 xl:-top-64 right-0 transform translate-y-4 lg:translate-y-0">
                <Image
                  src="/images/mockup_welcome.png"
                  alt="Invstore App Mockup"
                  width={747}
                  height={970}
                  priority
                  className="drop-shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quote answer to question */}
      <div className="relative max-w-[80%] lg:max-w-2xl mx-auto mt-16 lg:mt-0 mb-24 lg:mb-32">
        <FormatQuoteIcon
          sx={{ fontSize: 100 }}
          className="absolute -top-12 -left-6 text-blue-700 opacity-30 rotate-180"
        />
        <h2 className="text-2xl lg:text-3xl relative text-center">
          <span className="font-bold">l&apos;application invstore® réduit la charge mentale</span>{' '}et administrative des épargnants.
        </h2>
        <FormatQuoteIcon
          sx={{ fontSize: 100 }}
          className="absolute -bottom-12 -right-6 text-blue-700 opacity-30"
        />
      </div>
    </section>
  );
}
