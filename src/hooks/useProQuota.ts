import { useQuery } from "@tanstack/react-query";
import type { ProMonthlyQuotaResponse } from "sowhat-types";

export const useProQuota = () => {
  return useQuery<ProMonthlyQuotaResponse>({
    queryKey: ["proQuota"],
    queryFn: async () => {
      const res = await fetch("/api/pro/quota");
      if (!res.ok) throw new Error("Failed to fetch quota");
      return res.json();
    },
    staleTime: 60_000,
    refetchOnWindowFocus: true,
  });
};
