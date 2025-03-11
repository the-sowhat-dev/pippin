export interface Step {
  index: number;
  tag: string;
  title: string;
  description: string;
}

export const STEPS: Step[] = [
  {
    index: 0,
    tag: 'Inscription',
    title: 'Inscription rapide et gratuite',
    description: `Sowhat est une application mobile française et gratuite disponible sur iOS et Android. Seule votre adresse e-mail suffit pour vous inscrire et obtenir en moins de 2 minutes un accès illimité à toutes les fonctionnalités.`,
  },
  {
    index: 1,
    tag: 'Connexion',
    title: 'Connexion sécurisée de vos comptes bancaires',
    description: `Grâce à notre partenaire Powens, basé en France, certifié DSP2 et agréé par la Banque de France, connectez facilement et en toute sécurité vos comptes bancaires dans l'application.`,
  },
  {
    index: 2,
    tag: 'Comptes épargne',
    title: 'Application unique pour toutes vos banques',
    description: `Connectez plus de 120 établissements bancaires et gérez vos comptes courants, épargne (Livret A, PEL, etc.), comptes enfants ou d'entreprise en un seul endroit. Même en changeant de banque, vos données et votre historique restent intacts.`,
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
    description: `Découvrez enfin quelle est la valeur réelle de votre patrimoine. Sowhat vous permet de comprendre la répartition de votre patrimoine mais également de suivre son évolution dans le temps.`,
  },
  {
    index: 5,
    tag: `Budget`,
    title: 'Gestion de budget simple et facultative',
    description: `Fixez et suivez vos objectifs financiers avec une interface épurée. Pas envie d'y consacrer trop de temps ? La gestion du budget est totalement facultative et désactivable.`,
  },
  {
    index: 6,
    tag: `Projets d'épargne`,
    title: `Première solution pour les projets d'épargne `,
    description: `Que ce soit pour une maison, des vacances ou votre retraite, Sowhat vous aide à visualiser et planifier vos projets. Grâce à son simulateur intégré, gérez votre épargne en toute simplicité et prenez des décisions éclairées en quelques secondes.`,
  },
  {
    index: 7,
    tag: `Accessible`,
    title: 'Accessible à toutes et à tous ',
    description: `Vous trouvez Excel ou les autres outils de gestion financière trop complexes ? Nous aussi. Sowhat rend la gestion de vos finances simple et agréable, avec des fonctionnalités intuitives et une interface conçue pour tous, même pour les non-initiés.`,
  },
];
