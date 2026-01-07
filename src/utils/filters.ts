export type LeadsFilters = {
  minInitialAmount: number;
  maxInitialAmount: number;
  needs: string[];
  financialProducts: string[];
  onlyWithoutProduct: boolean;
};
