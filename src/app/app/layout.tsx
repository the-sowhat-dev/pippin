import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Invstore - épargner et investir",
  description: "Téléchargez l'application et laissez le monde de la finance venir à vous.",
  alternates: { canonical: "/app" },
  openGraph: {
    url: "https://invstore.fr/app",
    title: "Invstore - épargner et investir",
    description: "Téléchargez l'application et laissez le monde de la finance venir à vous.",
  },
};

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
