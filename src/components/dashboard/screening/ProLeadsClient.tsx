"use client";

import { Suspense } from "react";
import { Loader2 } from "lucide-react";

import { ProLeadsContent } from "./ProLeadsContent";

export const ProLeadsClient = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center p-8">
          <Loader2 className="w-8 h-8 animate-spin text-gray-300" />
        </div>
      }>
      <ProLeadsContent />
    </Suspense>
  );
};
