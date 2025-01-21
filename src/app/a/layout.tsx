import Footer from '@/src/components/footer';
import { Header } from '@/src/components/header';

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full bg-gradient-to-b from-yellow-100 to-yellow-50">
      <Header />

      <article className="min-h-screen mx-auto max-w-2xl prose prose-quoteless prose-neutral dark:prose-invert p-8 sm:p-16 pt-24 sm:pt-32">
        {children}
      </article>

      <Footer />
    </div>
  );
}
