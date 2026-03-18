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
import { NewHeroStrategy } from "@/components/strategies/NewHeroStrategy";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { InvLogo } from "@/components/InvLogo";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { NewPrincipleStrategy } from "@/components/strategies/NewPrincipleStrategy";

export default function Page() {
  return (
    <main className="bg-white">
      <header className="fixed top-0 left-0 right-0 z-10  bg-white/05 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between p-6">
          <InvLogo size={60} color="black" />

          <div className="hidden sm:flex sm:items-center sm:justify-between gap-10">
            <a href="/pro" className="text-lg sm:text-xl text-green-900">
              <span>Professionnel</span>
            </a>
            <a href="/blog" className="text-lg sm:text-xl text-green-900">
              <span>Blog</span>
            </a>
          </div>

          <div className="sm:hidden flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  className={`text-black px-2 py-1 bg-white border border-gray-200 hover:bg-transparent`}>
                  <Menu size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <div className="flex flex-col gap-8 mt-8">
                  <a href="/app" className="text-gray-900 hover:text-green-600 transition-colors">
                    Accueil
                  </a>
                  <a
                    href="/blog"
                    className={`text-gray-900 hover:text-green-600 transition-colors`}>
                    Articles
                  </a>
                  <a
                    href="/contact"
                    className={`text-gray-900 cursor-pointer text-left hover:text-green-600 transition-colors`}>
                    Contact
                  </a>
                  <span className="h-0.5 bg-slate-100 rounded-sm" />
                  <a href="/pro" className={`text-gray-900 hover:text-green-600 transition-colors`}>
                    Vous êtes un professionnel ?
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <NewHeroStrategy />
      {/* <HeroAppStrategy /> */}

      {/* <MainQuoteStrategy /> */}

      <PartnersStrategy />

      <DescriptionStrategy />

      {/* <PrinciplesStrategy /> */}
      <NewPrincipleStrategy />

      {/* <SecondMainQuoteStrategy /> */}

      <PressMentionsCarousel />

      <VideoStrategy
        videoUrl="https://abkqohkbpzpaafojdzqg.supabase.co/storage/v1/object/public/public-videos/app-demo.mp4"
        thumbnailUrl="https://abkqohkbpzpaafojdzqg.supabase.co/storage/v1/object/public/public-videos/video-thumbnail.jpg"
      />

      {/* DOWNLOAD BUTTON */}
      <div className="flex items-center bg-gradient-to-b from-[#203649] to-[#405e79] p-4 py-8 md:p-8 justify-center">
        <AppStoreButtons layout="row" />
      </div>

      {/* <InvstoreStrategy /> */}

      <QandAStrategy />
    </main>
  );
}
