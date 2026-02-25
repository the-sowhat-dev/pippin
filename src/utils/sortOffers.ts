import {
  MatchingLeadsResponse,
  OfferStatusEnum,
  ProCommercialOfferLeadResponse,
  ProUserLikeLeadResponse,
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

  return {
    acceptedLeads:
      data?.offers.filter(
        (o) =>
          o.offer.status === OfferStatusEnum.ACCEPTED ||
          o.offer.status === OfferStatusEnum.ACCEPTED_THEN_ARCHIVED_BY_USER,
      ) || [],
    pendingLeads: data?.offers.filter((o) => o.offer.status === OfferStatusEnum.PENDING) || [],
    rejectedLeads:
      data?.offers.filter(
        (o) =>
          o.offer.status === OfferStatusEnum.REJECTED ||
          o.offer.status === OfferStatusEnum.REJECTED_THEN_ARCHIVED_BY_USER,
      ) || [],
    archivedLeads:
      data?.offers.filter((o) => o.offer.status === OfferStatusEnum.ARCHIVED_BY_PRO) || [],
    likedLeads: data?.likes || [],
  };
}
