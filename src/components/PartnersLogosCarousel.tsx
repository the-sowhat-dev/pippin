import Image from "next/image";

const PartnersLogos = [
  { src: "/images/partners-logos/yomoni.png", alt: "Yomoni" },
  { src: "/images/partners-logos/prosper-conseil.png", alt: "Prosper Conseil" },
  { src: "/images/partners-logos/baltis.png", alt: "Baltis Groupe Magelim" },
  { src: "/images/partners-logos/green-got.png", alt: "Green Got" },
  { src: "/images/partners-logos/la-premiere-brique.png", alt: "La Première Brique" },
  { src: "/images/partners-logos/optivest.png", alt: "Optivest" },
  { src: "/images/partners-logos/mon-petit-placement.png", alt: "Mon Petit Placement" },
];

const PartnersLogos2 = [
  { src: "/images/partners-logos/gedeon.png", alt: "Gedeon" },
  { src: "/images/partners-logos/france-valley.png", alt: "France Valley Investissement" },
  { src: "/images/partners-logos/conseil-avenir-patrimoine.png", alt: "Conseil Avenir Patrimoine" },
  { src: "/images/partners-logos/altaprofits.png", alt: "Altaprofits" },
  { src: "/images/partners-logos/valeor-france.png", alt: "Valéor France" },
  { src: "/images/partners-logos/temys.png", alt: "Temys" },
  { src: "/images/partners-logos/rl-conseil.png", alt: "RL Conseil" },
  {
    src: "/images/partners-logos/mon-conseil-patrimonial-dreotto.png",
    alt: "Mon Conseil Patrimoine",
  },
  { src: "/images/partners-logos/la-belle-epargne.png", alt: "La Belle Épargne" },
  { src: "/images/partners-logos/hecterea-la-fonciere.png", alt: "Hecterea La Foncière" },
];

const PartnersLogosItems = ({
  logos,
  direction,
}: {
  logos: typeof PartnersLogos;
  direction: "left-to-right" | "right-to-left";
}) => {
  const animationClass =
    direction === "left-to-right" ? "animate-infinite-scroll-reverse" : "animate-infinite-scroll";
  return (
    <ul
      className={`flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none ${animationClass}`}>
      {logos.map((partner) => (
        <li key={partner.alt}>
          <Image
            src={partner.src}
            alt={partner.alt}
            width={300}
            height={200}
            className="object-contain w-[170px] md:w-[200px]"
          />
        </li>
      ))}
    </ul>
  );
};

interface PartnersLogosCarouselProps {
  row: 1 | 2;
  direction: "left-to-right" | "right-to-left";
}

export const PartnersLogosCarousel = ({ row, direction }: PartnersLogosCarouselProps) => {
  const logos = row === 1 ? PartnersLogos : PartnersLogos2;
  return (
    <div className="w-full inline-flex flex-nowrap overflow-hidden">
      <PartnersLogosItems logos={logos} direction={direction} />
      <PartnersLogosItems logos={logos} direction={direction} />
    </div>
  );
};
