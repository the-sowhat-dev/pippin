"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@clerk/nextjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2, BellOff, Bell, Save, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import {
  ProjectNeeds,
  FinancialProducts,
  DepartmentsList,
  PersonalSalaryRanges,
  PersonalNetWorthRanges,
  ProjectNeedEnum,
  FinancialProductEnum,
  PersonalSalaryRangeEnum,
  PersonalNetWorthRangeEnum,
  ProLeadsAlertResponse,
  CreateProLeadsAlertInput,
  UpdateProLeadsAlertInput,
  getProjectNeedKey,
  getFinancialProductKey,
  getPersonalSalaryRangeKey,
  getPersonalNetWorthRangeKey,
} from "sowhat-types";
import { toast } from "sonner";

import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { MultiSelect } from "@/components/dashboard/MultiSelect";
import { RangeSlider } from "@/components/dashboard/RangeSlider";
import { Chip } from "@/components/dashboard/Chip";
import { FilterRow } from "@/components/dashboard/FilterRow";
import { createAlert, updateAlert, deleteAlert } from "@/lib/api";
import { formatAmount } from "@/utils/formatAmount";

// ─── Types ────────────────────────────────────────────────────────────────────

type AlertFilters = {
  name: string;
  minInitialAmount: number;
  maxInitialAmount: number;
  needs: string[];
  financialProducts: string[];
  postalCodes: string[];
  personalSalaryRanges: string[];
  personalNetWorthRanges: string[];
};

const DEFAULT_FILTERS: AlertFilters = {
  name: "",
  minInitialAmount: 0,
  maxInitialAmount: 1_000_000,
  needs: [],
  financialProducts: [],
  postalCodes: [],
  personalSalaryRanges: [],
  personalNetWorthRanges: [],
};

const NEEDS_OPTIONS = ProjectNeeds.map((n) => n.proLabel);
const PRODUCTS_OPTIONS = FinancialProducts.map((p) => p.label);
const SALARY_OPTIONS = PersonalSalaryRanges.map((p) => p.label);
const NET_WORTH_OPTIONS = PersonalNetWorthRanges.map((p) => p.label);
const DEPARTMENT_OPTIONS = DepartmentsList.map((d) => `${d.code} - ${d.departmentName}`);

// ─── Conversion helpers ────────────────────────────────────────────────────────

function alertToFilters(alert: ProLeadsAlertResponse): AlertFilters {
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

function filtersToCreateInput(filters: AlertFilters): CreateProLeadsAlertInput {
  return {
    name: filters.name.trim() || "Alerte",
    minInitialAmount: filters.minInitialAmount,
    maxInitialAmount: filters.maxInitialAmount,
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
}

function filtersToUpdateInput(id: string, filters: AlertFilters): UpdateProLeadsAlertInput {
  return {
    id,
    ...filtersToCreateInput(filters),
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

interface AlertCardProps {
  alert: ProLeadsAlertResponse | null;
  defaultName: string;
  onSaved: (alert: ProLeadsAlertResponse) => void;
  onDeleted: () => void;
  onCancel?: () => void;
}

export function AlertCard({ alert, defaultName, onSaved, onDeleted, onCancel }: AlertCardProps) {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  const isNew = alert === null;

  const [filters, setFilters] = useState<AlertFilters>(() =>
    isNew ? { ...DEFAULT_FILTERS, name: defaultName } : alertToFilters(alert!),
  );
  const [savedFilters, setSavedFilters] = useState<AlertFilters>(filters);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [filtersExpanded, setFiltersExpanded] = useState(isNew);

  const isDirty = JSON.stringify(filters) !== JSON.stringify(savedFilters);

  // Reset if the alert prop changes (e.g. after save refreshes)
  useEffect(() => {
    if (!isNew && alert) {
      const updated = alertToFilters(alert);
      setFilters(updated);
      setSavedFilters(updated);
    }
  }, [alert, isNew]);

  // Department display helpers
  const selectedDepartments = filters.postalCodes.map((code) => {
    const dept = DepartmentsList.find((d) => d.code === code);
    return dept ? `${dept.code} - ${dept.departmentName}` : code;
  });

  const handleDepartmentsChange = useCallback((values: string[]) => {
    const codes = values.map((v) => v.split(" - ")[0]);
    setFilters((f) => ({ ...f, postalCodes: codes }));
  }, []);

  // ── Mutations ──────────────────────────────────────────────────────────────

  const saveMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      if (isNew) {
        return createAlert(filtersToCreateInput(filters), token);
      } else {
        return updateAlert(filtersToUpdateInput(alert!.id, filters), token);
      }
    },
    onSuccess: (saved) => {
      setSavedFilters(alertToFilters(saved));
      queryClient.invalidateQueries({ queryKey: ["pro-alerts"] });
      toast.success(isNew ? "Alerte créée avec succès" : "Alerte mise à jour");
      onSaved(saved);
    },
    onError: () => {
      toast.error("Erreur lors de la sauvegarde de l'alerte");
    },
  });

  const toggleMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return updateAlert({ id: alert!.id, isActive: !alert!.isActive }, token);
    },
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: ["pro-alerts"] });
      toast.success(updated.isActive ? "Alerte activée" : "Alerte mise en pause");
      onSaved(updated);
    },
    onError: () => {
      toast.error("Erreur lors de la mise à jour de l'alerte");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return deleteAlert(alert!.id, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pro-alerts"] });
      toast.success("Alerte supprimée");
      setDeleteDialogOpen(false);
      onDeleted();
    },
    onError: () => {
      toast.error("Erreur lors de la suppression de l'alerte");
    },
  });

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-50 flex items-center gap-3">
          <input
            type="text"
            value={filters.name}
            onChange={(e) => setFilters((f) => ({ ...f, name: e.target.value }))}
            placeholder="Nom de l'alerte"
            className="flex-1 text-sm font-semibold text-gray-900 bg-transparent border-none outline-none placeholder:text-gray-400 focus:ring-0"
          />
          {!isNew && (
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                alert!.isActive ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"
              }`}>
              {alert!.isActive ? (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                  Active
                </>
              ) : (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 inline-block" />
                  En pause
                </>
              )}
            </span>
          )}
          <button
            onClick={() => setFiltersExpanded((v) => !v)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            title={filtersExpanded ? "Réduire" : "Voir les filtres"}>
            {filtersExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Filters */}
        {filtersExpanded && (
          <div className="p-5 space-y-6">
            {/* Amount */}
            <div className="space-y-3 pb-5 border-b border-gray-100">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Montant initial
              </span>
              <RangeSlider
                min={0}
                max={1_000_000}
                breakPoint={{ value: 50_000, percentage: 75 }}
                value={[filters.minInitialAmount, filters.maxInitialAmount]}
                onValueChange={([min, max]) =>
                  setFilters((f) => ({ ...f, minInitialAmount: min, maxInitialAmount: max }))
                }
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>{formatAmount(filters.minInitialAmount)}</span>
                <span>{formatAmount(filters.maxInitialAmount)}</span>
              </div>
            </div>

            {/* Needs */}
            <FilterRow
              label="Besoins"
              color="blue"
              options={NEEDS_OPTIONS}
              value={filters.needs}
              onChange={(needs) => setFilters((f) => ({ ...f, needs }))}
            />

            {/* Financial products */}
            <FilterRow
              label="Produits financiers recherchés"
              color="green"
              options={PRODUCTS_OPTIONS}
              value={filters.financialProducts}
              onChange={(financialProducts) => setFilters((f) => ({ ...f, financialProducts }))}
            />

            {/* Salary ranges */}
            <FilterRow
              label="Revenus personnels déclarés"
              color="orange"
              options={SALARY_OPTIONS}
              value={filters.personalSalaryRanges}
              onChange={(personalSalaryRanges) =>
                setFilters((f) => ({ ...f, personalSalaryRanges }))
              }
            />

            {/* Net worth ranges */}
            <FilterRow
              label="Patrimoine personnel déclaré"
              color="teal"
              options={NET_WORTH_OPTIONS}
              value={filters.personalNetWorthRanges}
              onChange={(personalNetWorthRanges) =>
                setFilters((f) => ({ ...f, personalNetWorthRanges }))
              }
            />

            {/* Departments */}
            <div className="space-y-2">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Départements
              </span>
              <MultiSelect
                label="Sélectionner des départements"
                options={DEPARTMENT_OPTIONS}
                value={selectedDepartments}
                onChange={handleDepartmentsChange}
              />
              {filters.postalCodes.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {selectedDepartments.map((dept, index) => (
                    <Chip
                      key={`${dept}-${index}`}
                      label={dept}
                      color="purple"
                      onRemove={() =>
                        setFilters((f) => ({
                          ...f,
                          postalCodes: f.postalCodes.filter((c) => !dept.startsWith(c)),
                        }))
                      }
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="px-5 py-3 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {!isNew && (
              <>
                <button
                  onClick={() => toggleMutation.mutate()}
                  disabled={toggleMutation.isPending}
                  className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50"
                  title={alert!.isActive ? "Mettre en pause" : "Activer"}>
                  {toggleMutation.isPending ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : alert!.isActive ? (
                    <BellOff className="w-3.5 h-3.5" />
                  ) : (
                    <Bell className="w-3.5 h-3.5" />
                  )}
                  {alert!.isActive ? "Mettre en pause" : "Activer"}
                </button>

                <span className="text-gray-200">|</span>

                <button
                  onClick={() => setDeleteDialogOpen(true)}
                  className="inline-flex items-center gap-1.5 text-xs text-red-400 hover:text-red-600 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                  Supprimer
                </button>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            {isNew && onCancel && (
              <button
                onClick={onCancel}
                className="text-xs text-gray-400 hover:text-gray-600 transition-colors px-3 py-1.5">
                Annuler
              </button>
            )}
            {!isNew && isDirty && (
              <button
                onClick={() => setFilters(savedFilters)}
                className="text-xs text-gray-400 hover:text-gray-600 transition-colors px-3 py-1.5">
                Annuler
              </button>
            )}
            {(isNew || isDirty) && (
              <Button
                size="sm"
                onClick={() => saveMutation.mutate()}
                disabled={saveMutation.isPending || !filters.name.trim()}
                className="bg-[#35C055] hover:bg-[#35C055]/80 text-white gap-1.5 text-xs h-7 px-3">
                {saveMutation.isPending ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Save className="w-3.5 h-3.5" />
                )}
                {isNew ? "Créer" : "Sauvegarder"}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Delete confirmation dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Supprimer l&apos;alerte</DialogTitle>
            <DialogDescription>
              Voulez-vous vraiment supprimer l&apos;alerte &ldquo;{alert?.name}&rdquo; ? Cette
              action est irréversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              disabled={deleteMutation.isPending}
              className="text-sm">
              Annuler
            </Button>
            <Button
              variant="destructive"
              onClick={() => deleteMutation.mutate()}
              disabled={deleteMutation.isPending}
              className="text-sm gap-1.5">
              {deleteMutation.isPending ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Trash2 className="w-3.5 h-3.5" />
              )}
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

