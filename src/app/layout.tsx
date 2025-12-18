import '@/utils/globals.css';

import type { Metadata } from 'next';
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
  title: `Invstore : Epargne IA Matching`,
  description:
    "Gagner mieux sans effort. Invstore®, est une application française qui aide à optimiser l'épargne, simplement et sans effort.",
  openGraph: {
    title: `Invstore : Epargne IA Matching`,
    description:
      "Gagner mieux sans effort. Invstore®, est une application française qui aide à optimiser l'épargne, simplement et sans effort.",
    images: { url: `../../public/images/inv.svg` },
    url: `https://invstore.fr`,
  },
  twitter: {
    title: `Invstore : Epargne IA Matching`,
    description:
      "Gagner mieux sans effort. Invstore®, est une application française qui aide à optimiser l'épargne, simplement et sans effort.",
    images: { url: `../../public/images/inv.svg` },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <MetricoolAnalytics />
        <GoogleAnalytics />
      </head>

      <LanguageProvider>
        <body className={`${SourceSansPro.className} antialiased`}>
          <Header />
          {children}

          <Footer />

          <Analytics />
          <SpeedInsights />
        </body>
      </LanguageProvider>
    </html>
  );
}
