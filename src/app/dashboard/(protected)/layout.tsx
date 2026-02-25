import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/dashboard/Sidebar";
import QueryProvider from "@/components/providers/QueryProvider";
import { initPro } from "../../../lib/api";
import { Toaster } from "sonner";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { userId, getToken } = await auth();

  if (!userId) {
    redirect("/dashboard/login");
  }

  try {
    console.log("Initializing pro account...");
    const token = await getToken();
    await initPro(token);
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
