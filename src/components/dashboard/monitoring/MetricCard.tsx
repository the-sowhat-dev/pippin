import type { LucideIcon } from "lucide-react";
import type { MonthlyMetricEntry } from "sowhat-types";

import { LexendFont } from "@/utils/fonts";
import { MonthlyBarChart } from "./MonthlyBarChart";

type ChartColor = "teal" | "blue" | "amber";

interface MetricCardProps {
  title: string;
  description: string;
  data: MonthlyMetricEntry[];
  icon: LucideIcon;
  color: ChartColor;
  currentLabel: string;
  formatValue?: (value: number) => string;
}

const ACCENT: Record<ChartColor, { icon: string; badge: string; value: string }> = {
  teal: {
    icon: "text-teal-700",
    badge: "bg-teal-50 text-teal-700 border-teal-100",
    value: "text-teal-800",
  },
  blue: {
    icon: "text-sky-700",
    badge: "bg-sky-50 text-sky-700 border-sky-100",
    value: "text-sky-800",
  },
  amber: {
    icon: "text-amber-700",
    badge: "bg-amber-50 text-amber-700 border-amber-100",
    value: "text-amber-800",
  },
};

export function MetricCard({
  title,
  description,
  data,
  icon: Icon,
  color,
  currentLabel,
  formatValue,
}: MetricCardProps) {
  const now = new Date();
  const currentEntry = data.find(
    (e) => e.year === now.getFullYear() && e.month === now.getMonth() + 1,
  );
  const currentValue = currentEntry?.count ?? null;
  const accent = ACCENT[color];

  const displayValue =
    currentValue === null ? "—" : formatValue ? formatValue(currentValue) : String(currentValue);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-50 bg-gray-50/50 flex items-center gap-2">
        <Icon size={18} className={accent.icon} />
        <h3 className={`${LexendFont.className} ${accent.value}`}>{title}</h3>
      </div>

      {/* Body */}
      <div className="p-5 flex gap-6 items-center">
        {/* Current-month stat */}
        <div
          className={`shrink-0 flex flex-col items-center justify-center rounded-lg border px-5 py-4 min-w-[90px] ${accent.badge}`}>
          <span className={`${LexendFont.className} text-3xl font-semibold ${accent.value}`}>
            {displayValue}
          </span>
          <span className="text-[11px] mt-1 text-center leading-tight opacity-75">
            {currentLabel}
          </span>
        </div>

        {/* Chart + description */}
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-400 mb-3">{description}</p>
          <MonthlyBarChart data={data} color={color} formatValue={formatValue} />
        </div>
      </div>
    </div>
  );
}
