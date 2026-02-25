import type { Metadata } from "next";
import { HeroPro } from "@/components/HeroPro";
import ActionsStrategy from "@/components/strategies/ActionsStrategy";
import SocialsProStrategy from "@/components/strategies/SocialsProStrategy";
import TribuneProStrategy from "@/components/strategies/TribuneProStrategy";
import DescriptionProStrategy from "@/components/strategies/DescriptionProStrategy";

export const metadata: Metadata = {
  title: "Invstore Pro - solutions pour professionnels de la finance",
  description: "La plateforme Pro pour trouver vos prochains leads.",
  alternates: { canonical: "/pro" },
  openGraph: {
    url: "https://invstore.fr/pro",
    title: "Invstore Pro - solutions pour professionnels de la finance",
    description: "La plateforme Pro pour trouver vos prochains leads.",
  },
};

export default function Page() {
  return (
    <main className="min-h-screen text-[#203649] bg-gray-100 pb-12 sm:pb-24">
      <HeroPro />

      <DescriptionProStrategy />

      <ActionsStrategy />

      <TribuneProStrategy />

      <SocialsProStrategy />
    </main>
  );
}
