import { NextResponse } from "next/server";
import { BLOG_CACHE_TTL, queryArticles, toSortKey } from "@/lib/articles";

const CACHE_CONTROL = `public, s-maxage=${BLOG_CACHE_TTL.list}, stale-while-revalidate=${BLOG_CACHE_TTL.list * 3}`;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const parsedLimit = Number.parseInt(searchParams.get("limit") || "16", 10);
    const limit = Number.isNaN(parsedLimit) ? 16 : Math.min(Math.max(parsedLimit, 1), 50);

    const parsedOffset = Number.parseInt(searchParams.get("offset") || "0", 10);
    const offset = Number.isNaN(parsedOffset) ? 0 : Math.min(Math.max(parsedOffset, 0), 5000);

    const category = searchParams.get("category") || null;
    const keyword = searchParams.get("keyword") || null;
    const sort = toSortKey(searchParams.get("sort"));

    const articles = await queryArticles(category, keyword, sort, limit, offset);
    return NextResponse.json(articles, {
      headers: {
        "Cache-Control": CACHE_CONTROL,
      },
    });
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
