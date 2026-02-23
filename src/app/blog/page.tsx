"use client";

import { useEffect, useState } from "react";
import ArticleCard from "@/components/ArticleCard";

import { Article } from "../../lib/db";
import { LexendFont } from "@/utils/fonts";

const ARTICLES_PER_PAGE = 15;

export default function Page() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [offset, setOffset] = useState(0);

  const fetchArticles = async (currentOffset: number, append = false) => {
    const isLoadingMore = append;
    if (isLoadingMore) {
      setLoadingMore(true);
    }

    try {
      // Fetch 16 articles (15 + 1 to check if more exist)
      const res = await fetch(
        `/api/articles?limit=${ARTICLES_PER_PAGE + 1}&offset=${currentOffset}`,
      );
      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();

      // Parse dates from JSON strings to Date objects
      const parsedData = data.map((article: Article) => ({
        ...article,
        published_at: new Date(article.published_at),
        updated_at: article.updated_at ? new Date(article.updated_at) : null,
        created_at: article.created_at ? new Date(article.created_at) : null,
      }));

      // Check if there are more articles
      const hasMoreArticles = parsedData.length > ARTICLES_PER_PAGE;

      // Only keep the first 15 articles
      const articlesToDisplay = parsedData.slice(0, ARTICLES_PER_PAGE);

      if (append) {
        setArticles((prev) => [...prev, ...articlesToDisplay]);
      } else {
        setArticles(articlesToDisplay);
      }

      setHasMore(hasMoreArticles);
      setLoading(false);
      setLoadingMore(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchArticles(0);
  }, []);

  const loadMore = () => {
    const newOffset = offset + ARTICLES_PER_PAGE;
    setOffset(newOffset);
    fetchArticles(newOffset, true);
  };

  return (
    <main className="min-h-screen  pt-24 px-8 text-[#203649]">
      <div className="max-w-4xl mx-auto pb-64">
        <h1
          className={`text-3xl sm:text-5xl text-green-900 mb-12 sm:mb-24 text-center ${LexendFont.className}`}>
          Blog
        </h1>
        {loading ? (
          <div className="text-center">Chargement...</div>
        ) : (
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
                  readingTime={article.reading_time!}
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
        )}
      </div>
    </main>
  );
}
