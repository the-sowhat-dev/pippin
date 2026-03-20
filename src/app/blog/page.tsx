import { Suspense } from "react";

import BlogHeader from "@/components/blog/BlogHeader";
import ArticlesList from "@/components/blog/ArticlesList";
import { queryArticles, fetchCategories, toSortKey, ARTICLES_PER_PAGE } from "@/lib/articles";
import { LandingPageHeader } from "@/components/LandingPageHeader";

interface PageProps {
  searchParams: Promise<{ category?: string; keyword?: string; sort?: string }>;
}

function BlogContentFallback() {
  return (
    <div className="animate-pulse" style={{ backgroundColor: "#F0FDF4" }}>
      <div className="pt-20 px-8">
        <div className="max-w-4xl mx-auto h-10 rounded-md bg-slate-200/60" />
      </div>
      <div className="max-w-4xl mx-auto px-8 pt-12 pb-64 space-y-6">
        <div className="h-36 rounded-lg bg-slate-200/50" />
        <div className="h-36 rounded-lg bg-slate-200/50" />
        <div className="h-36 rounded-lg bg-slate-200/50" />
      </div>
    </div>
  );
}

/** Fetches articles + categories. Wrapped in Suspense so the shell (incl. header) can stream first. */
async function BlogContent({ searchParams }: PageProps) {
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
    <div
      style={{ backgroundColor: currentSecondaryColor ? `${currentSecondaryColor}10` : "#F0FDF4" }}>
      <BlogHeader categories={categories} />

      <div className="max-w-4xl mx-auto px-8 pt-12 pb-64">
        <ArticlesList
          key={`${category ?? ""}-${keyword ?? ""}-${sort}`}
          initialArticles={articles}
          initialHasMore={hasMore}
          category={category}
          keyword={keyword}
          sort={sort}
        />
      </div>
    </div>
  );
}

export default function BlogPage({ searchParams }: PageProps) {
  return (
    <main className="min-h-screen bg-white text-[#203649]">
      <LandingPageHeader />

      <Suspense fallback={<BlogContentFallback />}>
        <BlogContent searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
