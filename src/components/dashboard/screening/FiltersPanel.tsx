import { X } from 'lucide-react';
import {
  ProjectNeeds,
  FinancialProducts,
  DepartmentsList,
  PersonalSalaryRanges,
  PersonalNetWorthRanges,
} from 'sowhat-types';

import { RangeSlider } from '../RangeSlider';
import { MultiSelect } from '../MultiSelect';
import { formatAmount } from '@/utils/formatAmount';
import { InitialLeadsFiltersAndSorting, LeadsFiltersAndSorting } from '@/utils/filters';

const NEEDS_OPTIONS = ProjectNeeds.map((n) => n.proLabel);
const PRODUCTS_OPTIONS = FinancialProducts.map((p) => p.label);
const SALARY_OPTIONS = PersonalSalaryRanges.map((p) => p.label);
const NET_WORTH_OPTIONS = PersonalNetWorthRanges.map((p) => p.label);
const DEPARTMENT_OPTIONS = DepartmentsList.map((d) => `${d.code} - ${d.departmentName}`);

interface FiltersPanelProps {
  filters: LeadsFiltersAndSorting;
  onChange: (filters: LeadsFiltersAndSorting) => void;
}

export const FiltersPanel = ({ filters, onChange }: FiltersPanelProps) => {
  // Transform stored codes to display values for MultiSelect
  const selectedDepartments = filters.postalCodes.map((code) => {
    const dept = DepartmentsList.find((d) => d.code === code);
    return dept ? `${dept.code} - ${dept.departmentName}` : code;
  });

  const handleDepartmentsChange = (values: string[]) => {
    // Extract codes from "Code - Name"
    const codes = values.map((v) => v.split(' - ')[0]);
    onChange({ ...filters, postalCodes: codes });
  };

  return (
    <div className="sticky top-4 flex flex-col gap-4">
      {/* Filters */}
      <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm space-y-8">
        <div>
          <h2 className="font-bold text-green-900 mb-4">Filtres</h2>

          {/* Amount Slider */}
          <div className="space-y-4 border-b border-gray-100 pb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-800/60">Montant initial</span>
            </div>
            <RangeSlider
              min={0}
              max={1_000_000}
              breakPoint={{ value: 50_000, percentage: 75 }}
              value={[filters.minInitialAmount, filters.maxInitialAmount]}
              onValueChange={([min, max]) =>
                onChange({ ...filters, minInitialAmount: min, maxInitialAmount: max })
              }
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>{formatAmount(filters.minInitialAmount)}</span>
              <span>{formatAmount(filters.maxInitialAmount)}</span>
            </div>
          </div>
        </div>

        {/* Needs */}
        <div className="space-y-2 border-b border-gray-100 pb-4">
          <span className="text-sm font-medium text-gray-800/60">Besoins</span>
          <MultiSelect
            label="Sélectionner des besoins"
            options={NEEDS_OPTIONS}
            value={filters.needs}
            onChange={(needs) => onChange({ ...filters, needs })}
          />
          {filters.needs.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {filters.needs.map((need) => (
                <span
                  key={need}
                  className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700 max-w-full"
                  title={need}
                >
                  <span className="truncate max-w-[200px]">{need}</span>
                  <button
                    onClick={() =>
                      onChange({
                        ...filters,
                        needs: filters.needs.filter((n) => n !== need),
                      })
                    }
                    className="ml-1 hover:text-blue-900 flex-shrink-0"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Products */}
        <div className="border-b border-gray-100 pb-4">
          <div className="space-y-2">
            <span className="text-sm font-medium text-gray-800/60">
              Produits financiers recherchés
            </span>
            <MultiSelect
              label="Sélectionner des produits"
              options={PRODUCTS_OPTIONS}
              value={filters.financialProducts}
              onChange={(financialProducts) =>
                onChange({
                  ...filters,
                  financialProducts,
                  onlyWithoutProduct:
                    financialProducts.length > 0 && filters.onlyWithoutProduct
                      ? false
                      : filters.onlyWithoutProduct,
                })
              }
            />
            {filters.financialProducts.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {filters.financialProducts.map((p) => (
                  <span
                    key={p}
                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-50 text-green-700 max-w-full"
                    title={p}
                  >
                    <span className="truncate max-w-[200px]">{p}</span>
                    <button
                      onClick={() =>
                        onChange({
                          ...filters,
                          financialProducts: filters.financialProducts.filter((x) => x !== p),
                        })
                      }
                      className="ml-1 hover:text-green-900 flex-shrink-0"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Salary Ranges */}
        <div className="border-b border-gray-100 pb-4">
          <div className="space-y-2">
            <span className="text-sm font-medium text-gray-800/60">Revenus personnels déclarés</span>
            <MultiSelect
              label="Sélectionner les revenus personnels"
              options={SALARY_OPTIONS}
              value={filters.personalSalaryRanges}
              onChange={(personalSalaryRanges) =>
                onChange({ ...filters, personalSalaryRanges })
              }
            />
            {filters.personalSalaryRanges.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {filters.personalSalaryRanges.map((range) => (
                  <span
                    key={range}
                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-50 text-orange-700 max-w-full"
                    title={range}
                  >
                    <span className="truncate max-w-[200px]">{range}</span>
                    <button
                      onClick={() =>
                        onChange({
                          ...filters,
                          personalSalaryRanges: filters.personalSalaryRanges.filter(
                            (x) => x !== range
                          ),
                        })
                      }
                      className="ml-1 hover:text-orange-900 flex-shrink-0"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Net Worth Ranges */}
        <div className="border-b border-gray-100 pb-4">
          <div className="space-y-2">
            <span className="text-sm font-medium text-gray-800/60">Patrimoines personnels déclarés</span>
            <MultiSelect
              label="Sélectionner les patrimoines personnels"
              options={NET_WORTH_OPTIONS}
              value={filters.personalNetWorthRanges}
              onChange={(personalNetWorthRanges) =>
                onChange({ ...filters, personalNetWorthRanges })
              }
            />
            {filters.personalNetWorthRanges.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {filters.personalNetWorthRanges.map((range) => (
                  <span
                    key={range}
                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-teal-50 text-teal-700 max-w-full"
                    title={range}
                  >
                    <span className="truncate max-w-[200px]">{range}</span>
                    <button
                      onClick={() =>
                        onChange({
                          ...filters,
                          personalNetWorthRanges: filters.personalNetWorthRanges.filter(
                            (x) => x !== range
                          ),
                        })
                      }
                      className="ml-1 hover:text-teal-900 flex-shrink-0"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Postal Codes */}
        <div className="space-y-2">
          <span className="text-sm font-medium text-gray-800/60">Codes postaux (Départements)</span>
          <MultiSelect
            label="Sélectionner des départements"
            options={DEPARTMENT_OPTIONS}
            value={selectedDepartments}
            onChange={handleDepartmentsChange}
          />
          {filters.postalCodes.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {selectedDepartments.map((dept) => (
                <span
                  key={dept}
                  className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-50 text-purple-700 max-w-full"
                  title={dept}
                >
                  <span className="truncate max-w-[200px]">{dept}</span>
                  <button
                    onClick={() =>
                      onChange({
                        ...filters,
                        postalCodes: filters.postalCodes.filter((c) => !dept.startsWith(c)),
                      })
                    }
                    className="ml-1 hover:text-purple-900 flex-shrink-0"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Only Outside France */}
        {/* <div className="flex items-center space-x-2">
          <CheckboxPrimitive.Root
            id="outside-france"
            checked={filters.onlyOutsideFrance}
            onCheckedChange={(checked) =>
              onChange({
                ...filters,
                onlyOutsideFrance: checked === true,
                postalCodes: checked === true ? [] : filters.postalCodes,
              })
            }
            className="flex h-5 w-5 appearance-none items-center justify-center rounded border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-blue-500/20 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
          >
            <CheckboxPrimitive.Indicator className="text-white">
              <Check className="h-3.5 w-3.5" />
            </CheckboxPrimitive.Indicator>
          </CheckboxPrimitive.Root>
          <label
            htmlFor="outside-france"
            className="text-sm font-medium text-gray-700 cursor-pointer select-none"
          >
            Uniquement les non résident Français
          </label>
        </div> */}
      </div>

      {/* Sorting */}
      <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm space-y-8">
        <h2 className="font-bold text-green-900 mb-4">Trier par</h2>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="sort-created-at"
              name="sortBy"
              value="user_created_at"
              checked={filters.sortBy === 'user_created_at'}
              onChange={() => onChange({ ...filters, sortBy: 'user_created_at' })}
              className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="sort-created-at" className="text-sm text-gray-700 cursor-pointer">
              Date d'inscription sur invstore® app
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="sort-initial-amount"
              name="sortBy"
              value="initial_amount"
              checked={filters.sortBy === 'initial_amount'}
              onChange={() => onChange({ ...filters, sortBy: 'initial_amount' })}
              className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="sort-initial-amount" className="text-sm text-gray-700 cursor-pointer">
              Montant initial
            </label>
          </div>
        </div>
      </div>

      {/* Reset filters */}
      <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm space-y-8">
        <button
          onClick={() => onChange(InitialLeadsFiltersAndSorting)}
          className="w-full py-2 text-sm text-gray-500 hover:text-gray-900 underline decoration-gray-300 hover:decoration-gray-900"
        >
          Réinitialiser les filtres
        </button>
      </div>
    </div>
  );
};
