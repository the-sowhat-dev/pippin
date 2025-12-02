import '@/utils/globals.css';

import type { Metadata } from 'next';
import { Theme } from '@radix-ui/themes';
import { Analytics } from '@vercel/analytics/next';

import Header from '@/components/header';
import { SourceSansPro } from '@/utils/fonts';
import { LanguageProvider } from '@/i18n/LanguageProvider';
import { MetricoolAnalytics } from '@/components/MetricoolAnalytics';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.sowhat-app.com'),
  alternates: {
    canonical: '/',
  },
  title: `Sowhat | L'téléchargez l'application et laissez le monde de la finance venir à vous.`,
  description: `Découvrez la solution innovante, basée sur l'Open Finance, qui révolutionne l'expérience de gestion et facilite la prise de décision pour vos finances personnelles.`,
  openGraph: {
    title: `Sowhat Application`,
    description: `L'téléchargez l'application et laissez le monde de la finance venir à vous..`,
    images: { url: `../../public/images/logo-blanc.png` },
    url: `https://www.sowhat-app.com`,
  },
  twitter: {
    title: `Sowhat Application`,
    description: `L'téléchargez l'application et laissez le monde de la finance venir à vous.`,
    images: { url: `../../public/images/logo-blanc.png` },
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
      </head>

      <LanguageProvider>
        <body className={`${SourceSansPro.className} antialiased`}>
          <Theme>
            <Header />

            {children}

            <Footer />

            <Analytics />
          </Theme>
        </body>
      </LanguageProvider>
    </html>
  );
}
