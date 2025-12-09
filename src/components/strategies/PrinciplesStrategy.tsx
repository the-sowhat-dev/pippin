'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Android, Apple } from '@mui/icons-material';
import { AnimatePresence, motion } from 'framer-motion';

import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from '../../../components/ui/accordion';
import { Title } from '@/components/Title';
import { useLanguage } from '@/i18n/LanguageProvider';
import { PrimaryLink } from '@/components/PrimaryLink';
import { AndroidAppStoreLink, AppleAppStoreLink } from '../../../lib/utils';

export default function PrinciplesStrategy() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const { messages } = useLanguage();
  const steps = messages.home.principles.steps;

  return (
    <section className="flex flex-col gap-16 sm:gap-12 items-center p-8 py-12 sm:px-16 sm:py-24 bg-yellow-400">
      <Title text={messages.home.principles.title} />

      {/* WHEN ON MOBILE */}
      <div className="lg:hidden w-full flex flex-col">
        {/* Container for horizontal scrolling for mobile experience ONLY */}
        <div className="w-full overflow-x-auto">
          <div className="flex sm:flex-wrap gap-x-4 gap-y-4 pb-4 sm:pb-0 min-w-max sm:min-w-0">
            {steps.map((step) => (
              <button
                key={step.index}
                onClick={() => setActiveStep(step.index)}
                className={`p-2 px-4 sm:p-4 gap-2 sm:gap-4 text-base sm:text-lg flex items-center rounded-md transition-colors whitespace-nowrap
                  ${
                    activeStep === step.index
                      ? 'bg-yellow-300 border-yellow-300 shadow-md'
                      : 'bg-white border-yellow-200 hover:border-gray-100 hover:bg-gray-100'
                  } border`}
              >
                <div>{step.index + 1}</div>
                <div>{step.tag}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center flex-col gap-8 p-6 sm:p-16 self-center overflow-hidden">
          <p className="text-center text-base sm:text-lg sm:w-[70%]">
            {steps[activeStep > 7 ? 0 : activeStep]?.description}
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
            {steps.map((step) => (
              <AccordionItem value={`step-${step.index}`} key={`step-${step.index}`}>
                <AccordionTrigger>{`${step.index + 1}. ${step.title}`}</AccordionTrigger>
                <AccordionContent>{step.description}</AccordionContent>
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
        <PrimaryLink title={messages.home.hero.download.ios} link={AppleAppStoreLink}>
          <Apple fontSize="medium" />
        </PrimaryLink>

        {/* ANDROID DOWNLOAD BUTTON */}
        <PrimaryLink title={messages.home.hero.download.android} link={AndroidAppStoreLink}>
          <Android fontSize="medium" />
        </PrimaryLink>
      </div>
    </section>
  );
}
