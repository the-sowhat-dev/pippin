import { CheckCircle2 } from "lucide-react";
import { DetailItem } from "./screening/DetailItem";
import { SectionTitle } from "./screening/SheetSectionTitle";
import { FullLeadResponse } from "sowhat-types";

export const LeadIdentitySection = ({ lead }: { lead: FullLeadResponse }) => {
  return (
    <section className="bg-green-50/50 px-6 py-4 border-b border-green-100">
      <SectionTitle>Identité</SectionTitle>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-4">
        <DetailItem label="Prénom" value={lead.firstName} />
        <DetailItem label="Nom" value={lead.lastName} />
        <DetailItem
          label="Email"
          value={
            <span className="flex items-center gap-2">
              {lead.email}
              <CheckCircle2 className="w-4 h-4 text-green-500" />
            </span>
          }
        />
        <DetailItem
          label="Téléphone"
          value={
            lead.phoneNumber ? (
              <span className="flex items-center gap-2">
                {lead.phoneNumber}
                {lead.phoneNumberVerifiedAt && <CheckCircle2 className="w-4 h-4 text-green-500" />}
              </span>
            ) : null
          }
        />
      </div>
    </section>
  );
};
