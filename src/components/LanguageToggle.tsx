"use client";

import { useLanguage } from "@/i18n/LanguageProvider";

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <div className="relative inline-flex items-center bg-gray-200/50 backdrop-blur-sm rounded-full p-1 gap-1">
      {/* Sliding background indicator */}
      <div
        className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-full shadow-md transition-all duration-300 ease-in-out ${
          language === "fr" ? "left-1" : "left-[calc(50%+2px)]"
        }`}
      />

      {/* French Flag Button */}
      <button
        onClick={() => language !== "fr" && toggleLanguage()}
        className={`relative w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 ${
          language === "fr" ? "scale-100" : "scale-90 opacity-60 hover:opacity-80 hover:scale-95"
        }`}
        aria-label="Switch to French"
        disabled={language === "fr"}>
        <span className="text-2xl">🇫🇷</span>
      </button>

      {/* US Flag Button */}
      <button
        onClick={() => language !== "en" && toggleLanguage()}
        className={`relative w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 ${
          language === "en" ? "scale-100" : "scale-90 opacity-60 hover:opacity-80 hover:scale-95"
        }`}
        aria-label="Switch to English"
        disabled={language === "en"}>
        <span className="text-2xl">🇺🇸</span>
      </button>
    </div>
  );
}
