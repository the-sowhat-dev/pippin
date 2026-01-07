import { Check, X } from 'lucide-react';
import { ProjectNeeds, FinancialProducts } from 'sowhat-types';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

import { RangeSlider } from '../RangeSlider';
import { MultiSelect } from '../MultiSelect';
import { LeadsFilters } from '@/utils/filters';
import { formatAmount } from '@/utils/formatAmount';

const NEEDS_OPTIONS = ProjectNeeds.map((n) => n.proLabel);
const PRODUCTS_OPTIONS = FinancialProducts.map((p) => p.label);

interface FiltersPanelProps {
  filters: LeadsFilters;
  onChange: (filters: LeadsFilters) => void;
}

export const FiltersPanel = ({ filters, onChange }: FiltersPanelProps) => {
  return (
    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm space-y-8 sticky top-4">
      <div>
        <h2 className="font-semibold text-gray-900 mb-4">Filtres</h2>

        {/* Amount Slider */}
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Montant initial</span>
          </div>
          <RangeSlider
            min={0}
            max={700_000}
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
      <div className="space-y-2">
        <span className="text-sm font-medium text-gray-700">Besoins</span>
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
      <div className="space-y-2">
        <span className="text-sm font-medium text-gray-700">Produits financiers</span>
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

      {/* Only Without Product */}
      <div className="flex items-center space-x-2 pt-2 border-t border-gray-100">
        <CheckboxPrimitive.Root
          id="without-product"
          checked={filters.onlyWithoutProduct}
          onCheckedChange={(checked) =>
            onChange({
              ...filters,
              onlyWithoutProduct: checked === true,
              financialProducts: checked === true ? [] : filters.financialProducts,
            })
          }
          className="flex h-5 w-5 appearance-none items-center justify-center rounded border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-blue-500/20 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
        >
          <CheckboxPrimitive.Indicator className="text-white">
            <Check className="h-3.5 w-3.5" />
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
        <label
          htmlFor="without-product"
          className="text-sm font-medium text-gray-700 cursor-pointer select-none"
        >
          Uniquement sans produit
        </label>
      </div>

      {/* Reset filters */}
      <button
        onClick={() =>
          onChange({
            minInitialAmount: 0,
            maxInitialAmount: 1000000,
            needs: [],
            financialProducts: [],
            onlyWithoutProduct: false,
          })
        }
        className="w-full py-2 text-sm text-gray-500 hover:text-gray-900 underline decoration-gray-300 hover:decoration-gray-900"
      >
        Réinitialiser les filtres
      </button>
    </div>
  );
};
