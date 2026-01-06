import { LeadResponse } from 'sowhat-types';

// Simple Badge component if not available, or just use Tailwind classes
const SimpleBadge = ({
  children,
  className,
  title,
}: {
  children: React.ReactNode;
  className?: string;
  title?: string;
}) => (
  <span
    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}
    title={title}
  >
    {children}
  </span>
);

export const LeadRow = ({ lead }: { lead: LeadResponse }) => {
  const amountFormatter = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  });

  const calculateAge = (birthYear: number) => {
    return new Date().getFullYear() - birthYear;
  };

  return (
    <div className="group bg-white rounded-lg border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-200 p-4 mb-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left: User Info */}
        <div className="flex items-center gap-4 min-w-[200px]">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">{lead.userId.slice(0, 5)}</h3>
            <div className="flex items-center text-xs text-gray-500 mt-1 gap-2">
              {lead.birthYear && <span>{calculateAge(lead.birthYear)} ans</span>}
              {lead.profession && (
                <>
                  <span className="w-1 h-1 rounded-full bg-gray-300" />
                  <span>{lead.profession}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Middle: Details */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-8 flex-1">
          {/* Amount */}
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 uppercase tracking-wider font-medium">
              Montant
            </span>
            <span className="text-sm font-bold text-gray-900">
              {amountFormatter.format(lead.initialAmount)}
            </span>
          </div>

          {/* Need */}
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-1">
              Besoin
            </span>
            <SimpleBadge
              className="bg-purple-50 text-purple-700 w-fit max-w-[200px] truncate"
              title={lead.need}
            >
              {lead.need}
            </SimpleBadge>
          </div>

          {/* Product */}
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-1">
              Produit actuel
            </span>
            {lead.financialProduct ? (
              <SimpleBadge
                className="bg-green-50 text-green-700 w-fit max-w-[200px] truncate"
                title={lead.financialProduct}
              >
                {lead.financialProduct}
              </SimpleBadge>
            ) : (
              <span className="text-sm text-gray-400 italic">Non renseigné</span>
            )}
          </div>
        </div>

        {/* Right: Action/Date */}
        <div className="text-right flex flex-col items-end gap-1 min-w-[100px]">
          <span className="text-xs text-gray-400">
            {new Date(lead.createdAt).toLocaleDateString('fr-FR')}
          </span>
          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            Voir le détail &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};
