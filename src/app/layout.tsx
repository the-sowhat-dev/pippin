import '../utils/globals.css';
import { poppins } from '../utils/fonts';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Sowhat | Votre indépendance par l'Open Finance`,
  description:
    'Découvrez la solution innovante, basée sur l’Open Finance, qui révolutionne l’expérience de gestion et facilite la prise de décision pour vos finances personnelles.',
  openGraph: {
    title: 'Sowhat Application',
    description: "Votre indépendance par l'Open Finance.",
    images: { url: '../../public/images/logo-blanc.png' },
    url: 'https://www.sowhat-app.com',
  },
  twitter: {
    title: 'Sowhat Application',
    description: "Votre indépendance par l'Open Finance.",
    images: { url: '../../public/images/logo-blanc.png' },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${poppins.className}`}>{children}</body>
    </html>
  );
}
