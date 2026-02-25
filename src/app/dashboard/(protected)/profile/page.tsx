import { auth, currentUser } from "@clerk/nextjs/server";
import { User, Mail, Building2, Briefcase, FileText, PenLine, Award } from "lucide-react";
import { getPro } from "../../../../lib/api";
import { UpdateProSheet } from "@/components/dashboard/UpdateProSheet";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { getProCertificationByKey } from "sowhat-types";
import { LexendFont } from "@/utils/fonts";

export default async function Page() {
  const user = await currentUser();
  const { getToken } = await auth();
  const token = await getToken();

  const proData = token ? await getPro(token) : null;

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Mon Profil Pro</h1>
        <p className="text-gray-500 mt-2">
          Gérez vos informations professionnelles et celle de votre entreprise.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Card */}
        <div className="flex flex-col gap-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center space-y-4 h-fit">
            <div className="relative">
              <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center text-3xl overflow-hidden ring-4 ring-white shadow-md">
                {user?.imageUrl ? (
                  <Image
                    src={user.imageUrl}
                    alt="Profile"
                    className="object-cover"
                    width={128}
                    height={128}
                  />
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
                {proData?.role || "Rôle non défini"}
              </p>
            </div>
            <div className="w-full pt-6 border-t border-gray-100 space-y-3 text-left">
              <div className="flex items-center gap-3 text-gray-600">
                <Mail size={16} />
                <span className="text-sm truncate">{user?.emailAddresses[0]?.emailAddress}</span>
              </div>
            </div>
          </div>

          <UpdateProSheet
            initialData={proData}
            trigger={
              <Button className="bg-[#35C055] hover:bg-[#35C055]/80 text-white gap-2 shadow-sm">
                <PenLine size={18} />
                Modifier le profil
              </Button>
            }
          />
        </div>

        {/* Details Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Presentation Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-50 bg-gray-50/50 flex items-center gap-2">
              <User size={20} className="text-green-900" />
              <h3 className={`text-green-900 ${LexendFont.className}`}>Présentation</h3>
            </div>

            <div className="p-6">
              <p className="text-gray-600 whitespace-pre-wrap">
                {proData?.presentation || "Aucune présentation renseignée."}
              </p>
            </div>

            <div className="p-6 border-t border-gray-50">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center gap-1 mb-2">
                <Award size={12} /> Certifications
              </span>
              <div className="flex flex-wrap gap-2">
                {proData?.certifications && proData.certifications.length > 0 ? (
                  proData.certifications.map((cert) => {
                    const certInfo = getProCertificationByKey(cert);
                    return (
                      <span
                        key={cert}
                        title={certInfo?.description}
                        className="inline-flex items-center px-3 py-1 rounded-sm text-sm font-medium bg-green-50 text-green-800 border border-green-200">
                        {certInfo?.label || cert}
                      </span>
                    );
                  })
                ) : (
                  <span className="text-gray-400 text-sm">Aucune certification</span>
                )}
              </div>
            </div>
          </div>

          {/* Company Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-50 bg-gray-50/50 flex items-center gap-2">
              <Building2 size={20} className="text-green-900" />
              <h3 className={`text-green-900 ${LexendFont.className}`}>Entreprise</h3>
            </div>
            <div className="p-6">
              <div className="w-20 h-20 bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-center overflow-hidden shrink-0 mb-6">
                {proData?.companyImage ? (
                  // For cache busting
                  <Image
                    src={`${proData.companyImage}${proData.companyImage.includes("?") ? "&" : "?"}v=${new Date(proData.updatedAt).getTime()}`}
                    alt={proData?.companyName || "Company"}
                    className="object-cover"
                    width={128}
                    height={128}
                  />
                ) : (
                  <Building2 className="text-gray-300" size={32} />
                )}
              </div>

              <h4 className="text-lg font-bold text-gray-900 mb-2">
                {proData?.companyName || "Nom de l'entreprise"}
              </h4>

              <p className="text-gray-600 whitespace-pre-wrap mb-6">
                {proData?.companyDescription || "Aucune description de l'entreprise."}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-gray-50">
                <div className="space-y-1">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center gap-1 mb-2">
                    <FileText size={12} /> SIREN
                  </span>
                  <p className="text-gray-900 font-medium bg-gray-50 px-2 py-1 border border-gray-200 rounded text-sm w-fit">
                    {proData?.sirenId || "N/A"}
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center gap-1 mb-2">
                    <Briefcase size={12} /> ORIAS
                  </span>
                  <p className="text-gray-900 font-medium bg-gray-50 px-2 py-1 border border-gray-200 rounded text-sm w-fit">
                    {proData?.oriasId || "N/A"}
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
