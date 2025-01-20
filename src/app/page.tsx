'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Apple } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Footer from '@/src/components/footer';
import { Title } from '@/src/components/new/title';
import { CardDemo } from '@/src/components/yt-card';
import { NetworkButton } from '@/src/components/rs-button';
import { PrimaryLink } from '@/src/components/new/primary-link';
import { WordsCarousel } from '@/src/components/new/words-carousel';
import { ContactButtonWithDialog } from '@/src/components/new/contact-button-with-dialog';

interface Step {
  index: number;
  tag: string;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  {
    index: 0,
    tag: 'Inscription',
    title: 'Inscription rapide et gratuite',
    description: `Sowhat est une application disponible sur iOS et Android, totalement gratuite et sans aucune contrainte. Pas de frais cachés, pas besoin d'ajouter une carte bancaire, pas de publicités intrusives et aucune version premium payante. De plus, l'inscription est simple et rapide : en moins de 2 minutes, vous êtes prêt à utiliser toutes les fonctionnalités de l'application.`,
  },
  {
    index: 1,
    tag: 'Connexion',
    title: 'Connexion des comptes courants',
    description: `Connectez facilement et en toute sécurité vos comptes bancaires provenant de plus de 120 établissements, couvrant les institutions les plus connues et utilisées en France. Suivez vos finances en temps réel grâce à une intégration rapide et illimitée.`,
  },
  {
    index: 2,
    tag: 'Comptes épargne',
    title: 'Connexion des comptes épargnes',
    description: `Pour anticiper le future, il faut avoir une bonne gestion de son épargne également. Sowhat vous permet de connecter vos comptes d'épargne tels que le Livret A, le PEL ou le LDD. Vous pouvez également ajouter vos crédits, pour avoir une vision complète et précise de votre situation financière et de ce que vous possédez réellement.`,
  },
  {
    index: 3,
    tag: 'Autre patrimoine',
    title: 'Enregistrement de tous vos autres biens',
    description: `Pour comprendre réellement votre patrimoine, il faut voir au-delà des comptes bancaires. Avec Sowhat, ajoutez vos biens immobiliers, votre véhicule, vos investissements en bourse, vos cryptomonnaies et bien plus encore. Sowhat vous offre une vue complète et détaillée de tout ce que vous possédez, afin de mieux gérer et planifier vos finances.`,
  },
  {
    index: 4,
    tag: `Vision complète`,
    title: 'Vision complète du patrimoine',
    description: `Que vous partagiez un compte commun avec votre partenaire ou que votre crédit soit encore en cours de remboursement, Sowhat vous aide à connaître la valeur réelle de votre patrimoine en temps réel. Grâce à une interface intuitive, obtenez une vision claire et détaillée de tout ce que vous possédez.`,
  },
  {
    index: 5,
    tag: `Budget`,
    title: 'Gestion du budget',
    description: `Savez-vous combien vous dépensez chaque mois ? Avec Sowhat, suivez vos revenus et vos dépenses de manière simple et adaptée à vos centres d'intérêt. Analysez vos mouvements bancaires pour mieux comprendre vos habitudes et reprendre le contrôle de votre budget.`,
  },
  {
    index: 6,
    tag: `Projets d'épargne`,
    title: `Gestion des projets d'épargne`,
    description: `La plupart des applications de gestion financière se concentrent uniquement sur vos revenus et salaires. Mais Sowhat va plus loin : pourquoi épargnez-vous vraiment ? Que ce soit pour un voyage, une maison ou un autre projet, Sowhat vous aide à planifier et à anticiper vos objectifs futurs.`,
  },
  {
    index: 7,
    tag: `Simulateur`,
    title: 'Simulateur intégré',
    description: `Anticipez vos rêves avec Sowhat. Grâce à son simulateur intégré, l'application vous permet d'évaluer vos projets en fonction de votre épargne actuelle. Découvrez combien il vous reste à économiser pour concrétiser vos envies, qu'il s'agisse d'une nouvelle voiture, de vacances ou de votre futur logement.`,
  },
];

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
              width: '50%',
              height: 'auto',
              objectFit: 'contain',
            }}
            src="/images/font.svg"
            alt="Font Logo"
          />
          <p className="w-[50%] sm:text-xl text-pretty">{`L’application essentielle pour les finances personnelles.`}</p>
        </div>

        <div className="w-full flex flex-1 p-8 pb-0 gap-8 flex-col sm:flex-row">
          <div className="flex basis-1/2 items-center justify-center">
            <PrimaryLink
              title={`Télécharger l'application`}
              link="https://apps.apple.com/fr/app/sowhat-app/id6736385732"
            >
              <Apple fontSize="medium" />
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

      <section className="flex min-h-screen items-center">
        <div className="w-full flex-1 flex flex-col sm:flex-row gap-8 pt-24 p-8 sm:p-16">
          <div className="flex basis-1/2 items-center justify-center p-12 sm:p-0">
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

          <div className="flex basis-1/2 flex-col p-8 md:p-16 gap-8">
            <Title centered={false} text={`Sowhat c'est`} />
            <p className="sm:text-lg">
              {`Tous vos comptes bancaires et 100% de votre patrimoine connectés dans une seule app.`}
            </p>
            <p className="sm:text-lg">{`La gestion de vos différents projets d'épargne grâce à un système d'enveloppes virtuelles et un outil de prévision.`}</p>
            <p className="sm:text-lg">
              {`En toute sécurité puisque l'application ne touche pas à l'argent réel (paiements, virements et investissements impossibles depuis Sowhat)`}
            </p>
            <p className="text-lg">
              {`C'est ce qu'il y a de plus facile et personnalisé pour gérer vos projets d'épargne, votre argent et votre budget.`}
            </p>
            <p className="font-bold text-blue-500 text-lg">{`et c'est 100% gratuite`}</p>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-16 items-center p-8 py-12 sm:px-16 sm:py-24 bg-yellow-400">
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
                  <div>{s.index}</div>
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
        <div className="w-full justify-center flex my-8">
          <PrimaryLink
            title={`Télécharger l'application`}
            link="https://apps.apple.com/fr/app/sowhat-app/id6736385732"
          >
            <Apple fontSize="medium" />
          </PrimaryLink>
        </div>
      </section>

      <section className="flex flex-col gap-16 items-center p-8 py-12 sm:px-16 sm:py-24">
        <Title text={`Sowhat sur les réseaux sociaux`} />

        <div className={`flex flex-col lg:flex-row gap-8 justify-center items-center w-full`}>
          <CardDemo
            title={`Comprendre Sowhat en vidéo`}
            description={`Et ce, grâce à Shakespear...`}
            link={`https://youtu.be/nyaZ-3tXlBw`}
          />
          <CardDemo
            title={`Pourquoi Sowhat est sûre ?`}
            description={`30 secondes pour comprendre notre politique de sécurité pour vos données personnelles et vos données bancaires.`}
            link={`https://youtu.be/Lu5ly6mkpOQ`}
          />
          <CardDemo
            title={`Pas encore convaincu(e) ?`}
            description={`Tout est résumé ici, rien que pour vous !`}
            link={`https://youtu.be/CrU8JcBPVSo`}
          />
        </div>

        <div className="flex w-full lg:flex-row lg:justify-evenly items-center gap-8 flex-col">
          <NetworkButton type="facebook" />
          <NetworkButton type="instagram" />
          <NetworkButton type="linkedin" />
        </div>
      </section>

      <Footer />
    </main>
  );
}

const Header = () => {
  return (
    <div className="text-sm sm:text-base p-4 sm:p-8 gap-4 sm:gap-8 absolute top-0 w-full flex justify-end bg-white/05 backdrop-blur-sm z-10">
      <Link href={'/a'}>
        <div className="px-5 sm:px-8 py-2 bg-gray-200">Articles</div>
      </Link>
      <ContactButtonWithDialog />
    </div>
  );
};
