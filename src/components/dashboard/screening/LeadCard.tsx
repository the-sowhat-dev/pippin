'use client';

import {
  getFinancialProductLabel,
  getProjectNeedProLabel,
  OfferStatusEnum,
  ProCommercialOfferResponse,
  LeadResponse,
} from 'sowhat-types';
import { ReactNode } from 'react';
import { formatAmount } from '@/utils/formatAmount';
import { calculateDaysSinceInscription } from '@/utils/date';
import { Heart, Send, Badge, Archive, Clock, Info } from 'lucide-react';
import { SimpleBadge } from '../SimpleBadge';
import { Button } from '@/components/ui/button';

interface LeadCardProps {
  lead: LeadResponse;
  onDetail: ReactNode;
  offer: ProCommercialOfferResponse;
  onArchive?: () => void;
  isArchiving: boolean;
}

const formatSentAtDate = (sentAt: Date | string) => {
  const date = new Date(sentAt);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `Offre envoyée le ${day}/${month}/${year} à ${hours}:${minutes}`;
};

export const LeadCard = ({ lead, offer, onArchive, isArchiving, onDetail }: LeadCardProps) => {
  const productsOwnedLabel = !lead.financialProductsOwned
    ? 'Non renseigné'
    : lead.financialProductsOwned.length === 0
      ? 'Aucun produit'
      : lead.financialProductsOwned.map((p) => getFinancialProductLabel(p)).join(', ');

  const daysSinceInscription = calculateDaysSinceInscription(lead.createdAt);

  return (
    <div className="group bg-white rounded-lg border border-gray-200 hover:border-green-600 hover:shadow-lg transition-all duration-200 flex flex-col h-full min-w-[280px] max-w-[320px]">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-green-800/60 text-sm font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
            <Info className="w-3.5 h-3.5" />
            <span className="tracking-wide">
              {lead.userId.substring(0, 7).toUpperCase()}
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Clock className="w-3 h-3" />
            <span>{daysSinceInscription}j</span>
          </div>
        </div>

        {offer && (
          <div className="text-xs text-gray-600">
            {formatSentAtDate(offer.sentAt)}
          </div>
        )}

        {/* Status-specific header content */}
        {offer && (
          <div className="mt-2">
            {(offer.status === OfferStatusEnum.ACCEPTED ||
              offer.status === OfferStatusEnum.ACCEPTED_THEN_ARCHIVED_BY_USER) && (
                <SimpleBadge className="bg-green-100 text-green-800 text-xs font-medium">
                  Identité disponible
                </SimpleBadge>
              )}

            {offer.status === OfferStatusEnum.PENDING && (
              <SimpleBadge
                className={`text-xs font-medium ${offer.seenByUser
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-600'
                  }`}
              >
                {offer.seenByUser ? "Vu par l'utilisateur" : "Non vu"}
              </SimpleBadge>
            )}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-4 space-y-3 flex-1">
        <div>
          <span className="text-xs text-gray-500 font-medium">Montant initial à investir</span>
          <div className="text-xl font-bold text-green-700 mt-0.5">
            {formatAmount(lead.initialAmount || 0)}
          </div>
        </div>

        <div>
          <span className="text-xs text-gray-500 font-medium block mb-1">Besoin principal</span>
          <span className="text-sm text-green-800 font-medium">
            {lead.need ? getProjectNeedProLabel(lead.need) : 'Non renseigné'}
          </span>
        </div>

        <div>
          <span className="text-xs text-gray-500 font-medium block mb-1">Produit recherché</span>
          <SimpleBadge
            className={`${lead.financialProduct
              ? 'bg-blue-50 text-blue-700 border border-blue-100'
              : 'bg-gray-50 text-gray-500'
              } text-xs w-fit`}
          >
            {lead.financialProduct
              ? getFinancialProductLabel(lead.financialProduct)
              : 'Non renseigné'}
          </SimpleBadge>
        </div>

        <div>
          <span className="text-xs text-gray-500 font-medium block mb-1">Produits détenus</span>
          <div className="text-xs text-gray-600 line-clamp-2">{productsOwnedLabel}</div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100 space-y-3">
        {/* Icons row */}
        <div className="flex items-center gap-2">
          {lead.likedAt && (
            <div
              className="bg-red-50 p-1.5 rounded-md border border-red-100"
              title="Vous avez mis ce lead en favori"
            >
              <Heart className="w-3.5 h-3.5 text-red-500 fill-current" />
            </div>
          )}
          {lead.hasBeenOfferedAt && (
            <div
              className="bg-blue-50 p-1.5 rounded-md border border-blue-100"
              title="Vous avez envoyé une offre à ce lead"
            >
              <Send className="w-3.5 h-3.5 text-blue-500" />
            </div>
          )}
          <div
            className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-1 rounded-md text-xs font-medium border border-amber-100"
            title="Nombre d'offres reçues par le lead"
          >
            <Badge className="w-3 h-3" />
            <span>{lead.totalOffersReceived}</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 justify-between">
          {onArchive && (
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={(e) => {
                e.stopPropagation();
                onArchive();
              }}
              disabled={isArchiving}
            >
              <Archive className="w-3.5 h-3.5 mr-1" />
              Archiver
            </Button>
          )}

          <div className="flex-1 flex justify-end items-center gap-2">{onDetail}</div>
        </div>
      </div>
    </div>
  );
};