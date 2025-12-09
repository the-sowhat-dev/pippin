'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Slider } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Apple, Android } from '@mui/icons-material';
import { useLanguage } from '@/i18n/LanguageProvider';
import { Button } from '@radix-ui/themes';
import {
  ProjectStep1Options,
  ProjectStep2Options,
  ProjectStep2BisOptions,
} from '../../../lib/project.utils';
import { PrimaryLink } from '../PrimaryLink';
import { AndroidAppStoreLink, AppleAppStoreLink } from '../../../lib/utils';
import { Messages } from 'next-intl';

export default function FiveMinutesStrategy() {
  const { messages } = useLanguage();
  const [step, setStep] = useState(1);
  const [step1Selection, setStep1Selection] = useState<string | null>(null);
  const [amount, setAmount] = useState<number>(1000);

  const resolveMessage = (key: string): string => {
    // keys in utils: 'project.step1.option1'
    // keys in json: home.project.step1.option1
    // messages object: root of json
    const path = ['home', ...key.split('.')];
    const result = path.reduce((acc: Messages, part: string) => acc?.[part], messages);
    return typeof result === 'string' ? result : key;
  };

  const handleStep1 = (key: string) => {
    setStep1Selection(key);
    setStep(2);
  };

  const handleStep2 = () => {
    setStep(3);
  };

  const handleValidate = () => {
    setStep(4);
  };

  return (
    <section className=" bg-[#c6f0d0]">
      <div className="bg-gradient-to-b from-[#203649] to-[#405e79] p-4 md:p-8">
        <p className="text-base sm:text-lg mx-auto text-center text-white">
          Quelle que soit votre définition de &quot;gagner mieux&quot;, nous avons la solution
        </p>
      </div>
      <div className="max-w-4xl mx-auto p-12 sm:p-16">
        {/* <div className="flex flex-col items-center justify-center p-4 md:p-8">
          <p className="text-2xl font-bold mx-auto text-center text-white">
            Quelque soit votre définition de &quot;gagner mieux&quot;, nous pouvons vous aider
          </p>
        </div> */}

        <AnimatePresence mode="wait">
          {step === 1 && (
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 md:p-8 shadow-lg gap-8 flex flex-col">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-center md-1 md:mb-4">
                <span className="text-xl font-bold border-green-800 border-2 rounded-full h-9 w-9 flex items-center justify-center text-green-800">
                  1
                </span>
                <p className="text-lg text-green-900 font-bold text-center">
                  Comment pouvons-nous vous aider ?
                </p>
              </div>

              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {ProjectStep1Options.map((option) => (
                  <div
                    key={option.key}
                    onClick={() => handleStep1(option.key)}
                    className="bg-white rounded-lg hover:shadow-lg py-4 border border-gray-200 transition-all cursor-pointer overflow-hidden transform hover:-translate-y-1 flex flex-col h-full"
                  >
                    <div className="relative h-24 md:h-32 w-24 md:w-32 mx-auto rounded-full overflow-hidden border-2 border-green-800">
                      <Image
                        src={`/images/${option.image}`}
                        alt={resolveMessage(option.text)}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6 flex-grow flex items-center">
                      <p className="text-center text-gray-800 font-medium">
                        {resolveMessage(option.text)}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          )}

          {step === 2 && (
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 md:p-8 shadow-lg gap-8 flex flex-col">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-center md-1 md:mb-4">
                <span className="text-xl font-bold border-green-800 border-2 rounded-full h-9 w-9 flex items-center justify-center text-green-800">
                  2
                </span>
                <p className="text-lg text-green-900 font-bold text-center">
                  Concrètement, quel est votre besoin ?
                </p>
              </div>

              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className=""
              >
                {step1Selection === '1' || step1Selection === '2' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {ProjectStep2Options.map((option) => (
                      <button
                        key={option.text}
                        onClick={handleStep2}
                        className="p-4 bg-white hover:bg-green-50 rounded-lg hover:shadow-lg border border-gray-200 hover:border-green-700 hover:text-green-700 transition-all hover:translate-y-1 text-left font-medium text-gray-700"
                      >
                        {resolveMessage(option.text)}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-3 justify-center">
                    {ProjectStep2BisOptions.map((option) => (
                      <button
                        key={option.text}
                        onClick={handleStep2}
                        className="px-6 py-3 bg-white rounded-full shadow-sm border border-gray-200 hover:bg-[#35c055] hover:text-white transition-all font-medium text-gray-700"
                      >
                        {resolveMessage(option.text)}
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          )}

          {step === 3 && (
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 md:p-8 shadow-lg gap-8 flex flex-col">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-center md-1 md:mb-4">
                <span className="text-xl font-bold border-green-800 border-2 rounded-full h-9 w-9 flex items-center justify-center text-green-800">
                  3
                </span>
                <p className="text-lg text-green-900 font-bold text-center">
                  Quel budget pensez-vous investir (à titre indicatif) ?
                </p>
              </div>

              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center"
              >
                <div className="px-8 mb-12 py-8">
                  <Slider
                    value={amount}
                    onChange={(_, value) => setAmount(value as number)}
                    min={100}
                    max={10000}
                    step={100}
                    valueLabelDisplay="on"
                    valueLabelFormat={(value) => `${value} €`}
                    sx={{
                      color: '#35c055',
                      '& .MuiSlider-valueLabel': {
                        backgroundColor: '#1a5d2a',
                      },
                    }}
                  />
                </div>
                <Button
                  size="4"
                  variant="solid"
                  onClick={handleValidate}
                  className="bg-green-600 text-white hover:bg-green-600/85 px-12"
                >
                  Valider
                </Button>
              </motion.div>
            </div>
          )}

          {step === 4 && (
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 md:p-8 shadow-lg gap-8 flex items-center flex-col">
              <div className="text-2xl text-[#1a5d2a] items-center flex flex-col gap-2">
                <p className="font-semibold text-center">
                  Félicitations, vous avez fait le plus dur !
                </p>
                <div className="text-green-500 text-center mx-2 sm:mx-8">
                  <p>Prenez quelques minutes pour télécharger invstore®</p>
                  <p> et aller au bout de l&apos;expérience.</p>
                </div>
              </div>

              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="flex flex-col sm:flex-row justify-center gap-6 mt-8">
                  {/* APPLE DOWNLOAD BUTTON */}
                  <PrimaryLink title={messages.home.hero.download.ios} link={AppleAppStoreLink}>
                    <Apple fontSize="medium" />
                  </PrimaryLink>

                  {/* ANDROID DOWNLOAD BUTTON */}
                  <PrimaryLink
                    title={messages.home.hero.download.android}
                    link={AndroidAppStoreLink}
                  >
                    <Android fontSize="medium" />
                  </PrimaryLink>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
