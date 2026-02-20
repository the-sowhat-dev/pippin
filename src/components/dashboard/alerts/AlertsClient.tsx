'use client';

import { useState, useEffect } from 'react';
import { useAuth, useUser } from '@clerk/nextjs';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Mail, Bell, Plus, Loader2, Info } from 'lucide-react';
import { EMAIL_REGEX, ProLeadsAlertResponse, UpdateProInput } from 'sowhat-types';
import { toast } from 'sonner';

import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { LexendFont } from '@/utils/fonts';
import { getAlerts, getPro, updatePro } from '@/lib/api';
import { AlertCard } from './AlertCard';

type ProWithEmail = {
  id: string;
  clerkId: string;
  notificationEmail?: string | null;
  [key: string]: unknown;
};

export function AlertsClient() {
  const { getToken } = useAuth();
  const { user } = useUser();
  const queryClient = useQueryClient();

  const clerkEmail = user?.emailAddresses[0]?.emailAddress ?? '';
  const clerkId = user?.id ?? '';

  // ── Queries ──────────────────────────────────────────────────────────────

  const proQuery = useQuery({
    queryKey: ['pro'],
    queryFn: async () => {
      const token = await getToken();
      return getPro(token) as Promise<ProWithEmail | null>;
    },
    enabled: !!clerkId,
  });

  const alertsQuery = useQuery({
    queryKey: ['pro-alerts'],
    queryFn: async () => {
      const token = await getToken();
      return getAlerts(token);
    },
    enabled: !!clerkId,
  });

  const proData = proQuery.data;
  const alerts: ProLeadsAlertResponse[] = alertsQuery.data ?? [];
  const [creatingNew, setCreatingNew] = useState(false);

  // ── Email state ───────────────────────────────────────────────────────────

  const savedNotifEmail = proData?.notificationEmail ?? null;
  const isUsingClerkEmail =
    !savedNotifEmail || savedNotifEmail === clerkEmail;

  const [useClerkEmail, setUseClerkEmail] = useState(isUsingClerkEmail);
  const [emailInput, setEmailInput] = useState(
    savedNotifEmail && savedNotifEmail !== clerkEmail ? savedNotifEmail : ''
  );

  // Sync state when pro data loads
  useEffect(() => {
    if (proData) {
      const email = proData.notificationEmail ?? null;
      const usingClerk = !email || email === clerkEmail;
      setUseClerkEmail(usingClerk);
      setEmailInput(email && email !== clerkEmail ? email : '');
    }
  }, [proData, clerkEmail]);

  const isEmailValid = EMAIL_REGEX.test(emailInput);
  const currentDisplayEmail = useClerkEmail ? clerkEmail : emailInput;
  const savedEmail = proData?.notificationEmail;
  const isEmailDirty = !useClerkEmail && isEmailValid && emailInput !== savedEmail;

  // ── Email mutations ───────────────────────────────────────────────────────

  const updateEmailMutation = useMutation({
    mutationFn: async (email: string | null) => {
      const token = await getToken();
      const input: UpdateProInput = { clerkId, notificationEmail: email };
      return updatePro(input, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pro'] });
      toast.success('Email de notification mis à jour');
    },
    onError: () => {
      toast.error("Erreur lors de la mise à jour de l'email");
    },
  });

  const handleSwitchChange = (checked: boolean) => {
    setUseClerkEmail(checked);
    if (checked) {
      // Immediately update the backend with clerk email
      updateEmailMutation.mutate(clerkEmail);
    }
  };

  const handleSaveCustomEmail = () => {
    if (isEmailValid) {
      updateEmailMutation.mutate(emailInput);
    }
  };

  // ── Alert callbacks ───────────────────────────────────────────────────────

  const handleAlertSaved = (saved: ProLeadsAlertResponse) => {
    setCreatingNew(false);
    queryClient.invalidateQueries({ queryKey: ['pro-alerts'] });
  };

  const handleAlertDeleted = () => {
    queryClient.invalidateQueries({ queryKey: ['pro-alerts'] });
  };

  // ── Loading state ─────────────────────────────────────────────────────────

  const isLoading = proQuery.isLoading || alertsQuery.isLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-gray-300" />
      </div>
    );
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-8">
      {/* Info banner */}
      <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 text-sm text-blue-700">
        <Info className="w-4 h-4 mt-0.5 shrink-0" />
        <p>
          Les emails d&apos;alertes seront envoyés à l&apos;email indiqué ci-dessous vers 9h du
          matin toutes les semaines lorsque une ou plusieurs alertes sont actives.
        </p>
      </div>

      {/* Notification email section */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-50 bg-gray-50/50 flex items-center gap-2">
          <Mail size={18} className="text-green-900" />
          <h3 className={`text-green-900 text-sm ${LexendFont.className}`}>
            Email de notification
          </h3>
        </div>

        <div className="p-6 space-y-5">
          <p className="text-sm text-gray-500">
            Cet email sera utilisé pour vous envoyer des alertes. Il peut être différent de
            votre email lié à votre compte.
          </p>

          {/* Switch */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700">
                Utiliser mon email de compte
              </p>
              <p className="text-xs text-gray-400 mt-0.5">{clerkEmail}</p>
            </div>
            <Switch
              checked={useClerkEmail}
              onCheckedChange={handleSwitchChange}
              disabled={updateEmailMutation.isPending}
            />
          </div>

          {/* Custom email input */}
          {!useClerkEmail && (
            <div className="space-y-3 pt-2 border-t border-gray-50">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Email personnalisé
                </label>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="votre@email.com"
                    className={`flex-1 h-9 px-3 text-sm rounded-md border transition-colors outline-none focus:ring-2 focus:ring-[#35C055]/20 ${
                      emailInput && !isEmailValid
                        ? 'border-red-300 bg-red-50'
                        : 'border-gray-200 bg-white focus:border-[#35C055]'
                    }`}
                  />
                  <Button
                    size="sm"
                    onClick={handleSaveCustomEmail}
                    disabled={
                      !isEmailDirty || !isEmailValid || updateEmailMutation.isPending
                    }
                    className="bg-[#35C055] hover:bg-[#35C055]/80 text-white h-9 px-4 text-xs"
                  >
                    {updateEmailMutation.isPending ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      'Sauvegarder'
                    )}
                  </Button>
                </div>
                {emailInput && !isEmailValid && (
                  <p className="text-xs text-red-500">Format d&apos;email invalide</p>
                )}
              </div>
            </div>
          )}

          {/* Current email preview (when using clerk email) */}
          {useClerkEmail && currentDisplayEmail && (
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-md border border-gray-100">
              <Mail className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-sm text-gray-600">{currentDisplayEmail}</span>
            </div>
          )}
        </div>
      </div>

      {/* Alerts section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Bell size={18} className="text-green-900" />
            <h3 className={`text-green-900 text-sm ${LexendFont.className}`}>
              Mes alertes
            </h3>
            {alerts.length > 0 && (
              <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                {alerts.length}/2
              </span>
            )}
          </div>
          {alerts.length < 2 && alerts.length > 0 && !creatingNew && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => setCreatingNew(true)}
              className="gap-1.5 text-xs h-7 border-gray-200 hover:border-[#35C055] hover:text-[#35C055]"
            >
              <Plus className="w-3.5 h-3.5" />
              Ajouter une alerte
            </Button>
          )}
        </div>

        {/* Empty state */}
        {alerts.length === 0 && !creatingNew && (
          <button
            onClick={() => setCreatingNew(true)}
            className="w-full rounded-xl border-2 border-dashed border-gray-200 bg-white hover:border-[#35C055] hover:bg-green-50/30 transition-all group py-16 px-8 text-center"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gray-100 group-hover:bg-[#35C055]/10 flex items-center justify-center transition-colors">
                <Plus className="w-6 h-6 text-gray-400 group-hover:text-[#35C055] transition-colors" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700 group-hover:text-gray-900">
                  Créer votre première alerte
                </p>
                <p className="text-xs text-gray-400 mt-1 max-w-xs mx-auto">
                  Configurez vos critères de recherche et recevez un email hebdomadaire lorsque
                  de nouveaux profils correspondent.
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
