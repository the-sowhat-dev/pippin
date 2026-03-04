import { auth } from "@clerk/nextjs/server";
import { Send, CheckCheck } from "lucide-react";
import { getProMonitoring, getProQuota } from "@/lib/api";
import { MetricCard } from "@/components/dashboard/monitoring/MetricCard";
import { QuotaCard } from "@/components/dashboard/profile/QuotaCard";

export default async function Page() {
  const { getToken } = await auth();
  const token = await getToken();

  const [monitoring, quotaData] = await Promise.all([
    token ? getProMonitoring(token) : null,
    token ? getProQuota(token) : null,
  ]);

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <header className="mb-8">
        <div className="flex-1">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Monitoring</h1>
          <p className="text-gray-500 mt-2">Suivez vos performances sur les 12 derniers mois</p>
        </div>
      </header>

      {monitoring === null ? (
        <div className="text-center text-gray-400 py-16 text-sm">
          Données de monitoring non disponibles.
        </div>
      ) : (
        <div className="space-y-5">
          <QuotaCard quota={quotaData} />

          {/* Offers sent */}
          <MetricCard
            title="Offres envoyées"
            description="Nombre d'offres commerciales envoyées à des prospects chaque mois"
            data={monitoring.offersSentPerMonth}
            icon={Send}
            color="blue"
            currentLabel="ce mois-ci"
          />

          {/* Accepted offers */}
          <MetricCard
            title="Matchs (offres acceptées)"
            description="Nombre de matches obtenus (offres acceptées par les prospects) chaque mois"
            data={monitoring.acceptedOffersPerMonth}
            icon={CheckCheck}
            color="teal"
            currentLabel="ce mois-ci"
          />
        </div>
      )}
    </div>
  );
}
