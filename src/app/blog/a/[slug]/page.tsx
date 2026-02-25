import { notFound } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";
import pool from "../../../../lib/db";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { LexendFont, RobotoFont } from "@/utils/fonts";

// Helper to fetch article
async function getArticle(slug: string) {
  const client = await pool.connect();
  try {
    const query = "SELECT * FROM articles WHERE slug = $1 AND is_published = true";
    const result = await client.query(query, [slug]);
    return result.rows[0] || null;
  } finally {
    client.release();
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    return {};
  }

  return {
    title: `${article.title} | Invstore - gagner mieux sans effort`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.published_at.toISOString(),
      images: article.cover_image ? [{ url: article.cover_image }] : [],
    },
    keywords: article.keywords || [],
    authors: article.author ? [{ name: article.author }] : [],
    category: article.category,
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <div className={`flex flex-col gap-4 ${RobotoFont.className}`}>
      <h1
        className={`text-2xl sm:text-3xl pt-8 pb-16 mb-0 fade-in text-center ${LexendFont.className} text-green-800`}>
        {article.title}
      </h1>

      <div className="text-center text-gray-500 mb-8">
        {new Date(article.published_at).toLocaleDateString("fr-FR")}
      </div>

      {article.cover_image && (
        <figure className="mb-10 w-full">
          <div className="relative w-full aspect-video sm:h-[400px]">
            <Image
              src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${article.cover_image}.webp`}
              alt={article.title}
              fill
              className="object-cover rounded-lg max-w-[600px] mx-auto"
            />
          </div>
        </figure>
      )}

      <MarkdownRenderer content={article.content} />
    </div>
  );
}
