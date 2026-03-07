import pool from "@/lib/db";
import { ArticlePreviewResponse, BlogCategoryResponse } from "sowhat-types";

export type SortKey = "date_desc" | "date_asc" | "alpha_asc" | "alpha_desc";

export const ARTICLES_PER_PAGE = 15;

const SORT_MAP: Record<SortKey, string> = {
  date_desc: "published_at DESC",
  date_asc: "published_at ASC",
  alpha_asc: "title ASC",
  alpha_desc: "title DESC",
};

export function toSortKey(value: string | null | undefined): SortKey {
  return (value as SortKey) in SORT_MAP ? (value as SortKey) : "date_desc";
}

export async function fetchCategories(): Promise<BlogCategoryResponse[]> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const res = await fetch(`${backendUrl}/articles/categories`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch categories: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export async function queryArticles(
  category: string | null,
  keyword: string | null,
  sort: SortKey,
  limit: number,
  offset: number,
): Promise<ArticlePreviewResponse[]> {
  const orderBy = SORT_MAP[sort];
  const result = await pool.query(
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
}

export async function queryBlogMeta(): Promise<{
  keywords: string[];
}> {
  const result = await pool.query(
    "SELECT DISTINCT unnest(keywords) AS keyword FROM articles WHERE is_published = true ORDER BY keyword",
  );

  return {
    keywords: result.rows.map((r) => r.keyword as string).filter(Boolean),
  };
}
