import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';

export default function TribuneProStrategy() {
  return (
    <section className="mx-12 sm:mx-auto max-w-xl text-black my-32">
      <p className="text-2xl font-bold text-center mb-16">Notre conviction</p>
      <div className="relative mx-auto">
        <FormatQuoteIcon
          sx={{ fontSize: 100 }}
          className="absolute -top-12 -left-6 opacity-15 rotate-180"
        />
        <div className="flex flex-col gap-8 leading-tight text-justify">
          <p>
            Aujourd&apos;hui, plus de 70 % des Français disposent d&apos;une capacité
            d&apos;épargne, mais nombre d&apos;entre eux ne cherche pas à la valoriser,{' '}
            <span className="font-bold text-[#203649]">
              paralysés par la complexité du système financier.
            </span>
          </p>
          <p>
            Dans un contexte où la fiscalité pèse de plus en plus sur les revenus du travail, où les
            produits d&apos;épargne traditionnels rapportent moins que l&apos;inflation et où la
            retraite par capitalisation s&apos;impose progressivement, il leur sera malgré tout
            nécessaire d&apos;optimiser leur épargne - et au sens large leur patrimoine financier -{' '}
            <span className="font-bold text-[#203649]">
              s&apos;ils veulent préserver leur pouvoir d&apos;achat à long terme
            </span>
            .
          </p>
          <p>
            Le paradoxe, c&apos;est que ces épargnants savent qu&apos;ils devraient agir, mais{' '}
            <span className="font-bold text-[#203649]">
              ils ne se lancent pas car l&apos;effort à fournir leur semble disproportionné
            </span>{' '}
            : comprendre les produits, comparer les acteurs et les offres, remplir des formulaires,
            bloquer des rendez-vous, transmettre des justificatifs…
          </p>
          <p>
            Ces frictions cumulées tout au long du parcours d&apos;achat amènent le client à juger —
            parfois à juste titre — que{' '}
            <span className="font-bold text-[#203649]">
              les contraintes à court terme dépassent les bénéfices à long terme.
            </span>{' '}
            C&apos;est le syndrome de la salle de sport : on prend un abonnement plein de bonnes
            résolutions, mais n&apos;y retournons jamais…
          </p>
          <p>
            C&apos;est pourquoi chez invstore®, nous avons décidé d&apos;attaquer le problème sous
            un angle radicalement différent. Plutôt que de travailler sur les caractéristiques
            techniques des produits bancaires,{' '}
            <span className="font-bold text-[#203649]">
              nous nous sommes concentrés sur le parcours client avec pour objectif de supprimer
              tous les irritants
            </span>
            , et ainsi permettre à cette large partie de la population d&apos;accéder à des produits
            et services jusqu&apos;alors réservés aux plus aisés.
          </p>
          <p>
            <span className="font-bold text-[#203649]">
              Notre conviction, c&apos;est que le problème ne vient pas du produit, mais de
              l&apos;expérience d&apos;achat !
            </span>{' '}
            Notre mission : permettre aux particuliers de gagner mieux sans effort, en rendant
            l&apos;investissement aussi simple et agréable qu&apos;une sortie shopping ou un passage
            au marché.
          </p>
          <p>
            Tout comme Doctolib® a révolutionné la santé en simplifiant le parcours patient sans se
            substituer aux médecins,{' '}
            <span className="font-bold text-[#203649]">
              notre algorithme propriétaire met en musique les technologies Open Banking et IA pour
              fluidifier le parcours bancaire,
            </span>{' '}
            en laissant aux professionnels le cœur de leur métier : l&apos;expertise, le conseil et
            la vente.
          </p>
          <p>
            Si vous aussi vous partagez cette vision et souhaitez{' '}
            <span className="font-bold text-[#203649]">
              participer à la construction de ce pan de marché encore largement inexploré
            </span>
            , rejoignez-nous !
          </p>
        </div>
        <FormatQuoteIcon
          sx={{ fontSize: 100 }}
          className="absolute -bottom-14 -right-6 opacity-15"
        />
      </div>

      <div className="flex gap-4 items-center justify-center mt-16">
        <Image
          src={`/images/raph-2.png`}
          alt={`@raph`}
          width={250}
          height={250}
          className="w-16 h-16 rounded-lg bg-[#c6f0d0] shadow-sm"
        />

        <div>
          <p className="text-lg font-bold">Raphaël METROP</p>
          <p>Co-founder & CEO</p>
        </div>
      </div>

      <div className="flex justify-center mt-16">
        <Link href="/pro/form">
          <Button
            size="lg"
            className="text-md sm:text-lg px-8 py-6 rounded-lg bg-green-500 hover:bg-green-500/80"
          >
            Nous rejoindre
          </Button>
        </Link>
      </div>
    </section>
  );
}
