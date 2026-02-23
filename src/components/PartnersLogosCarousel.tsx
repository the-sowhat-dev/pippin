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

const PartnersLogosItems = () => {
  return (
    <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
      {PartnersLogos.map((partner) => (
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

export const PartnersLogosCarousel = () => {
  return (
    <div className="w-full inline-flex flex-nowrap overflow-hidden">
      <PartnersLogosItems />
      <PartnersLogosItems />
    </div>
  );
};
