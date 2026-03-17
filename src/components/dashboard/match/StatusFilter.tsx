import { OfferStatusFilterType } from "@/hooks/useGetOffers";
import { cn } from "@/utils/cn";
import { CheckCircle2, Clock, XCircle, Archive } from "lucide-react";

interface StatusFilterProps {
  selectedStatus: string;
  onSelectStatus: (status: OfferStatusFilterType) => void;
}

interface StatusFilterItem {
  label: string;
  value: OfferStatusFilterType;
  color: string;
  bg: string;
  activeBg: string;
  icon: React.ElementType;
}

const statuses: StatusFilterItem[] = [
  {
    label: "Acceptées",
    value: "accepted",
    icon: CheckCircle2,
    color: "text-green-600",
    bg: "bg-green-100/50",
    activeBg: "bg-green-100",
  },
  {
    label: "En attente",
    value: "pending",
    icon: Clock,
    color: "text-blue-600",
    bg: "bg-blue-100/50",
    activeBg: "bg-blue-100",
  },
  {
    label: "Refusées",
    value: "rejected",
    icon: XCircle,
    color: "text-red-600",
    bg: "bg-red-100/50",
    activeBg: "bg-red-100",
  },
  {
    label: "Archivées",
    value: "archived",
    icon: Archive,
    color: "text-slate-500",
    bg: "bg-slate-100/50",
    activeBg: "bg-slate-200",
  },
];

export const StatusFilter = ({ selectedStatus, onSelectStatus }: StatusFilterProps) => {
  return (
    <div className="space-y-1">
      {statuses.map((status) => {
        const isSelected = selectedStatus === status.value;
        const Icon = status.icon;
        return (
          <button
            key={status.value}
            onClick={() => onSelectStatus(status.value)}
            className={cn(
              "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
              isSelected
                ? `${status.activeBg} text-slate-900 shadow-sm`
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
            )}>
            <div className="flex items-center gap-3">
              <Icon className={cn("w-4 h-4", isSelected ? status.color : "text-slate-400")} />
              <span>{status.label}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
};
