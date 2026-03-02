import { MultiSelect } from "@/components/dashboard/MultiSelect";
import { Chip, ChipColor } from "@/components/dashboard/Chip";

interface FilterRowProps {
  label: string;
  color: ChipColor;
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
  noSelectionMessage?: string;
  selectLabel?: string;
  labelClassName?: string;
  className?: string;
}

export function FilterRow({
  label,
  color,
  options,
  value,
  onChange,
  noSelectionMessage,
  selectLabel = "Sélectionner",
  labelClassName = "text-xs font-medium text-gray-500 uppercase tracking-wide",
  className = "space-y-2 pb-5 border-b border-gray-100 last:border-b-0 last:pb-0",
}: FilterRowProps) {
  return (
    <div className={className}>
      <span className={labelClassName}>{label}</span>
      <MultiSelect label={selectLabel} options={options} value={value} onChange={onChange} />
      {value.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {value.map((v) => (
            <Chip
              key={v}
              label={v}
              color={color}
              onRemove={() => onChange(value.filter((x) => x !== v))}
            />
          ))}
        </div>
      )}
      {value.length === 0 && noSelectionMessage && (
        <div className="text-xs text-gray-500 ml-1">
          <span className="text-gray-500">{noSelectionMessage}</span>
        </div>
      )}
    </div>
  );
}
