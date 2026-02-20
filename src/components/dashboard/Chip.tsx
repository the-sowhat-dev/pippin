import { X } from "lucide-react";

export type ChipColor = "blue" | "green" | "orange" | "teal" | "purple";

const chipColors: Record<ChipColor, string> = {
  blue: "bg-blue-50 text-blue-700",
  green: "bg-green-50 text-green-700",
  orange: "bg-orange-50 text-orange-700",
  teal: "bg-teal-50 text-teal-700",
  purple: "bg-purple-50 text-purple-700",
};

export function Chip({
  label,
  color,
  onRemove,
}: {
  label: string;
  color: ChipColor;
  onRemove: () => void;
}) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium max-w-full ${chipColors[color]}`}
      title={label}>
      <span className="truncate max-w-[180px]">{label}</span>
      <button
        onClick={onRemove}
        className="ml-1 opacity-60 hover:opacity-100 flex-shrink-0 transition-opacity">
        <X className="w-3 h-3" />
      </button>
    </span>
  );
}
