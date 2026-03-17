interface DetailRowProps {
  label: string;
  value: string | null | undefined;
}

export const DetailRow = ({ label, value }: DetailRowProps) => {
  if (!value) return null;

  return (
    <div className="flex flex-col gap-1">
      <dt className="text-xs uppercase tracking-wide text-slate-400 font-medium">{label}</dt>
      <dd className="text-sm text-slate-700 font-medium truncate" title={value}>
        {value}
      </dd>
    </div>
  );
};
