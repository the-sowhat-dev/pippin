'use client';

import { useLanguage } from '@/i18n/LanguageProvider';

interface MDXWrapperProps {
  children: React.ReactNode;
}

export function MDXWrapper({ children }: MDXWrapperProps) {
  const { messages } = useLanguage();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-center text-2xl font-bold">{messages.articles.title}</h1>
      <div className="text-center text-lg mb-10">{messages.articles.subtitle}</div>
      {children}
    </div>
  );
}
