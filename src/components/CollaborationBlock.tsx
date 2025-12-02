import Image from 'next/image';

const COLLABS = [
  {
    id: 'adi',
    src: 'https://avenuedesinvestisseurs.fr/wp-content/uploads/2021/02/avenue-des-investisseurs.jpg',
    alt: "Logo d'Avenue des Investisseurs",
    description: `Lancé début 2018, Avenue des Investisseurs (ADI) est un portail d'information et d'éducation financière créé par 2 investisseurs passionnés qui souhaitent partager leurs connaissances en matière de finances personnelles : Nicolas et Ludovic. Nous démocratisons les conseils habituellement accessibles seulement aux plus fortunés. Vous êtes maintenant plus de 200 000 visiteurs par mois à nous suivre !`,
    website: 'https://avenuedesinvestisseurs.fr/',
  },
];

export const CollaborationBlock = ({ id }: { id: string }) => {
  const collab = COLLABS.find((collab) => collab.id === id);

  if (!collab) {
    return <></>;
  }

  return (
    <div className="my-6">
      <h2 className={`text-xl text-[#0A3883] font-bold mb-4`}>Cet article a été rédigé par</h2>

      <div className={`border rounded-lg overflow-hidden bg-[#0A3883]`}>
        {/* Logo/Header section */}
        <div className={`p-6`}>
          <Image
            src={collab.src}
            alt={collab.alt}
            width={1000}
            height={700}
            className="object-contain w-full h-full max-h-[100px]"
          />
        </div>

        {/* Content section */}
        <div className="p-6 text-md space-y-4 bg-white">
          <p className="pb-2">{collab.description}</p>
          <a
            href={collab.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {collab.website}
          </a>
        </div>
      </div>
    </div>
  );
};
