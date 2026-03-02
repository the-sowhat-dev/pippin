"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import type { CreateCommercialOfferInput } from "sowhat-types";
import { createOffer } from "@/lib/api";

export const useCreateOffer = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateCommercialOfferInput) => {
      const token = await getToken();
      return createOffer(payload, token);
    },

    // Always re-sync quota from the backend after a create attempt,
    // whether it succeeded or failed. Backend is the sole source of truth.
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["proQuota"] });
    },
  });
};
