import { PoppinsFont } from "@/utils/fonts";
import { GlowyBackground } from "../ui/GlowyBackground";

const steps = [
  {
    number: 1,
    title: "Votre montant",
    text: "Quel que soit le montant que vous souhaitez investir, nous trouvons le bon conseiller pour vous.",
  },
  {
    number: 2,
    title: "Votre profil",
    text: "Complétez votre profil patrimonial en quelques minutes grâce à notre parcours guidé.",
  },
  {
    number: 3,
    title: "Votre anonymat",
    text: "Nous anonymisons vos données pour vous protéger avant toute mise en relation.",
  },
  {
    number: 4,
    title: "La mise en compétition",
    text: "Les spécialistes de l'épargne et du patrimoine sont mis en compétition pour répondre à votre profil.",
  },
  {
    number: 5,
    title: "Ils viennent à vous",
    text: "Ce sont eux qui vous contactent directement dans l'application, pas l'inverse.",
  },
  {
    number: 6,
    title: "Le match",
    text: "Vous matchez avec celui ou ceux qui répondent le mieux à votre besoin patrimonial.",
  },
];

function NumberBadge({ n }: { n: number }) {
  return (
    <div
      className={`${PoppinsFont.className} flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-500/70 text-lg font-bold text-white ring-1 ring-white/20`}>
      {n}
    </div>
  );
}

function Tile({ step }: { step: (typeof steps)[number] }) {
  return (
    <div className="group flex h-full flex-col justify-between gap-6 rounded-2xl bg-white/80 p-6 ring-1 ring-white/50 transition-all duration-300 hover:bg-white/60 hover:ring-white/25">
      <div className="flex flex-col gap-2">
        <h3 className={`${PoppinsFont.className} text-lg font-semibold text-green-900`}>
          {step.title}
        </h3>
        <p className="text-green-900">{step.text}</p>
      </div>
      <div className="flex justify-end">
        <NumberBadge n={step.number} />
      </div>
    </div>
  );
}

export function DescriptionStrategy() {
  const [row1, row2, row3] = [steps.slice(0, 3), steps.slice(3, 5), steps.slice(5, 6)];

  return (
    <GlowyBackground bgColor="#35C055" glowColor="#C6F0D0">
      <section className="py-20">
        <div className="px-6 max-w-6xl mx-auto flex flex-col gap-4 mb-24 w-full">
          <h2
            className={`${PoppinsFont.className} text-5xl text-[50px] text-white max-w-[750px] font-bold`}>
            Les codes des apps de rencontre, un peu d&apos;IA pour enfin trouver votre conseiller
            financier
          </h2>

          <h3
            className={`${PoppinsFont.className} text-xl lg:text-2xl lg:text-[25px] max-w-[750px] text-white`}>
            Déjà plus de 1,5M€ de match*
          </h3>
        </div>

        <div className="mx-auto max-w-4xl flex flex-col gap-6 px-8">
          {/* Row 1 – 3 tiles */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {row1.map((step) => (
              <Tile key={step.number} step={step} />
            ))}
          </div>

          {/* Row 2 – 2 tiles */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {row2.map((step) => (
              <Tile key={step.number} step={step} />
            ))}
          </div>

          {/* Row 3 – 1 tile full width */}
          <div>
            <Tile step={row3[0]} />
          </div>

          <p className="text-white">
            *la somme des montants d'investissement des particuliers ayant trouvé un professionnel
            grâce à Invstore®
          </p>
        </div>
      </section>
    </GlowyBackground>
  );
}
