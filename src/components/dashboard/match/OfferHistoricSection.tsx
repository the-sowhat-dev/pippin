import { Archive, CheckCircle2, Eye, MessageSquare, XCircle } from "lucide-react";
import { OfferStatusEnum, ProCommercialOfferResponse } from "sowhat-types";

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";
import { TimelineItem } from "./TimelineItem";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "../screening/SheetSectionTitle";
import { LexendFont } from "@/utils/fonts";

export const OfferHistoricSection = ({ offer }: { offer: ProCommercialOfferResponse }) => {
  return (
    <section className="px-6 py-4 bg-slate-50">
      <h3
        className={`${LexendFont.className} text-lg font-semibold text-slate-800 border-b pb-2 mb-6`}>
        Historique des échanges
      </h3>
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
  );
};
