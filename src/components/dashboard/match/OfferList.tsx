import { Button } from "@/components/ui/button";
import { UseArchiveOfferMutation } from "@/hooks/useArchiveOffer";
import { Loader2, Search } from "lucide-react";
import { ProMatchOfferResponse } from "sowhat-types";
import { OfferListItem } from "./OfferListItem";

interface OfferListProps {
  offers: ProMatchOfferResponse[];
  total: number;
  selectedOfferId: string | null;
  onSelect: (offerId: string) => void;
  isLoading: boolean;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  archiveMutation: UseArchiveOfferMutation;
}

export const OfferList = ({
  offers,
  total,
  selectedOfferId,
  onSelect,
  isLoading,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  archiveMutation,
}: OfferListProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center flex-1">
        <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
      </div>
    );
  }

  if (offers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 text-slate-400 p-8 text-center">
        <Search className="w-8 h-8 mb-2 opacity-50" />
        <p className="text-sm">Aucune offre dans cette catégorie</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Offres ({total})
        </h3>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="divide-y divide-slate-100">
          {offers.map((offer) => (
            <OfferListItem
              key={offer.offer.id}
              data={offer}
              isSelected={selectedOfferId === offer.offer.id}
              onClick={() => onSelect(offer.offer.id)}
              archiveMutation={archiveMutation}
            />
          ))}
        </div>
        {hasNextPage && (
          <div className="p-4">
            <Button
              variant="outline"
              className="w-full text-xs"
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}>
              {isFetchingNextPage && <Loader2 className="w-3 h-3 mr-2 animate-spin" />}
              Charger plus
            </Button>
          </div>
        )}
        <div className="h-4" />
      </div>
    </div>
  );
};
