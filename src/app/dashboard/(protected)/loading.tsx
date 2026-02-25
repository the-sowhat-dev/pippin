import { Loader2 } from "lucide-react";

export default function DashboardLoading() {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-50">
      <Loader2 className="w-12 h-12 animate-spin text-green-600 mb-4" />
      <p className="text-gray-500 font-medium">Chargement en cours...</p>
    </div>
  );
}
