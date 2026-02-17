"use client";

import { PartnersCarousel } from "@/components/PartnersCarousel";
import { PlayStoreButton } from "@/components/PlayStoreButton";
import QandAStrategy from "@/components/strategies/QandAStrategy";
import { AppleAppStoreButton } from "@/components/AppleAppStoreButton";
import InvstoreStrategy from "@/components/strategies/InvstoreStrategy";
import { HeroAppStrategy } from "@/components/strategies/HeroAppStrategy";
import { PressMentionsCarousel } from "@/components/PressMentionsCarousel";
import PrinciplesStrategy from "@/components/strategies/PrinciplesStrategy";
import DescriptionStrategy from "@/components/strategies/DescriptionStrategy";
import FiveMinutesStrategy from "@/components/strategies/FiveMinutesStrategy";
import { MainQuoteStrategy } from "@/components/strategies/MainQuoteStrategy";
import { SecondMainQuoteStrategy } from "@/components/strategies/SecondMainQuoteStrategy";

export default function Page() {
  return (
    <main>
      <HeroAppStrategy />

      <MainQuoteStrategy />

      <PartnersCarousel />

      <DescriptionStrategy />

      <PressMentionsCarousel />

      <PrinciplesStrategy />

      <SecondMainQuoteStrategy />

      {/* <FiveMinutesStrategy /> */}

      {/* DOWNLOAD BUTTON */}
      <div className="flex flex-col sm:flex-row items-center bg-gradient-to-b from-[#203649] to-[#405e79] p-4 py-8 md:p-8 gap-4 justify-center">
        {/* APPLE DOWNLOAD BUTTON */}
        <AppleAppStoreButton />
        {/* ANDROID DOWNLOAD BUTTON */}
        <PlayStoreButton />
      </div>

      <InvstoreStrategy />

      <QandAStrategy />
    </main>
  );
}
