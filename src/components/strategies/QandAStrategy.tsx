'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../../components/ui/accordion';
import { Title } from '../Title';

const questions = [
  {
    question: 'L’application invstore®, c’est quoi exactement ?',
    answer: (
      <>
        <p>
          Concrètement, invstore® est une application française gratuite qui analyse votre
          situation financière en moins de 5 minutes grâce à l’intelligence artificielle, puis vous
          met en relation de manière anonyme avec des professionnels de la finance vérifiés et
          agréés en France.
        </p>
        <p className="mt-2">
          L’app vous guide pas à pas pour comprendre comment améliorer votre épargne et trouver les
          experts les mieux adaptés à vos besoins.
        </p>
      </>
    ),
  },
  {
    question: 'Est-ce qu’invstore® est disponible partout en France ?',
    answer: (
      <>
        <p>
          Oui, l’application fonctionne sur tout le territoire français, métropole et outre-mer
          inclus.
        </p>
        <p className="mt-2">
          Tous les professionnels présents sur la plateforme sont autorisés à exercer en France et
          déclarés auprès de l’ORIAS.
        </p>
      </>
    ),
  },
  {
    question: 'Est-ce vraiment gratuit pour les particuliers ?',
    answer: (
      <>
        <p>Oui, invstore® est 100 % gratuit pour les particuliers :</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>création du profil,</li>
          <li>analyse IA,</li>
          <li>matching,</li>
          <li>connexion Open Banking.</li>
        </ul>
        <p className="mt-2">
          Ce sont les professionnels financiers qui rémunèrent la plateforme. Aucun frais, aucune
          commission, aucune facturation ne pèse sur les utilisateurs.
        </p>
      </>
    ),
  },
  {
    question: 'Combien de temps faut-il pour utiliser invstore® ?',
    answer: (
      <>
        <p>Moins de 5 minutes :</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>téléchargement de l’app,</li>
          <li>création du profil,</li>
          <li>réponses aux questions,</li>
          <li>analyse IA immédiate.</li>
        </ul>
      </>
    ),
  },
  {
    question: 'Est-ce qu’invstore® convient aux débutants ?',
    answer: (
      <>
        <p>Oui, l’application est pensée pour les particuliers qui :</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>n’ont jamais investi,</li>
          <li>souhaitent comprendre comment épargner,</li>
          <li>veulent être guidés simplement,</li>
          <li>cherchent une alternative aux parcours bancaires classiques.</li>
        </ul>
        <p className="mt-2">L’objectif d’invstore® est de rendre l’épargne accessible à tous.</p>
      </>
    ),
  },
  {
    question: 'Comment fonctionne l’analyse IA d’invstore® ?',
    answer: (
      <>
        <p>
          Vous complétez quelques questions simples, puis l’IA analyse votre situation patrimoniale
          pour vous fournir :
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>un aperçu immédiat de votre situation financière,</li>
          <li>les leviers concrets pour “gagner mieux” selon vos objectifs,</li>
          <li>les types d’opportunités adaptées à votre profil.</li>
        </ul>
        <p className="mt-2">
          L’analyse est purement informative, non contractuelle et ne constitue donc pas un conseil
          d’investissement.
        </p>
      </>
    ),
  },
  {
    question: 'Qui sont les professionnels présents sur invstore® ?',
    answer: (
      <>
        <p>
          Des conseillers en gestion de patrimoine, banquiers, courtiers, et experts financiers
          indépendants, utilisant les services de la plateforme invstore® pour trouver de nouveaux
          clients. Tous sont :
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>autorisés à exercer en France,</li>
          <li>enregistrés à l’ORIAS,</li>
          <li>conformes aux obligations AMF et/ou ACPR selon leur statut,</li>
          <li>vérifiés par les équipes d’invstore®.</li>
        </ul>
        <p className="mt-2">Aucun d’entre eux n’est employé ou actionnaire d’invstore®.</p>
      </>
    ),
  },
  {
    question: 'Comment fonctionne l’anonymat sur invstore® ?',
    answer: (
      <>
        <p>
          Votre fiche profil est entièrement anonymisée, ce qui signifie que l’outil IA comme les
          professionnels voient vos données financières et vos objectifs, mais jamais votre identité
          :
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>pas de nom,</li>
          <li>pas de genre,</li>
          <li>pas d’adresse,</li>
          <li>pas de numéro de téléphone,</li>
          <li>pas d’email.</li>
        </ul>
        <p className="mt-2">
          Votre identité et vos coordonnées ne sont révélées qu’avec votre consentement explicite
          lorsque vous décidez d’aller plus loin avec un professionnel.
        </p>
      </>
    ),
  },
  {
    question: 'Que se passe-t-il après la création d’un compte utilisateur invstore® ?',
    answer: (
      <>
        <p>Vous recevez :</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>votre analyse IA personnalisée,</li>
          <li>des offres de produit adaptées de professionnels agréés,</li>
          <li>
            la possibilité de programmer un premier échange téléphonique avec ceux de votre choix.
          </li>
        </ul>
        <p className="mt-2">
          Vous restez libre d’accepter, d’ignorer ou de mettre votre diffusion en pause.
        </p>
      </>
    ),
  },
  {
    question: 'Est-ce qu’invstore® vend des produits financiers ?',
    answer: (
      <>
        <p>
          Non, invstore® n’exerce aucune activité de conseil ou vente de produits financiers. La
          plateforme sert uniquement d’intermédiaire technique pour la mise en relation des
          particuliers et professionnels de la finance.
        </p>
      </>
    ),
  },
  {
    question: 'Le matching avec les experts est-il vraiment indépendant ?',
    answer: (
      <>
        <p>
          Oui, l’algorithme n’est pas influencé par des commissions sur des produits ou sur des
          ventes, et invstore® est rémunéré uniquement par :
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>un abonnement payé par les professionnels opérant sur la plateforme,</li>
          <li>
            une commission de succès lorsque l’utilisateur accepte un premier échange téléphonique.
          </li>
        </ul>
        <p className="mt-2">
          L’algorithme n’a donc aucun intérêt à favoriser un acteur plutôt qu’un autre.
        </p>
      </>
    ),
  },
  {
    question: 'Est-ce que je dois accepter les propositions des professionnels ?',
    answer: (
      <>
        <p>Non, vous restez totalement libre :</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>d’accepter,</li>
          <li>de refuser,</li>
          <li>d’ignorer,</li>
          <li>ou de mettre votre profil en pause sans aucune conséquence.</li>
        </ul>
      </>
    ),
  },
  {
    question: 'Les professionnels peuvent-ils me contacter en dehors de l’application ?',
    answer: (
      <>
        <p>
          Non, votre identité est masquée et les professionnels n’ont aucun moyen de vous contacter
          en dehors de l’app. Tout se passe dans un cadre sécurisé.
        </p>
      </>
    ),
  },
  {
    question: 'Mes données sont-elles protégées ?',
    answer: (
      <>
        <p>Oui, la protection des données est au cœur du fonctionnement d’invstore® :</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>chiffrement systématique,</li>
          <li>conformité stricte au RGPD,</li>
          <li>serveurs en Union Européenne,</li>
          <li>aucune transmission non consentie.</li>
        </ul>
        <p className="mt-2">
          Les données d’identité ne sont accessibles à aucun professionnel sans votre accord
          explicite.
        </p>
      </>
    ),
  },
  {
    question: 'Est-ce qu’invstore® utilise des données bancaires ?',
    answer: (
      <>
        <p>
          Uniquement si vous choisissez la connexion Open Banking. Cette option gratuite est opérée
          via Powens, prestataire français agréé AISP (DSP2) par la Banque de France.
        </p>
        <p className="mt-2">Mais invstore® ne peut jamais :</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>voir vos identifiants bancaires,</li>
          <li>modifier un compte,</li>
          <li>ou initier un paiement.</li>
        </ul>
        <p className="mt-2">
          La connexion sert uniquement à suivre vos transactions pour obtenir une vue complète de
          vos finances depuis une seule application.
        </p>
      </>
    ),
  },
  {
    question: 'Dois-je connecter mes comptes bancaires pour utiliser l’application ?',
    answer: (
      <>
        <p>
          Non, la connexion Open Banking est totalement facultative. Elle vous permet simplement de
          gagner du temps en consultant tous vos comptes bancaires depuis une seule application.
        </p>
      </>
    ),
  },
  {
    question: 'L’application est-elle compatible iPhone et Android ?',
    answer: (
      <>
        <p>Oui, invstore® est disponible sur l’App Store et Google Play.</p>
      </>
    ),
  },
  {
    question: 'Puis-je arrêter d’utiliser invstore® quand je veux ?',
    answer: (
      <>
        <p>
          Oui, vous pouvez supprimer votre compte à tout moment depuis votre espace personnel.
          Toutes les données sont ensuite supprimées conformément aux délais légaux.
        </p>
      </>
    ),
  },
];

export default function QandAStrategy() {
  return (
    <section className="w-full flex justify-center py-12 px-4 bg-[#c6f0d0] text-[#203649]">
      <div className="flex flex-col w-full max-w-3xl p-6 md:p-8 gap-10 sm:gap-16">
        <Title text="Questions fréquentes" />

        <Accordion type="single" collapsible className="w-full">
          {questions.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
              <AccordionContent className="text-gray-700">{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
