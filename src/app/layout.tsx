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
      <html lang="fr">
        <Head>
          <title>Sowhat App - Votre indépendance par l&apos; Open Finance</title>
          <meta
            name="description"
            content="Découvrez la solution innovante, basée sur l’Open Finance, qui révolutionne l’expérience de gestion et facilite la prise de décision pour vos finances personnelles."
            key="desc"
          />
          <link rel="icon" href="./favicon.ico" />
          <link rel="shortcut icon" href="./favicon.ico" />
          <meta property="og:title" content="Sowhat Application" />
          <meta property="og:url" content="https://www.sowhat-app.com" />
          <meta property="og:description" content="Votre indépendance par l'Open Finance." />
          <meta property="og:image" content="../../public/images/logo-blanc.png" />
        </Head>
        <body className={`${poppins.className}`}>{children}</body>
      </html>
    </>
  );
}
