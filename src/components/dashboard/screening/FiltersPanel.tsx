import {
  ProjectNeeds,
  FinancialProducts,
  DepartmentsList,
  PersonalSalaryRanges,
  PersonalNetWorthRanges,
} from 'sowhat-types';

import { RangeSlider } from '../RangeSlider';
import { MultiSelect } from '../MultiSelect';
import { Chip } from '../Chip';
import { FilterRow } from '../FilterRow';
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
        <FilterRow
          label="Besoins"
          color="blue"
          options={NEEDS_OPTIONS}
          value={filters.needs}
          onChange={(needs) => onChange({ ...filters, needs })}
          selectLabel="Sélectionner des besoins"
          labelClassName="text-sm font-medium text-gray-800/60"
          className="space-y-2 border-b border-gray-100 pb-4"
        />

        {/* Products */}
        <FilterRow
          label="Produits financiers recherchés"
          color="green"
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
          selectLabel="Sélectionner des produits"
          labelClassName="text-sm font-medium text-gray-800/60"
          className="space-y-2 border-b border-gray-100 pb-4"
        />

        {/* Salary Ranges */}
        <FilterRow
          label="Revenus personnels déclarés"
          color="orange"
          options={SALARY_OPTIONS}
          value={filters.personalSalaryRanges}
          onChange={(personalSalaryRanges) => onChange({ ...filters, personalSalaryRanges })}
          selectLabel="Sélectionner les revenus personnels"
          labelClassName="text-sm font-medium text-gray-800/60"
          className="space-y-2 border-b border-gray-100 pb-4"
        />

        {/* Net Worth Ranges */}
        <FilterRow
          label="Patrimoines personnels déclarés"
          color="teal"
          options={NET_WORTH_OPTIONS}
          value={filters.personalNetWorthRanges}
          onChange={(personalNetWorthRanges) => onChange({ ...filters, personalNetWorthRanges })}
          selectLabel="Sélectionner les patrimoines personnels"
          labelClassName="text-sm font-medium text-gray-800/60"
          className="space-y-2 border-b border-gray-100 pb-4"
        />

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
                <Chip
                  key={dept}
                  label={dept}
                  color="purple"
                  onRemove={() =>
                    onChange({
                      ...filters,
                      postalCodes: filters.postalCodes.filter((c) => !dept.startsWith(c)),
                    })
                  }
                />
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
