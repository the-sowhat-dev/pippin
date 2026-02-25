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

      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start gap-3">
          <svg
            className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">Page en construction</p>
            <p>
              Cette page est encore en construction et peut être utilisée, mais des bugs peuvent
              apparaître. Nous travaillons dessus. Merci de votre compréhension.
            </p>
          </div>
        </div>
      </div>

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
