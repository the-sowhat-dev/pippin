import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Invstore - gagner mieux sans effort",
  description: "Conseils et guides pour mieux épargner en 2026.",
  alternates: { canonical: "/blog" },
  openGraph: {
    url: "https://invstore.fr/blog",
    title: "Blog Invstore - gagner mieux sans effort",
    description: "Conseils et guides pour mieux épargner en 2026.",
  },
};

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
