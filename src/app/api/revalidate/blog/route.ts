import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

type RevalidatePayload = {
  slug?: string;
};

export async function POST(request: Request) {
  const expectedSecret = process.env.BLOG_REVALIDATE_SECRET;
  if (!expectedSecret) {
    return NextResponse.json(
      { error: "BLOG_REVALIDATE_SECRET is not configured" },
      { status: 500 },
    );
  }

  const headerSecret = request.headers.get("x-revalidate-secret");

  let payload: RevalidatePayload = {};
  try {
    payload = (await request.json()) as RevalidatePayload;
  } catch {
    // ignore parsing errors
  }

  if (headerSecret !== expectedSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  revalidateTag("blog:articles", "max");
  revalidateTag("blog:meta", "max");
  revalidateTag("blog:categories", "max");
  revalidatePath("/blog");
  revalidatePath("/sitemap.xml");

  if (payload.slug) {
    revalidatePath(`/blog/a/${payload.slug}`);
    return NextResponse.json({ revalidated: true, scope: "single", slug: payload.slug });
  }

  revalidatePath("/blog/a/[slug]", "page");
  return NextResponse.json({ revalidated: true, scope: "all" });
}
