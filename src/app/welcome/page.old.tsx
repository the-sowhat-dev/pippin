// 'use client';

// import Link from 'next/link';
// import Image from 'next/image';
// import { useState } from 'react';
// import { Apple } from '@mui/icons-material';
// import { motion, AnimatePresence } from 'framer-motion';

// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from '@/components/ui/accordion';
// import { Title } from '@/src/components/new/title';
// import { PrimaryLink } from '@/src/components/new/primary-link';
// import { WordsCarousel } from '@/src/components/new/words-carousel';
// import { NetworkButton } from '@/src/components/rs-button';
// import { CardDemo } from '@/src/components/yt-card';
// import Footer from '@/src/components/footer';
// import { ContactButtonWithDialog } from '@/src/components/new/contact-button-with-dialog';

// interface Step {
//   index: number;
//   tag: string;
//   title: string;
//   description: string;
// }

// const STEPS: Step[] = [
//   {
//     index: 0,
//     tag: 'Inscription',
//     title: 'Inscription rapide et gratuite',
//     description: `Connectez également votre livret A, votre PER, PEL ou autre comptes épargnes et suivre efficacement l’évolution de votre éparnge, c’est la chose la plus importante pour anticiper le futur. Ne les laissez pas au mains de la banque.`,
//   },
//   {
//     index: 1,
//     tag: 'Connexion',
//     title: 'Connexion des comptes courants',
//     description: `Connectez également votre livret A, votre PER, PEL ou autre comptes épargnes et suivre efficacement l’évolution de votre éparnge, c’est la chose la plus importante pour anticiper le futur. Ne les laissez pas au mains de la banque.`,
//   },
//   {
//     index: 2,
//     tag: 'Comptes épargne',
//     title: 'Connexion des comptes épargnes',
//     description: `Connectez également votre livret A, votre PER, PEL ou autre comptes épargnes et suivre efficacement l’évolution de votre éparnge, c’est la chose la plus importante pour anticiper le futur. Ne les laissez pas au mains de la banque.`,
//   },
//   {
//     index: 3,
//     tag: 'Autre patrimoine',
//     title: 'Enregistrement de tous vos autres biens',
//     description: `Connectez également votre livret A, votre PER, PEL ou autre comptes épargnes et suivre efficacement l’évolution de votre éparnge, c’est la chose la plus importante pour anticiper le futur. Ne les laissez pas au mains de la banque.`,
//   },
//   {
//     index: 4,
//     tag: `Vision complète`,
//     title: 'Vision complète du patrimoine',
//     description: `Connectez également votre livret A, votre PER, PEL ou autre comptes épargnes et suivre efficacement l’évolution de votre éparnge, c’est la chose la plus importante pour anticiper le futur. Ne les laissez pas au mains de la banque.`,
//   },
//   {
//     index: 5,
//     tag: `Budget`,
//     title: 'Gestion du budget',
//     description: `Connectez également votre livret A, votre PER, PEL ou autre comptes épargnes et suivre efficacement l’évolution de votre éparnge, c’est la chose la plus importante pour anticiper le futur. Ne les laissez pas au mains de la banque.`,
//   },
//   {
//     index: 6,
//     tag: `Projets d’épargne`,
//     title: 'Gestion des projets d’épargne',
//     description: `Connectez également votre livret A, votre PER, PEL ou autre comptes épargnes et suivre efficacement l’évolution de votre éparnge, c’est la chose la plus importante pour anticiper le futur. Ne les laissez pas au mains de la banque.`,
//   },
//   {
//     index: 7,
//     tag: `Simulateur`,
//     title: 'Simulateur intégré',
//     description: `Connectez également votre livret A, votre PER, PEL ou autre comptes épargnes et suivre efficacement l’évolution de votre éparnge, c’est la chose la plus importante pour anticiper le futur. Ne les laissez pas au mains de la banque.`,
//   },
// ];

// export default function Home() {
//   const [activeStep, setActiveStep] = useState<number>(1);

//   return (
//     <main className={`bg-gradient-to-b from-yellow-200 to-yellow-50`}>
//       <Header />
//       <section>
//         <div className="flex flex-col w-full gap-4 sm:gap-8 p-8 pt-28">
//           <Image
//             width={0}
//             height={0}
//             priority
//             style={{
//               width: '50%',
//               height: 'auto',
//               objectFit: 'contain',
//             }}
//             src="/images/font.svg"
//             alt="Font Logo"
//           />
//           <p className="w-[50%] sm:text-xl text-pretty">{`L’application essentielle pour les finances personnelles.`}</p>
//         </div>

//         <div className="w-full flex flex-1 p-8 pb-0 gap-8 flex-col sm:flex-row">
//           <div className="flex basis-1/2 items-center justify-center">
//             <PrimaryLink
//               title={`Télécharger l'application`}
//               link="https://apps.apple.com/fr/app/sowhat-app/id6736385732"
//             >
//               <Apple fontSize="medium" />
//             </PrimaryLink>
//           </div>

//           <div className="flex basis-1/2 self-center justify-center items-center sm:items-end max-w-[300px] sm:max-w-[600px]">
//             <Image
//               src={'/images/mockup_us.png'}
//               alt="Strategy Image"
//               style={{
//                 maxHeight: '600px',
//                 width: 'auto',
//                 objectFit: 'contain',
//               }}
//               width={1100}
//               height={1578}
//             />
//           </div>
//         </div>

//         <WordsCarousel />
//       </section>

//       <section className="flex min-h-screen items-center">
//         <div className="w-full flex-1 flex flex-col sm:flex-row gap-8 pt-24 p-8 sm:p-16">
//           <div className="flex basis-1/2 items-center justify-center p-12 sm:p-0">
//             <Image
//               src={'/images/three_mockups.png'}
//               alt="Trois mockups en un pour présentation"
//               style={{
//                 maxHeight: '500px',
//                 width: '100%',
//                 objectFit: 'contain',
//               }}
//               width={800}
//               height={800}
//             />
//           </div>

//           <div className="flex basis-1/2 justify-center items-center flex-col p-8 md:p-16 gap-8">
//             <Title text={`Sowhat c'est`} />
//             <p className="text-center sm:text-lg">
//               {`Tous vos comptes bancaires et 100% de votre patrimoine connectés dans une seule app.`}
//             </p>
//             <p className="text-center text-lg">
//               {`C’est ce qu’il y a de plus facile et personnalisé pour gérer vos projets d’épargne, votre argent et votre budget.`}
//             </p>
//             <p className="font-bold text-blue-500 text-lg">{`et 100% gratuite`}</p>
//           </div>
//         </div>
//       </section>

//       <section className="min-h-screen flex-col items-center hidden lg:flex">
//         <Title text={`Nos 8 principes pour une bonne application de finance`} />

//         <div className="w-full flex-1 flex gap-4 xl:p-16">
//           <div className="flex lg:basis-2/3 xl:basis-1/2 justify-center items-center p-8 sm:p-16 min-h-[700px]">
//             <Accordion
//               type="single"
//               defaultValue="step-0"
//               onValueChange={(value: string) => {
//                 setActiveStep(Number(value.replace('step-', '')));
//               }}
//             >
//               <AccordionItem value="step-0">
//                 <AccordionTrigger>{`1- Inscription rapide et gratuite`}</AccordionTrigger>
//                 <AccordionContent>{`Connectez également votre livret A, votre PER, PEL ou autre comptes épargnes et suivre efficacement l’évolution de votre éparnge, c’est la chose la plus importante pour anticiper le futur. Ne les laissez pas au mains de la banque.`}</AccordionContent>
//               </AccordionItem>
//               <AccordionItem value="step-1">
//                 <AccordionTrigger>{`2- Connexion des comptes courants`}</AccordionTrigger>
//                 <AccordionContent>{`Connectez également votre livret A, votre PER, PEL ou autre comptes épargnes et suivre efficacement l’évolution de votre éparnge, c’est la chose la plus importante pour anticiper le futur. Ne les laissez pas au mains de la banque .`}</AccordionContent>
//               </AccordionItem>
//               <AccordionItem value="step-2">
//                 <AccordionTrigger>{`3- Connexion des comptes épargnes`}</AccordionTrigger>
//                 <AccordionContent>{`Connectez également votre livret A, votre PER, PEL ou autre comptes épargnes et suivre efficacement l’évolution de votre éparnge, c’est la chose la plus importante pour anticiper le futur. Ne les laissez pas au mains de la banque .`}</AccordionContent>
//               </AccordionItem>
//               <AccordionItem value="step-3">
//                 <AccordionTrigger>{`4- Enregistrement de tous vos autres biens`}</AccordionTrigger>
//                 <AccordionContent>{`Connectez également votre livret A, votre PER, PEL ou autre comptes épargnes et suivre efficacement l’évolution de votre éparnge, c’est la chose la plus importante pour anticiper le futur. Ne les laissez pas au mains de la banque .`}</AccordionContent>
//               </AccordionItem>
//               <AccordionItem value="step-4">
//                 <AccordionTrigger>{`5- Vision complète du patrimoine`}</AccordionTrigger>
//                 <AccordionContent>{`Connectez également votre livret A, votre PER, PEL ou autre comptes épargnes et suivre efficacement l’évolution de votre éparnge, c’est la chose la plus importante pour anticiper le futur. Ne les laissez pas au mains de la banque .`}</AccordionContent>
//               </AccordionItem>
//               <AccordionItem value="step-5">
//                 <AccordionTrigger>{`6- Gestion du budget`}</AccordionTrigger>
//                 <AccordionContent>{`Connectez également votre livret A, votre PER, PEL ou autre comptes épargnes et suivre efficacement l’évolution de votre éparnge, c’est la chose la plus importante pour anticiper le futur. Ne les laissez pas au mains de la banque .`}</AccordionContent>
//               </AccordionItem>
//               <AccordionItem value="step-6">
//                 <AccordionTrigger>{`7- Gestion des projets d’épargne`}</AccordionTrigger>
//                 <AccordionContent>{`Connectez également votre livret A, votre PER, PEL ou autre comptes épargnes et suivre efficacement l’évolution de votre éparnge, c’est la chose la plus importante pour anticiper le futur. Ne les laissez pas au mains de la banque .`}</AccordionContent>
//               </AccordionItem>
//               <AccordionItem value="step-7">
//                 <AccordionTrigger>{`8- Simulateur intégré`}</AccordionTrigger>
//                 <AccordionContent>{`Connectez également votre livret A, votre PER, PEL ou autre comptes épargnes et suivre efficacement l’évolution de votre éparnge, c’est la chose la plus importante pour anticiper le futur. Ne les laissez pas au mains de la banque .`}</AccordionContent>
//               </AccordionItem>
//             </Accordion>
//           </div>

//           <div className="flex lg:basis-1/3 xl:basis-1/2 items-center justify-center p-8 sm:p-16 overflow-hidden">
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={activeStep}
//                 initial={{ x: 300, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 exit={{ x: -300, opacity: 0 }}
//                 transition={{ duration: 0.5, ease: 'easeInOut' }}
//                 className="w-full h-full flex items-center justify-center"
//               >
//                 <Image
//                   src={`/images/step-${activeStep}.png`}
//                   alt={`Step ${activeStep} illustration`}
//                   style={{
//                     maxHeight: '700px',
//                     width: '100%',
//                     objectFit: 'contain',
//                   }}
//                   width={800}
//                   height={800}
//                 />
//               </motion.div>
//             </AnimatePresence>
//           </div>
//         </div>
//       </section>

//       <section className="min-h-screen flex lg:hidden flex-col gap-16 justify-start items-center p-8">
//         <Title text={`Nos 8 principes pour une bonne application de finance`} />

//         <div className=" w-full overflow-x-auto">
//           {/* Container for horizontal scrolling for mobile experience ONLY */}
//           <div className="w-full overflow-x-auto">
//             <div className="flex sm:flex-wrap gap-x-4 gap-y-8 pb-4 sm:pb-0 min-w-max sm:min-w-0">
//               {STEPS.map((s) => (
//                 <button
//                   key={s.index}
//                   onClick={() => setActiveStep(s.index)}
//                   className={`p-2 sm:p-4 gap-2 sm:gap-4 text-base sm:text-lg flex items-center rounded-xl transition-colors whitespace-nowrap
//             ${
//               activeStep === s.index
//                 ? 'bg-yellow-400 border-yellow-200'
//                 : 'bg-white border-white hover:border-gray-100 hover:bg-gray-100'
//             } border`}
//                 >
//                   <div>{s.index}</div>
//                   <div>{s.tag}</div>
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div className="flex items-center justify-center flex-col gap-8 p-6 sm:p-16 self-center overflow-hidden">
//             <p className="text-center text-base sm:text-lg sm:w-[70%]">
//               {STEPS[activeStep > 7 ? 0 : activeStep].description}
//             </p>
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={activeStep}
//                 initial={{ x: 300, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 exit={{ x: -300, opacity: 0 }}
//                 transition={{ duration: 0.5, ease: 'easeInOut' }}
//                 className="w-full h-full flex items-center justify-center"
//               >
//                 <Image
//                   src={`/images/step-${activeStep}.png`}
//                   alt={`Step ${activeStep} illustration`}
//                   style={{
//                     maxHeight: '400px',
//                     width: '100%',
//                     objectFit: 'contain',
//                   }}
//                   width={800}
//                   height={800}
//                 />
//               </motion.div>
//             </AnimatePresence>
//           </div>
//         </div>
//       </section>

//       <div className="w-full justify-center flex my-8">
//         <PrimaryLink
//           title={`Télécharger l'application`}
//           link="https://apps.apple.com/fr/app/sowhat-app/id6736385732"
//         >
//           <Apple fontSize="medium" />
//         </PrimaryLink>
//       </div>

//       <section className="flex flex-col min-h-screen items-center justify-center p-16 gap-32">
//         <Title text={`Sowhat sur les réseaux sociaux`} />

//         <div className={`flex flex-col lg:flex-row gap-8 justify-center items-center w-full`}>
//           <CardDemo
//             title={`Comprendre Sowhat en vidéo`}
//             description={`Et ce, grâce à Shakespear...`}
//             link={`https://youtu.be/5iWyIuG5aHw`}
//           />
//           <CardDemo
//             title={`Pourquoi Sowhat est sûre ?`}
//             description={`30 secondes pour comprendre notre politique de sécurité pour vos données personnelles et vos données bancaires.`}
//             link={`https://www.youtube.com/shorts/_wupOKMEI6c`}
//           />
//           <CardDemo
//             title={`Pas encore convaincu(e) ?`}
//             description={`Tout est résumé ici, rien que pour vous !`}
//             link={`https://www.veed.io/view/d2b369f4-6785-4efd-9499-7076efa127b2`}
//           />
//         </div>

//         <div className="flex w-full lg:flex-row lg:justify-evenly items-center gap-8 flex-col">
//           <NetworkButton type="facebook" />
//           <NetworkButton type="instagram" />
//           <NetworkButton type="linkedin" />
//         </div>
//       </section>

//       <Footer />
//     </main>
//   );
// }

// const Header = () => {
//   return (
//     <div className="text-sm sm:text-base p-4 sm:p-8 gap-4 sm:gap-8 absolute top-0 w-full flex justify-end bg-white/05 backdrop-blur-sm z-10">
//       <Link href={'/a'}>
//         <div className="px-5 sm:px-8 py-2 bg-gray-200">Articles</div>
//       </Link>
//       <ContactButtonWithDialog />
//     </div>
//   );
// };
