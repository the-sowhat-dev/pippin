import {
  OfferStatusEnum,
  MatchingLeadsResponse,
  ProUserLikeLeadResponse,
  ProCommercialOfferLeadResponse,
} from "sowhat-types";

interface SortOffersByStatusResponse {
  acceptedLeads: ProCommercialOfferLeadResponse[];
  pendingLeads: ProCommercialOfferLeadResponse[];
  rejectedLeads: ProCommercialOfferLeadResponse[];
  archivedLeads: ProCommercialOfferLeadResponse[];
  likedLeads: ProUserLikeLeadResponse[];
}

const InitialResponse: SortOffersByStatusResponse = {
  acceptedLeads: [],
  pendingLeads: [],
  rejectedLeads: [],
  archivedLeads: [],
  likedLeads: [],
};

export function sortOffersByStatus(
  data?: MatchingLeadsResponse | null | undefined,
): SortOffersByStatusResponse {
  if (!data) return InitialResponse;

  const accepted: ProCommercialOfferLeadResponse[] = [];
  const pending: ProCommercialOfferLeadResponse[] = [];
  const rejected: ProCommercialOfferLeadResponse[] = [];
  const archived: ProCommercialOfferLeadResponse[] = [];

  for (const offer of data.offers) {
    if (offer.offer.archivedByProAt !== null) {
      archived.push(offer);
    } else if (offer.offer.status === OfferStatusEnum.ACCEPTED) {
      accepted.push(offer);
    } else if (offer.offer.status === OfferStatusEnum.PENDING) {
      pending.push(offer);
    } else if (offer.offer.status === OfferStatusEnum.REJECTED) {
      rejected.push(offer);
    }
  }

  return {
    acceptedLeads: accepted,
    pendingLeads: pending,
    rejectedLeads: rejected,
    archivedLeads: archived,
    likedLeads: data?.likes || [],
  };
}
