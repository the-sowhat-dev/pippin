import { FullLeadResponse, getFinancialProductLabel } from "sowhat-types";

import { formatAmount } from "@/utils/formatAmount";
import { DetailItem } from "./screening/DetailItem";
import { SectionTitle } from "./screening/SheetSectionTitle";

export const LeadFinancialSection = ({ lead }: { lead: FullLeadResponse }) => {
  return (
    <section>
      <SectionTitle>Financier</SectionTitle>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <DetailItem
          label="Mensualités crédits"
          value={lead.loanMonthlyPayment ? formatAmount(lead.loanMonthlyPayment) : null}
        />

        <div className="col-span-1 xl:col-span-2">
          <DetailItem
            label="Produits détenus"
            value={
              lead.financialProductsOwned?.map((p) => getFinancialProductLabel(p)).join(", ") ||
              null
            }
          />
        </div>

        <DetailItem
          label="Immobilier Total"
          value={lead.totalRealEstatesValue ? formatAmount(lead.totalRealEstatesValue) : null}
        />
        <DetailItem
          label="Mobilité Total"
          value={lead.totalMobilitiesValue ? formatAmount(lead.totalMobilitiesValue) : null}
        />
        <DetailItem
          label="Crypto Total"
          value={
            lead.totalCryptocurrenciesValue ? formatAmount(lead.totalCryptocurrenciesValue) : null
          }
        />
        <DetailItem
          label="Autres Actifs Total"
          value={lead.totalOtherAssetsValue ? formatAmount(lead.totalOtherAssetsValue) : null}
        />

        <DetailItem
          label="Comptes Épargne (Nombre)"
          value={!lead.totalSavingsBankAccounts ? "--" : lead.totalSavingsBankAccounts}
        />

        <DetailItem
          label="Comptes Épargne (Solde)"
          value={
            lead.totalSavingsBankAccountsBalance
              ? formatAmount(lead.totalSavingsBankAccountsBalance)
              : null
          }
        />

        <DetailItem
          label="Comptes Courants (Nombre)"
          value={!lead.totalCheckingBankAccounts ? "--" : lead.totalCheckingBankAccounts}
        />
        <DetailItem
          label="Comptes Courants (Solde)"
          value={
            lead.totalCheckingBankAccountsBalance
              ? formatAmount(lead.totalCheckingBankAccountsBalance)
              : null
          }
        />

        <DetailItem
          label="Crédits (Nombre)"
          value={!lead.totalLoansBankAccounts ? "--" : lead.totalLoansBankAccounts}
        />

        <DetailItem
          label="Crédits (Solde restant)"
          value={
            lead.totalLoansBankAccountsBalance
              ? formatAmount(lead.totalLoansBankAccountsBalance)
              : null
          }
        />

        <DetailItem
          label="Mise à jour finances"
          value={
            lead.lastFinancialSummaryUpdatedAt
              ? new Date(lead.lastFinancialSummaryUpdatedAt).toLocaleDateString()
              : null
          }
        />
      </div>
    </section>
  );
};
