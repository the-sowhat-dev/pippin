import {
  FullLeadResponse,
  getProfessionLabel,
  getMaritalStatusLabel,
  getProfessionStatusLabel,
  getPersonalSalaryRangeLabel,
  getHouseholdSalaryRangeLabel,
  getPersonalNetWorthRangeLabel,
} from "sowhat-types";

import { DetailItem } from "./screening/DetailItem";
import { formatPostalCode } from "@/utils/formatPostalCode";
import { SectionTitle } from "./screening/SheetSectionTitle";

export const LeadPersonalSection = ({ lead }: { lead: FullLeadResponse }) => {
  return (
    <section>
      <SectionTitle>Personnel</SectionTitle>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <DetailItem label="ID Utilisateur" value={lead.userId} />
        <DetailItem
          label="Année de naissance"
          value={
            lead.birthYear && typeof lead.birthYear === "number"
              ? `${lead.birthYear} (${new Date().getFullYear() - lead.birthYear} ans)`
              : null
          }
        />
        <DetailItem
          label="Situation maritale"
          value={lead.maritalStatus ? getMaritalStatusLabel(lead.maritalStatus) : null}
          badge
        />
        <DetailItem label="Enfants" value={lead.childrenNumber} />
        {lead.childrenBirthYears && lead.childrenBirthYears.length > 0 && (
          <DetailItem label="Années naissance enfants" value={lead.childrenBirthYears.join(", ")} />
        )}
        <DetailItem
          label="Profession"
          value={lead.profession ? getProfessionLabel(lead.profession) : null}
          badge
        />
        <DetailItem
          label="Statut professionnel"
          value={lead.professionStatus ? getProfessionStatusLabel(lead.professionStatus) : null}
          badge
        />
        <DetailItem
          label="Revenu personnel"
          value={
            lead.personalSalaryRange ? getPersonalSalaryRangeLabel(lead.personalSalaryRange) : null
          }
          badge
        />
        <DetailItem
          label="Revenu du foyer"
          value={
            lead.householdSalaryRange
              ? getHouseholdSalaryRangeLabel(lead.householdSalaryRange)
              : null
          }
          badge
        />
        <DetailItem
          label="Patrimoine net"
          value={
            lead.personalNetWorthRange
              ? getPersonalNetWorthRangeLabel(lead.personalNetWorthRange)
              : null
          }
          badge
        />
        <DetailItem label="Code postal" value={formatPostalCode(lead.postalCode)} />
        <DetailItem
          label="Propriétaire résidence principale"
          value={
            lead.isMainResidenceOwner ? "Oui" : lead.isMainResidenceOwner === false ? "Non" : null
          }
        />
        <DetailItem
          label="Mise à jour profil"
          value={
            lead.lastPersonalSummaryUpdatedAt
              ? new Date(lead.lastPersonalSummaryUpdatedAt).toLocaleDateString()
              : null
          }
        />
      </div>
    </section>
  );
};
