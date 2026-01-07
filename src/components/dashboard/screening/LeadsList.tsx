import { Loader2 } from 'lucide-react';
import { LeadResponse } from 'sowhat-types';

import { LeadRow } from './LeadRow';

interface LeadsListProps {
  leads: LeadResponse[];
  isLoading: boolean;
  isError: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
  totalCount?: number;
}

const LeadRowSkeleton = () => (
  <div className="bg-white rounded-lg border border-gray-100 p-4 mb-3 animate-pulse">
    <div className="flex items-center gap-4">
      <div className="h-10 w-10 rounded-full bg-gray-200" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-1/4" />
        <div className="h-3 bg-gray-200 rounded w-1/6" />
      </div>
    </div>
  </div>
);

export const LeadsList = ({
  leads,
  isLoading,
  isError,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
  totalCount,
}: LeadsListProps) => {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <LeadRowSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-12 bg-white rounded-xl border border-red-100">
        <div className="text-red-500 mb-2">
          Une erreur est survenue lors du chargement des leads.
        </div>
        <button
          onClick={() => window.location.reload()}
          className="text-sm text-gray-600 underline hover:text-gray-900"
        >
          Réessayer
        </button>
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-xl border border-dashed border-gray-200">
        <div className="text-gray-400 mb-2">Aucun résultat trouvé</div>
        <p className="text-sm text-gray-500">
          Essayez de modifier vos filtres pour voir plus de résultats.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 text-sm text-gray-500 font-medium">
        {totalCount !== undefined ? `${totalCount} résultats trouvés` : 'Résultats'}
      </div>

      <div className="space-y-3">
        {leads.map((lead) => (
          <LeadRow key={lead.userId} lead={lead} />
        ))}
      </div>

      {hasNextPage && (
        <div className="mt-8 text-center">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="px-6 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors inline-flex items-center gap-2"
          >
            {isFetchingNextPage && <Loader2 className="w-4 h-4 animate-spin" />}
            {isFetchingNextPage ? 'Chargement...' : 'Charger plus'}
          </button>
        </div>
      )}
    </div>
  );
};
