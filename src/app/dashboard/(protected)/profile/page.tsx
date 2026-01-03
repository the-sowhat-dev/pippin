import { auth, currentUser } from '@clerk/nextjs/server';
import { User, Mail, Building2, Briefcase, FileText, Fingerprint, PenLine } from 'lucide-react';
import { getPro } from '../../../../../lib/api';
import { UpdateProSheet } from '@/components/dashboard/UpdateProSheet';
import { Button } from '@/components/ui/button';

export default async function Page() {
  const user = await currentUser();
  const { getToken } = await auth();
  const token = await getToken();

  const proData = token ? await getPro(token) : null;

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex justify-between items-start">
        <header>
          <h1 className="text-3xl font-bold text-gray-900">Mon Profil Pro</h1>
          <p className="text-gray-500 mt-2">
            Gérez vos informations professionnelles et votre visibilité.
          </p>
        </header>

        <UpdateProSheet
          initialData={proData}
          trigger={
            <Button className="bg-green-900 hover:bg-green-800 text-white gap-2 shadow-sm">
              <PenLine size={16} />
              Modifier le profil
            </Button>
          }
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center space-y-4 h-fit">
          <div className="relative">
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center text-4xl overflow-hidden ring-4 ring-white shadow-md">
              {user?.imageUrl ? (
                <img src={user.imageUrl} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-400">{user?.firstName?.[0]}</span>
              )}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {proData?.firstName} {proData?.lastName}
            </h2>
            <p className="text-green-900 font-medium bg-green-50 px-3 py-1 rounded-full text-sm inline-block mt-2">
              {proData?.role || 'Rôle non défini'}
            </p>
          </div>
          <div className="w-full pt-6 border-t border-gray-100 space-y-3 text-left">
            <div className="flex items-center gap-3 text-gray-600">
              <Mail size={16} />
              <span className="text-sm truncate">{user?.emailAddresses[0]?.emailAddress}</span>
            </div>
            {/* Phone is not in ProResponse yet, placeholder if needed */}
            {/* <div className="flex items-center gap-3 text-gray-600">
                  <Phone size={16} />
                  <span className="text-sm">Non renseigné</span>
              </div> */}
          </div>
        </div>

        {/* Details Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Presentation Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-50 bg-gray-50/50 flex items-center gap-2">
              <User size={18} className="text-gray-500" />
              <h3 className="font-semibold text-gray-900">Présentation</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                {proData?.presentation || 'Aucune présentation renseignée.'}
              </p>
            </div>
          </div>

          {/* Company Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-50 bg-gray-50/50 flex items-center gap-2">
              <Building2 size={18} className="text-gray-500" />
              <h3 className="font-semibold text-gray-900">Entreprise</h3>
            </div>
            <div className="p-6">
              <div className="flex items-start gap-6 mb-6">
                <div className="w-20 h-20 bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                  {proData?.companyImage ? (
                    <img
                      src={proData?.companyImage}
                      alt={proData?.companyName || 'Company'}
                      className="w-full h-full object-contain p-2"
                    />
                  ) : (
                    <Building2 className="text-gray-300" size={32} />
                  )}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900">
                    {proData?.companyName || "Nom de l'entreprise"}
                  </h4>
                  <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                    {proData?.companyDescription || "Aucune description de l'entreprise."}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-50">
                <div className="space-y-1">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center gap-1">
                    <FileText size={12} /> SIREN
                  </span>
                  <p className="font-mono text-gray-900 bg-gray-50 px-2 py-1 rounded text-sm w-fit">
                    {proData?.sirenId || 'N/A'}
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center gap-1">
                    <Fingerprint size={12} /> AMF
                  </span>
                  <p className="font-mono text-gray-900 bg-gray-50 px-2 py-1 rounded text-sm w-fit">
                    {proData?.amfId || 'N/A'}
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center gap-1">
                    <Briefcase size={12} /> ORIAS
                  </span>
                  <p className="font-mono text-gray-900 bg-gray-50 px-2 py-1 rounded text-sm w-fit">
                    {proData?.oriasId || 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
