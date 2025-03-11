'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Android, Apple, YouTube } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, LinkedIn, Facebook } from '@mui/icons-material';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { STEPS } from '../utils/steps';
import Footer from '@/src/components/footer';
import { Header } from '../components/header';
import { Title } from '@/src/components/new/title';
import { CardDemo } from '@/src/components/yt-card';
import VideoStrategy from '../components/VideoStrategy';
import { PrimaryLink } from '@/src/components/new/primary-link';
import BrandsListStrategy from '../components/BrandsListStrategy';
import { WordsCarousel } from '@/src/components/new/words-carousel';
import { SocialButton } from '../components/SocialButton';

export default function Home() {
  const [activeStep, setActiveStep] = useState<number>(1);

  return (
    <main className={`bg-gradient-to-b from-yellow-200 to-yellow-50`}>
      <Header />
      <section>
        <div className="flex flex-col w-full gap-4 sm:gap-8 p-8 pt-28">
          <Image
            width={0}
            height={0}
            priority
            style={{
              width: '60%',
              height: 'auto',
              objectFit: 'contain',
            }}
            src="/images/font.svg"
            alt="Font Logo"
          />
          <p className="w-[60%] sm:text-xl text-pretty">{`L’application essentielle pour les finances personnelles, accessible à tous.`}</p>
        </div>

        <div className="w-full flex flex-1 p-8 pb-0 gap-8 flex-col sm:flex-row">
          <div className="flex flex-col gap-4 basis-1/2 justify-center">
            {/* APPLE DOWNLOAD BUTTON */}
            <PrimaryLink
              title={`Télécharger sur iOS`}
              link="https://apps.apple.com/fr/app/sowhat-app/id6736385732"
            >
              <Apple fontSize="medium" />
            </PrimaryLink>

            {/* ANDROID DOWNLOAD BUTTON */}
            <PrimaryLink
              title={`Télécharger sur Android`}
              link="https://play.google.com/store/apps/details?id=com.thesowhatdev.fintech&pcampaignid=web_share"
            >
              <Android fontSize="medium" />
            </PrimaryLink>
          </div>

          <div className="flex basis-1/2 self-center justify-center items-center sm:items-end max-w-[300px] sm:max-w-[600px]">
            <Image
              src={'/images/mockup_us.png'}
              alt="Strategy Image"
              style={{
                maxHeight: '600px',
                width: 'auto',
                objectFit: 'contain',
              }}
              width={1100}
              height={1578}
            />
          </div>
        </div>

        <WordsCarousel />
      </section>

      <section className="flex items-center">
        <div className="w-full flex-1 flex flex-col sm:flex-row gap-8 p-8 sm:p-16 pt-12">
          <div className="flex basis-1/2 items-center justify-center p-6">
            <Image
              src={'/images/three_mockups.png'}
              alt="Trois mockups en un pour présentation"
              style={{
                maxHeight: '500px',
                width: '100%',
                objectFit: 'contain',
              }}
              width={800}
              height={800}
            />
          </div>

          <div className="flex basis-1/2 flex-col p-8 md:p-12 gap-8">
            <Title centered={false} text={`Sowhat c'est`} />
            <p className="sm:text-lg">
              {`Tous vos comptes bancaires et 100% de votre patrimoine connectés dans une seule app.`}
            </p>
            <p className="sm:text-lg">{`La gestion de vos différents projets d'épargne grâce à un système d'enveloppes virtuelles et un outil de prévision.`}</p>
            <p className="sm:text-lg">
              {`La priorité sur la sécurité puisque l'application ne touche pas à l'argent réel (paiements, virements et investissements impossibles depuis Sowhat).`}
            </p>
            <p className="sm:text-lg">
              {`Ce qu'il y a de plus facile et personnalisé pour gérer vos projets d'épargne, votre argent et votre budget.`}
            </p>
            <p className="font-bold text-blue-500 sm:text-lg">{`100% gratuite.`}</p>
          </div>
        </div>
      </section>

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
            title={`Télécharger sur iOS`}
            link="https://apps.apple.com/fr/app/sowhat-app/id6736385732"
          >
            <Apple fontSize="medium" />
          </PrimaryLink>

          {/* ANDROID DOWNLOAD BUTTON */}
          <PrimaryLink
            title={`Télécharger sur Android`}
            link="https://play.google.com/store/apps/details?id=com.thesowhatdev.fintech&pcampaignid=web_share"
          >
            <Android fontSize="medium" />
          </PrimaryLink>
        </div>
      </section>

      <BrandsListStrategy />

      <VideoStrategy />

      <section className="flex flex-col gap-16 items-center p-8 py-12 sm:px-16 sm:py-24">
        <Title text={`Plus d'informations sur nos réseaux`} />

        <div className="flex w-full items-center gap-8 flex-col">
          <SocialButton
            href="https://www.facebook.com/share/9VV2yufSwGX31iXM"
            icon={<Facebook fontSize="large" className="text-[#095DFE]" />}
          >
            sur Facebook
          </SocialButton>

          <SocialButton
            href="https://www.instagram.com/sowhat_app_officiel/"
            icon={<Instagram fontSize="large" style={{ color: '#F50E6A' }} />}
          >
            sur Instagram
          </SocialButton>

          <SocialButton
            href="https://www.linkedin.com/company/sowhat-app/"
            icon={<LinkedIn fontSize="large" style={{ color: '#0C5CBA' }} />}
          >
            sur LinkedIn
          </SocialButton>

          <SocialButton
            href="https://www.youtube.com/@sowhat_app"
            icon={<YouTube fontSize="large" style={{ color: '#FF002F' }} />}
          >
            sur Youtube
          </SocialButton>
        </div>
      </section>

      <Footer />
    </main>
  );
}
