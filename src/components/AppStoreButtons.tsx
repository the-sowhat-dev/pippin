"use client";

import { AppleAppStoreButton } from "./AppleAppStoreButton";
import { PlayStoreButton } from "./PlayStoreButton";
import { AppQRCode } from "./AppQRCode";

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

      {/* Desktop: Show QR code with "Télécharger l'app" */}
      <div className={`hidden md:flex items-center justify-center ${className}`}>
        <AppQRCode size={200} />
      </div>
    </>
  );
}
