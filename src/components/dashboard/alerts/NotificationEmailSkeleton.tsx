import { Loader2 } from "lucide-react";

export const NotificationEmailSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-50 bg-gray-50/50">
        <div className="h-5 w-48 bg-gray-200 animate-pulse rounded" />
      </div>
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-gray-300" />
      </div>
    </div>
  );
};
