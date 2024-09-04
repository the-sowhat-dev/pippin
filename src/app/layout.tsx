import '../utils/globals.css';
import { poppins } from '../utils/fonts';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Sowhat | L’avenir de la gestion du budget et de l’épargne, propulsé par l’Open Finance, optimisé par l’IA`,
  description:
    'Découvrez la solution innovante, basée sur l’Open Finance, qui révolutionne l’expérience de gestion et facilite la prise de décision pour vos finances personnelles.',
  openGraph: {
    title: 'Sowhat Application',
    description:
      'L’avenir de la gestion du budget et de l’épargne, propulsé par l’Open Finance, optimisé par l’IA.',
    images: { url: '../../public/images/logo-blanc.png' },
    url: 'https://www.sowhat-app.com',
  },
  twitter: {
    title: 'Sowhat Application',
    description:
      'L’avenir de la gestion du budget et de l’épargne, propulsé par l’Open Finance, optimisé par l’IA.',
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
