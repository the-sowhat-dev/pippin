'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Android, Apple } from '@mui/icons-material';
import { AnimatePresence, motion } from 'framer-motion';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../../components/ui/accordion';
import { STEPS } from '@/utils/steps';
import { Title } from '@/components/new/title';
import { useLanguage } from '@/i18n/LanguageProvider';
import { PrimaryLink } from '@/components/new/primary-link';

export default function PrinciplesStrategy() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const { messages } = useLanguage();

  return (
    <section className="flex flex-col gap-16 sm:gap-12 items-center p-8 py-12 sm:px-16 sm:py-24 bg-yellow-400">
      <Title text={`Nos 8 principes pour une bonne application de finance`} />

      {/* WHEN ON MOBILE */}
      <div className="lg:hidden w-full flex flex-col">
        {/* Container for horizontal scrolling for mobile experience ONLY */}
        <div className="w-full overflow-x-auto">
          <div className="flex sm:flex-wrap gap-x-4 gap-y-4 pb-4 sm:pb-0 min-w-max sm:min-w-0">
            {STEPS.map((s) => (
              <button
                key={s.index}
                onClick={() => setActiveStep(s.index)}
                className={`p-2 px-4 sm:p-4 gap-2 sm:gap-4 text-base sm:text-lg flex items-center rounded-md transition-colors whitespace-nowrap
            ${
              activeStep === s.index
                ? 'bg-yellow-300 border-yellow-300 shadow-md'
                : 'bg-white border-yellow-200 hover:border-gray-100 hover:bg-gray-100'
            } border`}
              >
                <div>{s.index + 1}</div>
                <div>{s.tag}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center flex-col gap-8 p-6 sm:p-16 self-center overflow-hidden">
          <p className="text-center text-base sm:text-lg sm:w-[70%]">
            {STEPS[activeStep > 7 ? 0 : activeStep]?.description}
          </p>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="w-full h-full flex items-center justify-center"
            >
              <Image
                src={`/images/step-${activeStep}.png`}
                alt={`Step ${activeStep} illustration`}
                style={{
                  maxHeight: '400px',
                  width: '100%',
                  objectFit: 'contain',
                }}
                width={800}
                height={800}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* WHEN ON DESKTOP */}
      <div className="hidden lg:flex">
        <div className="flex lg:basis-2/3 xl:basis-1/2 justify-center items-center p-8 sm:p-16 min-h-[700px]">
          <Accordion
            type="single"
            defaultValue="step-1"
            onValueChange={(value: string) => {
              setActiveStep(Number(value.replace('step-', '')));
            }}
          >
            {STEPS.map((s) => (
              <AccordionItem value={`step-${s.index}`} key={`"step-${s.index}"`}>
                <AccordionTrigger>{`${s.index + 1}. ${s.title}`}</AccordionTrigger>
                <AccordionContent>{s.description}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="flex lg:basis-1/3 xl:basis-1/2 items-center justify-center p-8 sm:p-16 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="w-full h-full flex items-center justify-center"
            >
              <Image
                src={`/images/step-${activeStep}.png`}
                alt={`Step ${activeStep} illustration`}
                style={{
                  maxHeight: '700px',
                  width: '100%',
                  objectFit: 'contain',
                }}
                width={800}
                height={800}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* DOWNLOAD BUTTON */}
      <div className="w-full flex flex-col sm:flex-row gap-4 justify-center items-center my-8">
        {/* APPLE DOWNLOAD BUTTON */}
        <PrimaryLink
          title={messages.home.hero.download.ios}
          link="https://apps.apple.com/fr/app/sowhat-app/id6736385732"
        >
          <Apple fontSize="medium" />
        </PrimaryLink>

        {/* ANDROID DOWNLOAD BUTTON */}
        <PrimaryLink
          title={messages.home.hero.download.android}
          link="https://play.google.com/store/apps/details?id=com.thesowhatdev.fintech&pcampaignid=web_share"
        >
          <Android fontSize="medium" />
        </PrimaryLink>
      </div>
    </section>
  );
}
