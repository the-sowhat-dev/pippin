"use client";

import { LandingPageHeader } from "@/components/LandingPageHeader";
import { FooterStrategy } from "@/components/strategies/FooterStrategy";
import { NewHeroStrategy } from "@/components/strategies/NewHeroStrategy";
import { PartnersStrategy } from "@/components/strategies/PartnersStrategy";
import { DescriptionStrategy } from "@/components/strategies/DescriptionStrategy";
import { NewPrincipleStrategy } from "@/components/strategies/NewPrincipleStrategy";
import { StickyMobileAppButton } from "@/components/StickyMobileAppButton";

export default function Page() {
  return (
    <main className="bg-white">
      <LandingPageHeader />

      <NewHeroStrategy />

      <PartnersStrategy />

      <DescriptionStrategy />

      <NewPrincipleStrategy />

      <FooterStrategy />

      <StickyMobileAppButton />
    </main>
  );
}
