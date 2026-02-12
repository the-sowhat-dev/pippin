'use client';

import Image from 'next/image';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from '../ui/accordion';
import { Title } from '@/components/Title';
import { useLanguage } from '@/i18n/LanguageProvider';

export default function PrinciplesStrategy() {
  const [activeStep, setActiveStep] = useState<number>(3);
  const { messages } = useLanguage();
  const steps = messages.home.principles.steps;

  return (
    <>
      <section className="flex flex-col gap-16 sm:gap-12 py-12 sm:py-16 items-center bg-[#c6f0d0]">
        <Title id="principles" text={messages.home.principles.title} />

        {/* WHEN ON MOBILE */}
        <div className="lg:hidden w-full flex flex-col">
          {/* Container for horizontal scrolling for mobile experience ONLY */}
          <div className="relative w-full px-2">
            {/* Left Arrow */}
            <div
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 pointer-events-none transition-opacity duration-300 ${activeStep === 0 ? 'opacity-0' : 'opacity-30'
                }`}
            >
              <ChevronLeft size={32} />
            </div>

            {/* Right Arrow */}
            <div
              className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 pointer-events-none transition-opacity duration-300 ${activeStep === steps.length - 1 ? 'opacity-0' : 'opacity-30'
                }`}
            >
              <ChevronRight size={32} />
            </div>

            <div className="overflow-x-auto  mx-4">
              <div className="flex sm:flex-wrap gap-x-4 gap-y-4 pb-4 sm:pb-0 min-w-max sm:min-w-0 px-4">
                {steps.map((step) => (
                  <button
                    key={step.index}
                    onClick={() => setActiveStep(step.index)}
                    className={`p-2 px-4 sm:p-4 gap-2 sm:gap-4 text-base sm:text-lg text-green-900 font-medium flex items-center rounded-md transition-colors whitespace-nowrap
                  ${activeStep === step.index
                        ? 'bg-green-500 border-green-700 text-white'
                        : 'bg-white border-white hover:border-gray-100 hover:bg-gray-100'
                      } border-[1.5px]`}
                  >
                    <div>{step.index + 1}.</div>
                    <div>{step.tag}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center flex-col gap-8 p-6 sm:p-16 self-center overflow-hidden">
            <p className="text-center text-base sm:text-lg max-w-[500px] px-1">
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
                  style={{ maxHeight: '400px', width: '100%', objectFit: 'contain' }}
                  width={800}
                  height={800}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* WHEN ON DESKTOP */}
        <div className="hidden lg:flex w-full max-w-7xl mx-auto">
          <div className="flex-1 flex justify-center items-center p-4 xs:p-16 min-h-[700px]">
            <Accordion
              type="single"
              defaultValue="step-3"
              onValueChange={(value: string) => {
                if (value) setActiveStep(Number(value.replace('step-', '')));
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

          <div className="flex-1 flex items-center justify-center p-8 sm:p-16 overflow-hidden min-h-[700px] relative">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={activeStep}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="absolute inset-0 flex items-center justify-center p-8 sm:p-16"
              >
                <Image
                  src={`/images/step-${activeStep}.png`}
                  alt={`Step ${activeStep} illustration`}
                  style={{
                    maxHeight: '100%',
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
      </section>
    </>
  );
}

