import { UseArchiveOfferMutation } from "@/hooks/useArchiveOffer";
import { cn } from "@/utils/cn";
import { formatAmount } from "@/utils/formatAmount";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { formatPostalCode } from "@/utils/formatPostalCode";
import { Archive, Info, MapPin, MoreHorizontal, Undo2, User } from "lucide-react";
import { getProjectNeedProLabel, OfferStatusEnum, ProMatchOfferResponse } from "sowhat-types";
import { Button } from "@/components/ui/button";
import { LexendFont } from "@/utils/fonts";
import { formatDate } from "@/utils/date";

interface OfferListItemProps {
  data: ProMatchOfferResponse;
  isSelected: boolean;
  onClick: () => void;
  archiveMutation: UseArchiveOfferMutation;
}

export const OfferListItem = ({
  data,
  isSelected,
  onClick,
  archiveMutation,
}: OfferListItemProps) => {
  const { lead, offer } = data;

  // Calculate age
  const age = lead.birthYear ? new Date().getFullYear() - lead.birthYear : null;

  return (
    <div
      className={cn(
        "group relative w-full text-left transition-colors",
        isSelected
          ? "bg-slate-50 border-l-4 border-l-slate-900"
          : "hover:bg-slate-50 border-l-4 border-l-transparent",
      )}>
      <div
        onClick={onClick}
        className={cn("p-4 w-full cursor-pointer", isSelected ? "pl-[12px]" : "")}>
        <div className="flex justify-between items-start mb-1 pr-6 gap-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
              <Info className="w-3.5 h-3.5 text-green-800/60" />
              <span className="tracking-wide text-green-800/60">
                {lead.id.substring(0, 7).toUpperCase()}
              </span>
            </div>
          </div>
          <span className="text-[10px] text-slate-400 tabular-nums whitespace-nowrap">
            {formatDate(offer.updatedAt)}
          </span>
        </div>

        <h4
          className={`text-sm font-medium text-slate-900 mb-1 line-clamp-1 ${LexendFont.className}`}>
          {lead.need ? getProjectNeedProLabel(lead.need) : "-"}
        </h4>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
          {lead.postalCode && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {formatPostalCode(lead.postalCode)}
            </span>
          )}
          {age && (
            <span className="flex items-center gap-1">
              <User className="w-3 h-3" />
              {age} ans
            </span>
          )}
          {lead.initialAmount && (
            <span
              className={cn(
                "flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full",
                offer.status === OfferStatusEnum.ACCEPTED
                  ? "bg-green-100 text-green-700"
                  : offer.status === OfferStatusEnum.PENDING
                    ? "bg-blue-100 text-blue-700"
                    : offer.status === OfferStatusEnum.REJECTED
                      ? "bg-red-100 text-red-700"
                      : "bg-slate-100 text-slate-600",
              )}>
              <span>Montant initial</span>
              <span>{formatAmount(lead.initialAmount)}</span>
            </span>
          )}
        </div>
      </div>

      {/* Popover Menu - Positioned absolutely in the top right */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity focus-within:opacity-100">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full hover:bg-slate-200">
              <MoreHorizontal className="h-4 w-4 text-slate-500" />
              <span className="sr-only">Menu</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-48 p-1">
            <div className="flex flex-col gap-1">
              <button
                className="flex items-center gap-2 w-full px-2 py-1.5 text-xs text-left text-slate-700 hover:bg-slate-100 rounded-sm transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  archiveMutation.mutate({
                    offerId: offer.id,
                    archive: !offer.archivedByProAt,
                  });
                }}>
                {offer.archivedByProAt ? (
                  <>
                    <Undo2 className="h-3.5 w-3.5" />
                    Désarchiver
                  </>
                ) : (
                  <>
                    <Archive className="h-3.5 w-3.5" />
                    Archiver
                  </>
                )}
              </button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
