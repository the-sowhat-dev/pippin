import {
  getFinancialProductLabel,
  getProfessionLabel,
  getProjectNeedProLabel,
  LeadResponse,
} from 'sowhat-types';
import { SimpleBadge } from '../SimpleBadge';
import { formatAmount } from '@/utils/formatAmount';
import { Info } from 'lucide-react';

export const LeadRow = ({ lead }: { lead: LeadResponse }) => {
  const calculateAge = (birthYear: number) => {
    return new Date().getFullYear() - birthYear;
  };

  const formatInscriptionDate = (createdAt: Date | string) => {
    const formattedDate = new Date(createdAt);
    const daysAgo = Math.floor(
      (new Date().getTime() - formattedDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    return `Inscrit il y a ${daysAgo} jours`;
  };

  return (
    <div className="group bg-white rounded-lg border border-gray-100 hover:border-green-200 hover:shadow-sm transition-all duration-200 p-4 mb-3">
      <span className="text-xs text-gray-400 flex justify-end mb-2">
        {formatInscriptionDate(lead.createdAt)}
      </span>

      {/* Middle: Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 items-start gap-4 sm:gap-8 flex-1">
        {/* Amount */}
        <div className="flex flex-col">
          <span className="text-gray-400">Montant initial à investir</span>
          <span className="font-bold text-green-900">{formatAmount(lead.initialAmount)}</span>
        </div>

        {/* Need */}
        <div className="flex flex-col">
          <span className="text-gray-400 mb-1">Besoin principal</span>
          <SimpleBadge
            className={`${lead.need ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-700'} w-fit max-w-[350px] truncate`}
            title={lead.need ? getProjectNeedProLabel(lead.need) : 'Non renseigné'}
          >
            {lead.need ? getProjectNeedProLabel(lead.need) : 'Non renseigné'}
          </SimpleBadge>
        </div>

        {/* Product */}
        <div className="flex flex-col">
          <span className="text-gray-400">Produit recherché</span>
          <SimpleBadge
            className={`${lead.financialProduct ? 'bg-blue-50 text-blue-700' : 'bg-gray-50 text-gray-700'} w-fit max-w-[200px] truncate`}
            title={
              lead.financialProduct
                ? getFinancialProductLabel(lead.financialProduct)
                : 'Non renseigné'
            }
          >
            {lead.financialProduct
              ? getFinancialProductLabel(lead.financialProduct)
              : 'Non renseigné'}
          </SimpleBadge>
        </div>
      </div>

      {/* Metadata and user Info */}
      <div className="flex gap-4 text-xs bg-gray-50 px-2 rounded-lg mt-4">
        <div className=" text-gray-400 flex items-center gap-1">
          <Info className="w-3 h-3" />
          {lead.userId.slice(0, 7).toUpperCase()}
        </div>
        <div className="flex items-center text-gray-500 gap-2">
          {lead.birthYear && <span>{calculateAge(lead.birthYear)} ans</span>}
          {lead.profession && (
            <>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <span>{getProfessionLabel(lead.profession)}</span>
            </>
          )}
        </div>

        {/* Right: Action/Date */}
        <div className="min-w-[100px] flex flex-1 justify-end py-2">
          <button className="text-sm text-green-600 hover:text-green-800 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            Voir le détail &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};
