import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Invstore - gagner mieux sans effort",
  description: "Invstore accompagne les épargnants avec une expérience simple et personnalisée.",
  alternates: { canonical: "/app" },
  openGraph: {
    url: "https://invstore.fr/app",
    title: "Invstore - gagner mieux sans effort",
    description: "Invstore accompagne les épargnants avec une expérience simple et personnalisée.",
  },
};

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
