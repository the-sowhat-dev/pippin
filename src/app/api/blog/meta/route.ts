import { NextResponse } from "next/server";
import { fetchCategories, queryBlogMeta } from "@/lib/articles";

export async function GET() {
  try {
    const [categories, { keywords }] = await Promise.all([fetchCategories(), queryBlogMeta()]);
    return NextResponse.json({ categories, keywords });
  } catch (error) {
    console.error("Error fetching blog meta:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
