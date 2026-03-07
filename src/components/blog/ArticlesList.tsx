"use client";

import { useState } from "react";
import { ArticlePreviewResponse } from "sowhat-types";
import ArticleCard from "@/components/ArticleCard";

const ARTICLES_PER_PAGE = 15;

interface ArticlesListProps {
  initialArticles: ArticlePreviewResponse[];
  initialHasMore: boolean;
  category: string | null;
  keyword: string | null;
  sort: string;
}

export default function ArticlesList({
  initialArticles,
  initialHasMore,
  category,
  keyword,
  sort,
}: ArticlesListProps) {
  const [articles, setArticles] = useState<ArticlePreviewResponse[]>(initialArticles);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [loadingMore, setLoadingMore] = useState(false);
  const [offset, setOffset] = useState(initialArticles.length);

  const loadMore = async () => {
    setLoadingMore(true);
    try {
      const params = new URLSearchParams({
        limit: String(ARTICLES_PER_PAGE + 1),
        offset: String(offset),
        sort,
      });
      if (category) params.set("category", category);
      if (keyword) params.set("keyword", keyword);

      const res = await fetch(`/api/articles?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch");

      const data: ArticlePreviewResponse[] = await res.json();
      const hasMoreArticles = data.length > ARTICLES_PER_PAGE;
      const toAdd = data.slice(0, ARTICLES_PER_PAGE);

      setArticles((prev) => [...prev, ...toAdd]);
      setHasMore(hasMoreArticles);
      setOffset((prev) => prev + toAdd.length);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingMore(false);
    }
  };

  if (articles.length === 0) {
    return <p className="text-center text-gray-500 py-24">Aucun article trouvé.</p>;
  }

  return (
    <>
      <div className="flex flex-col gap-12 pb-16">
        {articles.map((article) => (
          <ArticleCard
            key={article.slug}
            title={article.title}
            subtitle={article.subtitle}
            slug={article.slug}
            collaboration={article.collaboration}
            date={article.published_at}
            coverImage={article.cover_image}
            readingTime={article.reading_time ?? 0}
            category={article.category}
          />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMore}
            disabled={loadingMore}
            className={`px-8 py-3 rounded-lg transition-colors ${
              loadingMore
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-green-900 text-white hover:bg-green-800"
            }`}>
            {loadingMore ? "Chargement..." : "Charger plus"}
          </button>
        </div>
      )}
    </>
  );
}
