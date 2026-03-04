import { CreditCard } from "lucide-react";
import { LexendFont } from "@/utils/fonts";

export function SubscriptionSection() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-50 bg-gray-50/50 flex items-center gap-2">
        <CreditCard size={20} className="text-green-900" />
        <h3 className={`text-green-900 ${LexendFont.className}`}>Abonnement</h3>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-2">
              Promotion lancement
            </span>
            <p className="text-gray-900 font-medium bg-gray-50 px-2 py-1 border border-gray-200 rounded text-sm w-fit">
              0€ / mois
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-2">
              Engagement
            </span>
            <p className="text-gray-900 font-medium bg-gray-50 px-2 py-1 border border-gray-200 rounded text-sm w-fit">
              1 mois
            </p>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-gray-50 space-y-1">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-2">
            Crédits
          </span>
          <p className="text-gray-900 font-medium bg-gray-50 px-2 py-1 border border-gray-200 rounded text-sm w-fit">
            100 / mois
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Nombre de messages pouvant être envoyés aux utilisateurs de l'application.
          </p>
        </div>
      </div>
    </div>
  );
}
