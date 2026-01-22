'use client';

import {
  LeadResponse,
  getProjectNeedProLabel,
} from 'sowhat-types';
import { ReactNode } from 'react';
import { Heart, Info } from 'lucide-react';

import { formatAmount } from '@/utils/formatAmount';

interface LikedLeadCardProps {
  lead: LeadResponse;
  action: ReactNode;
}

export const LikedLeadCard = ({ lead, action }: LikedLeadCardProps) => {
  return (
    <div className="group bg-white rounded-lg border border-gray-200 hover:border-green-600 hover:shadow-md transition-all duration-200 space-y-3 flex flex-col gap-1 py-4">
      {/* Header with ID */}
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-1.5 text-green-800/60 text-sm font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
          <Info className="w-3.5 h-3.5" />
          <span className="tracking-wide">
            {lead.userId.substring(0, 7).toUpperCase()}
          </span>
        </div>
        <Heart className="w-4 h-4 text-red-500 fill-current" />
      </div>

      <div className="h-px bg-gray-200/50" />

      {/* Amount */}
      <div className="px-4">
        <span className="text-xs text-gray-500">Montant</span>
        <div className="text-lg font-bold text-green-700">
          {formatAmount(lead.initialAmount || 0)}
        </div>
      </div>

      {/* Need */}
      <div className="px-4">
        <span className="text-xs text-gray-500 block mb-1">Besoin</span>
        <span className="text-xs text-green-800 font-medium line-clamp-2">
          {lead.need ? getProjectNeedProLabel(lead.need) : 'Non renseigné'}
        </span>
      </div>

      <div className="h-px bg-gray-200/50" />

      {/* Action button */}
      <div className="px-4">
        <div className="flex-1 flex items-center gap-2">{action}</div>
      </div>
    </div>
  );
};
