import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { Sidebar } from '@/components/dashboard/Sidebar';
import QueryProvider from '@/components/providers/QueryProvider';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth();

  if (!userId) {
    redirect('/dashboard/login');
  }

  const user = await currentUser();
  if (!user?.unsafeMetadata?.hasDoneTheOnboarding) {
    redirect('/dashboard/onboarding');
  }

  return (
    <QueryProvider>
      <div className="flex h-screen bg-gray-50 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto w-full">{children}</main>
      </div>
    </QueryProvider>
  );
}
