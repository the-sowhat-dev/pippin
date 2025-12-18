import { getArticles } from '@/utils/getArticles';
import ArticleCard from '@/components/ArticleCard';

export default function Page() {
  const articles = getArticles();

  return (
    <main className="min-h-screen bg-[#C2E7FF] pt-24 px-8 text-[#203649]">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Blog</h1>
        <div className="items-center flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-16">
          {articles.map((article) => (
            <ArticleCard
              key={article.slug}
              {...article}
              collaboration={article.collaboration ?? undefined}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
