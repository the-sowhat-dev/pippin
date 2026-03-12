"use client";

import { AppStoreButtons } from "@/components/AppStoreButtons";
import QandAStrategy from "@/components/strategies/QandAStrategy";
import { VideoStrategy } from "@/components/strategies/VideoStrategy";
import InvstoreStrategy from "@/components/strategies/InvstoreStrategy";
import { HeroAppStrategy } from "@/components/strategies/HeroAppStrategy";
import { PressMentionsCarousel } from "@/components/PressMentionsCarousel";
import { PartnersStrategy } from "@/components/strategies/PartnersStrategy";
import PrinciplesStrategy from "@/components/strategies/PrinciplesStrategy";
import { DescriptionStrategy } from "@/components/strategies/DescriptionStrategy";
import { SecondMainQuoteStrategy } from "@/components/strategies/SecondMainQuoteStrategy";

export default function Page() {
  return (
    <main className="bg-white">
      <HeroAppStrategy />

      {/* <MainQuoteStrategy /> */}

      <PartnersStrategy />

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
