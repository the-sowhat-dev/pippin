import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

import { AlertsClient } from '@/components/dashboard/alerts/AlertsClient';

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

      <Suspense
        fallback={
          <div className="flex justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-gray-300" />
          </div>
        }
      >
        <AlertsClient />
      </Suspense>
    </div>
  );
}
