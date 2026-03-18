"use client";

import {
  LeadsResponse,
  FullLeadResponse,
  getProfessionLabel,
  getMaritalStatusLabel,
  getProjectNeedProLabel,
  getFinancialProductLabel,
  getProfessionStatusLabel,
  getHouseholdSalaryRangeLabel,
  getPersonalNetWorthRangeLabel,
  getPersonalSalaryRangeLabel,
} from "sowhat-types";
import { toast } from "sonner";
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Loader2, Heart, Info, CheckCircle2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient, InfiniteData } from "@tanstack/react-query";
import { useProQuota } from "@/hooks/useProQuota";
import { useCreateOffer } from "@/hooks/useCreateOffer";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import {
  Sheet,
  SheetTitle,
  SheetHeader,
  SheetContent,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";
import { OfferDialog } from "./OfferDialog";
import { SectionTitle } from "./SheetSectionTitle";
import { formatAmount } from "@/utils/formatAmount";
import { getLead, updateOffer, toggleLikeUser } from "../../../lib/api";
import { LexendFont } from "@/utils/fonts";
import { formatPostalCode } from "@/utils/formatPostalCode";
import { sanitizeText } from "@/utils/sanitize";
import { DetailItem } from "./DetailItem";
import { LeadIdentitySection } from "../LeadIdentitySection";
import { LeadActivitySection } from "../LeadActivitySection";
import { LeadPersonalSection } from "../LeadPersonalSection";
import { LeadFinancialSection } from "../LeadFinancialSection";
import { LeadAISummarySection } from "../LeadAISummarySection";

interface LeadDetailsSheetProps {
  leadId: string;
  trigger: React.ReactNode;
}

export function LeadDetailsSheet({ leadId, trigger }: LeadDetailsSheetProps) {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isOfferDialogOpen, setIsOfferDialogOpen] = useState(false);
  const [offerMessage, setOfferMessage] = useState("");

  // Derive open state from URL - sheet opens when leadId is in URL
  const isOpen = searchParams.get("leadId") === leadId;

  // Update URL when sheet opens/closes
  const handleOpenChange = (open: boolean) => {
    const params = new URLSearchParams(searchParams.toString());

    if (open) {
      // Add leadId to URL
      params.set("leadId", leadId);
    } else {
      // Remove leadId from URL
      params.delete("leadId");
    }

    const queryString = params.toString();
    router.replace(`${pathname}${queryString ? `?${queryString}` : ""}`, { scroll: false });
  };

  const {
    data: lead,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["lead", leadId],
    queryFn: async () => {
      const token = await getToken();
      return getLead(leadId, token);
    },
    enabled: isOpen,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const { data: quota } = useProQuota();

  const createOfferMutation = useCreateOffer();

  // Wrap the hook to add component-specific side effects
  const handleCreateOffer = (message: string) => {
    if (!lead) return;
    createOfferMutation.mutate(
      { leadUserId: lead.userId, message: sanitizeText(message), sentAt: new Date() },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["lead", leadId] });
          setIsOfferDialogOpen(false);
          toast.success("Offre créée avec succès");
        },
      },
    );
  };

  const updateMutation = useMutation({
    mutationFn: async (message: string) => {
      const token = await getToken();
      if (!lead?.offer) throw new Error("No offer to update");
      return updateOffer(lead.offer.id, { message: sanitizeText(message) }, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lead", leadId] });
      setIsOfferDialogOpen(false);
      toast.success("Offre mise à jour avec succès");
    },
  });

  const likeMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      if (!lead) throw new Error("Lead not loaded");
      const newLikedState = !lead.likedAt;
      await toggleLikeUser(lead.userId, token, newLikedState);
      return newLikedState;
    },
    onSuccess: (newLikedState) => {
      const newLikedAt = newLikedState ? new Date().toISOString() : null;

      // Update individual lead query
      queryClient.setQueryData(["lead", leadId], (oldLead: FullLeadResponse | undefined) => {
        if (!oldLead) return oldLead;
        return {
          ...oldLead,
          likedAt: newLikedAt ? new Date(newLikedAt) : null,
        };
      });

      // Update list query
      queryClient.setQueriesData<InfiniteData<LeadsResponse>>(
        { queryKey: ["pro-leads"] },
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              items: page.items.map((item) => {
                if (item.userId === leadId) {
                  return {
                    ...item,
                    likedAt: newLikedAt ? new Date(newLikedAt) : null,
                  };
                }
                return item;
              }),
            })),
          };
        },
      );
    },
  });

  const handleOfferSubmit = () => {
    if (lead?.offer) {
      updateMutation.mutate(offerMessage);
    } else {
      handleCreateOffer(offerMessage);
    }
  };

  const openOfferDialog = () => {
    if (lead?.offer) {
      setOfferMessage(lead.offer.message);
    } else {
      setOfferMessage("");
    }
    setIsOfferDialogOpen(true);
  };

  const isSubmitting = createOfferMutation.isPending || updateMutation.isPending;
  const isNewOffer = !lead?.offer;
  const isQuotaExhausted = isNewOffer && quota !== undefined && quota.remaining === 0;

  return (
    <>
      <Sheet open={isOpen} onOpenChange={handleOpenChange}>
        <SheetTrigger asChild>{trigger}</SheetTrigger>
        <SheetContent className="w-full sm:max-w-none sm:w-1/2 flex flex-col h-full p-0 gap-0">
          <div className="flex-1 overflow-y-auto p-6">
            <SheetHeader>
              <SheetTitle className={`${LexendFont.className} text-green-900 text-2xl`}>
                Détail du prospect
              </SheetTitle>
              <SheetDescription>
                Consultez les informations détaillées fournies par le prospect.
              </SheetDescription>
            </SheetHeader>

            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-green-600" />
              </div>
            ) : error ? (
              <div className="text-center py-12 text-red-500">
                Une erreur est survenue lors du chargement des détails.
              </div>
            ) : lead ? (
              <div className="mt-6 pb-20 space-y-6">
                {/* Identity Section */}
                {(lead.offer?.status === "ACCEPTED" ||
                  lead.offer?.status === "ACCEPTED_THEN_ARCHIVED_BY_USER") && (
                  <LeadIdentitySection lead={lead} />
                )}
                {/* Rejected Section */}
                {(lead.offer?.status === "REJECTED" ||
                  lead.offer?.status === "REJECTED_THEN_ARCHIVED_BY_USER") && (
                  <section className="bg-red-50/50 -mx-6 px-6 py-4 border-b border-red-100 mb-6">
                    <div className="px-0">
                      <SectionTitle>Refus de mise en relation</SectionTitle>
                    </div>
                    <div className="mt-4">
                      <p className="text-red-800 text-sm">
                        Le particulier a refusé la mise en relation.{" "}
                        {lead.offer?.rejectedReason ? (
                          <span className="font-medium">Raison : {lead.offer.rejectedReason}</span>
                        ) : (
                          <span className="italic">
                            Il n'a pas souhaité partager la raison de son refus.
                          </span>
                        )}
                      </p>
                    </div>
                  </section>
                )}

                <div className="px-6 py-4 gap-8 flex flex-col">
                  <LeadActivitySection lead={lead} />

                  <LeadPersonalSection lead={lead} />

                  <LeadFinancialSection lead={lead} />

                  <LeadAISummarySection summary={lead.aiSummary} />
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">Aucune donnée disponible.</div>
            )}

            {/* Floating Footer Overlay */}
            <div className="sticky bottom-0 p-0.5">
              <div className="p-3 bg-gray-800 border-2 border-gray-500 rounded-xl shadow-sm shadow-gray-900/50 text-white flex justify-between items-center shrink-0 z-50">
                <div className="flex gap-2 items-center flex-1 mr-4">
                  <Info className="w-4 h-4 shrink-0" />
                  <span className="text-sm">
                    {!lead?.offer ? (
                      isQuotaExhausted ? (
                        <span className="text-red-400 font-medium">
                          Quota mensuel atteint — vous ne pouvez plus envoyer d&apos;offres ce
                          mois-ci.
                        </span>
                      ) : (
                        <span>
                          Vous n&apos;avez pas encore fait d&apos;offre à ce particulier
                          {quota !== undefined && (
                            <span className="ml-1 text-gray-400">
                              ({quota.remaining} offre{quota.remaining > 1 ? "s" : ""} restante
                              {quota.remaining > 1 ? "s" : ""})
                            </span>
                          )}
                        </span>
                      )
                    ) : (
                      <>
                        {(lead.offer.status === "REJECTED" ||
                          lead.offer.status === "REJECTED_THEN_ARCHIVED_BY_USER") &&
                          "Offre rejetée par le particulier."}
                        {(lead.offer.status === "ACCEPTED" ||
                          lead.offer.status === "ACCEPTED_THEN_ARCHIVED_BY_USER") && (
                          <>
                            Mise en relation acceptée par le particulier.
                            <br />
                            Contactez-le au plus vite
                            {lead.phoneNumber && ` au ${lead.phoneNumber}`}
                            {lead.email && ` ou par email ${lead.email}`}
                          </>
                        )}
                        {lead.offer.status === "PENDING" && (
                          <>
                            En attente de réponse par le particulier
                            {lead.offer.seenByUser &&
                              ` (Vu le ${new Date(lead.offer.seenByUser).toLocaleDateString()})`}
                          </>
                        )}
                        {lead.offer.status === "ARCHIVED_BY_PRO" &&
                          "Vous avez archivé ce lead et l'offre correspondante, l'utilisateur ne verra pas votre offre si vous en avez fait une."}
                      </>
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-3 ml-auto shrink-0">
                  <Button
                    variant="outline"
                    className={`transition-colors ${
                      lead?.likedAt
                        ? "bg-green-500/20 border-green-400 text-green-500 hover:bg-transparent hover:border-white hover:text-green-500/20"
                        : "bg-transparent text-white hover:bg-green-500/20 hover:border-green-400 hover:text-green-500/20"
                    }`}
                    onClick={() => likeMutation.mutate()}
                    disabled={likeMutation.isPending || !lead}>
                    {likeMutation.isPending ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Heart className={`h-5 w-5 ${lead?.likedAt ? "fill-current" : ""}`} />
                    )}
                  </Button>
                  {(!lead?.offer || lead?.offer?.status === "PENDING") && (
                    <Button
                      className="bg-green-600 hover:bg-green-600/80 text-white font-semibold disabled:opacity-50"
                      onClick={openOfferDialog}
                      disabled={!lead || isQuotaExhausted}>
                      {lead?.offer ? "Modifier l'offre" : "Faire une offre"}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <OfferDialog
        open={isOfferDialogOpen}
        onOpenChange={setIsOfferDialogOpen}
        lead={lead ?? undefined}
        offerMessage={offerMessage}
        onOfferMessageChange={setOfferMessage}
        onSubmit={handleOfferSubmit}
        isSubmitting={isSubmitting}
      />
    </>
  );
}
