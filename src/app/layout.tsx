import "./globals.css";
import { poppins } from './fonts';
import type { Metadata } from "next";
import Navbar from './components/nav-bar';

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
      <body className={`${poppins.className}`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
