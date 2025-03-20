'use client';

import Link from 'next/link';
import Image from 'next/image';
import { OpenInNew } from '@mui/icons-material';

import Footer from '@/components/footer';
import { Title } from '@/components/new/title';

export default function Page() {
  return (
    <div className="bg-gradient-to-b from-yellow-300 to-yellow-400">
      <div className="flex center p-6">
        <Link href={'/'}>
          <Image
            src={'/images/logo-blanc.png'}
            alt="Logo"
            style={{
              width: 'auto',
              objectFit: 'contain',
            }}
            className="max-h-[30px] sm:max-h-[40px]"
            width={1100}
            height={1578}
          />
        </Link>
      </div>

      <article className="min-h-screen max-w-lg px-6 my-12 flex flex-col gap-12 mx-auto">
        <div className="w-full justify-center items-center flex flex-col gap-4">
          <Title centered={false} text={`Conseils`} />
          <p className="text-center text-sm text-gray-600">{`Vous êtes à la recherche d'informations et de conseils sur vos finances personnelles ? Découvrez ici nos recommandations.`}</p>
        </div>

        {/* EDUCATION FINANCIÈRE */}
        <div className="w-full flex flex-col gap-6">
          <SubTitle text={`Éducation financière`} />

          <PrimaryCard
            image={`https://firebasestorage.googleapis.com/v0/b/fintech-cd7dc.appspot.com/o/lfpt_logo.webp?alt=media&token=9dfd3984-9a83-4aff-8eaa-a775945ed535`}
            link={`https://www.lafinancepourtous.com`}
            title={`Le site pédagogique sur l'argent et la finance.`}
            description={`La finance pour tous est une association d'intérêt général, créée pour aider chacun à se sentir plus à l'aise avec les questions économiques et financières.`}
          />
        </div>

        {/* MEDIA SPECIALISE */}
        <div className="w-full flex flex-col gap-6">
          <SubTitle text={`Media spécialisé`} />

          <PrimaryCard
            image={`https://firebasestorage.googleapis.com/v0/b/fintech-cd7dc.appspot.com/o/spak_logo.webp?alt=media&token=a5097da6-0e9f-4732-832a-2483762adaa2`}
            link={`https://spak.fr`}
            title={`Pour une meilleure éducation financière.`}
            description={`SPAK développe des programmes de sensibilisation et des solutions pour favoriser une meilleure éducation financière.`}
          />
        </div>

        {/* PODCAST */}
        <div className="w-full flex flex-col gap-6">
          <SubTitle text={`Podcast`} />

          <PrimaryCard
            image={`https://firebasestorage.googleapis.com/v0/b/fintech-cd7dc.appspot.com/o/lbf_logo.webp?alt=media&token=65ac8e5f-1e17-4f87-b667-5088e45ba1a5`}
            link={`https://la-bonne-fortune.com/`}
            title={`Il est temps de prendre en main vos finances personnelles.`}
            description={`Le podcast "La bonne fortune", c'est plus de 60 invités et 170.000 écoutes dans le but de rendre les finances personnelles simples et accessibles à tous.`}
          />
        </div>

        {/* INVESTISSEMENT */}
        <div className="w-full flex flex-col gap-6">
          <SubTitle text={`Investissement`} />

          <PrimaryCard
            image={`https://firebasestorage.googleapis.com/v0/b/fintech-cd7dc.appspot.com/o/adi_logo.webp?alt=media&token=1d72c70c-e975-44ad-81c1-9eea9a11d544`}
            link={`https://www.avenuedesinvestisseurs.fr`}
            title={`Choisir les meilleurs placements pour son épargne et bien investir.`}
            description={`Lancé début 2018, Avenue des Investisseurs (ADI) est un portail d'information et
              d'éducation financière créé par deux investisseurs passionnés, Nicolas et Ludovic,
              désireux de partager leurs connaissances en finances personnelles. Nous démocratisons
              des conseils habituellement réservés aux plus fortunés, pour vous aider à optimiser
              votre épargne, préparer votre retraite, choisir les meilleurs placements, que ce soit
              en assurance vie, en bourse, en immobilier ou ailleurs. Vous êtes désormais plus de
              200 000 visiteurs par mois à nous suivre !`}
          />
        </div>

        {/* STARTUPS PARTENAIRES */}
        <div className="w-full flex flex-col gap-6">
          <SubTitle text={`Startups partenaires`} />

          <PrimaryCard
            image={`https://firebasestorage.googleapis.com/v0/b/fintech-cd7dc.appspot.com/o/iziwup_logo.webp?alt=media&token=ff1a65c2-2724-4e49-bd59-bec102979dda`}
            link={`https://www.iziwup.com/`}
            title={`L'éducation financière accessible à tous.`}
            description={`Iziwup est dédiée à l'éducation financière des jeunes, avec pour mission de rendre la gestion de l'argent accessible dès le plus jeune âge. Son objectif : intégrer l'éducation financière dans les programmes scolaires pour préparer les jeunes à une gestion éclairée de leur argent.`}
          />

          <PrimaryCard
            image={`https://firebasestorage.googleapis.com/v0/b/fintech-cd7dc.appspot.com/o/jared_logo.webp?alt=media&token=c3f68888-af3a-4a5e-8296-fb333e5332f3`}
            link={`https://jared.finance/`}
            title={`Vos objectifs financiers à portée de main.`}
            description={`Jared est un assistant financier qui vous aide au quotidien à progresser dans vos finances. Discutez avec votre assistant, identifiez vos objectifs, et bénéficiez de tout ce qu'il faut pour les atteindre !`}
          />

          <PrimaryCard
            image={`https://firebasestorage.googleapis.com/v0/b/fintech-cd7dc.appspot.com/o/skade_logo.webp?alt=media&token=c0897bc2-7aa6-42a8-9f11-962163cb3079`}
            link={`https://www.skade.io/?r=0`}
            title={`Le réseau social qui réunit les investisseur en bourse.`}
            description={`Skade.io est le premier réseau social qui révolutionne l'investissement en bourse en réunissant les investisseurs dans un écosystème transparent où l'intelligence collective est au cœur des décisions.`}
          />
        </div>
      </article>

      <Footer />
    </div>
  );
}

const SubTitle = ({ text }: { text: string }) => {
  return <p className="font-opensans font-bold text-lg sm:text-2xl">{text}</p>;
};

const ExternalLink = ({ title, link }: { title: string; link: string }) => {
  return (
    <Link
      target="_blank"
      rel="noopener noreferrer"
      href={link}
      className={`flex gap-3 justify-center items-center rounded-md text-white py-3 px-10 mt-6 bg-blue-500 hover:bg-blue-500/85 shadow-sm`}
    >
      <OpenInNew fontSize="small" />

      <p className="text-nowrap">{title}</p>
    </Link>
  );
};

const PrimaryCard = ({
  image,
  title,
  description,
  link,
}: {
  image: string;
  title: string;
  description: string;
  link: string;
}) => {
  return (
    <div className="w-full flex flex-col p-6 gap-3 items-start bg-yellow-200 rounded-lg">
      <Image
        src={image}
        alt="Logo"
        style={{ width: 'auto', objectFit: 'contain' }}
        className="max-h-[44px]"
        width={1100}
        height={1578}
      />
      <p className="text-blue-500 font-opensans font-bold">{title}</p>
      <p>{description}</p>

      <ExternalLink title={`Visiter`} link={link} />
    </div>
  );
};
