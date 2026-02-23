import {
  ProjectNeeds,
  DepartmentsList,
  FinancialProducts,
  PersonalSalaryRanges,
  PersonalNetWorthRanges,
} from "sowhat-types";

export const NEEDS_OPTIONS = ProjectNeeds.map((n) => n.proLabel);
export const PRODUCTS_OPTIONS = FinancialProducts.map((p) => p.label);
export const SALARY_OPTIONS = PersonalSalaryRanges.map((p) => p.label);
export const NET_WORTH_OPTIONS = PersonalNetWorthRanges.map((p) => p.label);
export const DEPARTMENT_OPTIONS = DepartmentsList.map((d) => `${d.code} - ${d.departmentName}`);
