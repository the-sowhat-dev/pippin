import { Loader2 } from "lucide-react";

export const AlertsSkeleton = () => {
  return (
    <div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        <div className="p-4 border-b border-gray-50 bg-gray-50/50">
          <div className="h-5 w-32 bg-gray-200 animate-pulse rounded" />
        </div>
        <div className="p-6">
          <div className="h-4 w-full bg-gray-200 animate-pulse rounded" />
        </div>
      </div>
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-gray-300" />
      </div>
    </div>
  );
};
