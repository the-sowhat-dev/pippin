import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getProQuota } from "@/lib/api";

export async function GET() {
  const { getToken } = await auth();
  const token = await getToken();

  try {
    const quota = await getProQuota(token);
    return NextResponse.json(quota);
  } catch (error) {
    console.error("Error fetching pro quota:", error);
    return NextResponse.json({ error: "Failed to fetch quota" }, { status: 500 });
  }
}
