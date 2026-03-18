import { Menu } from "lucide-react";

import { InvLogo } from "@/components/InvLogo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

export const LandingPageHeader = () => {
  return (
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
                <a href="/blog" className={`text-gray-900 hover:text-green-600 transition-colors`}>
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
  );
};
