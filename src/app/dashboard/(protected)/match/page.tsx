'use client';

import { useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';
import { Loader2, RefreshCw } from 'lucide-react';
import { ProCommercialOfferResponse, OfferStatusEnum } from 'sowhat-types';

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogDescription,
} from '@/components/ui/dialog';
import { getMatchingLeads } from '@/../lib/api';
import { LeadDetailsSheet } from '@/components/dashboard/screening/LeadDetailsSheet';
import { SimpleBadge } from '@/components/dashboard/SimpleBadge';
import { LeadRow, formatInscriptionDate } from '@/components/dashboard/screening/LeadRow';
import { SendIcon } from '@/components/dashboard/SendIcon';
import { HeartIcon } from '@/components/dashboard/HeartIcon';
import { LexendFont } from '@/utils/fonts';

export const formatSendDate = (createdAt: Date | string) => {
  const date = new Date(createdAt);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString().slice(-2);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `Offre envoyée le ${day}/${month}/${year} à ${hours}:${minutes}`;
};

export default function MatchPage() {
  const { getToken } = useAuth();
  const [selectedOffer, setSelectedOffer] = useState<ProCommercialOfferResponse | null>(null);

  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ['matching-leads'],
    queryFn: async () => {
      const token = await getToken();
      return getMatchingLeads(token);
    },
  });

  if (isLoading) {
    return (
      <div className="p-8 max-w-5xl mx-auto flex justify-center items-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 max-w-5xl mx-auto text-center text-red-500">
        Une erreur est survenue lors du chargement des leads.
      </div>
    );
  }

  const offeredLeads =
    data?.offers.sort((a, b) => {
      if (!a.offer || !b.offer) return 0;
      return new Date(b.offer.sentAt).getTime() - new Date(a.offer.sentAt).getTime();
    }) || [];

  const likedLeads = data?.likes || [];

  const getStatusLabel = (status: OfferStatusEnum) => {
    switch (status) {
      case OfferStatusEnum.ACCEPTED:
        return 'Acceptée';
      case OfferStatusEnum.REJECTED:
        return 'Refusée';
      case OfferStatusEnum.PENDING:
      default:
        return 'En attente de réponse';
    }
  };

  const getStatusBadgeClass = (status: OfferStatusEnum) => {
    switch (status) {
      case OfferStatusEnum.ACCEPTED:
        return 'bg-green-100 text-green-800';
      case OfferStatusEnum.REJECTED:
        return 'bg-red-100 text-red-800';
      case OfferStatusEnum.PENDING:
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-12">
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

      {/* Section 1: Commercial Offered Leads */}
      <section>
        <h2 className={`${LexendFont.className} text-2xl mb-4 text-green-800`}>
          Offres commerciales envoyées
        </h2>
        <div className="space-y-3">
          {offeredLeads.length === 0 && (
            <p className="text-gray-500 italic">Aucune offre envoyée.</p>
          )}
          {offeredLeads.map((offeredLead) => (
            <LeadRow key={offeredLead.lead.userId}>
              <LeadRow.Header>
                <div className="w-full flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {offeredLead.lead.likedAt && <HeartIcon />}
                    {offeredLead.lead.hasBeenOfferedAt && <SendIcon />}
                  </div>

                  {offeredLead.offer && (
                    <div className="flex items-center gap-2">
                      <SimpleBadge className={getStatusBadgeClass(offeredLead.offer.status)}>
                        {getStatusLabel(offeredLead.offer.status)}
                      </SimpleBadge>
                      <span className="mx-2">•</span>
                      <SimpleBadge
                        className={
                          offeredLead.offer.seenByUser
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }
                      >
                        {offeredLead.offer.seenByUser
                          ? "Vu par l'utilisateur"
                          : "Non vu par l'utilisateur"}
                      </SimpleBadge>
                      <span className="mx-2">•</span>
                      <span>{formatSendDate(offeredLead.offer.sentAt)}</span>
                    </div>
                  )}
                </div>
              </LeadRow.Header>
              <LeadRow.Content lead={offeredLead.lead} />
              <LeadRow.Footer lead={offeredLead.lead}>
                <LeadRow.Footer.Action>
                  <button
                    className="text-sm text-green-600 hover:text-green-800 font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Consulter le message"
                    onClick={() => setSelectedOffer(offeredLead.offer)}
                  >
                    Consulter le message &rarr;
                  </button>
                </LeadRow.Footer.Action>
              </LeadRow.Footer>
            </LeadRow>
          ))}
        </div>
      </section>

      {/* Section 2: Likes */}
      <section>
        <h2 className={`${LexendFont.className} text-2xl mb-4 text-green-800`}>Leads favoris</h2>
        <div className="space-y-3">
          {likedLeads.length === 0 && <p className="text-gray-500 italic">Aucun favori.</p>}
          {likedLeads.map((likedLead) => (
            <LeadRow key={likedLead.lead.userId}>
              <LeadRow.Header>
                <div className="flex justify-between items-center w-full">
                  <div className="flex items-center gap-2">
                    <HeartIcon />
                    {likedLead.lead.hasBeenOfferedAt && <SendIcon />}
                  </div>
                  <span>{formatInscriptionDate(likedLead.lead.createdAt)}</span>
                </div>
              </LeadRow.Header>
              <LeadRow.Content lead={likedLead.lead} />
              <LeadRow.Footer lead={likedLead.lead}>
                <LeadRow.Footer.Action>
                  <LeadDetailsSheet
                    leadId={likedLead.lead.userId}
                    trigger={
                      <button className="text-sm text-green-600 hover:text-green-800 font-medium ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        Voir le détail &rarr;
                      </button>
                    }
                  />
                </LeadRow.Footer.Action>
              </LeadRow.Footer>
            </LeadRow>
          ))}
        </div>
      </section>

      <Dialog open={!!selectedOffer} onOpenChange={(open) => !open && setSelectedOffer(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Message de l'offre</DialogTitle>
            <DialogDescription>
              {selectedOffer?.sentAt && formatSendDate(selectedOffer.sentAt)}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 p-4 bg-gray-50 rounded-md text-sm whitespace-pre-wrap text-gray-700">
            {selectedOffer?.message}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
