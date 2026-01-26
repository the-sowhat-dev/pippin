'use client';

import { Loader2 } from 'lucide-react';
import { useAuth } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useInfiniteQuery, keepPreviousData } from '@tanstack/react-query';

import { LeadsList } from './LeadsList';
import { getLeads } from '@/lib/api';
import { FiltersPanel } from './FiltersPanel';
import { LeadsFiltersAndSorting } from '@/utils/filters';
import { filtersToSearchParams, searchParamsToFilters } from '@/utils/urlParams';

export const ProLeadsContent = () => {
  const router = useRouter();
  const { getToken } = useAuth();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<LeadsFiltersAndSorting>(() => {
    const params = new URLSearchParams(searchParams.toString());
    return searchParamsToFilters(params);
  });

  const [debouncedFilters, setDebouncedFilters] = useState<LeadsFiltersAndSorting>(filters);

  // Debounce logic
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilters(filters);
    }, 400); // 400ms debounce

    return () => clearTimeout(handler);
  }, [filters]);

  // Sync URL with filters
  useEffect(() => {
    const params = filtersToSearchParams(debouncedFilters);
    const queryString = params.toString();
    router.replace(`${pathname}?${queryString}`, { scroll: false });
  }, [debouncedFilters, pathname, router]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status, isFetching } =
    useInfiniteQuery({
      queryKey: ['pro-leads', debouncedFilters],
      queryFn: async ({ pageParam }: { pageParam: string | null }) => {
        const token = await getToken();
        return getLeads(debouncedFilters, pageParam, token);
      },
      initialPageParam: null,
      getNextPageParam: (lastPage) => (lastPage.nextCursor ? lastPage.nextCursor : null),
      staleTime: 30 * 1000, // 30s
      placeholderData: keepPreviousData,
    });

  const leads = data?.pages.flatMap((page) => page.items || []) || [];
  const totalCount = data?.pages[0]?.total;

  const isLoadingInitial = status === 'pending';
  const isError = status === 'error';

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      {/* Sidebar Filters - Desktop: w-1/4, Mobile: Full width (could be in a sheet, but sticking to simple layout for now) */}
      <aside className="w-full lg:w-1/4 min-w-[300px]">
        <FiltersPanel filters={filters} onChange={setFilters} />
      </aside>

      {/* Main Content */}
      <section className="flex-1 w-full min-w-0">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2 h-6">
            {isFetching && !isLoadingInitial && !isFetchingNextPage && (
              <div className="flex items-center text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full animate-in fade-in">
                <Loader2 className="w-3 h-3 animate-spin mr-1.5" />
                Mise à jour...
              </div>
            )}
          </div>
        </div>

        <LeadsList
          leads={leads}
          isLoading={isLoadingInitial}
          isError={isError}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
          totalCount={totalCount}
        />
      </section>
    </div>
  );
}
