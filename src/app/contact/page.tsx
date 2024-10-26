import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

import ContactProfile from '../../components/contact-profile';
import EmailAddress from '@/src/components/email-address';

export const metadata: Metadata = {
  title: 'Sowhat | Nous contacter',
  description: 'Nous contacter par email ou directement sur Linkedin.',
};

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-500 to-yellow-300 flex flex-col">
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

      <main
        className="justify-center"
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}
      >
        <div style={{ alignSelf: 'center' }}>
          <div className="font-bold text-l sm:text-2xl mb-4">Envie de discuter ?</div>
          <EmailAddress email="contact@sowhat-app.com" />
        </div>

        <section className="grid md:grid-cols-2 place-items-center flex-grow">
          <ContactProfile
            imagePath="/images/raph.png"
            imageAlt="Raphael Metrop profile image"
            title="Co-founder & CEO"
            name="Raphaël METROP"
            link="rapha%C3%ABl-metrop-05714323"
          />

          <ContactProfile
            imagePath="/images/hugo.png"
            imageAlt="Hugo Bayoud profile image"
            title="Co-founder & CTO"
            name="Hugo BAYOUD"
            link="hugo-bayoud-4aa927194"
          />
        </section>
      </main>
    </div>
  );
}
