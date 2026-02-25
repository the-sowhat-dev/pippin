import { Check, ChevronDown } from "lucide-react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import { cn } from "../../utils/cn";

interface MultiSelectProps {
  label: string;
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
}

export const MultiSelect = ({ label, options, value, onChange }: MultiSelectProps) => {
  return (
    <PopoverPrimitive.Root>
      <PopoverPrimitive.Trigger asChild>
        <button className="flex items-center justify-between w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-md hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
          <span className="truncate">
            {value.length === 0
              ? label
              : `${value.length} sélectionné${value.length > 1 ? "s" : ""}`}
          </span>
          <ChevronDown className="w-4 h-4 text-gray-500 ml-2" />
        </button>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content className="z-50 w-[280px] p-2 bg-white rounded-md shadow-lg border border-gray-100 animate-in fade-in-0 zoom-in-95">
          <div className="space-y-1 max-h-60 overflow-y-auto">
            {options.map((option) => {
              const isSelected = value.includes(option);
              return (
                <div
                  key={option}
                  onClick={() => {
                    if (isSelected) {
                      onChange(value.filter((v) => v !== option));
                    } else {
                      onChange([...value, option]);
                    }
                  }}
                  className="flex items-start space-x-2 px-2 py-1.5 rounded-sm hover:bg-gray-100 cursor-pointer">
                  <div
                    className={cn(
                      "w-4 h-4 mt-0.5 rounded border flex items-center justify-center transition-colors flex-shrink-0",
                      isSelected
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "border-gray-300 bg-white",
                    )}>
                    {isSelected && <Check className="w-3 h-3" />}
                  </div>
                  <span className="text-sm text-gray-700 leading-tight">{option}</span>
                </div>
              );
            })}
          </div>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
};
