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
import { getYesterdayDate } from '../lib/utils';

export const metadata: Metadata = {
  metadataBase: new URL('https://invstore.fr'),
  other: {
    date: getYesterdayDate().toISOString(),
    'last-modified': getYesterdayDate().toISOString(),
  },
  title: "Invstore - une nouvelle expérience de l'épargne",
  description:
    "L'application française qui réduit la charge mentale et administrative des épargnants.",
  openGraph: {
    title: "Invstore - une nouvelle expérience de l'épargne",
    description:
      "L'application française qui réduit la charge mentale et administrative des épargnants.",
    images: { url: '/images/invstore.png' },
    url: 'https://invstore.fr/app',
  },
  twitter: {
    title: "Invstore - une nouvelle expérience de l'épargne",
    description:
      "L'application française qui réduit la charge mentale et administrative des épargnants.",
    images: { url: '/images/invstore.png' },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/images/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/apple-icon.svg', type: 'image/svg+xml' },
    ],
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
