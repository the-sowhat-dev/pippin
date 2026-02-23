import {
  ProjectNeeds,
  getProjectNeedKey,
  FinancialProducts,
  FinancialProductEnum,
  PersonalSalaryRanges,
  ProLeadsAlertResponse,
  getFinancialProductKey,
  PersonalNetWorthRanges,
  PersonalSalaryRangeEnum,
  getPersonalSalaryRangeKey,
  PersonalNetWorthRangeEnum,
  getPersonalNetWorthRangeKey,
  CreateProLeadsAlertInput,
  ProjectNeedEnum,
  UpdateProLeadsAlertInput,
} from "sowhat-types";
import { sanitizeText } from "./sanitize";

export type AlertFilters = {
  name: string;
  minInitialAmount: number;
  maxInitialAmount: number;
  needs: string[];
  financialProducts: string[];
  postalCodes: string[];
  personalSalaryRanges: string[];
  personalNetWorthRanges: string[];
};

export const DefaultAlertFilters: AlertFilters = {
  name: "",
  minInitialAmount: 0,
  maxInitialAmount: 1_000_000,
  needs: [],
  financialProducts: [],
  postalCodes: [],
  personalSalaryRanges: [],
  personalNetWorthRanges: [],
};

export function alertToFilters(alert: ProLeadsAlertResponse): AlertFilters {
  return {
    name: alert.name,
    minInitialAmount: alert.minInitialAmount,
    maxInitialAmount: alert.maxInitialAmount,
    needs: alert.needs.map((k) => ProjectNeeds.find((n) => n.key === k)?.proLabel ?? k),
    financialProducts: alert.financialProducts.map(
      (k) => FinancialProducts.find((p) => p.key === k)?.label ?? k,
    ),
    postalCodes: alert.postalCodes,
    personalSalaryRanges: alert.personalSalaryRanges.map(
      (k) => PersonalSalaryRanges.find((r) => r.key === k)?.label ?? k,
    ),
    personalNetWorthRanges: alert.personalNetWorthRanges.map(
      (k) => PersonalNetWorthRanges.find((r) => r.key === k)?.label ?? k,
    ),
  };
}

export function filtersToCreateInput(filters: AlertFilters): CreateProLeadsAlertInput {
  const input = {
    name: sanitizeText(filters.name),
    minInitialAmount: Math.floor(filters.minInitialAmount),
    maxInitialAmount: Math.floor(filters.maxInitialAmount),
    needs: filters.needs.map((l) => getProjectNeedKey(l)).filter(Boolean) as ProjectNeedEnum[],
    financialProducts: filters.financialProducts
      .map((l) => getFinancialProductKey(l))
      .filter(Boolean) as FinancialProductEnum[],
    postalCodes: filters.postalCodes,
    personalSalaryRanges: filters.personalSalaryRanges
      .map((l) => getPersonalSalaryRangeKey(l))
      .filter(Boolean) as PersonalSalaryRangeEnum[],
    personalNetWorthRanges: filters.personalNetWorthRanges
      .map((l) => getPersonalNetWorthRangeKey(l))
      .filter(Boolean) as PersonalNetWorthRangeEnum[],
  };
  console.log(input);
  return input;
}

export function filtersToUpdateInput(id: string, filters: AlertFilters): UpdateProLeadsAlertInput {
  return {
    id,
    ...filtersToCreateInput(filters),
  };
}
