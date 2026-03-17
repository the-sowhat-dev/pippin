"use client";

import { useMemo, useState } from "react";
import { RefreshCw, Search } from "lucide-react";

import { LexendFont } from "@/utils/fonts";
import { HeaderWithPageOnboarding } from "@/components/dashboard/onboarding/HeaderWithPageOnboarding";
import { useArchiveOffer } from "@/hooks/useArchiveOffer";
import { OfferList } from "@/components/dashboard/match/OfferList";
import { StatusFilter } from "@/components/dashboard/match/StatusFilter";
import { OfferStatusFilterType, useGetOffers } from "@/hooks/useGetOffers";
import { PageOnboardingConfig } from "@/utils/page-onboarding-config";
import { OfferDetailsPanel } from "@/components/dashboard/match/OfferDetailsPanel";

export default function MatchPage() {
  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<OfferStatusFilterType>("accepted");

  const archiveMutation = useArchiveOffer();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useGetOffers(selectedStatus);

  const offersToDisplay = data?.pages.flatMap((page) => page.items) || [];

  const selectedOffer = useMemo(
    () => offersToDisplay.find((o) => o.offer.id === selectedOfferId) ?? null,
    [offersToDisplay, selectedOfferId],
  );

  if (isError) {
    return (
      <div className="p-8 max-w-7xl mx-auto text-center text-red-500">
        Une erreur est survenue lors du chargement des offres.
      </div>
    );
  }

  return (
    <>
      <div className="h-[calc(100vh-theme(spacing.4))] flex flex-col max-w-[1600px] mx-auto">
        <div className="px-6 pt-6 pb-4">
          <HeaderWithPageOnboarding
            storageKey={PageOnboardingConfig.match.key}
            title={PageOnboardingConfig.match.title}
            subtitle={PageOnboardingConfig.match.subtitle}
            short={PageOnboardingConfig.match.short}
            full={PageOnboardingConfig.match.full}
            action={
              <button
                onClick={() => refetch()}
                disabled={isFetching}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-md hover:bg-slate-50 disabled:opacity-50 transition-all shadow-sm">
                <RefreshCw className={`w-3.5 h-3.5 ${isFetching ? "animate-spin" : ""}`} />
                Actualiser
              </button>
            }
          />
        </div>

        {/* Main 3-column layout */}
        <div className="flex flex-1 min-h-0 border-t border-slate-200">
          {/* Column 1: Filter Status */}
          <aside className="w-64 flex-shrink-0 border-r border-slate-200 bg-slate-50/50 flex flex-col">
            <div className="p-4">
              <h2
                className={`text-sm font-semibold text-slate-900 mb-4 px-2 ${LexendFont.className}`}>
                Statut
              </h2>
              <StatusFilter
                selectedStatus={selectedStatus}
                onSelectStatus={(status) => {
                  setSelectedStatus(status);
                  setSelectedOfferId(null);
                }}
              />
            </div>
          </aside>

          {/* Column 2: Offer List */}
          <aside className="w-[400px] flex-shrink-0 border-r border-slate-200 flex flex-col bg-white">
            <OfferList
              offers={offersToDisplay}
              total={data?.pages[0]?.pagination.total || 0}
              selectedOfferId={selectedOfferId}
              onSelect={setSelectedOfferId}
              isLoading={isLoading}
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
              archiveMutation={archiveMutation}
            />
          </aside>

          {/* Column 3: Offer/Lead Details */}
          <main className="flex-1 flex flex-col bg-white min-w-0">
            {selectedOffer ? (
              <OfferDetailsPanel key={selectedOffer.lead.id} leadId={selectedOffer.lead.id} />
            ) : (
              <div className="flex-1 flex items-center justify-center text-slate-400 bg-slate-50/30">
                <div className="text-center">
                  <Search className="w-12 h-12 mx-auto mb-3 opacity-20" />
                  <p>Sélectionnez une offre pour voir les détails</p>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}
