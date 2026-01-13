'use client';

import { useEffect, useState } from 'react';
import ArticleCard from '@/components/ArticleCard';
import { Article } from '../../../lib/db';
import { LexendFont } from '@/utils/fonts';

export default function Page() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/articles')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((data) => {
        // Parse dates from JSON strings to Date objects
        const parsedData = data.map((article: Article) => ({
          ...article,
          published_at: new Date(article.published_at),
          updated_at: article.updated_at ? new Date(article.updated_at) : null,
          created_at: article.created_at ? new Date(article.created_at) : null,
        }));
        setArticles(parsedData);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen  pt-24 px-8 text-[#203649]">
      <div className="max-w-4xl mx-auto pb-64">
        <h1
          className={`text-3xl sm:text-5xl text-green-900 mb-12 sm:mb-24 text-center ${LexendFont.className}`}
        >
          Blog
        </h1>
        {loading ? (
          <div className="text-center">Chargement...</div>
        ) : (
          <div className="flex flex-col gap-12 pb-16">
            {articles.map((article) => (
              <ArticleCard
                key={article.slug}
                title={article.title}
                subtitle={article.subtitle}
                slug={article.slug}
                date={article.published_at}
                coverImage={article.cover_image}
                readingTime={article.reading_time!}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
