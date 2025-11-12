import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { readMarkdownFile } from '@/utils/markdownReader';

export default function Page() {
  const markdownContent = readMarkdownFile('app/app/legal/tos/page.md');

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-200 to-yellow-50 pt-24 px-8">
      <div className="max-w-4xl mx-auto p-8 sm:p-12">
        <MarkdownRenderer content={markdownContent} />
      </div>
    </div>
  );
}
