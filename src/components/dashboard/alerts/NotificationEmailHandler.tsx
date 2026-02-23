"use client";

import { useState, useEffect } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Mail, Loader2 } from "lucide-react";
import { EMAIL_REGEX, ProResponse, UpdateProInput } from "sowhat-types";
import { toast } from "sonner";

import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { LexendFont } from "@/utils/fonts";
import { getPro, updatePro } from "@/lib/api";

export function NotificationEmailHandler() {
  const { getToken } = useAuth();
  const { user } = useUser();
  const queryClient = useQueryClient();

  const clerkEmail = user?.emailAddresses[0]?.emailAddress ?? "";
  const clerkId = user?.id ?? "";

  const proQuery = useQuery({
    queryKey: ["pro"],
    queryFn: async () => {
      const token = await getToken();
      return getPro(token) as Promise<ProResponse | null>;
    },
    enabled: !!clerkId,
  });

  const proData = proQuery.data;

  const savedNotifEmail = proData?.notificationEmail ?? null;
  const isUsingClerkEmail = !savedNotifEmail || savedNotifEmail === clerkEmail;

  const [useClerkEmail, setUseClerkEmail] = useState(isUsingClerkEmail);
  const [emailInput, setEmailInput] = useState(
    savedNotifEmail && savedNotifEmail !== clerkEmail ? savedNotifEmail : "",
  );

  // Sync state when pro data loads
  useEffect(() => {
    if (proData) {
      const email = proData.notificationEmail ?? null;
      const usingClerk = !email || email === clerkEmail;
      setUseClerkEmail(usingClerk);
      setEmailInput(email && email !== clerkEmail ? email : "");
    }
  }, [proData, clerkEmail]);

  const isEmailValid = EMAIL_REGEX.test(emailInput);
  const currentDisplayEmail = useClerkEmail ? clerkEmail : emailInput;
  const savedEmail = proData?.notificationEmail;
  const isEmailDirty = !useClerkEmail && isEmailValid && emailInput !== savedEmail;

  const updateEmailMutation = useMutation({
    mutationFn: async (email: string | null) => {
      const token = await getToken();
      console.log("email", email);
      const input: UpdateProInput = { clerkId, notificationEmail: email };
      return updatePro(input, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pro"] });
      toast.success("Email de notification mis à jour");
    },
    onError: () => {
      toast.error("Erreur lors de la mise à jour de l'email");
    },
  });

  const handleSwitchChange = (checked: boolean) => {
    setUseClerkEmail(checked);
    if (checked) {
      updateEmailMutation.mutate(clerkEmail);
    }
  };

  const handleSaveCustomEmail = () => {
    if (isEmailValid) {
      updateEmailMutation.mutate(emailInput);
    }
  };

  if (proQuery.isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-50 bg-gray-50/50 flex items-center gap-2">
          <Mail size={20} className="text-green-900" />
          <h3 className={`text-green-900 ${LexendFont.className}`}>Email de notification</h3>
        </div>
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-gray-300" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-50 bg-gray-50/50 flex items-center gap-2">
        <Mail size={20} className="text-green-900" />
        <h3 className={`text-green-900 ${LexendFont.className}`}>Email de notification</h3>
      </div>

      <div className="p-6 space-y-5">
        <p className="text-sm text-gray-500">
          Cet email sera utilisé pour vous envoyer des alertes. Il peut être différent de votre
          email lié à votre compte.
        </p>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-700">Utiliser mon email de compte</p>
            <p className="text-xs text-gray-400 mt-0.5">{clerkEmail}</p>
          </div>
          <Switch
            checked={useClerkEmail}
            onCheckedChange={handleSwitchChange}
            disabled={updateEmailMutation.isPending}
            className="data-[state=checked]:bg-green-500"
          />
        </div>

        {!useClerkEmail && (
          <div className="space-y-3 pt-2 border-t border-gray-50">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-500 ml-2">Email personnalisé</label>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="votre@email.com"
                  className={`flex-1 h-9 px-3 text-sm rounded-md border transition-colors outline-none focus:ring-2 focus:ring-[#35C055]/20 ${
                    emailInput && !isEmailValid
                      ? "border-red-300 bg-red-50"
                      : "border-gray-200 bg-white focus:border-[#35C055]"
                  }`}
                />
                <Button
                  size="sm"
                  onClick={handleSaveCustomEmail}
                  disabled={!isEmailDirty || !isEmailValid || updateEmailMutation.isPending}
                  className="bg-[#35C055] hover:bg-[#35C055]/80 text-white h-9 px-4 text-xs">
                  {updateEmailMutation.isPending ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    "Sauvegarder"
                  )}
                </Button>
              </div>
              {emailInput && !isEmailValid && (
                <p className="text-xs text-red-500">Format d&apos;email invalide</p>
              )}
            </div>
          </div>
        )}

        {useClerkEmail && currentDisplayEmail && (
          <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-md border border-gray-100">
            <Mail className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-sm text-gray-600">{currentDisplayEmail}</span>
          </div>
        )}
      </div>
    </div>
  );
}
