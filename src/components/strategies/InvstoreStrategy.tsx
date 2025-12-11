'use client';

import React from 'react';
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

const items = [
  {
    text: "J'ai accès en moins de 5 minutes à une analyse IA de ma situation",
    Icon: Speed,
  },
  {
    text: 'Préparer lavenir et développer mon patrimoine est enfin devenu simple',
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
    <section className="bg-[#C2E7FF] py-16 px-4 sm:px-8 flex flex-col gap-10 sm:gap-16">
      <Title text="Pourquoi rejoindre l'expérience invstore® ?" />
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
                <div className="relative z-10 pointer-events-none">
                  <p className="text-lg font-medium text-center">{item.text}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-8 items-center">
        <p className="text-center mx-8 text-xl sm:text-2xl font-medium text-gray-800">
          Suivez-nous sur les réseaux pour plus d&apos;informations
        </p>
        <div className="flex gap-4">
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href={'https://www.instagram.com/invstore_app/'}
            className="p-4 transition-all h-18 w-18 duration-300 hover:scale-105 bg-white/60 border-2 border-white/80 hover:border-white hover:bg-white rounded-full"
          >
            <Instagram fontSize="large" style={{ color: '#F50E6A' }} />
          </Link>

          <Link
            target="_blank"
            rel="noopener noreferrer"
            href={'https://www.linkedin.com/company/invstore/'}
            className="p-4 transition-all h-18 w-18 duration-300 hover:scale-105 bg-white/60 border-2 border-white/80 hover:border-white hover:bg-white rounded-full"
          >
            <LinkedIn fontSize="large" style={{ color: '#0C5CBA' }} />
          </Link>

          <Link
            target="_blank"
            rel="noopener noreferrer"
            href={'https://www.tiktok.com/@invstore_app'}
            className="p-4 transition-all h-18 w-18 duration-300 hover:scale-105 bg-white/60 border-2 border-white/80 hover:border-white hover:bg-white rounded-full"
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
    </section>
  );
}
