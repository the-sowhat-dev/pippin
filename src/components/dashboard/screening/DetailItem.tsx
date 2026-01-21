import { ReactNode } from 'react';
import { SimpleBadge } from '../SimpleBadge';

interface DetailItemProps {
  label: string;
  value: string | null | undefined | number | ReactNode;
  badge?: boolean;
}

export const DetailItem = ({ label, value, badge = false }: DetailItemProps) => {
  if (value === null || value === undefined) {
    return (
      <div className="flex flex-col gap-1">
        <span className="text-sm text-gray-500">{label}</span>
        <span className="font-medium text-gray-900">--</span>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm text-gray-500">{label}</span>
      {badge ? (
        <SimpleBadge className="bg-gray-100 text-gray-800 w-fit">{value}</SimpleBadge>
      ) : (
        <span className="font-medium text-gray-900 text-pretty break-words">{value}</span>
      )}
    </div>
  );
};
