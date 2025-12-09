'use client';

import Image from 'next/image';
import { useLanguage } from '@/i18n/LanguageProvider';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

export default function FiveMinutesStrategy() {
  const { messages } = useLanguage();

  return (
    <section className="flex flex-col md:flex-row items-center gap-16 md:gap-8 bg-[#C6F0D0] p-12 sm:p-16">
      <div className="relative max-w-xl mx-auto md:mx-0 p-4">
        <FormatQuoteIcon
          sx={{ fontSize: 100 }}
          className="absolute -top-10 -left-6 text-[#35c055] opacity-30 rotate-180"
        />
        <p className="text-2xl md:text-3xl font-bold relative z-10 text-center md:text-left text-[#1a5d2a] leading-relaxed">
          Moins de 5 minutes pour une analyse IA gratuite de ma situation financière ?
        </p>
        <FormatQuoteIcon
          sx={{ fontSize: 100 }}
          className="absolute -bottom-10 -right-6 text-[#35c055] opacity-30"
        />
      </div>

      <div className="bg-[#35c055] rounded-lg overflow-hidden flex-shrink-0 shadow-xl transform rotate-1 transition-transform hover:rotate-0">
        <Image
          src={'/images/woman-bed-notify-min.png'}
          alt="Five minutes to analyze your financial situation"
          style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
          className="max-w-full md:max-w-[500px]"
          width={1280}
          height={853}
        />
      </div>
    </section>
  );
}
