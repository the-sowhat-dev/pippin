"use client";

import dynamic from "next/dynamic";
import { Menu } from "lucide-react";

import { InvLogo } from "@/components/InvLogo";
import { usePathname } from "next/navigation";

import type { LandingPageMobileNavProps } from "@/components/LandingPageMobileNav";

const MobileNavSheet = dynamic<LandingPageMobileNavProps>(
  () => import("@/components/LandingPageMobileNav").then((m) => m.LandingPageMobileNav),
  {
    ssr: false,
    loading: () => (
      <div
        className="inline-flex items-center justify-center rounded-md border border-gray-200 bg-white px-2 py-1 text-black"
        aria-hidden>
        <Menu size={24} />
      </div>
    ),
  },
);

export const LandingPageHeader = () => {
  const pathname = usePathname();
  const isBlogPage = pathname === "/blog";
  const isAppLandingPage = pathname === "/app";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/05 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-6">
        <a href="/app">
          <InvLogo size={60} color="black" />
        </a>

        <div className="hidden sm:flex sm:items-center sm:justify-between gap-10">
          <a href="/pro" className="text-lg sm:text-xl text-green-900">
            <span>Professionnels</span>
          </a>

          {!isBlogPage && (
            <a href="/blog" className="text-lg sm:text-xl text-green-900">
              <span>Blog</span>
            </a>
          )}
        </div>

        <div className="sm:hidden flex items-center">
          <MobileNavSheet isBlogPage={isBlogPage} isAppLandingPage={isAppLandingPage} />
        </div>
      </div>
    </header>
  );
};
