"use client";

import { useState } from "react";
import type { MonthlyMetricEntry } from "sowhat-types";

type ChartColor = "teal" | "blue" | "amber";

interface MonthlyBarChartProps {
  data: MonthlyMetricEntry[];
  color: ChartColor;
  formatValue?: (value: number) => string;
}

const COLOR_MAP: Record<ChartColor, { base: string; current: string; hover: string }> = {
  teal: { base: "bg-teal-300", current: "bg-teal-600", hover: "bg-teal-400" },
  blue: { base: "bg-blue-300", current: "bg-blue-600", hover: "bg-blue-400" },
  amber: { base: "bg-amber-300", current: "bg-amber-600", hover: "bg-amber-400" },
};

function getMonthAbbr(year: number, month: number): string {
  return new Intl.DateTimeFormat("fr-FR", { month: "short" }).format(new Date(year, month - 1));
}

export function MonthlyBarChart({ data, color, formatValue }: MonthlyBarChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  const maxValue = Math.max(...data.map((e) => (e.count !== null ? e.count : 0)), 1);

  const colors = COLOR_MAP[color];

  return (
    <div className="w-full">
      {/* Bars */}
      <div className="flex items-end gap-[3px] h-20">
        {data.map((entry, index) => {
          const isCurrentMonth = entry.year === currentYear && entry.month === currentMonth;
          const isHovered = hoveredIndex === index;
          const isNull = entry.count === null;
          const count = entry.count ?? 0;

          // null → very short placeholder bar; 0 → 2px floor; else proportional
          const heightPct = isNull ? 15 : count === 0 ? 2 : Math.max(8, (count / maxValue) * 100);

          const barClass = isNull
            ? "bg-gray-100 border border-dashed border-gray-300"
            : isCurrentMonth
              ? colors.current
              : isHovered
                ? colors.hover
                : colors.base;

          return (
            <div
              key={index}
              className="relative flex flex-col items-center justify-end flex-1 h-full cursor-default"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}>
              {/* Tooltip */}
              {isHovered && (
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] leading-none rounded px-2 py-1 whitespace-nowrap z-10 pointer-events-none shadow-md">
                  {isNull ? "—" : formatValue ? formatValue(count) : String(count)}
                </div>
              )}

              {/* Bar */}
              <div
                className={`w-full rounded-t-[2px] transition-all duration-100 ${barClass}`}
                style={{ height: `${heightPct}%` }}
              />
            </div>
          );
        })}
      </div>

      {/* X-axis month labels */}
      <div className="flex gap-[3px] mt-1">
        {data.map((entry, index) => {
          const isCurrentMonth = entry.year === currentYear && entry.month === currentMonth;
          return (
            <div key={index} className="flex-1 flex justify-center">
              <span
                className={`text-[9px] leading-none ${
                  isCurrentMonth ? "font-semibold text-gray-700" : "text-gray-400"
                }`}>
                {getMonthAbbr(entry.year, entry.month)}
              </span>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-3 mt-2">
        <span className="flex items-center gap-1 text-[10px] text-gray-400">
          <span className={`inline-block w-2 h-2 rounded-[1px] ${colors.current}`} />
          Mois en cours
        </span>
        <span className="flex items-center gap-1 text-[10px] text-gray-400">
          <span className="inline-block w-2 h-2 rounded-[1px] bg-gray-100 border border-dashed border-gray-300" />
          Non disponible
        </span>
      </div>
    </div>
  );
}
