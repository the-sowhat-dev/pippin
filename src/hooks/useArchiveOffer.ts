import { updateOffer } from "@/lib/api";
import { useAuth } from "@clerk/nextjs";
import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ProCommercialOfferResponse } from "sowhat-types";

export type UseArchiveOfferMutation = UseMutationResult<
  ProCommercialOfferResponse,
  Error,
  { offerId: string; archive: boolean },
  unknown
>;

export const useArchiveOffer = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ offerId, archive }: { offerId: string; archive: boolean }) => {
      const token = await getToken();
      return updateOffer(offerId, { archivedByProAt: archive ? new Date() : null }, token);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["pro-offers"] });
      queryClient.invalidateQueries({ queryKey: ["lead"] }); // Invalidate details panel if open
      toast.success(variables.archive ? "Offre archivée" : "Offre désarchivée");
    },
    onError: () => {
      toast.error("Une erreur est survenue");
    },
  });
};
