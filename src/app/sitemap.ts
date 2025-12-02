import { promises as fs } from 'fs';
import { MetadataRoute } from 'next';
import path from 'path';

async function getNoteSlugs(dir: string) {
  const entries = await fs.readdir(dir, {
    recursive: true,
    withFileTypes: true,
  });
  return entries
    .filter((entry) => entry.isFile() && entry.name === 'content.mdx')
    .map((entry) => {
      // Get the full path by joining the directory path with the entry path
      const fullPath = path.join(entry.path, entry.name);
      const relativePath = path.relative(dir, fullPath);
      return path.dirname(relativePath);
    })
    .map((slug) => slug.replace(/\\/g, '/'));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const notesDirectory = path.join(process.cwd(), 'src', 'app', 'a');
  const slugs = await getNoteSlugs(notesDirectory);

  const notes = slugs.map((slug) => ({
    url: `https://sowhat-app.com/a/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'yearly' as const,
    priority: 1,
  }));

  const routes = ['', '/work'].map((route) => ({
    url: `https://sowhat-app.com${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...routes, ...notes];
}
