import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { readMarkdownFile } from "@/utils/markdownReader";

export default function Page() {
  const markdownContent = readMarkdownFile("app/app/legal/pp/content.md");

  return (
    <main className="min-h-screen bg-[#C2E7FF] pt-24 px-8 text-[#203649]">
      <div className="max-w-4xl mx-auto p-8 sm:p-12">
        <MarkdownRenderer content={markdownContent} />
      </div>
    </main>
  );
}
