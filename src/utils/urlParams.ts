import { LeadsFiltersAndSorting, InitialLeadsFiltersAndSorting } from "./filters";

export const filtersToSearchParams = (filters: LeadsFiltersAndSorting): URLSearchParams => {
  const params = new URLSearchParams();

  if (filters.minInitialAmount !== InitialLeadsFiltersAndSorting.minInitialAmount) {
    params.set("minInitialAmount", filters.minInitialAmount.toString());
  }
  if (filters.maxInitialAmount !== InitialLeadsFiltersAndSorting.maxInitialAmount) {
    params.set("maxInitialAmount", filters.maxInitialAmount.toString());
  }

  filters.needs.forEach((need) => params.append("needs", need));
  filters.financialProducts.forEach((product) => params.append("financialProducts", product));

  if (filters.onlyWithoutProduct !== InitialLeadsFiltersAndSorting.onlyWithoutProduct) {
    params.set("onlyWithoutProduct", filters.onlyWithoutProduct.toString());
  }

  filters.postalCodes.forEach((code) => params.append("postalCodes", code));

  if (filters.onlyOutsideFrance !== InitialLeadsFiltersAndSorting.onlyOutsideFrance) {
    params.set("onlyOutsideFrance", filters.onlyOutsideFrance.toString());
  }

  filters.personalNetWorthRanges.forEach((range) => params.append("personalNetWorthRanges", range));
  filters.personalSalaryRanges.forEach((range) => params.append("personalSalaryRanges", range));

  if (filters.sortBy !== InitialLeadsFiltersAndSorting.sortBy) {
    params.set("sortBy", filters.sortBy);
  }

  if (filters.sortOrder !== InitialLeadsFiltersAndSorting.sortOrder) {
    params.set("sortOrder", filters.sortOrder);
  }

  return params;
};

export const searchParamsToFilters = (searchParams: URLSearchParams): LeadsFiltersAndSorting => {
  const filters = { ...InitialLeadsFiltersAndSorting };

  const minInitialAmount = searchParams.get("minInitialAmount");
  if (minInitialAmount) filters.minInitialAmount = Number(minInitialAmount);

  const maxInitialAmount = searchParams.get("maxInitialAmount");
  if (maxInitialAmount) filters.maxInitialAmount = Number(maxInitialAmount);

  const needs = searchParams.getAll("needs");
  if (needs.length > 0) filters.needs = needs;

  const financialProducts = searchParams.getAll("financialProducts");
  if (financialProducts.length > 0) filters.financialProducts = financialProducts;

  const onlyWithoutProduct = searchParams.get("onlyWithoutProduct");
  if (onlyWithoutProduct) filters.onlyWithoutProduct = onlyWithoutProduct === "true";

  const postalCodes = searchParams.getAll("postalCodes");
  if (postalCodes.length > 0) filters.postalCodes = postalCodes;

  const onlyOutsideFrance = searchParams.get("onlyOutsideFrance");
  if (onlyOutsideFrance) filters.onlyOutsideFrance = onlyOutsideFrance === "true";

  const personalNetWorthRanges = searchParams.getAll("personalNetWorthRanges");
  if (personalNetWorthRanges.length > 0) filters.personalNetWorthRanges = personalNetWorthRanges;

  const personalSalaryRanges = searchParams.getAll("personalSalaryRanges");
  if (personalSalaryRanges.length > 0) filters.personalSalaryRanges = personalSalaryRanges;

  const sortBy = searchParams.get("sortBy");
  if (sortBy && (sortBy === "user_created_at" || sortBy === "initial_amount")) {
    filters.sortBy = sortBy;
  }

  const sortOrder = searchParams.get("sortOrder");
  if (sortOrder && (sortOrder === "asc" || sortOrder === "desc")) {
    filters.sortOrder = sortOrder;
  }

  return filters;
};
