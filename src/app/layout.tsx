import '@/utils/globals.css';

import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { Theme } from '@radix-ui/themes';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

import Header from '@/components/header';
import { SourceSansPro } from '@/utils/fonts';
import { LanguageProvider } from '@/i18n/LanguageProvider';
import { MetricoolAnalytics } from '@/components/analytics/MetricoolAnalytics';
import { Footer } from '@/components/footer';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { getYesterdayDate } from '../../lib/utils';

export const metadata: Metadata = {
  metadataBase: new URL('https://invstore.fr'),
  other: {
    date: getYesterdayDate().toISOString(),
    'last-modified': getYesterdayDate().toISOString(),
  },
  alternates: { canonical: '/' },
  title: "Invstore - une nouvelle expérience de l'épargne",
  description:
    'Analyse IA de votre situation financière puis connexion anonyme avec des conseillers spécialisés, qui sont mis en compétition pour vous proposer les meilleurs placements (application française gratuite)',
  openGraph: {
    title: "Invstore - une nouvelle expérience de l'épargne",
    description:
      'Analyse IA de votre situation financière puis connexion anonyme avec des conseillers spécialisés, qui sont mis en compétition pour vous proposer les meilleurs placements (application française gratuite)',
    images: { url: `../../public/favicon.ico` },
    url: 'https://invstore.fr/app',
  },
  twitter: {
    title: "Invstore - une nouvelle expérience de l'épargne",
    description:
      'Analyse IA de votre situation financière puis connexion anonyme avec des conseillers spécialisés, qui sont mis en compétition pour vous proposer les meilleurs placements (application française gratuite)',
    images: { url: `../../public/favicon.ico` },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="fr">
        <head>
          <link rel="icon" href="/favicon.ico" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <MetricoolAnalytics />
          <GoogleAnalytics />
        </head>

        <LanguageProvider>
          <body className={`${SourceSansPro.className} antialiased`}>
            <Theme>
              <Header />

              {children}

              <Footer />
            </Theme>

            <Analytics />
            <SpeedInsights />
          </body>
        </LanguageProvider>
      </html>
    </ClerkProvider>
  );
}
