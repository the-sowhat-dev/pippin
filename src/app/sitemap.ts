import { MetadataRoute } from 'next';
import { getArticles } from '@/utils/getArticles';

const BASE_URL = 'https://invstore.fr';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = getArticles();

  const blogEntries: MetadataRoute.Sitemap = articles.map((article) => {
    // Parse date DD/MM/YYYY to Date object
    const [day, month, year] = article.date.split('/');
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

    return {
      url: `${BASE_URL}/blog/a/${article.slug}`,
      lastModified: date,
      changeFrequency: 'monthly',
      priority: 0.8,
    };
  });

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/app`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/pro`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/pro/form`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/legal`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/app/legal/pp`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/app/legal/tos`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  return [...staticRoutes, ...blogEntries];
}
