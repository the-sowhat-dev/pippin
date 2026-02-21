"use client";

import { useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Bell, Plus, Loader2 } from "lucide-react";
import { ProLeadsAlertResponse } from "sowhat-types";

import { Button } from "@/components/ui/button";
import { LexendFont } from "@/utils/fonts";
import { getAlerts } from "@/lib/api";
import { AlertCard } from "./AlertCard";

export function AlertsClient() {
  const { getToken } = useAuth();
  const { user } = useUser();
  const queryClient = useQueryClient();

  const clerkId = user?.id ?? "";

  const alertsQuery = useQuery({
    queryKey: ["pro-alerts"],
    queryFn: async () => {
      const token = await getToken();
      return getAlerts(token);
    },
    enabled: !!clerkId,
  });

  const alerts: ProLeadsAlertResponse[] = alertsQuery.data ?? [];
  const [creatingNew, setCreatingNew] = useState(false);

  const handleAlertSaved = (saved: ProLeadsAlertResponse) => {
    setCreatingNew(false);
    queryClient.invalidateQueries({ queryKey: ["pro-alerts"] });
  };

  const handleAlertDeleted = () => {
    queryClient.invalidateQueries({ queryKey: ["pro-alerts"] });
  };

  if (alertsQuery.isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-gray-300" />
      </div>
    );
  }

  return (
    <div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        <div className="p-4 border-b border-gray-50 bg-gray-50/50 flex items-center gap-2">
          <Bell size={20} className="text-green-900" />
          <h3 className={`text-green-900 ${LexendFont.className}`}>Mes alertes</h3>
        </div>

        <div className="p-6 space-y-5">
          <p className="text-sm text-gray-500">
            Les emails d&apos;alertes seront envoyés à l&apos;email indiqué ci-dessous vers 9h du
            matin toutes les semaines lorsque une ou plusieurs alertes sont actives.
          </p>
        </div>
      </div>

      <div>
        {alerts.length < 2 && alerts.length > 0 && !creatingNew && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => setCreatingNew(true)}
            className="gap-1.5 text-xs h-7 border-gray-200 hover:border-[#35C055] hover:text-[#35C055]">
            <Plus className="w-3.5 h-3.5" />
            Ajouter une alerte
          </Button>
        )}

        {/* Empty state */}
        {alerts.length === 0 && !creatingNew && (
          <button
            onClick={() => setCreatingNew(true)}
            className="w-full rounded-xl border-2 border-dashed border-gray-200 bg-white hover:border-[#35C055] hover:bg-green-50/30 transition-all group py-16 px-8 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gray-100 group-hover:bg-[#35C055]/10 flex items-center justify-center transition-colors">
                <Plus className="w-6 h-6 text-gray-400 group-hover:text-[#35C055] transition-colors" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700 group-hover:text-gray-900">
                  Créer votre première alerte
                </p>
                <p className="text-xs text-gray-400 mt-1 max-w-xs mx-auto">
                  Configurez vos critères de recherche et recevez un email hebdomadaire lorsque de
                  nouveaux profils correspondent.
                </p>
              </div>
            </div>
          </button>
        )}

        {/* Alert cards */}
        <div className="space-y-4">
          {alerts.map((alert) => (
            <AlertCard
              key={alert.id}
              alert={alert}
              defaultName={alert.name}
              onSaved={handleAlertSaved}
              onDeleted={handleAlertDeleted}
            />
          ))}

          {/* New alert form */}
          {creatingNew && (
            <AlertCard
              alert={null}
              defaultName={`Alerte ${alerts.length + 1}`}
              onSaved={handleAlertSaved}
              onDeleted={handleAlertDeleted}
              onCancel={() => setCreatingNew(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
