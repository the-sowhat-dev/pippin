import ProLeadsDashboardClient from '@/components/dashboard/screening/ProLeadsDashboardClient';

export default async function Page() {
  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Screening</h1>
        <p className="text-gray-500 mt-2">
          Consultez et filtrez les profils qualifiés pour proposer vos solutions d'investissement.
        </p>
      </header>

      <ProLeadsDashboardClient />
    </div>
  );
}
