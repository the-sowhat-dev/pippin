export type LeadsFiltersAndSorting = {
  // Filters
  minInitialAmount: number;
  maxInitialAmount: number;
  needs: string[];
  financialProducts: string[];
  onlyWithoutProduct: boolean;
  postalCodes: string[];
  onlyOutsideFrance: boolean;

  // Sorting
  sortBy: 'user_created_at' | 'initial_amount';
  sortOrder: 'asc' | 'desc';
};

export const InitialLeadsFiltersAndSorting: LeadsFiltersAndSorting = {
  minInitialAmount: 0,
  maxInitialAmount: 1000000,
  needs: [],
  financialProducts: [],
  onlyWithoutProduct: false,
  postalCodes: [],
  onlyOutsideFrance: false,
  sortBy: 'user_created_at',
  sortOrder: 'desc',
};
