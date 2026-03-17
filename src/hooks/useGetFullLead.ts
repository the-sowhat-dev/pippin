import { getLead } from "@/lib/api";
import { useAuth } from "@clerk/nextjs";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { FullLeadResponse } from "sowhat-types";

export type UseGetFullLeadQuery = UseQueryResult<FullLeadResponse | null, Error>;

export const useGetFullLead = (userId: string): UseGetFullLeadQuery => {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: ["lead", userId],
    queryFn: async () => {
      const token = await getToken();
      return getLead(userId, token);
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
