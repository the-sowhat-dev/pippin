import {
  Eye,
  Mail,
  Phone,
  XCircle,
  Loader2,
  Archive,
  CheckCircle2,
  MessageSquare,
} from "lucide-react";
import { LexendFont } from "@/utils/fonts";
import {
  OfferStatusEnum,
  getProfessionLabel,
  getMaritalStatusLabel,
  getProfessionStatusLabel,
  getProjectNeedProLabel,
  getFinancialProductLabel,
} from "sowhat-types";
import { DetailRow } from "./DetailRow";
import { TimelineItem } from "./TimelineItem";
import { formatAmount } from "@/utils/formatAmount";
import { useGetFullLead } from "@/hooks/useGetFullLead";
import { formatPostalCode } from "@/utils/formatPostalCode";
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";
import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/utils/date";

interface OfferDetailsPanelProps {
  leadId: string;
}

export const OfferDetailsPanel = ({ leadId }: OfferDetailsPanelProps) => {
  // Fetch full lead details
  const { data: fullLead, isLoading } = useGetFullLead(leadId);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-slate-200" />
      </div>
    );
  }

  if (!fullLead || !fullLead.offer) {
    return (
      <div className="flex-1 flex items-center justify-center text-red-500">
        Impossible de charger les détails du prospect.
      </div>
    );
  }

  const { offer } = fullLead;

  return (
    <div className="flex-1 h-full overflow-y-auto">
      <div className="p-6 max-w-3xl mx-auto space-y-8">
        {/* Header with Status and Contact Info (if accepted) */}
        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className={`${LexendFont.className} text-2xl text-slate-900`}>
                Détail de l&apos;offre
              </h1>
              <p className="text-sm text-slate-500 mt-1">Offre du {formatDate(offer.sentAt)}</p>
            </div>
            <span
              className={cn(
                "px-3 py-1 text-sm font-medium rounded-full border",
                offer.status === OfferStatusEnum.ACCEPTED
                  ? "bg-green-50 text-green-700 border-green-200"
                  : offer.status === OfferStatusEnum.PENDING
                    ? "bg-blue-50 text-blue-700 border-blue-200"
                    : offer.status === OfferStatusEnum.REJECTED
                      ? "bg-red-50 text-red-700 border-red-200"
                      : "bg-slate-50 text-slate-700 border-slate-200",
              )}>
              {offer.status === OfferStatusEnum.ACCEPTED && "Acceptée"}
              {offer.status === OfferStatusEnum.PENDING && "En attente"}
              {offer.status === OfferStatusEnum.REJECTED && "Refusée"}
              {(offer.status === "ARCHIVED_BY_PRO" || offer.archivedByProAt) && "Archivée"}
            </span>
          </div>

          {/* Contact Info Box - Only if accepted */}
          {offer.status === OfferStatusEnum.ACCEPTED && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-5 shadow-sm">
              <h3 className="flex items-center gap-2 text-green-800 font-semibold mb-4">
                <CheckCircle2 className="w-5 h-5" />
                Contactez le prospect
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-green-700 uppercase tracking-wider">
                    Identité
                  </p>
                  <p className="text-green-900 font-medium text-lg">
                    {fullLead.firstName} {fullLead.lastName}
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-white rounded-full text-green-600 shadow-sm">
                      <Mail className="w-4 h-4" />
                    </div>
                    <span className="text-green-900 font-medium select-all">{fullLead.email}</span>
                  </div>
                  {fullLead.phoneNumber && (
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-white rounded-full text-green-600 shadow-sm">
                        <Phone className="w-4 h-4" />
                      </div>
                      <span className="text-green-900 font-medium select-all">
                        {fullLead.phoneNumber}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="h-px bg-slate-200 w-full" />

        {/* Condensed Lead Details */}
        <section className="space-y-4">
          <h2 className={`${LexendFont.className} text-lg text-slate-800`}>Profil du prospect</h2>
          <div className="grid grid-cols-2 gap-x-8 gap-y-6">
            <DetailRow
              label="Besoin"
              value={fullLead.need ? getProjectNeedProLabel(fullLead.need) : "-"}
            />
            <DetailRow
              label="Montant initial"
              value={fullLead.initialAmount ? formatAmount(fullLead.initialAmount) : "-"}
            />
            <DetailRow
              label="Capacité mensuelle"
              value={
                fullLead.monthlyAmount ? `${formatAmount(fullLead.monthlyAmount)} / mois` : "-"
              }
            />
            <DetailRow
              label="Produit recherché"
              value={
                fullLead.financialProduct
                  ? getFinancialProductLabel(fullLead.financialProduct)
                  : "-"
              }
            />
            <DetailRow
              label="Code postal"
              value={fullLead.postalCode ? formatPostalCode(fullLead.postalCode) : "-"}
            />
            <DetailRow
              label="Profession"
              value={fullLead.profession ? getProfessionLabel(fullLead.profession) : "-"}
            />
            <DetailRow
              label="Statut pro"
              value={
                fullLead.professionStatus
                  ? getProfessionStatusLabel(fullLead.professionStatus)
                  : "-"
              }
            />
            <DetailRow
              label="Situation"
              value={fullLead.maritalStatus ? getMaritalStatusLabel(fullLead.maritalStatus) : "-"}
            />
            <DetailRow
              label="Âge"
              value={
                fullLead.birthYear ? `${new Date().getFullYear() - fullLead.birthYear} ans` : "-"
              }
            />
            <DetailRow label="Enfants" value={fullLead.childrenNumber?.toString() ?? "0"} />
          </div>
        </section>

        <div className="h-px bg-slate-200 w-full" />

        {/* Chronological Interaction Tree */}
        <section className="space-y-4 pb-12">
          <h2 className={`${LexendFont.className} text-lg text-slate-800`}>
            Historique des échanges
          </h2>
          <div className="relative pl-6 border-l-2 border-slate-100 space-y-8 ml-2">
            {/* 1. Offer Sent */}
            <TimelineItem
              icon={MessageSquare}
              date={offer.sentAt}
              title="Offre envoyée"
              isActive={true}>
              <div className="mt-2">
                {offer.message ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="h-8 text-xs">
                        Voir le message
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Message envoyé</DialogTitle>
                      </DialogHeader>
                      <div className="p-4 bg-slate-50 rounded-lg text-sm text-slate-700 italic">
                        &quot;{offer.message}&quot;
                      </div>
                    </DialogContent>
                  </Dialog>
                ) : (
                  offer.status === OfferStatusEnum.ACCEPTED && (
                    <p className="text-sm text-slate-500 italic">
                      Vous n&apos;avez envoyé aucun message, le particulier a souhaité être mis
                      directement en relation avec vous.
                    </p>
                  )
                )}
              </div>
            </TimelineItem>

            {/* 2. Seen By User */}
            {offer.seenByUser && (
              <TimelineItem
                icon={Eye}
                date={offer.seenByUser}
                title="Offre vue par le prospect"
                isActive={true}
              />
            )}

            {/* 3. Final Status */}
            {offer.status === OfferStatusEnum.ACCEPTED && (
              <TimelineItem
                icon={CheckCircle2}
                date={offer.acceptedByUserAt}
                title="Offre acceptée"
                isActive={true}
                color="text-green-600"
                bgColor="bg-green-100">
                <p className="text-sm text-slate-600">Le prospect a accepté la mise en relation.</p>
              </TimelineItem>
            )}

            {offer.status === OfferStatusEnum.REJECTED && (
              <TimelineItem
                icon={XCircle}
                date={offer.rejectedByUserAt}
                title="Offre refusée"
                isActive={true}
                color="text-red-600"
                bgColor="bg-red-100">
                {offer.rejectedReason ? (
                  <div className="mt-2 p-3 bg-red-50 text-red-800 text-sm rounded-md border border-red-100">
                    <span className="font-semibold">Raison :</span> {offer.rejectedReason}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500 italic mt-1">Aucune raison spécifiée.</p>
                )}
              </TimelineItem>
            )}

            {/* Archived by Pro */}
            {offer.archivedByProAt && (
              <TimelineItem
                icon={Archive}
                date={offer.archivedByProAt}
                title="Archivée par vous"
                isActive={true}
                color="text-slate-500"
                bgColor="bg-slate-100"
              />
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
