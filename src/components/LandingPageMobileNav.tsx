"use client";

import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export type LandingPageMobileNavProps = {
  isBlogPage: boolean;
  isAppLandingPage: boolean;
};

export function LandingPageMobileNav({ isBlogPage, isAppLandingPage }: LandingPageMobileNavProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="text-black px-2 py-1 bg-white border border-gray-200 hover:bg-transparent">
          <Menu size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <div className="flex flex-col gap-8 mt-8">
          <a
            href="/app"
            className={`${isAppLandingPage ? "underline" : ""} text-gray-900 hover:text-green-600 transition-colors`}>
            Accueil
          </a>
          <a
            href="/blog"
            className={`${isBlogPage ? "underline" : ""} text-gray-900 hover:text-green-600 transition-colors`}>
            Blog
          </a>
          <a
            href="/contact"
            className="text-gray-900 cursor-pointer text-left hover:text-green-600 transition-colors">
            Nous contacter
          </a>
          <span className="h-0.5 bg-slate-100 rounded-sm" />
          <a href="/pro" className="text-gray-900 hover:text-green-600 transition-colors">
            Vous êtes un professionnel ?
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
