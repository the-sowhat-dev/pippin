"use client";

import { useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

interface VideoStrategyProps {
  videoUrl: string;
  thumbnailUrl: string;
}

export function VideoStrategy({ videoUrl, thumbnailUrl }: VideoStrategyProps) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const handlePlayClick = () => {
    setIsVideoLoaded(true);
  };

  return (
    <section className="pt-0 pb-12 sm:pt-4 sm:pb-16 bg-[#c6f0d0]">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="relative w-full mx-auto" style={{ aspectRatio: "16/9" }}>
          {!isVideoLoaded ? (
            // Facade: Static thumbnail with play button
            <button
              onClick={handlePlayClick}
              className="relative w-full h-full group cursor-pointer overflow-hidden rounded-lg shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-500 transition-all hover:shadow-3xl"
              aria-label="Play video">
              {/* Thumbnail image */}
              <img
                src={thumbnailUrl}
                alt="Video thumbnail"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />

              {/* Dark overlay on hover */}
              <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-40 transition-opacity duration-300" />

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-red-600 rounded-full p-6 group-hover:scale-110 group-hover:bg-red-700 transition-all duration-300 shadow-xl">
                  <PlayArrowIcon sx={{ fontSize: 64 }} className="text-white" />
                </div>
              </div>

              {/* Duration badge (optional) */}
              <div className="absolute bottom-4 right-4 bg-black bg-opacity-75 text-white px-3 py-1 rounded text-sm font-semibold">
                1:04
              </div>
            </button>
          ) : (
            // Actual video player (loads only when clicked)
            <div className="w-full h-full rounded-lg shadow-2xl overflow-hidden">
              <video
                className="w-full h-full"
                controls
                autoPlay
                preload="auto"
                controlsList="nodownload">
                <source src={videoUrl} type="video/mp4" />
                Votre navigateur ne supporte pas la lecture de vidéos. Désolé
              </video>
            </div>
          )}
        </div>

        {/* Optional caption */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Cliquez pour découvrir l'application en 1 minute
        </p>
      </div>
    </section>
  );
}
