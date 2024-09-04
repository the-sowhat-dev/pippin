import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

import ContactProfile from '../../components/contact-profile';

export const metadata: Metadata = {
  title: 'Sowhat | Nous contacter',
  description: 'Nous contacter par email ou directement sur Linkedin.',
};

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-400 to-yellow-300 flex flex-col">
      <div className="w-full py-4 p-8">
        <Link href="/">
          <Image
            width={32}
            height={32}
            style={{ objectFit: 'contain' }}
            src="/icons/arrow-left.svg"
            alt="Back arrow left icon"
          />
        </Link>
      </div>
      <main className="grid md:grid-cols-2 place-items-center flex-grow">
        <ContactProfile
          imagePath="/images/raph.png"
          imageAlt="Raphael Metrop profile image"
          title="Co-founder & CEO"
          name="Raphaël METROP"
          link="rapha%C3%ABl-metrop-05714323"
          email="raphael.metrop@sowhat-app.com"
        />

        <ContactProfile
          imagePath="/images/hugo.png"
          imageAlt="Hugo Bayoud profile image"
          title="Co-founder & CTO"
          name="Hugo BAYOUD"
          link="hugo-bayoud-4aa927194"
          email="hugo.bayoud@sowhat-app.com"
        />
      </main>
    </div>
  );
}
