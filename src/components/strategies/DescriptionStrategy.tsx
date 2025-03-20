'use client';

import Image from 'next/image';

import { Title } from '@/components/new/title';

export default function DescriptionStrategy() {
  return (
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
  );
}
