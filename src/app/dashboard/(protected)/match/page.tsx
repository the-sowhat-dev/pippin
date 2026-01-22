'use client';

import { useMemo } from 'react';
import { toast } from 'sonner';
import { useAuth } from '@clerk/nextjs';
import { OfferStatusEnum } from 'sowhat-types';
import { Loader2, RefreshCw } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { LexendFont } from '@/utils/fonts';
import { sortOffersByStatus } from '@/utils/sortOffers';
import { getMatchingLeads, updateOffer } from '@/../lib/api';
import { OfferSection } from '@/components/dashboard/match/OfferSection';
import { LikedLeadCard } from '@/components/dashboard/screening/LikedLeadCard';
import { LeadDetailsSheet } from '@/components/dashboard/screening/LeadDetailsSheet';

export default function MatchPage() {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ['matching-leads'],
    queryFn: async () => {
      const token = await getToken();
      return getMatchingLeads(token);
    },
  });

  const archiveMutation = useMutation({
    mutationFn: async ({ offerId }: { offerId: string }) => {
      const token = await getToken();
      return updateOffer(
        {
          id: offerId,
          status: OfferStatusEnum.ARCHIVED_BY_PRO,
        },
        token
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['matching-leads'] });
      toast.success('Lead archivé avec succès');
    },
    onError: () => {
      toast.error("Erreur lors de l'archivage du lead");
    },
  });

  // Pre-sort offers by status
  const { acceptedLeads, pendingLeads, rejectedLeads, archivedLeads, likedLeads } = useMemo(
    () => sortOffersByStatus(data),
    [data]
  );

  if (isLoading) {
    return (
      <div className="p-8 max-w-7xl mx-auto flex justify-center items-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 max-w-7xl mx-auto text-center text-red-500">
        Une erreur est survenue lors du chargement des leads.
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <header className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Match</h1>
          <p className="text-gray-500 mt-2">Gérez vos offres et vos favoris.</p>
        </div>
        <button
          onClick={() => refetch()}
          disabled={isFetching}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${isFetching ? 'animate-spin' : ''}`} />
          Rafraichir
        </button>
      </header>

      {/* Accepted Offers Section */}
      <OfferSection
        title="Offres acceptées"
        subtitle="Les utilisateurs ont accepté votre offre - contactez-les rapidement"
        leads={acceptedLeads}
        archiveMutation={archiveMutation}
        color="green"
      />

      {/* Pending Offers Section */}
      <OfferSection
        title="Offres en attente"
        subtitle="En attente de réponse des utilisateurs"
        leads={pendingLeads}
        archiveMutation={archiveMutation}
        color="blue"
      />

      {/* Rejected Offers Section */}
      <OfferSection
        title="Offres refusées"
        subtitle="Les utilisateurs ont décliné votre offre"
        leads={rejectedLeads}
        archiveMutation={archiveMutation}
        color="red"
      />

      {/* Archived Offers Section */}
      <OfferSection
        title="Offres archivées"
        subtitle="Offres que vous avez archivées"
        leads={archivedLeads}
        archiveMutation={archiveMutation}
        color="gray"
      />

      <div className="h-px bg-green-700/20" />

      {/* Liked Leads Section */}
      <section>
        <h2 className={`${LexendFont.className} text-2xl mb-2 text-green-800`}>Leads favoris</h2>
        <p className="text-sm text-gray-500 mb-4">
          Les leads que vous avez ajoutés à vos favoris
        </p>
        {likedLeads.length === 0 ? (
          <p className="text-gray-500 italic">Aucun favori.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {likedLeads.map((likedLead, index) => (
              <LikedLeadCard
                key={`liked_lead_card_${index}`}
                lead={likedLead.lead}
                action={<LeadDetailsSheet
                  key={`user_lead_details_sheet_${index}`}
                  leadId={likedLead.lead.userId}
                  trigger={
                    <button className="cursor-pointer text-sm text-green-600 flex-1 hover:text-green-800 font-medium  transition-opacity items-center gap-1">
                      Voir le détail <span aria-hidden="true">&rarr;</span>
                    </button>
                  }
                />} />

            ))}
          </div>
        )}
      </section>
    </div>
  );
}


