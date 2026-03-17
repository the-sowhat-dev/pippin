import { getProCommercialOffers } from "@/lib/api";
import { useAuth } from "@clerk/nextjs";
import { useInfiniteQuery } from "@tanstack/react-query";

export type OfferStatusFilterType = "accepted" | "pending" | "rejected" | "archived";

export const useGetOffers = (selectedStatus: OfferStatusFilterType) => {
  const { getToken } = useAuth();

  return useInfiniteQuery({
    queryKey: ["pro-offers", selectedStatus],
    queryFn: async ({ pageParam = 0 }) => {
      const token = await getToken();
      return getProCommercialOffers(
        {
          limit: 20,
          offset: pageParam,
          status: selectedStatus,
        },
        token,
      );
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.hasMore) {
        return lastPage.pagination.offset + lastPage.pagination.limit;
      }
      return undefined;
    },
  });
};
