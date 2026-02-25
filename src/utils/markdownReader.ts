import fs from "fs";
import path from "path";

/**
 * Reads a markdown file from the filesystem
 * @param filePath - Relative path from the app directory (e.g., 'app/legal/cgu/content.md')
 * @returns The markdown content as a string
 */
export function readMarkdownFile(filePath: string): string {
  const fullPath = path.join(process.cwd(), "src", filePath);

  try {
    const content = fs.readFileSync(fullPath, "utf8");
    return content;
  } catch (error) {
    console.error(`Error reading markdown file: ${fullPath}`, error);
    return "";
  }
}
