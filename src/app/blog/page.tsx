import { Suspense } from "react";

import BlogHeader from "@/components/blog/BlogHeader";
import ArticlesList from "@/components/blog/ArticlesList";
import { queryArticles, fetchCategories, toSortKey, ARTICLES_PER_PAGE } from "@/lib/articles";

interface PageProps {
  searchParams: Promise<{ category?: string; keyword?: string; sort?: string }>;
}

export default async function BlogPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const category = params.category ?? null;
  const keyword = params.keyword ?? null;
  const sort = toSortKey(params.sort);

  const [categories, rows] = await Promise.all([
    fetchCategories(),
    queryArticles(category, keyword, sort, ARTICLES_PER_PAGE + 1, 0),
  ]);

  const currentSecondaryColor = categories.find((c) => c.key === category)?.secondaryColor;

  const hasMore = rows.length > ARTICLES_PER_PAGE;
  const articles = rows.slice(0, ARTICLES_PER_PAGE);

  return (
    <main className="min-h-screen bg-white text-[#203649]">
      <div
        style={{
          backgroundColor: currentSecondaryColor ? `${currentSecondaryColor}10` : "#F0FDF4",
        }}>
        <div className="pt-20">
          <Suspense>
            <BlogHeader categories={categories} />
          </Suspense>
        </div>

        <div className="max-w-4xl mx-auto px-8 pt-12 pb-64">
          <Suspense>
            <ArticlesList
              key={`${category ?? ""}-${keyword ?? ""}-${sort}`}
              initialArticles={articles}
              initialHasMore={hasMore}
              category={category}
              keyword={keyword}
              sort={sort}
            />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
