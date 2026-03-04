import { MessageSquare } from "lucide-react";
import type { ProMonthlyQuotaResponse } from "sowhat-types";
import { LexendFont } from "@/utils/fonts";

interface QuotaCardProps {
  quota: ProMonthlyQuotaResponse | null;
}

export function QuotaCard({ quota }: QuotaCardProps) {
  return (
    <div className="mb-8 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-50 bg-gray-50/50 flex items-center gap-2">
        <MessageSquare size={20} className="text-sky-900" />
        <h3 className={`text-sky-900 ${LexendFont.className}`}>Quota mensuel d&apos;offres</h3>
      </div>
      <div className="p-6">
        {quota ? (
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <div className="flex-1 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">
                  <span className="font-semibold text-gray-900">{quota.used}</span> offre
                  {quota.used > 1 ? "s" : ""} envoyée{quota.used > 1 ? "s" : ""} sur{" "}
                  <span className="font-semibold text-gray-900">{quota.limit}</span> ce mois-ci
                </span>
                <span
                  className={`font-semibold ${quota.remaining === 0 ? "text-red-600" : "text-sky-700"}`}>
                  {quota.remaining} restante{quota.remaining > 1 ? "s" : ""}
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5">
                <div
                  className={`h-2.5 rounded-full transition-all ${
                    quota.remaining === 0
                      ? "bg-red-500"
                      : quota.remaining <= quota.limit * 0.2
                        ? "bg-amber-500"
                        : "bg-sky-500"
                  }`}
                  style={{ width: `${Math.min(100, (quota.used / quota.limit) * 100)}%` }}
                />
              </div>
            </div>
            <div className="shrink-0 text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-lg border border-gray-100">
              Renouvellement le{" "}
              <span className="font-medium text-gray-700">
                {new Date(quota.resetAt).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                })}
              </span>
            </div>
          </div>
        ) : (
          <p className="text-gray-400 text-sm">Informations de quota non disponibles.</p>
        )}
      </div>
    </div>
  );
}
