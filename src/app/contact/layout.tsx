import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Invstore',
  description: "Contactez l'équipe Invstore pour toute question.",
  alternates: { canonical: '/contact' },
  openGraph: {
    url: 'https://invstore.fr/contact',
    title: 'Contact Invstore',
    description: "Contactez l'équipe Invstore pour toute question.",
  },
};

export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
