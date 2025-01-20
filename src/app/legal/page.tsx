import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sowhat | Mention légales',
  description: 'Les mentions légales du siteweb Sowhat.',
};

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-500 to-yellow-300 flex flex-col p-10 sm:p-32">
      <div
        className="w-full py-4 p-8"
        style={{ display: 'flex', gap: 32, justifyContent: 'center' }}
      >
        <Link href="/">
          <Image
            width={32}
            height={32}
            style={{ objectFit: 'contain' }}
            src="/icons/arrow-left.svg"
            alt="Back arrow left icon"
          />
        </Link>
        <div className="font-bold text-l sm:text-2xl mb-4">Mentions légales</div>
      </div>

      <div className="font-opensans font-bold text-l sm:text-2xl mb-4">Éditeur du site</div>

      <p className="pb-8 sm:pb-16 px-0 sm:px-16">{`Le site internet Sowhat App (www.sowhat-app.com, ci-après "le Site") est édité par la société Sowhat S.A.S., société par actions simplifiée au capital de 50.000,00 €, immatriculée au Registre du Commerce et des Sociétés de Lyon, sous le numéro B 981 844 459, dont le siège social est situé au 1600, allée Mas de Sous-Vignes, 69970 Chaponnay.`}</p>

      <div className="font-opensans font-bold text-l sm:text-2xl mb-4">
        Directeur de la publication
      </div>
      <p className="pb-8 sm:pb-16 px-0 sm:px-16">{`M. Raphaël Metrop, Président de Sowhat S.A.S. Contact : contact@sowhat-app.com`}</p>

      <div className="font-opensans font-bold text-l sm:text-2xl mb-4">Hébergeur du site</div>
      <p className="pb-8 sm:pb-16 px-0 sm:px-16">{`Le site est hébergé par la société Vercel (www.vercel.com).`}</p>

      <div className="font-opensans font-bold text-l sm:text-2xl mb-4">
        Propriété intellectuelle
      </div>
      <p className="pb-8 sm:pb-16 px-0 sm:px-16">{`L’ensemble des contenus (textes, images, logos, etc.) présents sur le Site sont la propriété exclusive de Sowhat S.A.S. ou de leurs auteurs respectifs et sont protégés par le droit de la propriété intellectuelle. Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du Site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de Sowhat S.A.S.`}</p>

      <div className="font-opensans font-bold text-l sm:text-2xl mb-4">Responsabilité</div>
      <p className="pb-8 sm:pb-16 px-0 sm:px-16">{`Le contenu du Site est fourni à titre purement informatif. Sowhat S.A.S. s’efforce de maintenir à jour les informations publiées sur le Site, mais ne peut garantir leur exactitude ou leur exhaustivité. Sowhat S.A.S. ne pourra en aucun cas être tenue responsable des dommages directs ou indirects résultant de l’accès au Site ou de l’utilisation des informations qu'il contient.`}</p>

      <div className="font-opensans font-bold text-l sm:text-2xl mb-4">Liens hypertextes</div>
      <p className="pb-8 sm:pb-16 px-0 sm:px-16">{`Le site peut contenir des liens vers d'autres sites internet. Sowhat S.A.S. ne dispose d'aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.`}</p>

      <div className="font-opensans font-bold text-l sm:text-2xl mb-4">
        Droit applicable et Juridiction
      </div>
      <p className="pb-8 sm:pb-16 px-0 sm:px-16">{`Les présentes mentions légales sont régies par le droit français.`}</p>

      <div className="font-opensans font-bold text-l sm:text-2xl mb-4">
        Modification des mentions légales
      </div>
      <p className="pb-8 sm:pb-16 px-0 sm:px-16">{`Les présentes mentions légales peuvent être modifiées à tout moment. Nous invitons donc les utilisateurs à les consulter régulièrement.`}</p>
    </div>
  );
}
