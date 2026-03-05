import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/dashboard/Sidebar";
import QueryProvider from "@/components/providers/QueryProvider";
import { initPro } from "../../../lib/api";
import { Toaster } from "sonner";
import { unstable_cache } from "next/cache";
import { cache } from "react";

/**
 * Deduplicates initPro calls within the same request (React cache)
 * and across navigations (Next.js Data Cache keyed on userId).
 *
 * The token is captured in the closure so it's used on cache miss
 * without becoming part of the cache key — preventing stale-token misses.
 */
const getOrInitPro = cache(async (userId: string, token: string | null) => {
  return unstable_cache(
    async () => {
      console.log("Initializing pro account (cache miss)...");
      return initPro(token);
    },
    ["pro-init", userId],
    { revalidate: 60 * 60 * 24 } // 24h — initPro is idempotent
  )();
});

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { userId, getToken } = await auth();

  if (!userId) {
    redirect("/dashboard/login");
  }

  const token = await getToken();

  try {
    await getOrInitPro(userId, token);
  } catch (error) {
    console.error("Failed to initialize pro account:", error);
  }

  const user = await currentUser();
  if (!user?.unsafeMetadata?.hasDoneTheOnboarding) {
    redirect("/dashboard/onboarding");
  }

  return (
    <QueryProvider>
      <div className="flex h-screen bg-gray-50 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto w-full">
          <Toaster />
          {children}
        </main>
      </div>
    </QueryProvider>
  );
}
