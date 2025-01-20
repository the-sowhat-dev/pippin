import '@/src/utils/globals.css';
import { SourceSansPro } from '../utils/fonts';
import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NODE_ENV === 'production' ? 'https://sowhat-app.com' : 'http://localhost:3000'
  ),
  alternates: {
    canonical: '/',
  },
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
      <Script id="metricool" strategy="afterInteractive">
        {`
          function loadScript(a){var b=document.getElementsByTagName("head")[0],c=document.createElement("script");c.type="text/javascript",c.src="https://tracker.metricool.com/resources/be.js",c.onreadystatechange=a,c.onload=a,b.appendChild(c)}loadScript(function(){beTracker.t({hash:"4722ebb2d0bac377cd9be2740983fe3c"})});
  `}
      </Script>
      <body className={`${SourceSansPro.className}`}>{children}</body>
    </html>
  );
}
