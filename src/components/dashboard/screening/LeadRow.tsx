import {
  getFinancialProductLabel,
  getProfessionLabel,
  getProjectNeedProLabel,
  LeadResponse,
  FullLeadResponse,
} from 'sowhat-types';
import { SimpleBadge } from '../SimpleBadge';
import { formatAmount } from '@/utils/formatAmount';
import { Info } from 'lucide-react';
import { ReactNode } from 'react';

// Helper functions exported for consumers
export const calculateAge = (birthYear: number) => {
  return new Date().getFullYear() - birthYear;
};

export const formatInscriptionDate = (createdAt: Date | string) => {
  const old = new Date(createdAt);
  const today = new Date();

  // Number of days since today
  const daysAgo = Math.floor((today.getTime() - old.getTime()) / 1000 / 60 / 60 / 24);

  return `Inscrit il y a ${daysAgo} jours`;
};

const LeadRowRoot = ({ children, className = '' }: { children: ReactNode; className?: string }) => {
  return (
    <div
      className={`group bg-white rounded-lg border border-gray-100 hover:border-green-200 hover:shadow-sm transition-all duration-200 p-4 mb-3 ${className}`}
    >
      {children}
    </div>
  );
};

const LeadRowHeader = ({ children }: { children: ReactNode }) => {
  return <div className="text-xs text-gray-400 flex justify-end mb-6">{children}</div>;
};

const LeadRowContent = ({ lead }: { lead: LeadResponse | FullLeadResponse }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 items-start gap-4 sm:gap-8 flex-1 min-w-0">
      {/* Amount */}
      <div className="flex flex-col min-w-0">
        <span className="text-gray-400">Montant initial à investir</span>
        <span className="font-bold text-green-900">{formatAmount(lead.initialAmount || 0)}</span>
      </div>

      {/* Need */}
      <div className="flex flex-col min-w-0">
        <span className="text-gray-400 mb-1">Besoin principal</span>
        <SimpleBadge
          className={`${lead.need ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-700'} w-fit max-w-full`}
          title={lead.need ? getProjectNeedProLabel(lead.need) : 'Non renseigné'}
        >
          <span className="truncate">
            {lead.need ? getProjectNeedProLabel(lead.need) : 'Non renseigné'}
          </span>
        </SimpleBadge>
      </div>

      {/* Product */}
      <div className="flex flex-col min-w-0">
        <span className="text-gray-400">Produit recherché</span>
        <SimpleBadge
          className={`${lead.financialProduct ? 'bg-blue-50 text-blue-700' : 'bg-gray-50 text-gray-700'} w-fit max-w-full`}
          title={
            lead.financialProduct
              ? getFinancialProductLabel(lead.financialProduct)
              : 'Non renseigné'
          }
        >
          <span className="truncate">
            {lead.financialProduct
              ? getFinancialProductLabel(lead.financialProduct)
              : 'Non renseigné'}
          </span>
        </SimpleBadge>
      </div>
    </div>
  );
};

const LeadRowFooterAction = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-w-[100px] flex flex-1 justify-end items-center gap-3 py-2">{children}</div>
  );
};

const LeadRowFooter = ({
  lead,
  children,
}: {
  lead: LeadResponse | FullLeadResponse;
  children: ReactNode;
}) => {
  return (
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
      {children}
    </div>
  );
};

// Explicitly assign properties to LeadRowFooter to create the sub-component structure
const LeadRowFooterWithAction = Object.assign(LeadRowFooter, {
  Action: LeadRowFooterAction,
});

export const LeadRow = Object.assign(LeadRowRoot, {
  Header: LeadRowHeader,
  Content: LeadRowContent,
  Footer: LeadRowFooterWithAction,
});
