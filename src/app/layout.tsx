import "./globals.css";
import { poppins } from "./fonts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sowhat",
  description: "Sowhat app landing page.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${poppins.className}`}>{children}</body>
    </html>
  );
}
