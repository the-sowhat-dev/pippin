"use client";

import { PartnersCarousel } from "@/components/PartnersCarousel";
import QandAStrategy from "@/components/strategies/QandAStrategy";
import { AppStoreButtons } from "@/components/AppStoreButtons";
import InvstoreStrategy from "@/components/strategies/InvstoreStrategy";
import { HeroAppStrategy } from "@/components/strategies/HeroAppStrategy";
import { PressMentionsCarousel } from "@/components/PressMentionsCarousel";
import PrinciplesStrategy from "@/components/strategies/PrinciplesStrategy";
import { DescriptionStrategy } from "@/components/strategies/DescriptionStrategy";
import { MainQuoteStrategy } from "@/components/strategies/MainQuoteStrategy";
import { SecondMainQuoteStrategy } from "@/components/strategies/SecondMainQuoteStrategy";
import { VideoStrategy } from "@/components/strategies/VideoStrategy";

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

      <VideoStrategy
        videoUrl="https://abkqohkbpzpaafojdzqg.supabase.co/storage/v1/object/public/public-videos/app-demo.mp4"
        thumbnailUrl="https://abkqohkbpzpaafojdzqg.supabase.co/storage/v1/object/public/public-videos/video-thumbnail.jpg"
      />

      {/* DOWNLOAD BUTTON */}
      <div className="flex items-center bg-gradient-to-b from-[#203649] to-[#405e79] p-4 py-8 md:p-8 justify-center">
        <AppStoreButtons layout="row" />
      </div>

      <InvstoreStrategy />

      <QandAStrategy />
    </main>
  );
}
