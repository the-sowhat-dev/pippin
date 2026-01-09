import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="flex justify-center items-center py-24 bg-green-500 min-h-screen">
      <SignIn routing="path" path="/dashboard/login" forceRedirectUrl="/dashboard" />
    </div>
  );
}
