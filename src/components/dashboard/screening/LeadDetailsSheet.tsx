'use client';

import { useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import { getLead } from '../../../../lib/api';
import { SimpleBadge } from '../SimpleBadge';
import { formatAmount } from '@/utils/formatAmount';
import {
  FullLeadResponse,
  getMaritalStatusLabel,
  getProfessionLabel,
  getProfessionStatusLabel,
  getPersonalSalaryRangeLabel,
  getHouseholdSalaryRangeLabel,
  getPersonalNetWorthRangeLabel,
  getProjectNeedProLabel,
  getFinancialProductLabel,
} from 'sowhat-types';

interface LeadDetailsSheetProps {
  leadId: string;
  trigger: React.ReactNode;
}

const DetailItem = ({
  label,
  value,
  badge = false,
}: {
  label: string;
  value: React.ReactNode | null | undefined;
  badge?: boolean;
}) => {
  if (value === null || value === undefined) {
    return (
      <div className="flex flex-col gap-1">
        <span className="text-sm text-gray-500">{label}</span>
        <span className="font-medium text-gray-900">--</span>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm text-gray-500">{label}</span>
      {badge ? (
        <SimpleBadge className="bg-gray-100 text-gray-800 w-fit">{value}</SimpleBadge>
      ) : (
        <span className="font-medium text-gray-900 text-pretty break-words">{value}</span>
      )}
    </div>
  );
};

export function LeadDetailsSheet({ leadId, trigger }: LeadDetailsSheetProps) {
  const { getToken } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showAiDetails, setShowAiDetails] = useState(false);

  const {
    data: lead,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['lead', leadId],
    queryFn: async () => {
      const token = await getToken();
      return getLead(leadId, token);
    },
    enabled: isOpen,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-lg font-semibold text-green-900 border-b pb-2 mb-4 mt-8 first:mt-0">
      {children}
    </h3>
  );

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent className="overflow-y-auto w-full sm:max-w-none sm:w-1/2">
        <SheetHeader>
          <SheetTitle className="text-green-900 text-2xl">Détail du prospect</SheetTitle>
          <SheetDescription>
            Consultez les informations détaillées fournies par le prospect.
          </SheetDescription>
        </SheetHeader>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-green-600" />
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">
            Une erreur est survenue lors du chargement des détails.
          </div>
        ) : lead ? (
          <div className="mt-6 pb-20 space-y-6">
            {/* Personal Section */}
            <section>
              <SectionTitle>Personnel</SectionTitle>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <DetailItem label="ID Utilisateur" value={lead.userId} />
                <DetailItem label="Année de naissance" value={lead.birthYear} />
                <DetailItem
                  label="Situation maritale"
                  value={lead.maritalStatus ? getMaritalStatusLabel(lead.maritalStatus) : null}
                  badge
                />
                <DetailItem label="Enfants" value={lead.childrenNumber} />
                {lead.childrenBirthYears && lead.childrenBirthYears.length > 0 && (
                  <DetailItem
                    label="Années naissance enfants"
                    value={lead.childrenBirthYears.join(', ')}
                  />
                )}
                <DetailItem
                  label="Profession"
                  value={lead.profession ? getProfessionLabel(lead.profession) : null}
                  badge
                />
                <DetailItem
                  label="Statut professionnel"
                  value={
                    lead.professionStatus ? getProfessionStatusLabel(lead.professionStatus) : null
                  }
                  badge
                />
                <DetailItem
                  label="Revenu personnel"
                  value={
                    lead.personalSalaryRange
                      ? getPersonalSalaryRangeLabel(lead.personalSalaryRange)
                      : null
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
                <DetailItem label="Code postal" value={lead.postalCode} />
                <DetailItem
                  label="Propriétaire résidence principale"
                  value={
                    lead.isMainResidenceOwner
                      ? 'Oui'
                      : lead.isMainResidenceOwner === false
                        ? 'Non'
                        : null
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

            {/* Financial Section */}
            <section>
              <SectionTitle>Financier</SectionTitle>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <DetailItem
                  label="Montant initial"
                  value={lead.initialAmount ? formatAmount(lead.initialAmount) : null}
                />
                <DetailItem
                  label="Capacité mensuelle"
                  value={lead.monthlyAmount ? formatAmount(lead.monthlyAmount) : null}
                />
                <DetailItem
                  label="Besoin principal"
                  value={lead.need ? getProjectNeedProLabel(lead.need) : null}
                  badge
                />
                <DetailItem
                  label="Produit recherché"
                  value={
                    lead.financialProduct ? getFinancialProductLabel(lead.financialProduct) : null
                  }
                  badge
                />
                <div className="col-span-1 xl:col-span-2">
                  <DetailItem label="Note" value={lead.note} />
                </div>

                <DetailItem
                  label="Mensualités crédits"
                  value={lead.loanMonthlyPayment ? formatAmount(lead.loanMonthlyPayment) : null}
                />

                <div className="col-span-1 xl:col-span-2">
                  <DetailItem
                    label="Produits détenus"
                    value={
                      lead.financialProductsOwned
                        ?.map((p) => getFinancialProductLabel(p))
                        .join(', ') || null
                    }
                  />
                </div>

                <DetailItem
                  label="Immobilier Total"
                  value={
                    lead.totalRealEstatesValue ? formatAmount(lead.totalRealEstatesValue) : null
                  }
                />
                <DetailItem
                  label="Mobilité Total"
                  value={lead.totalMobilitiesValue ? formatAmount(lead.totalMobilitiesValue) : null}
                />
                <DetailItem
                  label="Crypto Total"
                  value={
                    lead.totalCryptocurrenciesValue
                      ? formatAmount(lead.totalCryptocurrenciesValue)
                      : null
                  }
                />
                <DetailItem
                  label="Autres Actifs Total"
                  value={
                    lead.totalOtherAssetsValue ? formatAmount(lead.totalOtherAssetsValue) : null
                  }
                />

                <DetailItem
                  label="Comptes Épargne (Nombre)"
                  value={lead.totalSavingsBankAccounts}
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
                  value={lead.totalCheckingBankAccounts}
                />
                <DetailItem
                  label="Comptes Courants (Solde)"
                  value={
                    lead.totalCheckingBankAccountsBalance
                      ? formatAmount(lead.totalCheckingBankAccountsBalance)
                      : null
                  }
                />

                <DetailItem label="Crédits (Nombre)" value={lead.totalLoansBankAccounts} />
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

            {/* AI Summary Section */}
            {lead.aiSummary && (
              <section>
                <SectionTitle>Synthèse IA</SectionTitle>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <span className="text-sm text-gray-500 block">Statut</span>
                      <span
                        className={`font-medium ${lead.aiSummary.status === 'risk_detected' ? 'text-red-600' : 'text-green-600'}`}
                      >
                        {lead.aiSummary.status === 'risk_detected' ? 'Risque détecté' : 'Normal'}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-gray-500 block">Version</span>
                      <span className="font-medium text-gray-900">{lead.aiSummary.version}</span>
                    </div>
                  </div>

                  {lead.aiSummary.fullResponse && (
                    <div className="mt-4">
                      <Button
                        variant="outline"
                        onClick={() => setShowAiDetails(!showAiDetails)}
                        className="w-full flex justify-between items-center"
                      >
                        {showAiDetails ? 'Masquer le détail' : 'Voir le détail complet'}
                        {showAiDetails ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>

                      {showAiDetails && (
                        <div className="mt-4 space-y-4 animate-in fade-in slide-in-from-top-2">
                          {lead.aiSummary.fullResponse.message && (
                            <div className="bg-white p-3 rounded border border-gray-100">
                              <h4 className="font-semibold text-sm text-gray-700 mb-1">Message</h4>
                              <p className="text-sm text-gray-600">
                                {lead.aiSummary.fullResponse.message}
                              </p>
                            </div>
                          )}

                          {lead.aiSummary.fullResponse.synthese && (
                            <div className="bg-white p-3 rounded border border-gray-100">
                              <h4 className="font-semibold text-sm text-gray-700 mb-2">Synthèse</h4>
                              <div className="grid grid-cols-3 gap-2 text-center">
                                <div className="bg-gray-50 p-2 rounded h-full flex flex-col justify-center">
                                  <span className="block text-xs text-gray-500">Note</span>
                                  <span className="font-bold text-green-700">
                                    {lead.aiSummary.fullResponse.synthese.note}/10
                                  </span>
                                </div>
                                <div className="bg-gray-50 p-2 rounded h-full flex flex-col justify-center">
                                  <span className="block text-xs text-gray-500">Optimisation</span>
                                  <span className="font-bold text-blue-700">
                                    {lead.aiSummary.fullResponse.synthese.optimisationLevel}%
                                  </span>
                                </div>
                                <div className="bg-gray-50 p-2 rounded h-full flex flex-col justify-center">
                                  <span className="block text-xs text-gray-500">Produit</span>
                                  <span
                                    className="font-bold text-purple-700 text-xs break-words"
                                    title={lead.aiSummary.fullResponse.synthese.product}
                                  >
                                    {lead.aiSummary.fullResponse.synthese.product}
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}

                          {lead.aiSummary.fullResponse.analyse &&
                            lead.aiSummary.fullResponse.analyse.length > 0 && (
                              <div className="bg-white p-3 rounded border border-gray-100">
                                <h4 className="font-semibold text-sm text-gray-700 mb-2">
                                  Analyse
                                </h4>
                                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                  {lead.aiSummary.fullResponse.analyse.map((item, i) => (
                                    <li key={i}>{item}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                          {lead.aiSummary.fullResponse.recommandations &&
                            lead.aiSummary.fullResponse.recommandations.length > 0 && (
                              <div className="bg-white p-3 rounded border border-gray-100">
                                <h4 className="font-semibold text-sm text-gray-700 mb-2">
                                  Recommandations
                                </h4>
                                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                  {lead.aiSummary.fullResponse.recommandations.map((item, i) => (
                                    <li key={i}>{item}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                          {lead.aiSummary.fullResponse.concretement &&
                            lead.aiSummary.fullResponse.concretement.length > 0 && (
                              <div className="bg-white p-3 rounded border border-gray-100">
                                <h4 className="font-semibold text-sm text-gray-700 mb-2">
                                  Concrètement
                                </h4>
                                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                  {lead.aiSummary.fullResponse.concretement.map((item, i) => (
                                    <li key={i}>{item}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </section>
            )}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">Aucune donnée disponible.</div>
        )}
      </SheetContent>
    </Sheet>
  );
}
