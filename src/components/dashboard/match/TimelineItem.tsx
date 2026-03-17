import { cn } from "@/utils/cn";
import { formatDateTime } from "@/utils/date";

interface TimelineItemProps {
  icon: any;
  date: Date | string | null | undefined;
  title: string;
  children?: React.ReactNode;
  isActive: boolean;
  color?: string;
  bgColor?: string;
}

export const TimelineItem = ({
  icon: Icon,
  date,
  title,
  children,
  isActive,
  color = "text-blue-600",
  bgColor = "bg-blue-100",
}: TimelineItemProps) => {
  if (!date && !isActive) return null;

  return (
    <div className="relative">
      <span
        className={cn(
          "absolute -left-[33px] top-0 flex h-6 w-6 items-center justify-center rounded-full ring-4 ring-white",
          bgColor,
          color,
        )}>
        <Icon className="w-3.5 h-3.5" />
      </span>
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
          {date && <time className="text-xs text-slate-400">{formatDateTime(date)}</time>}
        </div>
        {children}
      </div>
    </div>
  );
};
