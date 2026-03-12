import pool from "@/lib/db";
import { unstable_cache } from "next/cache";
import { cache } from "react";
import { ArticlePreviewResponse, BlogCategoryResponse, ArticleResponse } from "sowhat-types";

export type SortKey = "date_desc" | "date_asc" | "alpha_asc" | "alpha_desc";

export const ARTICLES_PER_PAGE = 15;
export const BLOG_CACHE_TTL = {
  list: 60 * 5,
  article: 60 * 60,
  meta: 60 * 60,
  categories: 60 * 60,
  sitemap: 60 * 60,
} as const;

const SORT_MAP: Record<SortKey, string> = {
  date_desc: "published_at DESC",
  date_asc: "published_at ASC",
  alpha_asc: "title ASC",
  alpha_desc: "title DESC",
};

type BlogArticleRow = Omit<ArticleResponse, "is_published" | "created_at">;
type BlogSitemapRow = Pick<ArticleResponse, "slug" | "published_at" | "updated_at">;

export function toSortKey(value: string | null | undefined): SortKey {
  if (!value) {
    return "date_desc";
  }

  return Object.prototype.hasOwnProperty.call(SORT_MAP, value) ? (value as SortKey) : "date_desc";
}

export async function fetchCategories(): Promise<BlogCategoryResponse[]> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!backendUrl) {
    throw new Error("NEXT_PUBLIC_BACKEND_URL is not defined");
  }

  const res = await fetch(`${backendUrl}/articles/categories`, {
    next: {
      revalidate: BLOG_CACHE_TTL.categories,
      tags: ["blog:categories"],
    },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch categories: ${res.status} ${res.statusText}`);
  }
}

const queryArticlesCached = unstable_cache(
  async (
    category: string | null,
    keyword: string | null,
    sort: SortKey,
    limit: number,
    offset: number,
  ): Promise<ArticlePreviewResponse[]> => {
    const orderBy = SORT_MAP[sort];
    const result = await pool.query<ArticlePreviewResponse>(
      `SELECT id, slug, title, subtitle, cover_image, author,
              category, keywords, reading_time, published_at, collaboration
       FROM articles
       WHERE is_published = true
         AND ($1::text IS NULL OR category = $1)
         AND ($2::text IS NULL OR $2 = ANY(keywords))
       ORDER BY ${orderBy}
       LIMIT $3 OFFSET $4`,
      [category, keyword, limit, offset],
    );
    return result.rows;
  },
  ["blog-articles"],
  { revalidate: BLOG_CACHE_TTL.list, tags: ["blog:articles"] },
);

export async function queryArticles(
  category: string | null,
  keyword: string | null,
  sort: SortKey,
  limit: number,
  offset: number,
): Promise<ArticlePreviewResponse[]> {
  return queryArticlesCached(category, keyword, sort, limit, offset);
}

const queryBlogMetaCached = unstable_cache(
  async (): Promise<{ keywords: string[] }> => {
    const result = await pool.query<{ keyword: string | null }>(
      "SELECT DISTINCT unnest(keywords) AS keyword FROM articles WHERE is_published = true ORDER BY keyword",
    );

    return {
      keywords: result.rows
        .map((r) => r.keyword)
        .filter((value): value is string => Boolean(value)),
    };
  },
  ["blog-meta-keywords"],
  { revalidate: BLOG_CACHE_TTL.meta, tags: ["blog:meta", "blog:articles"] },
);

export async function queryBlogMeta(): Promise<{
  keywords: string[];
}> {
  return queryBlogMetaCached();
}

const getArticleBySlugCached = unstable_cache(
  async (slug: string): Promise<BlogArticleRow | null> => {
    const query = `
      SELECT id, slug, title, subtitle, description, content, cover_image, author,
             category, keywords, reading_time, collaboration, published_at, updated_at
      FROM articles
      WHERE slug = $1 AND is_published = true
      LIMIT 1
    `;
    const result = await pool.query<BlogArticleRow>(query, [slug]);
    return result.rows[0] ?? null;
  },
  ["blog-article"],
  {
    revalidate: BLOG_CACHE_TTL.article,
    tags: ["blog:articles"],
  },
);

export async function getArticleBySlug(slug: string): Promise<BlogArticleRow | null> {
  return getArticleBySlugRequestMemo(slug);
}

const getArticleBySlugRequestMemo = cache(async (slug: string): Promise<BlogArticleRow | null> => {
  return getArticleBySlugCached(slug);
});

const getPublishedArticleSlugsCached = unstable_cache(
  async (): Promise<{ slug: string }[]> => {
    const result = await pool.query<{ slug: string }>(
      "SELECT slug FROM articles WHERE is_published = true ORDER BY published_at DESC",
    );
    return result.rows;
  },
  ["blog-article-slugs"],
  { revalidate: BLOG_CACHE_TTL.list, tags: ["blog:articles"] },
);

export async function getPublishedArticleSlugs(): Promise<{ slug: string }[]> {
  return getPublishedArticleSlugsCached();
}

const getPublishedArticlesForSitemapCached = unstable_cache(
  async (): Promise<BlogSitemapRow[]> => {
    const result = await pool.query<BlogSitemapRow>(
      `
        SELECT slug, published_at, updated_at
        FROM articles
        WHERE is_published = true
        ORDER BY published_at DESC
      `,
    );
    return result.rows;
  },
  ["blog-sitemap-articles"],
  { revalidate: BLOG_CACHE_TTL.sitemap, tags: ["blog:articles"] },
);

export async function getPublishedArticlesForSitemap(): Promise<BlogSitemapRow[]> {
  return getPublishedArticlesForSitemapCached();
}
