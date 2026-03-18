import { FullLeadResponse, getFinancialProductLabel, getProjectNeedProLabel } from "sowhat-types";

import { formatAmount } from "@/utils/formatAmount";
import { DetailItem } from "./screening/DetailItem";
import { SectionTitle } from "./screening/SheetSectionTitle";

export const LeadActivitySection = ({ lead }: { lead: FullLeadResponse }) => {
  return (
    <section>
      <SectionTitle>Activité</SectionTitle>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <DetailItem
          label="Montant initial d'investissement"
          value={lead.initialAmount ? formatAmount(lead.initialAmount) : null}
        />
        <DetailItem
          label="Capacité mensuelle d'investissement"
          value={lead.monthlyAmount ? `${formatAmount(lead.monthlyAmount)} / mois` : null}
        />
        <div className="col-span-1 xl:col-span-2">
          <DetailItem
            label="Besoin principal"
            value={lead.need ? getProjectNeedProLabel(lead.need) : null}
            badge
          />
        </div>
        <DetailItem
          label="Produit recherché"
          value={lead.financialProduct ? getFinancialProductLabel(lead.financialProduct) : null}
          badge
        />
        <DetailItem
          label="Dernière activité"
          value={lead.updatedAt ? new Date(lead.updatedAt).toLocaleDateString() : null}
        />
        <DetailItem label="Nombre d'offres reçues" value={lead.totalOffersReceived} />
        <DetailItem label="Nombre d'offres acceptées" value={lead.totalOffersAccepted} />

        <div className="col-span-1 xl:col-span-2"></div>
      </div>
    </section>
  );
};
