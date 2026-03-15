import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Invstore | marketplace patrimoniale",
  description: "Vous ne savez pas par où commencer ? Venez matcher avec le monde de la finance !",
  alternates: { canonical: "/app" },
  openGraph: {
    url: "https://invstore.fr/app",
    title: "Invstore | marketplace patrimoniale",
    description: "Vous ne savez pas par où commencer ? Venez matcher avec le monde de la finance !",
  },
};

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
