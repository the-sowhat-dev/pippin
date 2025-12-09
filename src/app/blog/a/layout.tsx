export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full bg-green-50">
      <article className="min-h-screen mx-auto max-w-2xl prose prose-quoteless prose-neutral dark:prose-invert p-8 sm:p-16 pt-24 sm:pt-32">
        {children}
      </article>
    </div>
  );
}
