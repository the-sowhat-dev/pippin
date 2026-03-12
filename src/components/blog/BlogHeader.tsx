"use client";

import { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { BlogCategoryResponse } from "sowhat-types";

import { LexendFont } from "@/utils/fonts";
import { SortArticleSelect } from "./SortArticleSelect";
import { BlogKeywordChip } from "./BlogKeywordChip";
import { BlogCategoryChip } from "./BlogCategoryChip";

const VISIBLE_KEYWORDS = 10;
const VISIBLE_CATEGORIES = 5;

const DEFAULT_BG = "#F0FDF4"; // green-50

interface BlogHeaderProps {
  categories: BlogCategoryResponse[];
  keywords: string[];
}

export default function BlogHeader({ categories, keywords }: BlogHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [showAllKeywords, setShowAllKeywords] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);

  // Track the animated fill color separately from URL state so the animation
  // always starts with the correct color even before the URL re-render.
  const [bgAnimKey, setBgAnimKey] = useState(0);
  const [animatedColor, setAnimatedColor] = useState<string>(DEFAULT_BG);
  // The static background reflects the last completed animation's color,
  // only updated once the fill animation ends to avoid mid-animation flicker.
  const [staticColor, setStaticColor] = useState<string>(() => {
    const catKey = searchParams.get("category");
    const found = categories.find((c) => c.key === catKey);
    return found ? found.primaryColor : DEFAULT_BG;
  });

  const currentCategory = searchParams.get("category");
  const currentKeyword = searchParams.get("keyword");
  const currentSort = searchParams.get("sort") ?? "date_desc";

  const updateParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (value === null) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const triggerBgFill = (newColor: string) => {
    setAnimatedColor(newColor);
    setBgAnimKey((k) => k + 1);
  };

  const toggleCategory = (cat: BlogCategoryResponse) => {
    const newCategoryKey = currentCategory === cat.key ? null : cat.key;
    triggerBgFill(newCategoryKey ? cat.primaryColor : DEFAULT_BG);
    updateParams({ category: newCategoryKey });
  };

  const clearFilters = () => {
    triggerBgFill(DEFAULT_BG);
    updateParams({ category: null, keyword: null });
  };

  const toggleKeyword = (keyword: string) => {
    updateParams({ keyword: currentKeyword === keyword ? null : keyword });
  };

  const visibleKeywords = showAllKeywords ? keywords : keywords.slice(0, VISIBLE_KEYWORDS);
  const hiddenKeywordsCount = keywords.length - VISIBLE_KEYWORDS;

  const visibleCategories = showAllCategories
    ? categories
    : categories.slice(0, VISIBLE_CATEGORIES);
  const hiddenCategoriesCount = categories.length - VISIBLE_CATEGORIES;

  return (
    <div className="relative overflow-hidden border-b border-green-100 px-8 py-6">
      {/* Static base background — updated only after an animation completes */}
      <div className="absolute inset-0" style={{ backgroundColor: staticColor }} />

      {/* Animated color fill — wipes left → right on each category change */}
      {bgAnimKey > 0 && (
        <div
          key={bgAnimKey}
          className="absolute inset-0"
          style={{
            backgroundColor: animatedColor,
            transformOrigin: "left center",
            animation: "fillFromLeft 500ms ease forwards",
          }}
          onAnimationEnd={() => setStaticColor(animatedColor)}
        />
      )}

      <div className="relative z-10 max-w-4xl mx-auto space-y-5">
        {/* Title + Sort */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h1 className={`text-3xl sm:text-5xl text-green-900 ${LexendFont.className}`}>Blog</h1>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-gray-600 text-xs md:text-base">Trier par :</span>
            <SortArticleSelect
              value={currentSort}
              onChange={(value) => updateParams({ sort: value })}
            />
          </div>
        </div>

        {/* Category chips */}
        <div>
          <div className="text-gray-600 text-xs md:text-base mb-1.5 ml-2">Catégories :</div>
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={clearFilters}
                className={`px-3.5 py-1 rounded-full text-sm font-medium border transition-all ${
                  !currentCategory
                    ? "bg-gray-800 text-white border-transparent"
                    : "bg-white/80 backdrop-blur-sm text-gray-600 border-gray-200 hover:border-gray-400"
                }`}>
                Tous
              </button>

              {visibleCategories.map((cat) => (
                <BlogCategoryChip
                  key={cat.key}
                  primaryColor={cat.primaryColor}
                  secondaryColor={cat.secondaryColor}
                  category={cat.label}
                  isActive={currentCategory === cat.key}
                  onClick={() => toggleCategory(cat)}
                />
              ))}

              {hiddenCategoriesCount > 0 && (
                <button
                  onClick={() => setShowAllCategories((v) => !v)}
                  className="px-3.5 py-1 text-sm text-green-800 font-medium hover:underline">
                  {showAllCategories ? "Voir moins" : `+${hiddenCategoriesCount} autres`}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Keyword chips */}
        {/* <div>
          <div className="text-gray-600 text-xs md:text-base mb-1.5 ml-2">Mots-clés :</div>
          {keywords.length > 0 && (
            <div className="flex flex-wrap gap-1.5 items-center">
              {visibleKeywords.map((kw) => (
                <BlogKeywordChip
                  key={kw}
                  keyword={kw}
                  isActive={currentKeyword === kw}
                  onClick={() => toggleKeyword(kw)}
                />
              ))}

              {hiddenKeywordsCount > 0 && (
                <button
                  onClick={() => setShowAllKeywords((v) => !v)}
                  className="px-3.5 py-1 text-sm text-green-800 font-medium hover:underline">
                  {showAllKeywords ? "Voir moins" : `+${hiddenKeywordsCount} autres`}
                </button>
              )}
            </div>
          )}
        </div> */}
      </div>
    </div>
  );
}
