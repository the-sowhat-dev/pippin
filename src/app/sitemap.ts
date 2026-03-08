import { MetadataRoute } from "next";
import { getPublishedArticlesForSitemap } from "@/lib/articles";

const BASE_URL = "https://invstore.fr";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getPublishedArticlesForSitemap();

  const blogEntries: MetadataRoute.Sitemap = articles.map((article) => {
    // Use updated_at if available, otherwise use published_at
    const lastModified = article.updated_at
      ? new Date(article.updated_at)
      : new Date(article.published_at);

    return {
      url: `${BASE_URL}/blog/a/${article.slug}`,
      lastModified: lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    };
  });

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/app`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/pro`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/pro/form`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/legal`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/app/legal/pp`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/app/legal/tos`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  return [...staticRoutes, ...blogEntries];
}
