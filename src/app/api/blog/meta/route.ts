import { NextResponse } from "next/server";
import { BLOG_CACHE_TTL, fetchCategories, queryBlogMeta } from "@/lib/articles";

const CACHE_CONTROL = `public, s-maxage=${BLOG_CACHE_TTL.meta}, stale-while-revalidate=${BLOG_CACHE_TTL.meta * 2}`;

export async function GET() {
  try {
    const [categories, { keywords }] = await Promise.all([fetchCategories(), queryBlogMeta()]);
    return NextResponse.json(
      { categories, keywords },
      {
        headers: {
          "Cache-Control": CACHE_CONTROL,
        },
      },
    );
  } catch (error) {
    console.error("Error fetching blog meta:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
