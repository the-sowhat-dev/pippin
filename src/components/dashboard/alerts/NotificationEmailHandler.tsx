"use client";

import { ProResponse } from "sowhat-types";
import { Mail, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useAuth, useUser } from "@clerk/nextjs";

import { getPro } from "@/lib/api";
import { LexendFont } from "@/utils/fonts";
import { NotificationEmailForm } from "./NotificationEmailForm";

export function NotificationEmailHandler() {
  const { getToken } = useAuth();
  const { user } = useUser();
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
    <NotificationEmailForm
      proData={proQuery.data ?? null}
      clerkEmail={clerkEmail}
      clerkId={clerkId}
    />
  );
}
