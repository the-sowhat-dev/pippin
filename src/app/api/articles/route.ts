import { NextResponse } from "next/server";
import { queryArticles, toSortKey } from "@/lib/articles";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get("limit") || "16", 10), 50);
    const offset = parseInt(searchParams.get("offset") || "0", 10);
    const category = searchParams.get("category") || null;
    const keyword = searchParams.get("keyword") || null;
    const sort = toSortKey(searchParams.get("sort"));

    const articles = await queryArticles(category, keyword, sort, limit, offset);
    return NextResponse.json(articles);
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
