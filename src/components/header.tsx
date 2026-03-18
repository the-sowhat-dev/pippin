"use client";

import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";

import { ContactButtonWithDialog } from "@/components/ContactButtonWithDialog";
import { InvLogo } from "@/components/InvLogo";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

export default function Header() {
  const pathname = usePathname();
  const isArticlesPage = pathname.startsWith("/blog/a/");
  const isBlogPage = pathname === "/blog";
  const isAppPage = pathname.startsWith("/app");
  const isAdvicePage = pathname === "/advices";
  const isLegalPage = pathname.startsWith("/app/legal") || pathname === "/legal";
  const isProPage = pathname === "/pro";
  const isFAQPage = pathname === "/app/faq";
  const isProFormPage = pathname === "/pro/form";

  const isDashboardPage = pathname.startsWith("/dashboard");

  const isContactPage = pathname.startsWith("/contact");

  if (isAdvicePage || isProFormPage || isDashboardPage || isAppPage) return null;

  const showLogo =
    isArticlesPage ||
    isBlogPage ||
    isAppPage ||
    isLegalPage ||
    isProPage ||
    isFAQPage ||
    isContactPage;
  const brightBackground = isArticlesPage || isBlogPage || isFAQPage || isProPage || isContactPage;

  return (
    <header className="fixed px-4 sm:px-8 lg:px-16 text-sm justify-between sm:text-base p-4 gap-4 md:gap-8 top-0 w-full flex bg-white/05 backdrop-blur-sm z-10">
      {/* Show logo on articles, blog, and app pages */}
      {/* Desktop Logo */}
      {showLogo && (
        <a href={"/app"} key="logo" className="hidden sm:block">
          <InvLogo
            className={`max-h-[30px] sm:max-h-[30px] w-auto ${brightBackground ? "text-green-500" : "text-white"}`}
          />
        </a>
      )}

      {/* Mobile Logo - Only visible on mobile */}
      <a href={"/app"} key="mobile-logo" className="block sm:hidden">
        <InvLogo
          className={`max-h-[30px] w-auto ${brightBackground ? "text-green-500" : "text-white"}`}
        />
      </a>

      {/* Desktop Nav */}
      <nav
        className={`hidden sm:flex gap-4 lg:gap-10 items-center ${!showLogo ? "flex-grow justify-end" : ""}`}>
        {isAppPage && (
          <a
            href={"/pro"}
            key="pro"
            className="text-lg sm:text-xl text-green-900 hover:text-green-800">
            <span className="inline md:hidden">Professionnel</span>
          </a>
        )}

        {isProPage && (
          <a
            href={"/dashboard"}
            key="dashboard"
            className="text-lg sm:text-xl text-green-900 hover:text-green-800">
            <span>Se connecter</span>
          </a>
        )}

        {/* Must use <a/> instead of `next/link` bc <Link/> does not scroll to the top... */}
        {!isLegalPage && !isBlogPage && (
          <a
            href={"/blog"}
            key="blog"
            className="text-lg sm:text-xl text-green-900 hover:text-green-800">
            <span>Blog</span>
          </a>
        )}

        {!isArticlesPage && <ContactButtonWithDialog />}
        {/* {!isArticlesPage && !isBlogPage && !isLegalPage && <LanguageToggle />} */}
      </nav>

      {/* Mobile Menu */}
      <div className="sm:hidden flex items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className={`${brightBackground ? "text-gray-900" : "text-white"} p-0 hover:bg-transparent mr-2`}>
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
                className={`${isBlogPage || isArticlesPage ? "text-green-800" : "text-gray-900"} hover:text-green-600 transition-colors`}>
                Articles
              </a>
              <a
                href="/contact"
                className={`${isContactPage ? "text-green-800" : "text-gray-900"} cursor-pointer text-left hover:text-green-600 transition-colors`}>
                Contact
              </a>
              <span className="h-0.5 bg-slate-100 rounded-sm" />
              <a
                href="/pro"
                className={`${isProPage ? "text-green-800" : "text-gray-900"} hover:text-green-600 transition-colors`}>
                Vous êtes un professionnel ?
              </a>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
