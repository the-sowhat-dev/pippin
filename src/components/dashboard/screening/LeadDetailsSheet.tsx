'use client';

import {
  LeadsResponse,
  FullLeadResponse,
  getProfessionLabel,
  getMaritalStatusLabel,
  getProjectNeedProLabel,
  getFinancialProductLabel,
  getProfessionStatusLabel,
  getHouseholdSalaryRangeLabel,
  getPersonalNetWorthRangeLabel,
  getPersonalSalaryRangeLabel,
} from 'sowhat-types';
import { toast } from 'sonner';
import { useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Loader2, Heart, Info, CheckCircle2 } from 'lucide-react';
import { useQuery, useMutation, useQueryClient, InfiniteData } from '@tanstack/react-query';

import {
  Sheet,
  SheetTitle,
  SheetHeader,
  SheetContent,
  SheetTrigger,
  SheetDescription,
} from '@/components/ui/sheet';
import {
  Dialog,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogDescription,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { SectionTitle } from './SheetSectionTitle';
import { formatAmount } from '@/utils/formatAmount';
import { Textarea } from '@/components/ui/textarea';
import { getLead, createOffer, updateOffer, toggleLikeUser } from '../../../lib/api';
import { LexendFont } from '@/utils/fonts';
import { formatPostalCode } from '@/utils/formatPostalCode';
import { sanitizeText } from '@/utils/sanitize';
import { DetailItem } from './DetailItem';

interface LeadDetailsSheetProps {
  leadId: string;
  trigger: React.ReactNode;
}

export function LeadDetailsSheet({ leadId, trigger }: LeadDetailsSheetProps) {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [isOfferDialogOpen, setIsOfferDialogOpen] = useState(false);
  const [offerMessage, setOfferMessage] = useState('');

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

  const createMutation = useMutation({
    mutationFn: async (message: string) => {
      const token = await getToken();
      if (!lead) throw new Error('Lead not loaded');
      return createOffer(
        {
          leadUserId: lead.userId,
          message: sanitizeText(message),
          sentAt: new Date(),
        },
        token
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lead', leadId] });
      setIsOfferDialogOpen(false);
      toast.success('Offre créée avec succès');
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (message: string) => {
      const token = await getToken();
      if (!lead?.offer) throw new Error('No offer to update');
      return updateOffer({ id: lead.offer.id, message: sanitizeText(message) }, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lead', leadId] });
      setIsOfferDialogOpen(false);
      toast.success('Offre mise à jour avec succès');
    },
  });

  const likeMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      if (!lead) throw new Error('Lead not loaded');
      const newLikedState = !lead.likedAt;
      await toggleLikeUser(lead.userId, token, newLikedState);
      return newLikedState;
    },
    onSuccess: (newLikedState) => {
      const newLikedAt = newLikedState ? new Date().toISOString() : null;

      // Update individual lead query
      queryClient.setQueryData(['lead', leadId], (oldLead: FullLeadResponse | undefined) => {
        if (!oldLead) return oldLead;
        return {
          ...oldLead,
          likedAt: newLikedAt ? new Date(newLikedAt) : null,
        };
      });

      // Update list query
      queryClient.setQueriesData<InfiniteData<LeadsResponse>>(
        { queryKey: ['pro-leads'] },
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              items: page.items.map((item) => {
                if (item.userId === leadId) {
                  return {
                    ...item,
                    likedAt: newLikedAt ? new Date(newLikedAt) : null,
                  };
                }
                return item;
              }),
            })),
          };
        }
      );
    },
  });

  const handleOfferSubmit = () => {
    if (lead?.offer) {
      updateMutation.mutate(offerMessage);
    } else {
      createMutation.mutate(offerMessage);
    }
  };

  const openOfferDialog = () => {
    if (lead?.offer) {
      setOfferMessage(lead.offer.message);
    } else {
      setOfferMessage('');
    }
    setIsOfferDialogOpen(true);
  };

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>{trigger}</SheetTrigger>
        <SheetContent className="w-full sm:max-w-none sm:w-1/2 flex flex-col h-full p-0 gap-0">
          <div className="flex-1 overflow-y-auto p-6">
            <SheetHeader>
              <SheetTitle className={`${LexendFont.className} text-green-900 text-2xl`}>
                Détail du prospect
              </SheetTitle>
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
                {/* Identity Section */}
                {(lead.offer?.status === 'ACCEPTED' ||
                  lead.offer?.status === 'ACCEPTED_THEN_ARCHIVED_BY_USER') && (
                    <section className="bg-green-50/50 -mx-6 px-6 py-4 border-b border-green-100 mb-6">
                      <div className="px-0">
                        <SectionTitle>Identité</SectionTitle>
                      </div>
                      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-4">
                        <DetailItem label="Prénom" value={lead.firstName} />
                        <DetailItem label="Nom" value={lead.lastName} />
                        <DetailItem label="Email" value={<span className="flex items-center gap-2">{lead.email}
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                        </span>} />
                        <DetailItem
                          label="Téléphone"
                          value={
                            lead.phoneNumber ? (
                              <span className="flex items-center gap-2">
                                {lead.phoneNumber}
                                {lead.phoneNumberVerifiedAt && (
                                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                                )}
                              </span>
                            ) : null
                          }
                        />
                      </div>
                    </section>
                  )}
                {/* Activity Section  */}
                <section>
                  <SectionTitle>Activité</SectionTitle>
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <DetailItem
                      label="Montant initial d'investissement"
                      value={lead.initialAmount ? formatAmount(lead.initialAmount) : null}
                    />
                    <DetailItem
                      label="Capacité mensuelle d'investissement"
                      value={
                        lead.monthlyAmount ? `${formatAmount(lead.monthlyAmount)} / mois` : null
                      }
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
                      value={
                        lead.financialProduct
                          ? getFinancialProductLabel(lead.financialProduct)
                          : null
                      }
                      badge
                    />
                    <DetailItem
                      label="Dernière activité"
                      value={lead.updatedAt ? new Date(lead.updatedAt).toLocaleDateString() : null}
                    />
                    <DetailItem label="Nombre d'offres reçues" value={lead.totalOffersReceived} />
                    <DetailItem
                      label="Nombre d'offres acceptées"
                      value={lead.totalOffersAccepted}
                    />

                    <div className="col-span-1 xl:col-span-2"></div>
                  </div>
                </section>
                {/* Personal Section */}
                <section>
                  <SectionTitle>Personnel</SectionTitle>
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <DetailItem label="ID Utilisateur" value={lead.userId} />
                    <DetailItem
                      label="Année de naissance"
                      value={
                        lead.birthYear && typeof lead.birthYear === 'number'
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
                        lead.professionStatus
                          ? getProfessionStatusLabel(lead.professionStatus)
                          : null
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
                    <DetailItem label="Code postal" value={formatPostalCode(lead.postalCode)} />
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
                      value={
                        lead.totalMobilitiesValue ? formatAmount(lead.totalMobilitiesValue) : null
                      }
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
                      value={!lead.totalSavingsBankAccounts ? '--' : lead.totalSavingsBankAccounts}
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
                      value={
                        !lead.totalCheckingBankAccounts ? '--' : lead.totalCheckingBankAccounts
                      }
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
                      value={!lead.totalLoansBankAccounts ? '--' : lead.totalLoansBankAccounts}
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

                {/* AI Summary Section */}
                {lead.aiSummary && lead.aiSummary.fullResponse && (
                  <section>
                    <SectionTitle>Rapport IA</SectionTitle>
                    <div className="mt-4 space-y-4 animate-in fade-in slide-in-from-top-2">
                      {lead.aiSummary.fullResponse.message && (
                        <div className="py-4">
                          <h4 className={`${LexendFont.className} text-green-900/70 text-sm mb-1`}>
                            Message
                          </h4>
                          <p className="text-sm text-gray-600">
                            {lead.aiSummary.fullResponse.message}
                          </p>
                        </div>
                      )}

                      {lead.aiSummary.fullResponse.synthese && (
                        <div className="py-4">
                          <h4 className={`${LexendFont.className} text-green-900/70 text-sm mb-2`}>
                            Synthèse
                          </h4>
                          <div className="grid grid-cols-3 gap-2 text-center">
                            <div className="bg-gray-50 p-2 rounded h-full flex flex-col justify-center">
                              <span className="block text-xs text-gray-500">Note</span>
                              <span className="font-bold text-green-700">
                                {lead.aiSummary.fullResponse.synthese.note}/5
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
                          <div className="py-4">
                            <h4
                              className={`${LexendFont.className} text-green-900/70 text-sm mb-2`}
                            >
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
                          <div className="py-4">
                            <h4
                              className={`${LexendFont.className} text-green-900/70 text-sm mb-2`}
                            >
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
                          <div className="py-4">
                            <h4
                              className={`${LexendFont.className} text-green-900/70 text-sm mb-2`}
                            >
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
                  </section>
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">Aucune donnée disponible.</div>
            )}

            {/* Floating Footer Overlay */}
            <div className="sticky bottom-0 p-0.5">
              <div className="p-3 bg-gray-800 border-2 border-gray-500 rounded-xl shadow-sm shadow-gray-900/50 text-white flex justify-between items-center shrink-0 z-50">
                <div className="flex gap-2 items-center flex-1 mr-4">
                  <Info className="w-4 h-4 shrink-0" />
                  <span className="text-sm">
                    {!lead?.offer ? (
                      "Vous n'avez pas encore fait d'offre à ce particulier"
                    ) : (
                      <>
                        {(lead.offer.status === 'REJECTED' ||
                          lead.offer.status === 'REJECTED_THEN_ARCHIVED_BY_USER') &&
                          'Offre rejetée par le particulier.'}
                        {(lead.offer.status === 'ACCEPTED' ||
                          lead.offer.status === 'ACCEPTED_THEN_ARCHIVED_BY_USER') && (
                            <>
                              Mise en relation acceptée par le particulier.<br />
                              Contactez-le au plus vite
                              {lead.phoneNumber && ` au ${lead.phoneNumber}`}
                              {lead.email && ` ou par email ${lead.email}`}
                            </>
                          )}
                        {lead.offer.status === 'PENDING' && (
                          <>
                            En attente de réponse par le particulier
                            {lead.offer.seenByUser &&
                              ` (Vu le ${new Date(lead.offer.seenByUser).toLocaleDateString()})`}
                          </>
                        )}
                        {lead.offer.status === 'ARCHIVED_BY_PRO' &&
                          "Vous avez archivé ce lead et l'offre correspondante, l'utilisateur ne verra pas votre offre si vous en avez fait une."}
                      </>
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-3 ml-auto shrink-0">
                  <Button
                    variant="outline"
                    className={`transition-colors ${lead?.likedAt
                      ? 'bg-green-500/20 border-green-400 text-green-500 hover:bg-transparent hover:border-white hover:text-green-500/20'
                      : 'bg-transparent text-white hover:bg-green-500/20 hover:border-green-400 hover:text-green-500/20'
                      }`}
                    onClick={() => likeMutation.mutate()}
                    disabled={likeMutation.isPending || !lead}
                  >
                    {likeMutation.isPending ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Heart className={`h-5 w-5 ${lead?.likedAt ? 'fill-current' : ''}`} />
                    )}
                  </Button>
                  {(!lead?.offer || lead?.offer?.status === 'PENDING') && (
                    <Button
                      className="bg-green-600 hover:bg-green-600/80 text-white font-semibold"
                      onClick={openOfferDialog}
                      disabled={!lead}
                    >
                      {lead?.offer ? "Modifier l'offre" : 'Faire une offre'}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <Dialog open={isOfferDialogOpen} onOpenChange={setIsOfferDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{lead?.offer ? "Modifier l'offre" : 'Faire une offre'}</DialogTitle>
            <DialogDescription>
              Rédigez votre proposition commerciale pour ce prospect. Il recevra une notification.
              <span className="p-1 bg-gray-50 rounded-md border border-gray-100 flex gap-4 items-center mt-4">
                <Info className="w-10 h-10" />
                En plus du message d'offre, le particulier aura accès à vos informations de profil
                ainsi que les éléments de votre entreprise renseignés dans la section "Profil"
              </span>
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Bonjour, je vous propose..."
                value={offerMessage}
                onChange={(e) => setOfferMessage(e.target.value)}
                className="h-32"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOfferDialogOpen(false)}>
              Annuler
            </Button>
            <Button
              className="bg-green-500 hover:bg-green-600 text-white"
              onClick={handleOfferSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {lead?.offer ? 'Mettre à jour' : 'Envoyer'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
