import {
  LeadResponse,
  getProjectNeedProLabel,
  getFinancialProductLabel,
  getProfessionStatusLabel,
} from "sowhat-types";
import { ReactNode } from "react";
import { Info, Heart, Send, MapPin, Briefcase, User, Clock, Mail, Handshake } from "lucide-react";

import { SimpleBadge } from "../SimpleBadge";
import { formatAmount } from "@/utils/formatAmount";
import { calculateAge, formatInscriptionDate } from "@/utils/date";

interface LeadRowProps {
  lead: LeadResponse;
  action?: ReactNode;
  extraHeaderContent?: ReactNode;
}

export const LeadRow = ({ lead, action, extraHeaderContent }: LeadRowProps) => {
  const isOutsideFrance = lead.postalCode === "LIVES_OUTSIDE_FRANCE";
  const postalCodeLabel = isOutsideFrance
    ? "Ne réside pas en France"
    : lead.postalCode || "Non renseigné";

  const productsOwnedLabel = !lead.financialProductsOwned
    ? "Non renseigné"
    : lead.financialProductsOwned.length === 0
      ? "Aucun produit"
      : lead.financialProductsOwned.map((p) => getFinancialProductLabel(p)).join(", ");

  return (
    <div className="group bg-white rounded-xl border border-gray-100 hover:border-green-800/40 hover:shadow-md transition-all duration-200 p-5 mb-3 relative overflow-hidden">
      {/* Header Row: ID, Dates, Status Icons */}
      <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-sm font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
            <Info className="w-3.5 h-3.5 text-green-800/60" />
            <span className="tracking-wide text-green-800/60">
              {lead.userId.substring(0, 7).toUpperCase()}
            </span>
          </div>
          <span className="text-sm text-gray-400 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {formatInscriptionDate(lead.createdAt)}
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap justify-end">{extraHeaderContent}</div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left Column: Key Financial Info (4 cols) */}
        <div className="md:col-span-4 space-y-4">
          <div>
            <span className="text-sm text-gray-400 font-medium">Montant initial à investir</span>
            <div className="text-2xl font-bold text-green-700 mt-1">
              {formatAmount(lead.initialAmount || 0)}
            </div>
          </div>

          <div>
            <span className="text-sm text-gray-400 font-medium block mb-1.5">Besoin principal</span>

            <span className="text-green-800">
              {" "}
              {lead.need ? getProjectNeedProLabel(lead.need) : "Non renseigné"}
            </span>
          </div>
        </div>

        {/* Middle Column: Products & Targets (4 cols) */}
        <div className="md:col-span-4 space-y-4">
          <div>
            <span className="text-sm text-gray-400 font-medium block mb-1.5">
              Produit recherché
            </span>
            <SimpleBadge
              className={`${lead.financialProduct ? "bg-blue-50 text-blue-700 border-blue-100" : "bg-gray-50 text-gray-500"} w-fit max-w-full flex items-center gap-1.5 py-1`}>
              <span className="truncate">
                {lead.financialProduct
                  ? getFinancialProductLabel(lead.financialProduct)
                  : "Non renseigné"}
              </span>
            </SimpleBadge>
          </div>

          <div>
            <span className="text-sm text-gray-400 font-medium block mb-1.5">Produits détenus</span>
            <div className="text-sm text-gray-600 flex items-start gap-2">
              <span className="line-clamp-2 leading-relaxed">{productsOwnedLabel}</span>
            </div>
          </div>
        </div>

        {/* Right Column: User Profile Details (4 cols) */}
        <div className="md:col-span-4 space-y-3 bg-gray-50/50 rounded-lg p-3 border border-gray-100/50">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Briefcase className="w-4 h-4 text-gray-400 shrink-0" />
            <div className="flex flex-col">
              <span className="text-sm text-gray-400">Statut professionnel</span>
              <span className="font-medium">
                {lead.professionStatus
                  ? getProfessionStatusLabel(lead.professionStatus)
                  : "Non renseigné"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
            <div className="flex flex-col">
              <span className="text-sm text-gray-400">Code postal</span>
              <span>{postalCodeLabel}</span>
            </div>
          </div>

          {lead.birthYear && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <User className="w-4 h-4 text-gray-400 shrink-0" />
              <div className="flex flex-col">
                <span className="text-sm text-gray-400">Âge</span>
                <span>{calculateAge(lead.birthYear)} ans</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Area */}
      <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
        {/* Interactions */}
        <div className="flex items-center gap-2 flex-1">
          {lead.likedAt && (
            <div
              className="flex items-center gap-1.5 bg-red-50 text-red-700 px-2 py-1 rounded-md text-xs font-medium border border-red-100"
              title="Vous avez mis ce lead en favori">
              <Heart className="w-4 h-4 text-red-500/50 fill-current" />
            </div>
          )}

          {lead.hasBeenOfferedAt && (
            <div
              className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs font-medium border border-blue-100"
              title="Vous avez envoyé une offre à ce lead">
              <Send className="w-4 h-4 text-blue-500" />
              <span>Message envoyé</span>
            </div>
          )}

          <div
            className="flex items-center gap-1.5 bg-amber-50 text-amber-800 px-2 py-1 rounded-md text-xs font-medium border border-amber-100"
            title="Nombre de messages reçus par le lead">
            <Mail className="w-4 h-4 text-amber-500" />
            <span>
              {lead.totalOffersReceived} Message
              {lead.totalOffersReceived > 1 ? "s reçus" : " reçu"}
            </span>
          </div>

          <div
            className="flex items-center gap-1.5 bg-green-50 text-green-700 px-2 py-1 rounded-md text-xs font-medium border border-green-100"
            title="Nombre d'offres acceptées par le lead">
            <Handshake className="w-4 h-4 text-green-500" />
            <span>
              {lead.totalOffersAccepted} Offre
              {lead.totalOffersAccepted > 1 ? "s acceptées" : " acceptée"}
            </span>
          </div>
        </div>

        <div className="flex items-center">{action}</div>
      </div>
    </div>
  );
};
