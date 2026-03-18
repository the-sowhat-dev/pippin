import {
  Eye,
  Mail,
  Phone,
  XCircle,
  Loader2,
  Archive,
  CheckCircle2,
  MessageSquare,
  Cross,
  X,
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

import { formatDate } from "@/utils/date";
import { LeadIdentitySection } from "../LeadIdentitySection";
import { DetailItem } from "../screening/DetailItem";
import { LeadPersonalSection } from "../LeadPersonalSection";
import { LeadActivitySection } from "../LeadActivitySection";
import { OfferHistoricSection } from "./OfferHistoricSection";
import { LeadFinancialSection } from "../LeadFinancialSection";
import { LeadAISummarySection } from "../LeadAISummarySection";

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
      <div className="flex-1 flex items-center justify-center text-red-300 bg-slate-50/30">
        <div className="text-center">
          <X className="w-12 h-12 mx-auto mb-3 opacity-20" />
          <p>Impossible de charger les détails du prospect.</p>
          <p>Veuillez réessayer plus tard.</p>
        </div>
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
              <h1 className={`${LexendFont.className} text-2xl text-green-900`}>
                Détail de l&apos;offre et du prospect
              </h1>
              <p className="text-sm text-slate-500 mt-1">Envoyée le {formatDate(offer.sentAt)}</p>
            </div>
          </div>

          {/* Contact Info Box - Only if accepted */}
          {offer.status === OfferStatusEnum.ACCEPTED && <LeadIdentitySection lead={fullLead} />}
        </div>

        <OfferHistoricSection offer={offer} />

        <div className="px-6 py-4 gap-8 flex flex-col">
          <LeadActivitySection lead={fullLead} />

          <LeadPersonalSection lead={fullLead} />

          <LeadFinancialSection lead={fullLead} />

          <LeadAISummarySection summary={fullLead.aiSummary} />
        </div>

        {/* Chronological Interaction Tree */}
      </div>
    </div>
  );
};
