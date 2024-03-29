import '../utils/globals.css';
import { poppins } from '../utils/fonts';
import type { Metadata } from 'next';
import Head from 'next/head';

export const metadata: Metadata = {
  title: `Sowhat | Votre indépendance par l'Open Finance`,
  description:
    'Découvrez la solution innovante, basée sur l’Open Finance, qui révolutionne l’expérience de gestion et facilite la prise de décision pour vos finances personnelles.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Head>
        <title>Sowhat : Votre indépendance par l&apos; Open Finance | Application</title>
        <meta
          name="description"
          content="Découvrez la solution innovante, basée sur l’Open Finance, qui révolutionne l’expérience de gestion et facilite la prise de décision pour vos finances personnelles."
          key="desc"
        />
        <meta property="og:title" content="Sowhat Application" />
        <meta property="og:description" content="Votre indépendance par l'Open Finance." />
        <meta property="og:image" content="../../public/images/logo-blanc.png" />
      </Head>
      <html lang="fr">
        <body className={`${poppins.className}`}>{children}</body>
      </html>
    </>
  );
}
