import { Suspense } from "react";
import {
  queryArticles,
  queryBlogMeta,
  fetchCategories,
  toSortKey,
  ARTICLES_PER_PAGE,
} from "@/lib/articles";
import BlogHeader from "@/components/blog/BlogHeader";
import ArticlesList from "@/components/blog/ArticlesList";

interface PageProps {
  searchParams: Promise<{ category?: string; keyword?: string; sort?: string }>;
}

export default async function BlogPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const category = params.category ?? null;
  const keyword = params.keyword ?? null;
  const sort = toSortKey(params.sort);

  const [categories, { keywords }, rows] = await Promise.all([
    fetchCategories(),
    queryBlogMeta(),
    queryArticles(category, keyword, sort, ARTICLES_PER_PAGE + 1, 0),
  ]);

  const hasMore = rows.length > ARTICLES_PER_PAGE;
  const articles = rows.slice(0, ARTICLES_PER_PAGE);

  return (
    <main className="min-h-screen text-[#203649] bg-green-50">
      <div className="pt-20">
        <Suspense>
          <BlogHeader categories={categories} keywords={keywords} />
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
    </main>
  );
}
