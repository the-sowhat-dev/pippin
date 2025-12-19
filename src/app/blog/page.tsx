'use client';

import { useEffect, useState } from 'react';
import ArticleCard from '@/components/ArticleCard';
import { Article } from '../../../lib/db';

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
        const parsedData = data.map((article: any) => ({
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
    <main className="min-h-screen bg-[#C2E7FF] pt-24 px-8 text-[#203649]">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Blog</h1>
        {loading ? (
          <div className="text-center">Chargement...</div>
        ) : (
          <div className="items-center flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-16">
            {articles.map((article) => (
              <ArticleCard
                key={article.slug}
                title={article.title}
                slug={article.slug}
                date={article.published_at.toLocaleDateString('fr-FR')}
                coverImage={article.cover_image}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
