import { Suspense } from "react";

import { AlertsClient } from "@/components/dashboard/alerts/AlertsClient";
import { AlertsSkeleton } from "@/components/dashboard/alerts/AlertsSkeleton";
import { NotificationEmailHandler } from "@/components/dashboard/alerts/NotificationEmailHandler";
import { NotificationEmailSkeleton } from "@/components/dashboard/alerts/NotificationEmailSkeleton";

export default function Page() {
  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto">
      <header className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Alertes</h1>
        <p className="text-gray-500 mt-2">
          Enregistrez vos critères de recherche pour recevoir des alertes lorsque des profils
          qualifiés sont disponibles.
        </p>
      </header>

      <div className="space-y-8">
        <Suspense fallback={<NotificationEmailSkeleton />}>
          <NotificationEmailHandler />
        </Suspense>

        <Suspense fallback={<AlertsSkeleton />}>
          <AlertsClient />
        </Suspense>
      </div>
    </div>
  );
}
