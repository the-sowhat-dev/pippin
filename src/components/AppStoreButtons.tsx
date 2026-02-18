"use client";

import Image from "next/image";
import { AppleAppStoreButton } from "./AppleAppStoreButton";
import { PlayStoreButton } from "./PlayStoreButton";

interface AppStoreButtonsProps {
  layout?: "row" | "column";
  className?: string;
}

export function AppStoreButtons({ layout = "row", className = "" }: AppStoreButtonsProps) {
  const containerClass = layout === "row" ? "flex-col md:flex-row" : "flex-col";

  return (
    <>
      {/* Mobile: Show buttons */}
      <div className={`flex ${containerClass} items-center gap-4 md:hidden ${className}`}>
        <AppleAppStoreButton />
        <PlayStoreButton />
      </div>

      {/* Desktop: Show QR code */}
      <div className={`hidden md:flex items-center justify-center ${className}`}>
        <div className="bg-white rounded-3xl p-4 shadow-md">
          <Image
            src="/images/qr-code-download.svg"
            alt="QR Code pour télécharger l'application"
            width={200}
            height={200}
            className="w-48 h-48"
          />
        </div>
      </div>
    </>
  );
}
