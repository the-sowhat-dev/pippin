import * as Select from "@radix-ui/react-select";
import { ChevronDownIcon, CheckIcon } from "@radix-ui/react-icons";

const SORT_OPTIONS = [
  { value: "date_desc", label: "Plus récent" },
  { value: "date_asc", label: "Plus ancien" },
  { value: "alpha_asc", label: "A → Z" },
  { value: "alpha_desc", label: "Z → A" },
] as const;

interface SortArticleSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export const SortArticleSelect = ({ value, onChange }: SortArticleSelectProps) => {
  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger
        className="group flex items-center gap-1.5 text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white/80 backdrop-blur-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-300 cursor-pointer hover:border-gray-300 transition-all data-[state=open]:border-green-400 data-[state=open]:ring-2 data-[state=open]:ring-green-200 shadow-sm"
        aria-label="Trier les articles">
        <Select.Value />
        <Select.Icon>
          <ChevronDownIcon className="w-3.5 h-3.5 text-gray-400 group-data-[state=open]:rotate-180 transition-transform duration-200" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 min-w-[160px] animate-in fade-in-0 zoom-in-95 duration-100"
          position="popper"
          sideOffset={6}
          align="end">
          <Select.Viewport className="p-1.5">
            {SORT_OPTIONS.map((opt) => (
              <Select.Item
                key={opt.value}
                value={opt.value}
                className="flex items-center justify-between gap-3 px-3 py-2 text-sm text-gray-600 rounded-lg cursor-pointer select-none outline-none hover:bg-green-50 hover:text-green-900 focus:bg-green-50 focus:text-green-900 data-[state=checked]:text-green-700 data-[state=checked]:font-semibold transition-colors">
                <Select.ItemText>{opt.label}</Select.ItemText>
                <Select.ItemIndicator>
                  <CheckIcon className="w-3.5 h-3.5 text-green-600 shrink-0" />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};
