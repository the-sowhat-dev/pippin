'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Speed,
  TrendingUp,
  Verified,
  Diamond,
  Handshake,
  Balance,
  MoneyOff,
  AccountBalance,
  Instagram,
  LinkedIn,
} from '@mui/icons-material';
import { Title } from '../Title';
import DescriptionProStrategy from './DescriptionProStrategy';
import { LexendFont } from '@/utils/fonts';

const items = [
  {
    text: "J'ai accès en moins de 5 minutes à une analyse IA de ma situation",
    Icon: Speed,
  },
  {
    text: "Préparer l'avenir et développer mon patrimoine est enfin devenu simple",
    Icon: TrendingUp,
  },
  {
    text: 'Quel que soit ce que signifie « gagner mieux » pour moi, invstore® répond à mon besoin',
    Icon: Verified,
  },
  {
    text: "J'ai accès aux meilleures opportunités pour me construire une épargne sur mesure",
    Icon: Diamond,
  },
  {
    text: "Je récupère le pouvoir de la négociation : ici c'est le monde de la finance qui se bat pour moi, pas l'inverse",
    Icon: Handshake,
  },
  {
    text: "Invstore® ne vend pas de produits financiers et se rémunère uniquement sur la mise en relation entre particuliers et professionnels : son algorithme n'a aucun intérêt à m'orienter vers un conseiller ou un produit en particulier",
    Icon: Balance,
  },
  {
    text: 'Tout est gratuit pour moi, ce sont les experts financiers qui payent',
    Icon: MoneyOff,
  },
  {
    text: 'Si je le souhaite, je peux aussi gagner du temps en gérant tous mes comptes bancaires depuis une seule application',
    Icon: AccountBalance,
  },
];

export default function InvstoreStrategy() {
  return (
    <>
      <section className="bg-[#C2E7FF] py-16 px-4 sm:px-8 flex flex-col gap-10 sm:gap-16">
        <Title id="why-join" text="Pourquoi rejoindre l'expérience invstore® ?" />
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/60 backdrop-blur-sm p-6 rounded-xl shadow-sm hover:shadow-md transition-all relative overflow-hidden min-h-[200px] flex items-center justify-center group border-2 border-white/80 hover:border-white"
              >
                <div className="transition-all duration-500 hover:translate-y-0.5 flex items-center justify-center text-gray-600 hover:text-blue-950">
                  <item.Icon
                    sx={{ fontSize: 160 }}
                    className="absolute text-blue-800/5 group-hover:text-blue-800/10 transition-all duration-500 transform -rotate-12 scale-110 hover:-rotate-6"
                  />
                  <div className="relative pointer-events-none">
                    <p className="text-lg font-medium text-center">{item.text}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <DescriptionProStrategy theme="blue" />
      </section>

      <div className="bg-gradient-to-b from-[#203649] to-[#405e79] p-4 md:p-8 py-8">
        <div className="flex flex-col sm:flex-row max-w-4xl gap-8 mx-auto justify-between items-center">
          <p className="text-base sm:text-lg text-center text-white">
            Suivez-nous sur{' '}
            <span className={`${LexendFont.className} text-green-100`}>les réseaux</span> pour plus
            d&apos;informations.
          </p>
          <div className="flex gap-4">
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={'https://www.instagram.com/invstore_app/'}
              className="h-16 w-16 transition-all duration-300 hover:scale-105 bg-white/80 border-2 border-white/0 hover:border-gray-100 hover:bg-white rounded-full items-center flex justify-center"
            >
              <Instagram fontSize="large" style={{ color: '#F50E6A' }} />
            </Link>

            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={'https://www.linkedin.com/company/invstore/'}
              className="h-16 w-16 transition-all duration-300 hover:scale-105 bg-white/80 border-2 border-white/0 hover:border-gray-100 hover:bg-white rounded-full items-center flex justify-center"
            >
              <LinkedIn fontSize="large" style={{ color: '#0C5CBA' }} />
            </Link>

            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={'https://www.tiktok.com/@invstore_app'}
              className="h-16 w-16 transition-all duration-300 hover:scale-105 bg-white/80 border-2 border-white/0 hover:border-gray-100 hover:bg-white rounded-full items-center flex justify-center"
            >
              <Image
                width={28}
                height={28}
                style={{ objectFit: 'contain' }}
                src="/icons/tiktok.svg"
                alt="TikTok icon"
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
