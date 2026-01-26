import { auth, currentUser } from '@clerk/nextjs/server';
import OnboardingForm from '../../../components/dashboard/OnboardingForm';
import { LexendFont } from '@/utils/fonts';
import { getPro } from '../../../lib/api';

export default async function OnboardingPage() {
  const user = await currentUser();
  const { getToken } = await auth();
  const token = await getToken();

  const proData = token ? await getPro(token) : null;

  return (
    <div className="min-h-screen bg-gray-50 py-12 sm:px-6 lg:px-8 ">
      <div className="sm:mx-auto sm:max-w-2xl flex flex-col gap-24">
        <h2
          className={`mt-6 mb-1 text-3xl text-center font-extrabold text-green-900 ${LexendFont.className}`}
        >
          Bienvenue !
        </h2>

        <OnboardingForm
          initialFirstName={user?.firstName || ''}
          initialLastName={user?.lastName || ''}
          initialData={proData}
        />
      </div>
    </div>
  );
}
